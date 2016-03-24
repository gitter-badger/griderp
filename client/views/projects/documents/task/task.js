var pageSession = new ReactiveDict();
var recordSelect = new ReactiveArray();


Template.ProjectsDocumentsTask.rendered = function() {

};

Template.ProjectsDocumentsTask.events({
	
});

Template.ProjectsDocumentsTask.helpers({
	
});

var TaskViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("TaskViewSearchString");
	var sortBy = pageSession.get("TaskViewSortBy");
	var sortAscending = pageSession.get("TaskViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["subject", "project", "status", "name"];
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

var TaskViewExport = function(cursor, fileType) {
	var data = TaskViewItems(cursor);
	var exportFields = ["subject", "project", "status", "name"];

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


Template.TaskView.rendered = function() {
	pageSession.set("TaskViewStyle", "table");
	Session.set("buttonSuccess", true);
	
};

Template.TaskView.events({
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
				pageSession.set("TaskViewSearchString", searchString);
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
					pageSession.set("TaskViewSearchString", searchString);
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
					pageSession.set("TaskViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-task-insert-delete-button": function(e, t) {
		e.preventDefault();
		if ($(e.target).hasClass("plus-sign")) {
			Router.go("projects.documents.task.insert", {});
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
							Meteor.call("removeTask", docIds);
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
		TaskViewExport(this.task_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		TaskViewExport(this.task_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		TaskViewExport(this.task_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		TaskViewExport(this.task_list, "json");
	}

	
});

Template.TaskView.helpers({

	"insertButtonClass": function() {
		return Task.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.task_list || this.task_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.task_list && this.task_list.count() > 0;
	},
	"isNotFound": function() {
		return this.task_list && pageSession.get("TaskViewSearchString") && TaskViewItems(this.task_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("TaskViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("TaskViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("TaskViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("TaskViewStyle") == "gallery";
	},
	"toggleAddDeleteButton": function() {
		return Session.get("buttonSuccess") ? "btn btn-primary plus-sign" : "btn btn-danger trash-can";
	},
	"setAddDeleteButtonText": function() {
		return Session.get("buttonSuccess") ? "Add new" : "Delete";
	}

	
});


Template.TaskViewTable.rendered = function() {

};

Template.TaskViewTable.events({
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
		var oldSortBy = pageSession.get("TaskViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("TaskViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("TaskViewSortAscending") || false;
			pageSession.set("TaskViewSortAscending", !sortAscending);
		} else {
			pageSession.set("TaskViewSortAscending", true);
		}
	}
});

Template.TaskViewTable.helpers({
	"tableItems": function() {
		return TaskViewItems(this.task_list);
	}

});


Template.TaskViewTableItems.rendered = function() {

};

Template.TaskViewTableItems.events({
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
		Router.go("projects.documents.task.edit", {taskId: this._id});
		return false;
	}

});

Template.TaskViewTableItems.helpers({
	"checkComplete": function() {
		return Session.get("checkComplete");
	},

	"editButtonClass": function() {
		return Task.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Task.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.TaskViewTableFooter.rendered = function() {

};

Template.TaskViewTableFooter.events({

	"click #dataview-task-paginate-buttons": function(e) {
		var documentNumber = parseInt(e.target.textContent, 10);
		Session.set("limit", documentNumber);
	}

});

Template.TaskViewTableFooter.helpers({

});
