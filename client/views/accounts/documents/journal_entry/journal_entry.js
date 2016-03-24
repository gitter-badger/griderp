var pageSession = new ReactiveDict();
var recordSelect = new ReactiveArray();


Template.AccountsDocumentsJournalEntry.rendered = function() {

};

Template.AccountsDocumentsJournalEntry.events({
	
});

Template.AccountsDocumentsJournalEntry.helpers({
	
});

var JournalEntryViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("JournalEntryViewSearchString");
	var sortBy = pageSession.get("JournalEntryViewSortBy");
	var sortAscending = pageSession.get("JournalEntryViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["title", "voucher_type", "cheque_no", "name"];
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

var JournalEntryViewExport = function(cursor, fileType) {
	var data = JournalEntryViewItems(cursor);
	var exportFields = ["title", "voucher_type", "cheque_no", "name"];

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

Template.JournalEntryView.rendered = function() {
	pageSession.set("JournalEntryViewStyle", "table");
	Session.set("buttonSuccess", true);
	
};

Template.JournalEntryView.events({
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
				pageSession.set("JournalEntryViewSearchString", searchString);
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
					pageSession.set("JournalEntryViewSearchString", searchString);
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
					pageSession.set("JournalEntryViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-journal-entry-insert-delete-button": function(e, t) {
		e.preventDefault();
		if ($(e.target).hasClass("plus-sign")) {
			Router.go("accounts.documents.journal_entry.insert", {});
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
							Meteor.call("removeJournalEntry", docIds);
							Session.set("buttonSuccess", true);
						}
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
		JournalEntryViewExport(this.journal_entry_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		JournalEntryViewExport(this.journal_entry_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		JournalEntryViewExport(this.journal_entry_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		JournalEntryViewExport(this.journal_entry_list, "json");
	}

	
});

Template.JournalEntryView.helpers({

	"insertButtonClass": function() {
		return JournalEntry.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.journal_entry_list || this.journal_entry_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.journal_entry_list && this.journal_entry_list.count() > 0;
	},
	"isNotFound": function() {
		return this.journal_entry_list && pageSession.get("JournalEntryViewSearchString") && JournalEntryViewItems(this.journal_entry_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("JournalEntryViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("JournalEntryViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("JournalEntryViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("JournalEntryViewStyle") == "gallery";
	},
	"toggleAddDeleteButton": function() {
		return Session.get("buttonSuccess") ? "btn btn-primary plus-sign" : "btn btn-danger trash-can";
	},
	"setAddDeleteButtonText": function() {
		return Session.get("buttonSuccess") ? "Add new" : "Delete";
	}

	
});


Template.JournalEntryViewTable.rendered = function() {

};

Template.JournalEntryViewTable.events({
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
		var oldSortBy = pageSession.get("JournalEntryViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("JournalEntryViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("JournalEntryViewSortAscending") || false;
			pageSession.set("JournalEntryViewSortAscending", !sortAscending);
		} else {
			pageSession.set("JournalEntryViewSortAscending", true);
		}
	}
});

Template.JournalEntryViewTable.helpers({
	"tableItems": function() {
		return JournalEntryViewItems(this.journal_entry_list);
	}

});


Template.JournalEntryViewTableItems.rendered = function() {

};

Template.JournalEntryViewTableItems.events({
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
		Router.go("accounts.documents.journal_entry.edit", {journalEntryId: this._id});
		return false;
	}

});

Template.JournalEntryViewTableItems.helpers({
	"checkComplete": function() {
		return Session.get("checkComplete");
	},

	"editButtonClass": function() {
		return JournalEntry.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return JournalEntry.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.JournalEntryViewTableFooter.rendered = function() {

};

Template.JournalEntryViewTableFooter.events({

	"click #dataview-journal-entry-paginate-buttons": function(e) {
		var documentNumber = parseInt(e.target.textContent, 10);
		Session.set("limit", documentNumber);
	}

});

Template.JournalEntryViewTableFooter.helpers({

});
