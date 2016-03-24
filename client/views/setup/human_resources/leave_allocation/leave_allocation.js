var pageSession = new ReactiveDict();
var recordSelect = new ReactiveArray();


Template.SetupHumanResourcesLeaveAllocation.rendered = function() {

};

Template.SetupHumanResourcesLeaveAllocation.events({
	
});

Template.SetupHumanResourcesLeaveAllocation.helpers({
	
});

var LeaveAllocationViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("LeaveAllocationViewSearchString");
	var sortBy = pageSession.get("LeaveAllocationViewSortBy");
	var sortAscending = pageSession.get("LeaveAllocationViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["name", "docstatus", "employee"];
		filtered = _.filter(raw, function(item) {
			var match = false;
			_.each(searchFields, function(field) {
				var value = (getPropertyValue(field, item) || "") + "";

				match = match || (value && value.match(regEx));
				if(match) {
					return false;
				}
			})
			return match;
		});
	}

	// sort
	if(sortBy) {
		filtered = _.sortBy(filtered, sortBy);

		// descending?
		if(!sortAscending) {
			filtered = filtered.reverse();
		}
	}

	return filtered;
};

var LeaveAllocationViewExport = function(cursor, fileType) {
	var data = LeaveAllocationViewItems(cursor);
	var exportFields = ["name", "docstatus", "employee"];

	var str = convertArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}

$(document).on("hidden.bs.modal", ".bootbox.modal", function (e) {
    callback();
});

function callback() {
	var status = Session.get("buttonSuccess");
    if (status) {
        recordSelect.clear();
    }
}


Template.LeaveAllocationView.rendered = function() {
	pageSession.set("LeaveAllocationViewStyle", "table");
	Session.set("buttonSuccess", true);
	
};

Template.LeaveAllocationView.events({
	"submit #dataview-controls": function(e, t) {
		return false;
	},

	"click #dataview-search-button": function(e, t) {
		e.preventDefault();
		var form = $(e.currentTarget).parent();
		if(form) {
			var searchInput = form.find("#dataview-search-input");
			if(searchInput) {
				searchInput.focus();
				var searchString = searchInput.val();
				pageSession.set("LeaveAllocationViewSearchString", searchString);
			}

		}
		return false;
	},

	"keydown #dataview-search-input": function(e, t) {
		if(e.which === 13)
		{
			e.preventDefault();
			var form = $(e.currentTarget).parent();
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					var searchString = searchInput.val();
					pageSession.set("LeaveAllocationViewSearchString", searchString);
				}

			}
			return false;
		}

		if(e.which === 27)
		{
			e.preventDefault();
			var form = $(e.currentTarget).parent();
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					searchInput.val("");
					pageSession.set("LeaveAllocationViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-leave-allocation-insert-delete-button": function(e, t) {
		e.preventDefault();
		if ($(e.target).hasClass("plus-sign")) {
			Router.go("setup.human_resources.leave_allocation.insert", {});
		} else {
			var docIds = recordSelect.array();
			bootbox.dialog({
				message: "Delete selected record(s)? Are you sure?",
				title: "Delete",
				animate: false,
				buttons: {
					success: {
						label: "Yes",
						className: "btn-success",
						callback: function() {
							Meteor.call("removeLeaveAllocation", docIds);
							Session.set("buttonSuccess", true);						}
					},
					danger: {
						label: "No",
						className: "btn-default"
					}
				},
				onEscape: function() {
					$(".bootbox.modal").modal("hide");
				}
			});
			
		}

		return false;
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		LeaveAllocationViewExport(this.leave_allocation_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		LeaveAllocationViewExport(this.leave_allocation_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		LeaveAllocationViewExport(this.leave_allocation_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		LeaveAllocationViewExport(this.leave_allocation_list, "json");
	}

	
});

Template.LeaveAllocationView.helpers({

	"insertButtonClass": function() {
		return LeaveAllocation.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.leave_allocation_list || this.leave_allocation_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.leave_allocation_list && this.leave_allocation_list.count() > 0;
	},
	"isNotFound": function() {
		return this.leave_allocation_list && pageSession.get("LeaveAllocationViewSearchString") && LeaveAllocationViewItems(this.leave_allocation_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("LeaveAllocationViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("LeaveAllocationViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("LeaveAllocationViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("LeaveAllocationViewStyle") == "gallery";
	},
	"toggleAddDeleteButton": function() {
		return Session.get("buttonSuccess") ? "btn btn-primary plus-sign" : "btn btn-danger trash-can";
	},
	"setAddDeleteButtonText": function() {
		return Session.get("buttonSuccess") ? "Add new" : "Delete";
	}

	
});


Template.LeaveAllocationViewTable.rendered = function() {

};

Template.LeaveAllocationViewTable.events({
	"click .list-select-all": function(e, t) {
		if ($(".list-select-all").is(":checked")) {
			recordSelect.clear();
			$(".list-delete").removeAttr("checked");
			$(".list-delete").trigger("click");
		} else {
			$(".list-delete").trigger("click").removeAttr("checked");
			recordSelect.clear();
			Session.set("buttonSuccess", true);
		}
	},

	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("LeaveAllocationViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("LeaveAllocationViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("LeaveAllocationViewSortAscending") || false;
			pageSession.set("LeaveAllocationViewSortAscending", !sortAscending);
		} else {
			pageSession.set("LeaveAllocationViewSortAscending", true);
		}
	}
});

Template.LeaveAllocationViewTable.helpers({
	"tableItems": function() {
		return LeaveAllocationViewItems(this.leave_allocation_list);
	}

});


Template.LeaveAllocationViewTableItems.rendered = function() {

};

Template.LeaveAllocationViewTableItems.events({
	"change .check-complete input": function(e) {
		Session.set("checkComplete", e.target.checked);

	}, 

	"click .list-delete": function(e, t) {
		if ($(e.target).is(":checked")) {
			Session.set("buttonSuccess", false);
			recordSelect.push(this._id);
		} else {
			var index = recordSelect.indexOf(this._id);
			if (index > -1) {
				recordSelect.splice(index, 1);
			}
		} 

		var array = recordSelect.array();					
		if (array.length == 0) {
			Session.set("buttonSuccess", true);
		}

	},

	"click #field": function(e, t) {
		e.preventDefault();
		Router.go("setup.human_resources.leave_allocation.edit", {leaveAllocationId: this._id});
		return false;
	}

});

Template.LeaveAllocationViewTableItems.helpers({
	"checkComplete": function() {
		return Session.get("checkComplete");
	},

	"editButtonClass": function() {
		return LeaveAllocation.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return LeaveAllocation.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.LeaveAllocationViewTableFooter.rendered = function() {

};

Template.LeaveAllocationViewTableFooter.events({

	"click #dataview-leave-allocation-paginate-buttons": function(e) {
		var documentNumber = parseInt(e.target.textContent, 10);
		Session.set("limit", documentNumber);
	}

});

Template.LeaveAllocationViewTableFooter.helpers({

});
