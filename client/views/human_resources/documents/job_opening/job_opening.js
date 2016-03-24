var pageSession = new ReactiveDict();
var recordSelect = new ReactiveArray();


Template.HumanResourcesDocumentsJobOpening.rendered = function() {

};

Template.HumanResourcesDocumentsJobOpening.events({
	
});

Template.HumanResourcesDocumentsJobOpening.helpers({
	
});

var JobOpeningViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("JobOpeningViewSearchString");
	var sortBy = pageSession.get("JobOpeningViewSortBy");
	var sortAscending = pageSession.get("JobOpeningViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["name", "job_title", "status"];
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

var JobOpeningViewExport = function(cursor, fileType) {
	var data = JobOpeningViewItems(cursor);
	var exportFields = ["name", "job_title", "status"];

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


Template.JobOpeningView.rendered = function() {
	pageSession.set("JobOpeningViewStyle", "table");
	Session.set("buttonSuccess", true);
	
};

Template.JobOpeningView.events({
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
				pageSession.set("JobOpeningViewSearchString", searchString);
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
					pageSession.set("JobOpeningViewSearchString", searchString);
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
					pageSession.set("JobOpeningViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-job-opening-insert-delete-button": function(e, t) {
		e.preventDefault();
		if ($(e.target).hasClass("plus-sign")) {
			Router.go("human_resources.documents.job_opening.insert", {});
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
							Meteor.call("removeJobOpening", docIds);
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
		JobOpeningViewExport(this.job_opening_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		JobOpeningViewExport(this.job_opening_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		JobOpeningViewExport(this.job_opening_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		JobOpeningViewExport(this.job_opening_list, "json");
	}

	
});

Template.JobOpeningView.helpers({

	"insertButtonClass": function() {
		return JobOpening.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.job_opening_list || this.job_opening_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.job_opening_list && this.job_opening_list.count() > 0;
	},
	"isNotFound": function() {
		return this.job_opening_list && pageSession.get("JobOpeningViewSearchString") && JobOpeningViewItems(this.job_opening_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("JobOpeningViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("JobOpeningViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("JobOpeningViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("JobOpeningViewStyle") == "gallery";
	},
	"toggleAddDeleteButton": function() {
		return Session.get("buttonSuccess") ? "btn btn-primary plus-sign" : "btn btn-danger trash-can";
	},
	"setAddDeleteButtonText": function() {
		return Session.get("buttonSuccess") ? "Add new" : "Delete";
	}

	
});


Template.JobOpeningViewTable.rendered = function() {

};

Template.JobOpeningViewTable.events({
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
		var oldSortBy = pageSession.get("JobOpeningViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("JobOpeningViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("JobOpeningViewSortAscending") || false;
			pageSession.set("JobOpeningViewSortAscending", !sortAscending);
		} else {
			pageSession.set("JobOpeningViewSortAscending", true);
		}
	}
});

Template.JobOpeningViewTable.helpers({
	"tableItems": function() {
		return JobOpeningViewItems(this.job_opening_list);
	}

});


Template.JobOpeningViewTableItems.rendered = function() {

};

Template.JobOpeningViewTableItems.events({
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
		Router.go("human_resources.documents.job_opening.edit", {jobOpeningId: this._id});
		return false;
	}

});

Template.JobOpeningViewTableItems.helpers({
	"checkComplete": function() {
		return Session.get("checkComplete");
	},

	"editButtonClass": function() {
		return JobOpening.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return JobOpening.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.JobOpeningViewTableFooter.rendered = function() {

};

Template.JobOpeningViewTableFooter.events({

	"click #dataview-job-opening-paginate-buttons": function(e) {
		var documentNumber = parseInt(e.target.textContent, 10);
		Session.set("limit", documentNumber);
	}

});

Template.JobOpeningViewTableFooter.helpers({

});
