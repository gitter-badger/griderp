var pageSession = new ReactiveDict();
var recordSelect = new ReactiveArray();


Template.ProjectsDocumentsTimeLog.rendered = function() {

};

Template.ProjectsDocumentsTimeLog.events({
	
});

Template.ProjectsDocumentsTimeLog.helpers({
	
});

var TimeLogViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("TimeLogViewSearchString");
	var sortBy = pageSession.get("TimeLogViewSortBy");
	var sortAscending = pageSession.get("TimeLogViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["title", "status", "hours", "name"];
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

var TimeLogViewExport = function(cursor, fileType) {
	var data = TimeLogViewItems(cursor);
	var exportFields = ["title", "status", "hours", "name"];

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


Template.TimeLogView.rendered = function() {
	pageSession.set("TimeLogViewStyle", "table");
	Session.set("buttonSuccess", true);
	
};

Template.TimeLogView.events({
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
				pageSession.set("TimeLogViewSearchString", searchString);
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
					pageSession.set("TimeLogViewSearchString", searchString);
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
					pageSession.set("TimeLogViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-time-log-insert-delete-button": function(e, t) {
		e.preventDefault();
		if ($(e.target).hasClass("plus-sign")) {
			Router.go("projects.documents.time_log.insert", {});
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
							Meteor.call("removeTimeLog", docIds);
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
		TimeLogViewExport(this.time_log_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		TimeLogViewExport(this.time_log_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		TimeLogViewExport(this.time_log_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		TimeLogViewExport(this.time_log_list, "json");
	}

	
});

Template.TimeLogView.helpers({

	"insertButtonClass": function() {
		return TimeLog.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.time_log_list || this.time_log_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.time_log_list && this.time_log_list.count() > 0;
	},
	"isNotFound": function() {
		return this.time_log_list && pageSession.get("TimeLogViewSearchString") && TimeLogViewItems(this.time_log_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("TimeLogViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("TimeLogViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("TimeLogViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("TimeLogViewStyle") == "gallery";
	},
	"toggleAddDeleteButton": function() {
		return Session.get("buttonSuccess") ? "btn btn-primary plus-sign" : "btn btn-danger trash-can";
	},
	"setAddDeleteButtonText": function() {
		return Session.get("buttonSuccess") ? "Add new" : "Delete";
	}

	
});


Template.TimeLogViewTable.rendered = function() {

};

Template.TimeLogViewTable.events({
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
		var oldSortBy = pageSession.get("TimeLogViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("TimeLogViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("TimeLogViewSortAscending") || false;
			pageSession.set("TimeLogViewSortAscending", !sortAscending);
		} else {
			pageSession.set("TimeLogViewSortAscending", true);
		}
	}
});

Template.TimeLogViewTable.helpers({
	"tableItems": function() {
		return TimeLogViewItems(this.time_log_list);
	}

});


Template.TimeLogViewTableItems.rendered = function() {

};

Template.TimeLogViewTableItems.events({
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
		Router.go("projects.documents.time_log.edit", {timeLogId: this._id});
		return false;
	}

});

Template.TimeLogViewTableItems.helpers({
	"checkComplete": function() {
		return Session.get("checkComplete");
	},

	"editButtonClass": function() {
		return TimeLog.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return TimeLog.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.TimeLogViewTableFooter.rendered = function() {

};

Template.TimeLogViewTableFooter.events({

	"click #dataview-time-log-paginate-buttons": function(e) {
		var documentNumber = parseInt(e.target.textContent, 10);
		Session.set("limit", documentNumber);
	}

});

Template.TimeLogViewTableFooter.helpers({

});
