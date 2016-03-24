var pageSession = new ReactiveDict();
var recordSelect = new ReactiveArray();


Template.SetupWorkflowWorkflowAction.rendered = function() {

};

Template.SetupWorkflowWorkflowAction.events({
	
});

Template.SetupWorkflowWorkflowAction.helpers({
	
});

var WorkflowActionViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("WorkflowActionViewSearchString");
	var sortBy = pageSession.get("WorkflowActionViewSortBy");
	var sortAscending = pageSession.get("WorkflowActionViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["name"];
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

var WorkflowActionViewExport = function(cursor, fileType) {
	var data = WorkflowActionViewItems(cursor);
	var exportFields = ["name"];

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


Template.WorkflowActionView.rendered = function() {
	pageSession.set("WorkflowActionViewStyle", "table");
	Session.set("buttonSuccess", true);
	
};

Template.WorkflowActionView.events({
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
				pageSession.set("WorkflowActionViewSearchString", searchString);
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
					pageSession.set("WorkflowActionViewSearchString", searchString);
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
					pageSession.set("WorkflowActionViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-workflow-action-insert-delete-button": function(e, t) {
		e.preventDefault();
		if ($(e.target).hasClass("plus-sign")) {
			Router.go("setup.workflow.workflow_action.insert", {});
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
							Meteor.call("removeWorkflowAction", docIds);
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
		WorkflowActionViewExport(this.workflow_action_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		WorkflowActionViewExport(this.workflow_action_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		WorkflowActionViewExport(this.workflow_action_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		WorkflowActionViewExport(this.workflow_action_list, "json");
	}

	
});

Template.WorkflowActionView.helpers({

	"insertButtonClass": function() {
		return WorkflowAction.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.workflow_action_list || this.workflow_action_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.workflow_action_list && this.workflow_action_list.count() > 0;
	},
	"isNotFound": function() {
		return this.workflow_action_list && pageSession.get("WorkflowActionViewSearchString") && WorkflowActionViewItems(this.workflow_action_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("WorkflowActionViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("WorkflowActionViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("WorkflowActionViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("WorkflowActionViewStyle") == "gallery";
	},
	"toggleAddDeleteButton": function() {
		return Session.get("buttonSuccess") ? "btn btn-primary plus-sign" : "btn btn-danger trash-can";
	},
	"setAddDeleteButtonText": function() {
		return Session.get("buttonSuccess") ? "Add new" : "Delete";
	}

	
});


Template.WorkflowActionViewTable.rendered = function() {

};

Template.WorkflowActionViewTable.events({
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
		var oldSortBy = pageSession.get("WorkflowActionViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("WorkflowActionViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("WorkflowActionViewSortAscending") || false;
			pageSession.set("WorkflowActionViewSortAscending", !sortAscending);
		} else {
			pageSession.set("WorkflowActionViewSortAscending", true);
		}
	}
});

Template.WorkflowActionViewTable.helpers({
	"tableItems": function() {
		return WorkflowActionViewItems(this.workflow_action_list);
	}

});


Template.WorkflowActionViewTableItems.rendered = function() {

};

Template.WorkflowActionViewTableItems.events({
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
		Router.go("setup.workflow.workflow_action.edit", {workflowActionId: this._id});
		return false;
	}

});

Template.WorkflowActionViewTableItems.helpers({
	"checkComplete": function() {
		return Session.get("checkComplete");
	},

	"editButtonClass": function() {
		return WorkflowAction.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return WorkflowAction.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.WorkflowActionViewTableFooter.rendered = function() {

};

Template.WorkflowActionViewTableFooter.events({

	"click #dataview-workflow-action-paginate-buttons": function(e) {
		var documentNumber = parseInt(e.target.textContent, 10);
		Session.set("limit", documentNumber);
	}

});

Template.WorkflowActionViewTableFooter.helpers({

});
