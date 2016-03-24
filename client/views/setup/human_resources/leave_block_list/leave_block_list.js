var pageSession = new ReactiveDict();
var recordSelect = new ReactiveArray();


Template.SetupHumanResourcesLeaveBlockList.rendered = function() {

};

Template.SetupHumanResourcesLeaveBlockList.events({
	
});

Template.SetupHumanResourcesLeaveBlockList.helpers({
	
});

var LeaveBlockListViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("LeaveBlockListViewSearchString");
	var sortBy = pageSession.get("LeaveBlockListViewSortBy");
	var sortAscending = pageSession.get("LeaveBlockListViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["name", "leave_block_list_name", "year"];
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

var LeaveBlockListViewExport = function(cursor, fileType) {
	var data = LeaveBlockListViewItems(cursor);
	var exportFields = ["name", "leave_block_list_name", "year"];

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


Template.LeaveBlockListView.rendered = function() {
	pageSession.set("LeaveBlockListViewStyle", "table");
	Session.set("buttonSuccess", true);
	
};

Template.LeaveBlockListView.events({
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
				pageSession.set("LeaveBlockListViewSearchString", searchString);
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
					pageSession.set("LeaveBlockListViewSearchString", searchString);
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
					pageSession.set("LeaveBlockListViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-leave-block-list-insert-delete-button": function(e, t) {
		e.preventDefault();
		if ($(e.target).hasClass("plus-sign")) {
			Router.go("setup.human_resources.leave_block_list.insert", {});
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
							Meteor.call("removeLeaveBlockList", docIds);
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
		LeaveBlockListViewExport(this.leave_block_list_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		LeaveBlockListViewExport(this.leave_block_list_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		LeaveBlockListViewExport(this.leave_block_list_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		LeaveBlockListViewExport(this.leave_block_list_list, "json");
	}

	
});

Template.LeaveBlockListView.helpers({

	"insertButtonClass": function() {
		return LeaveBlockList.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.leave_block_list_list || this.leave_block_list_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.leave_block_list_list && this.leave_block_list_list.count() > 0;
	},
	"isNotFound": function() {
		return this.leave_block_list_list && pageSession.get("LeaveBlockListViewSearchString") && LeaveBlockListViewItems(this.leave_block_list_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("LeaveBlockListViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("LeaveBlockListViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("LeaveBlockListViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("LeaveBlockListViewStyle") == "gallery";
	},
	"toggleAddDeleteButton": function() {
		return Session.get("buttonSuccess") ? "btn btn-primary plus-sign" : "btn btn-danger trash-can";
	},
	"setAddDeleteButtonText": function() {
		return Session.get("buttonSuccess") ? "Add new" : "Delete";
	}

	
});


Template.LeaveBlockListViewTable.rendered = function() {

};

Template.LeaveBlockListViewTable.events({
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
		var oldSortBy = pageSession.get("LeaveBlockListViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("LeaveBlockListViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("LeaveBlockListViewSortAscending") || false;
			pageSession.set("LeaveBlockListViewSortAscending", !sortAscending);
		} else {
			pageSession.set("LeaveBlockListViewSortAscending", true);
		}
	}
});

Template.LeaveBlockListViewTable.helpers({
	"tableItems": function() {
		return LeaveBlockListViewItems(this.leave_block_list_list);
	}

});


Template.LeaveBlockListViewTableItems.rendered = function() {

};

Template.LeaveBlockListViewTableItems.events({
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
		Router.go("setup.human_resources.leave_block_list.edit", {leaveBlockListId: this._id});
		return false;
	}

});

Template.LeaveBlockListViewTableItems.helpers({
	"checkComplete": function() {
		return Session.get("checkComplete");
	},

	"editButtonClass": function() {
		return LeaveBlockList.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return LeaveBlockList.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.LeaveBlockListViewTableFooter.rendered = function() {

};

Template.LeaveBlockListViewTableFooter.events({

	"click #dataview-leave-block-list-paginate-buttons": function(e) {
		var documentNumber = parseInt(e.target.textContent, 10);
		Session.set("limit", documentNumber);
	}

});

Template.LeaveBlockListViewTableFooter.helpers({

});
