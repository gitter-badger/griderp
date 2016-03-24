var pageSession = new ReactiveDict();
var recordSelect = new ReactiveArray();


Template.CoreSettingsDocumentsAsyncTask.rendered = function() {

};

Template.CoreSettingsDocumentsAsyncTask.events({
	
});

Template.CoreSettingsDocumentsAsyncTask.helpers({
	
});

var AsyncTaskViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("AsyncTaskViewSearchString");
	var sortBy = pageSession.get("AsyncTaskViewSortBy");
	var sortAscending = pageSession.get("AsyncTaskViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["task_name", "status", "runtime", "name"];
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

var AsyncTaskViewExport = function(cursor, fileType) {
	var data = AsyncTaskViewItems(cursor);
	var exportFields = ["task_name", "status", "runtime", "name"];

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


Template.AsyncTaskView.rendered = function() {
	pageSession.set("AsyncTaskViewStyle", "table");
	Session.set("buttonSuccess", true);
	
};

Template.AsyncTaskView.events({
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
				pageSession.set("AsyncTaskViewSearchString", searchString);
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
					pageSession.set("AsyncTaskViewSearchString", searchString);
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
					pageSession.set("AsyncTaskViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-async-task-insert-delete-button": function(e, t) {
		e.preventDefault();
		if ($(e.target).hasClass("plus-sign")) {
			Router.go("core_settings.documents.async_task.insert", {});
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
							Meteor.call("removeAsyncTask", docIds);
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
		AsyncTaskViewExport(this.async_task_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		AsyncTaskViewExport(this.async_task_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		AsyncTaskViewExport(this.async_task_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		AsyncTaskViewExport(this.async_task_list, "json");
	}

	
});

Template.AsyncTaskView.helpers({

	"insertButtonClass": function() {
		return AsyncTask.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.async_task_list || this.async_task_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.async_task_list && this.async_task_list.count() > 0;
	},
	"isNotFound": function() {
		return this.async_task_list && pageSession.get("AsyncTaskViewSearchString") && AsyncTaskViewItems(this.async_task_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("AsyncTaskViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("AsyncTaskViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("AsyncTaskViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("AsyncTaskViewStyle") == "gallery";
	},
	"toggleAddDeleteButton": function() {
		return Session.get("buttonSuccess") ? "btn btn-primary plus-sign" : "btn btn-danger trash-can";
	},
	"setAddDeleteButtonText": function() {
		return Session.get("buttonSuccess") ? "Add new" : "Delete";
	}

	
});


Template.AsyncTaskViewTable.rendered = function() {

};

Template.AsyncTaskViewTable.events({
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
		var oldSortBy = pageSession.get("AsyncTaskViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("AsyncTaskViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("AsyncTaskViewSortAscending") || false;
			pageSession.set("AsyncTaskViewSortAscending", !sortAscending);
		} else {
			pageSession.set("AsyncTaskViewSortAscending", true);
		}
	}
});

Template.AsyncTaskViewTable.helpers({
	"tableItems": function() {
		return AsyncTaskViewItems(this.async_task_list);
	}

});


Template.AsyncTaskViewTableItems.rendered = function() {

};

Template.AsyncTaskViewTableItems.events({
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
		Router.go("core_settings.documents.async_task.edit", {asyncTaskId: this._id});
		return false;
	}

});

Template.AsyncTaskViewTableItems.helpers({
	"checkComplete": function() {
		return Session.get("checkComplete");
	},

	"editButtonClass": function() {
		return AsyncTask.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return AsyncTask.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.AsyncTaskViewTableFooter.rendered = function() {

};

Template.AsyncTaskViewTableFooter.events({

	"click #dataview-async-task-paginate-buttons": function(e) {
		var documentNumber = parseInt(e.target.textContent, 10);
		Session.set("limit", documentNumber);
	}

});

Template.AsyncTaskViewTableFooter.helpers({

});
