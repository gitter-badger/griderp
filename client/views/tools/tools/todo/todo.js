var pageSession = new ReactiveDict();
var recordSelect = new ReactiveArray();


Template.ToolsToolsToDo.rendered = function() {

};

Template.ToolsToolsToDo.events({
	
});

Template.ToolsToolsToDo.helpers({
	
});

var TodoViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("TodoViewSearchString");
	var sortBy = pageSession.get("TodoViewSortBy");
	var sortAscending = pageSession.get("TodoViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["description", "status", "name"];
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

var TodoViewExport = function(cursor, fileType) {
	var data = TodoViewItems(cursor);
	var exportFields = ["description", "status", "name"];

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


Template.TodoView.rendered = function() {
	pageSession.set("TodoViewStyle", "table");
	Session.set("buttonSuccess", true);
	
};

Template.TodoView.events({
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
				pageSession.set("TodoViewSearchString", searchString);
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
					pageSession.set("TodoViewSearchString", searchString);
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
					pageSession.set("TodoViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-todo-insert-delete-button": function(e, t) {
		e.preventDefault();
		if ($(e.target).hasClass("plus-sign")) {
			Router.go("tools.tools.todo.insert", {});
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
							Meteor.call("removeTodo", docIds);
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
		TodoViewExport(this.todo_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		TodoViewExport(this.todo_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		TodoViewExport(this.todo_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		TodoViewExport(this.todo_list, "json");
	}

	
});

Template.TodoView.helpers({

	"insertButtonClass": function() {
		return Todo.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.todo_list || this.todo_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.todo_list && this.todo_list.count() > 0;
	},
	"isNotFound": function() {
		return this.todo_list && pageSession.get("TodoViewSearchString") && TodoViewItems(this.todo_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("TodoViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("TodoViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("TodoViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("TodoViewStyle") == "gallery";
	},
	"toggleAddDeleteButton": function() {
		return Session.get("buttonSuccess") ? "btn btn-primary plus-sign" : "btn btn-danger trash-can";
	},
	"setAddDeleteButtonText": function() {
		return Session.get("buttonSuccess") ? "Add new" : "Delete";
	}

	
});


Template.TodoViewTable.rendered = function() {

};

Template.TodoViewTable.events({
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
		var oldSortBy = pageSession.get("TodoViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("TodoViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("TodoViewSortAscending") || false;
			pageSession.set("TodoViewSortAscending", !sortAscending);
		} else {
			pageSession.set("TodoViewSortAscending", true);
		}
	}
});

Template.TodoViewTable.helpers({
	"tableItems": function() {
		return TodoViewItems(this.todo_list);
	}

});


Template.TodoViewTableItems.rendered = function() {

};

Template.TodoViewTableItems.events({
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
		Router.go("tools.tools.todo.edit", {todoId: this._id});
		return false;
	}

});

Template.TodoViewTableItems.helpers({
	"checkComplete": function() {
		return Session.get("checkComplete");
	},

	"editButtonClass": function() {
		return Todo.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Todo.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.TodoViewTableFooter.rendered = function() {

};

Template.TodoViewTableFooter.events({

	"click #dataview-todo-paginate-buttons": function(e) {
		var documentNumber = parseInt(e.target.textContent, 10);
		Session.set("limit", documentNumber);
	}

});

Template.TodoViewTableFooter.helpers({

});
