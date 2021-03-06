var pageSession = new ReactiveDict();
var recordSelect = new ReactiveArray();


Template.SetupWorkflowWorkflow.rendered = function() {

};

Template.SetupWorkflowWorkflow.events({
	
});

Template.SetupWorkflowWorkflow.helpers({
	
});

var WorkflowViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("WorkflowViewSearchString");
	var sortBy = pageSession.get("WorkflowViewSortBy");
	var sortAscending = pageSession.get("WorkflowViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["name", "is_active"];
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

var WorkflowViewExport = function(cursor, fileType) {
	var data = WorkflowViewItems(cursor);
	var exportFields = ["name", "is_active"];

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


Template.WorkflowView.rendered = function() {
	pageSession.set("WorkflowViewStyle", "table");
	Session.set("buttonSuccess", true);
	
};

Template.WorkflowView.events({
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
				pageSession.set("WorkflowViewSearchString", searchString);
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
					pageSession.set("WorkflowViewSearchString", searchString);
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
					pageSession.set("WorkflowViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-workflow-insert-delete-button": function(e, t) {
		e.preventDefault();
		if ($(e.target).hasClass("plus-sign")) {
			Router.go("setup.workflow.workflow.insert", {});
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
							Meteor.call("removeWorkflow", docIds);
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
		WorkflowViewExport(this.workflow_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		WorkflowViewExport(this.workflow_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		WorkflowViewExport(this.workflow_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		WorkflowViewExport(this.workflow_list, "json");
	}

	
});

Template.WorkflowView.helpers({

	"insertButtonClass": function() {
		return Workflow.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.workflow_list || this.workflow_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.workflow_list && this.workflow_list.count() > 0;
	},
	"isNotFound": function() {
		return this.workflow_list && pageSession.get("WorkflowViewSearchString") && WorkflowViewItems(this.workflow_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("WorkflowViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("WorkflowViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("WorkflowViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("WorkflowViewStyle") == "gallery";
	},
	"toggleAddDeleteButton": function() {
		return Session.get("buttonSuccess") ? "btn btn-primary plus-sign" : "btn btn-danger trash-can";
	},
	"setAddDeleteButtonText": function() {
		return Session.get("buttonSuccess") ? "Add new" : "Delete";
	}

	
});


Template.WorkflowViewTable.rendered = function() {

};

Template.WorkflowViewTable.events({
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
		var oldSortBy = pageSession.get("WorkflowViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("WorkflowViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("WorkflowViewSortAscending") || false;
			pageSession.set("WorkflowViewSortAscending", !sortAscending);
		} else {
			pageSession.set("WorkflowViewSortAscending", true);
		}
	}
});

Template.WorkflowViewTable.helpers({
	"tableItems": function() {
		return WorkflowViewItems(this.workflow_list);
	}

});


Template.WorkflowViewTableItems.rendered = function() {

};

Template.WorkflowViewTableItems.events({
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
		Router.go("setup.workflow.workflow.edit", {workflowId: this._id});
		return false;
	}

});

Template.WorkflowViewTableItems.helpers({
	"checkComplete": function() {
		return Session.get("checkComplete");
	},

	"editButtonClass": function() {
		return Workflow.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Workflow.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.WorkflowViewTableFooter.rendered = function() {

};

Template.WorkflowViewTableFooter.events({

	"click #dataview-workflow-paginate-buttons": function(e) {
		var documentNumber = parseInt(e.target.textContent, 10);
		Session.set("limit", documentNumber);
	}

});

Template.WorkflowViewTableFooter.helpers({

});
