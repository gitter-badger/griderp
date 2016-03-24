var pageSession = new ReactiveDict();
var recordSelect = new ReactiveArray();


Template.SupportDocumentsIssue.rendered = function() {

};

Template.SupportDocumentsIssue.events({
	
});

Template.SupportDocumentsIssue.helpers({
	
});

var IssueViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("IssueViewSearchString");
	var sortBy = pageSession.get("IssueViewSortBy");
	var sortAscending = pageSession.get("IssueViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["subject", "status", "raised_by", "name"];
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

var IssueViewExport = function(cursor, fileType) {
	var data = IssueViewItems(cursor);
	var exportFields = ["subject", "status", "raised_by", "name"];

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


Template.IssueView.rendered = function() {
	pageSession.set("IssueViewStyle", "table");
	Session.set("buttonSuccess", true);
	
};

Template.IssueView.events({
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
				pageSession.set("IssueViewSearchString", searchString);
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
					pageSession.set("IssueViewSearchString", searchString);
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
					pageSession.set("IssueViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-issue-insert-delete-button": function(e, t) {
		e.preventDefault();
		if ($(e.target).hasClass("plus-sign")) {
			Router.go("support.documents.issue.insert", {});
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
							Meteor.call("removeIssue", docIds);
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
		IssueViewExport(this.issue_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		IssueViewExport(this.issue_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		IssueViewExport(this.issue_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		IssueViewExport(this.issue_list, "json");
	}

	
});

Template.IssueView.helpers({

	"insertButtonClass": function() {
		return Issue.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.issue_list || this.issue_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.issue_list && this.issue_list.count() > 0;
	},
	"isNotFound": function() {
		return this.issue_list && pageSession.get("IssueViewSearchString") && IssueViewItems(this.issue_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("IssueViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("IssueViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("IssueViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("IssueViewStyle") == "gallery";
	},
	"toggleAddDeleteButton": function() {
		return Session.get("buttonSuccess") ? "btn btn-primary plus-sign" : "btn btn-danger trash-can";
	},
	"setAddDeleteButtonText": function() {
		return Session.get("buttonSuccess") ? "Add new" : "Delete";
	}

	
});


Template.IssueViewTable.rendered = function() {

};

Template.IssueViewTable.events({
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
		var oldSortBy = pageSession.get("IssueViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("IssueViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("IssueViewSortAscending") || false;
			pageSession.set("IssueViewSortAscending", !sortAscending);
		} else {
			pageSession.set("IssueViewSortAscending", true);
		}
	}
});

Template.IssueViewTable.helpers({
	"tableItems": function() {
		return IssueViewItems(this.issue_list);
	}

});


Template.IssueViewTableItems.rendered = function() {

};

Template.IssueViewTableItems.events({
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
		Router.go("support.documents.issue.edit", {issueId: this._id});
		return false;
	}

});

Template.IssueViewTableItems.helpers({
	"checkComplete": function() {
		return Session.get("checkComplete");
	},

	"editButtonClass": function() {
		return Issue.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Issue.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.IssueViewTableFooter.rendered = function() {

};

Template.IssueViewTableFooter.events({

	"click #dataview-issue-paginate-buttons": function(e) {
		var documentNumber = parseInt(e.target.textContent, 10);
		Session.set("limit", documentNumber);
	}

});

Template.IssueViewTableFooter.helpers({

});
