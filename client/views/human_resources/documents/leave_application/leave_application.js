var pageSession = new ReactiveDict();
var recordSelect = new ReactiveArray();


Template.HumanResourcesDocumentsLeaveApplication.rendered = function() {

};

Template.HumanResourcesDocumentsLeaveApplication.events({
	
});

Template.HumanResourcesDocumentsLeaveApplication.helpers({
	
});

var LeaveApplicationViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("LeaveApplicationViewSearchString");
	var sortBy = pageSession.get("LeaveApplicationViewSortBy");
	var sortAscending = pageSession.get("LeaveApplicationViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["employee_name", "status", "from_date", "name"];
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

var LeaveApplicationViewExport = function(cursor, fileType) {
	var data = LeaveApplicationViewItems(cursor);
	var exportFields = ["employee_name", "status", "from_date", "name"];

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


Template.LeaveApplicationView.rendered = function() {
	pageSession.set("LeaveApplicationViewStyle", "table");
	Session.set("buttonSuccess", true);
	
};

Template.LeaveApplicationView.events({
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
				pageSession.set("LeaveApplicationViewSearchString", searchString);
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
					pageSession.set("LeaveApplicationViewSearchString", searchString);
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
					pageSession.set("LeaveApplicationViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-leave-application-insert-delete-button": function(e, t) {
		e.preventDefault();
		if ($(e.target).hasClass("plus-sign")) {
			Router.go("human_resources.documents.leave_application.insert", {});
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
							Meteor.call("removeLeaveApplication", docIds);
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
		LeaveApplicationViewExport(this.leave_application_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		LeaveApplicationViewExport(this.leave_application_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		LeaveApplicationViewExport(this.leave_application_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		LeaveApplicationViewExport(this.leave_application_list, "json");
	}

	
});

Template.LeaveApplicationView.helpers({

	"insertButtonClass": function() {
		return LeaveApplication.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.leave_application_list || this.leave_application_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.leave_application_list && this.leave_application_list.count() > 0;
	},
	"isNotFound": function() {
		return this.leave_application_list && pageSession.get("LeaveApplicationViewSearchString") && LeaveApplicationViewItems(this.leave_application_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("LeaveApplicationViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("LeaveApplicationViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("LeaveApplicationViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("LeaveApplicationViewStyle") == "gallery";
	},
	"toggleAddDeleteButton": function() {
		return Session.get("buttonSuccess") ? "btn btn-primary plus-sign" : "btn btn-danger trash-can";
	},
	"setAddDeleteButtonText": function() {
		return Session.get("buttonSuccess") ? "Add new" : "Delete";
	}

	
});


Template.LeaveApplicationViewTable.rendered = function() {

};

Template.LeaveApplicationViewTable.events({
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
		var oldSortBy = pageSession.get("LeaveApplicationViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("LeaveApplicationViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("LeaveApplicationViewSortAscending") || false;
			pageSession.set("LeaveApplicationViewSortAscending", !sortAscending);
		} else {
			pageSession.set("LeaveApplicationViewSortAscending", true);
		}
	}
});

Template.LeaveApplicationViewTable.helpers({
	"tableItems": function() {
		return LeaveApplicationViewItems(this.leave_application_list);
	}

});


Template.LeaveApplicationViewTableItems.rendered = function() {

};

Template.LeaveApplicationViewTableItems.events({
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
		Router.go("human_resources.documents.leave_application.edit", {leaveApplicationId: this._id});
		return false;
	}

});

Template.LeaveApplicationViewTableItems.helpers({
	"checkComplete": function() {
		return Session.get("checkComplete");
	},

	"editButtonClass": function() {
		return LeaveApplication.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return LeaveApplication.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.LeaveApplicationViewTableFooter.rendered = function() {

};

Template.LeaveApplicationViewTableFooter.events({

	"click #dataview-leave-application-paginate-buttons": function(e) {
		var documentNumber = parseInt(e.target.textContent, 10);
		Session.set("limit", documentNumber);
	}

});

Template.LeaveApplicationViewTableFooter.helpers({

});
