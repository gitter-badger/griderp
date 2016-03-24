var pageSession = new ReactiveDict();
var recordSelect = new ReactiveArray();


Template.HumanResourcesDocumentsJobApplicant.rendered = function() {

};

Template.HumanResourcesDocumentsJobApplicant.events({
	
});

Template.HumanResourcesDocumentsJobApplicant.helpers({
	
});

var JobApplicantViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("JobApplicantViewSearchString");
	var sortBy = pageSession.get("JobApplicantViewSortBy");
	var sortAscending = pageSession.get("JobApplicantViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["applicant_name", "status", "job_opening", "name"];
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

var JobApplicantViewExport = function(cursor, fileType) {
	var data = JobApplicantViewItems(cursor);
	var exportFields = ["applicant_name", "status", "job_opening", "name"];

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


Template.JobApplicantView.rendered = function() {
	pageSession.set("JobApplicantViewStyle", "table");
	Session.set("buttonSuccess", true);
	
};

Template.JobApplicantView.events({
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
				pageSession.set("JobApplicantViewSearchString", searchString);
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
					pageSession.set("JobApplicantViewSearchString", searchString);
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
					pageSession.set("JobApplicantViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-job-applicant-insert-delete-button": function(e, t) {
		e.preventDefault();
		if ($(e.target).hasClass("plus-sign")) {
			Router.go("human_resources.documents.job_applicant.insert", {});
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
							Meteor.call("removeJobApplicant", docIds);
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
		JobApplicantViewExport(this.job_applicant_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		JobApplicantViewExport(this.job_applicant_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		JobApplicantViewExport(this.job_applicant_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		JobApplicantViewExport(this.job_applicant_list, "json");
	}

	
});

Template.JobApplicantView.helpers({

	"insertButtonClass": function() {
		return JobApplicant.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.job_applicant_list || this.job_applicant_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.job_applicant_list && this.job_applicant_list.count() > 0;
	},
	"isNotFound": function() {
		return this.job_applicant_list && pageSession.get("JobApplicantViewSearchString") && JobApplicantViewItems(this.job_applicant_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("JobApplicantViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("JobApplicantViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("JobApplicantViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("JobApplicantViewStyle") == "gallery";
	},
	"toggleAddDeleteButton": function() {
		return Session.get("buttonSuccess") ? "btn btn-primary plus-sign" : "btn btn-danger trash-can";
	},
	"setAddDeleteButtonText": function() {
		return Session.get("buttonSuccess") ? "Add new" : "Delete";
	}

	
});


Template.JobApplicantViewTable.rendered = function() {

};

Template.JobApplicantViewTable.events({
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
		var oldSortBy = pageSession.get("JobApplicantViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("JobApplicantViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("JobApplicantViewSortAscending") || false;
			pageSession.set("JobApplicantViewSortAscending", !sortAscending);
		} else {
			pageSession.set("JobApplicantViewSortAscending", true);
		}
	}
});

Template.JobApplicantViewTable.helpers({
	"tableItems": function() {
		return JobApplicantViewItems(this.job_applicant_list);
	}

});


Template.JobApplicantViewTableItems.rendered = function() {

};

Template.JobApplicantViewTableItems.events({
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
		Router.go("human_resources.documents.job_applicant.edit", {jobApplicantId: this._id});
		return false;
	}

});

Template.JobApplicantViewTableItems.helpers({
	"checkComplete": function() {
		return Session.get("checkComplete");
	},

	"editButtonClass": function() {
		return JobApplicant.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return JobApplicant.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.JobApplicantViewTableFooter.rendered = function() {

};

Template.JobApplicantViewTableFooter.events({

	"click #dataview-job-applicant-paginate-buttons": function(e) {
		var documentNumber = parseInt(e.target.textContent, 10);
		Session.set("limit", documentNumber);
	}

});

Template.JobApplicantViewTableFooter.helpers({

});
