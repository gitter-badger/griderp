var pageSession = new ReactiveDict();
var recordSelect = new ReactiveArray();


Template.StockDocumentsInstallationNote.rendered = function() {

};

Template.StockDocumentsInstallationNote.events({
	
});

Template.StockDocumentsInstallationNote.helpers({
	
});

var InstallationNoteViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("InstallationNoteViewSearchString");
	var sortBy = pageSession.get("InstallationNoteViewSortBy");
	var sortAscending = pageSession.get("InstallationNoteViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["customer", "status", "remarks", "name"];
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

var InstallationNoteViewExport = function(cursor, fileType) {
	var data = InstallationNoteViewItems(cursor);
	var exportFields = ["customer", "status", "remarks", "name"];

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


Template.InstallationNoteView.rendered = function() {
	pageSession.set("InstallationNoteViewStyle", "table");
	Session.set("buttonSuccess", true);
	
};

Template.InstallationNoteView.events({
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
				pageSession.set("InstallationNoteViewSearchString", searchString);
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
					pageSession.set("InstallationNoteViewSearchString", searchString);
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
					pageSession.set("InstallationNoteViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-doctype-insert-delete-button": function(e, t) {
		e.preventDefault();
		if ($(e.target).hasClass("plus-sign")) {
			Router.go("stock.documents.installation_note.insert", {});
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
							Meteor.call("removeInstallationNote", docIds);
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
		InstallationNoteViewExport(this.installation_note_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		InstallationNoteViewExport(this.installation_note_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		InstallationNoteViewExport(this.installation_note_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		InstallationNoteViewExport(this.installation_note_list, "json");
	}

	
});

Template.InstallationNoteView.helpers({

	"insertButtonClass": function() {
		return InstallationNote.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.installation_note_list || this.installation_note_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.installation_note_list && this.installation_note_list.count() > 0;
	},
	"isNotFound": function() {
		return this.installation_note_list && pageSession.get("InstallationNoteViewSearchString") && InstallationNoteViewItems(this.installation_note_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("InstallationNoteViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("InstallationNoteViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("InstallationNoteViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("InstallationNoteViewStyle") == "gallery";
	},
	"toggleAddDeleteButton": function() {
		return Session.get("buttonSuccess") ? "btn btn-primary plus-sign" : "btn btn-danger trash-can";
	},
	"setAddDeleteButtonText": function() {
		return Session.get("buttonSuccess") ? "Add new" : "Delete";
	}

	
});


Template.InstallationNoteViewTable.rendered = function() {

};

Template.InstallationNoteViewTable.events({
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
		var oldSortBy = pageSession.get("InstallationNoteViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("InstallationNoteViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("InstallationNoteViewSortAscending") || false;
			pageSession.set("InstallationNoteViewSortAscending", !sortAscending);
		} else {
			pageSession.set("InstallationNoteViewSortAscending", true);
		}
	}
});

Template.InstallationNoteViewTable.helpers({
	"tableItems": function() {
		return InstallationNoteViewItems(this.installation_note_list);
	}

});


Template.InstallationNoteViewTableItems.rendered = function() {

};

Template.InstallationNoteViewTableItems.events({
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
		Router.go("stock.documents.installation_note.edit", {installationNoteId: this._id});
		return false;
	}

});

Template.InstallationNoteViewTableItems.helpers({
	"checkComplete": function() {
		return Session.get("checkComplete");
	},

	"editButtonClass": function() {
		return InstallationNote.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return InstallationNote.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.InstallationNoteViewTableFooter.rendered = function() {

};

Template.InstallationNoteViewTableFooter.events({

	"click #dataview-doctype-paginate-buttons": function(e) {
		var documentNumber = parseInt(e.target.textContent, 10);
		Session.set("limit", documentNumber);
	}

});

Template.InstallationNoteViewTableFooter.helpers({

});
