var pageSession = new ReactiveDict();
var recordSelect = new ReactiveArray();


Template.ProjectsDocumentsTimeLogBatch.rendered = function() {

};

Template.ProjectsDocumentsTimeLogBatch.events({
	
});

Template.ProjectsDocumentsTimeLogBatch.helpers({
	
});

var TimeLogBatchViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("TimeLogBatchViewSearchString");
	var sortBy = pageSession.get("TimeLogBatchViewSortBy");
	var sortAscending = pageSession.get("TimeLogBatchViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["name", "status", "total_hours"];
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

var TimeLogBatchViewExport = function(cursor, fileType) {
	var data = TimeLogBatchViewItems(cursor);
	var exportFields = ["name", "status", "total_hours"];

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


Template.TimeLogBatchView.rendered = function() {
	pageSession.set("TimeLogBatchViewStyle", "table");
	Session.set("buttonSuccess", true);
	
};

Template.TimeLogBatchView.events({
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
				pageSession.set("TimeLogBatchViewSearchString", searchString);
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
					pageSession.set("TimeLogBatchViewSearchString", searchString);
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
					pageSession.set("TimeLogBatchViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-time-log-batch-insert-delete-button": function(e, t) {
		e.preventDefault();
		if ($(e.target).hasClass("plus-sign")) {
			Router.go("projects.documents.time_log_batch.insert", {});
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
							Meteor.call("removeTimeLogBatch", docIds);
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
		TimeLogBatchViewExport(this.time_log_batch_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		TimeLogBatchViewExport(this.time_log_batch_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		TimeLogBatchViewExport(this.time_log_batch_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		TimeLogBatchViewExport(this.time_log_batch_list, "json");
	}

	
});

Template.TimeLogBatchView.helpers({

	"insertButtonClass": function() {
		return TimeLogBatch.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.time_log_batch_list || this.time_log_batch_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.time_log_batch_list && this.time_log_batch_list.count() > 0;
	},
	"isNotFound": function() {
		return this.time_log_batch_list && pageSession.get("TimeLogBatchViewSearchString") && TimeLogBatchViewItems(this.time_log_batch_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("TimeLogBatchViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("TimeLogBatchViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("TimeLogBatchViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("TimeLogBatchViewStyle") == "gallery";
	},
	"toggleAddDeleteButton": function() {
		return Session.get("buttonSuccess") ? "btn btn-primary plus-sign" : "btn btn-danger trash-can";
	},
	"setAddDeleteButtonText": function() {
		return Session.get("buttonSuccess") ? "Add new" : "Delete";
	}

	
});


Template.TimeLogBatchViewTable.rendered = function() {

};

Template.TimeLogBatchViewTable.events({
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
		var oldSortBy = pageSession.get("TimeLogBatchViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("TimeLogBatchViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("TimeLogBatchViewSortAscending") || false;
			pageSession.set("TimeLogBatchViewSortAscending", !sortAscending);
		} else {
			pageSession.set("TimeLogBatchViewSortAscending", true);
		}
	}
});

Template.TimeLogBatchViewTable.helpers({
	"tableItems": function() {
		return TimeLogBatchViewItems(this.time_log_batch_list);
	}

});


Template.TimeLogBatchViewTableItems.rendered = function() {

};

Template.TimeLogBatchViewTableItems.events({
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
		Router.go("projects.documents.time_log_batch.edit", {timeLogBatchId: this._id});
		return false;
	}

});

Template.TimeLogBatchViewTableItems.helpers({
	"checkComplete": function() {
		return Session.get("checkComplete");
	},

	"editButtonClass": function() {
		return TimeLogBatch.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return TimeLogBatch.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.TimeLogBatchViewTableFooter.rendered = function() {

};

Template.TimeLogBatchViewTableFooter.events({

	"click #dataview-time-log-batch-paginate-buttons": function(e) {
		var documentNumber = parseInt(e.target.textContent, 10);
		Session.set("limit", documentNumber);
	}

});

Template.TimeLogBatchViewTableFooter.helpers({

});
