var pageSession = new ReactiveDict();
var recordSelect = new ReactiveArray();


Template.SetupReportsReports.rendered = function() {

};

Template.SetupReportsReports.events({
	
});

Template.SetupReportsReports.helpers({
	
});

var ReportsReportsViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("ReportsReportsViewSearchString");
	var sortBy = pageSession.get("ReportsReportsViewSortBy");
	var sortAscending = pageSession.get("ReportsReportsViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["name", "ref_doctype", "is_standard"];
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

var ReportsReportsViewExport = function(cursor, fileType) {
	var data = ReportsReportsViewItems(cursor);
	var exportFields = ["name", "ref_doctype", "is_standard"];

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


Template.ReportsReportsView.rendered = function() {
	pageSession.set("ReportsReportsViewStyle", "table");
	Session.set("buttonSuccess", true);
	
};

Template.ReportsReportsView.events({
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
				pageSession.set("ReportsReportsViewSearchString", searchString);
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
					pageSession.set("ReportsReportsViewSearchString", searchString);
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
					pageSession.set("ReportsReportsViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-reports-insert-delete-button": function(e, t) {
		e.preventDefault();
		if ($(e.target).hasClass("plus-sign")) {
			Router.go("setup.reports.reports", {});
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
							Meteor.call("removeReport", docIds);
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
		ReportsReportsViewExport(this.report_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		ReportsReportsViewExport(this.report_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		ReportsReportsViewExport(this.report_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		ReportsReportsViewExport(this.report_list, "json");
	}

	
});

Template.ReportsReportsView.helpers({

	"insertButtonClass": function() {
		return Report.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.report_list || this.report_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.report_list && this.report_list.count() > 0;
	},
	"isNotFound": function() {
		return this.report_list && pageSession.get("ReportsReportsViewSearchString") && ReportsReportsViewItems(this.report_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("ReportsReportsViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("ReportsReportsViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("ReportsReportsViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("ReportsReportsViewStyle") == "gallery";
	},
	"toggleAddDeleteButton": function() {
		return Session.get("buttonSuccess") ? "btn btn-primary plus-sign" : "btn btn-danger trash-can";
	},
	"setAddDeleteButtonText": function() {
		return Session.get("buttonSuccess") ? "Add new" : "Delete";
	}

	
});


Template.ReportsReportsViewTable.rendered = function() {

};

Template.ReportsReportsViewTable.events({
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
		var oldSortBy = pageSession.get("ReportsReportsViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("ReportsReportsViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("ReportsReportsViewSortAscending") || false;
			pageSession.set("ReportsReportsViewSortAscending", !sortAscending);
		} else {
			pageSession.set("ReportsReportsViewSortAscending", true);
		}
	}
});

Template.ReportsReportsViewTable.helpers({
	"tableItems": function() {
		return ReportsReportsViewItems(this.report_list);
	}

});


Template.ReportsReportsViewTableItems.rendered = function() {

};

Template.ReportsReportsViewTableItems.events({
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
		Router.go("setup.reports.reports", {reportId: this._id});
		return false;
	}

});

Template.ReportsReportsViewTableItems.helpers({
	"checkComplete": function() {
		return Session.get("checkComplete");
	},

	"editButtonClass": function() {
		return Report.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Report.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	},

	"buildReportDirectoryName": function(reportName) {
		return s.underscored(reportName);
	}

});

Template.ReportsReportsViewTableFooter.rendered = function() {

};

Template.ReportsReportsViewTableFooter.events({

	"click #dataview-reports-reports-paginate-buttons": function(e) {
		var documentNumber = parseInt(e.target.textContent, 10);
		Session.set("limit", documentNumber);
	}

});

Template.ReportsReportsViewTableFooter.helpers({

});
