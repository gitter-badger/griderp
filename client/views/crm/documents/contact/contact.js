var pageSession = new ReactiveDict();
var recordSelect = new ReactiveArray();


Template.CrmDocumentsContact.rendered = function() {

};

Template.CrmDocumentsContact.events({
	
});

Template.CrmDocumentsContact.helpers({
	
});

var ContactViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("ContactViewSearchString");
	var sortBy = pageSession.get("ContactViewSortBy");
	var sortAscending = pageSession.get("ContactViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["name", "status"];
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

var ContactViewExport = function(cursor, fileType) {
	var data = ContactViewItems(cursor);
	var exportFields = ["name", "status"];

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


Template.ContactView.rendered = function() {
	pageSession.set("ContactViewStyle", "table");
	Session.set("buttonSuccess", true);
	
};

Template.ContactView.events({
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
				pageSession.set("ContactViewSearchString", searchString);
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
					pageSession.set("ContactViewSearchString", searchString);
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
					pageSession.set("ContactViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-contact-insert-delete-button": function(e, t) {
		e.preventDefault();
		if ($(e.target).hasClass("plus-sign")) {
			Router.go("crm.documents.contact.insert", {});
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
							Meteor.call("removeContact", docIds);
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
		ContactViewExport(this.contact_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		ContactViewExport(this.contact_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		ContactViewExport(this.contact_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		ContactViewExport(this.contact_list, "json");
	}

	
});

Template.ContactView.helpers({

	"insertButtonClass": function() {
		return Contact.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.contact_list || this.contact_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.contact_list && this.contact_list.count() > 0;
	},
	"isNotFound": function() {
		return this.contact_list && pageSession.get("ContactViewSearchString") && ContactViewItems(this.contact_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("ContactViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("ContactViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("ContactViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("ContactViewStyle") == "gallery";
	},
	"toggleAddDeleteButton": function() {
		return Session.get("buttonSuccess") ? "btn btn-primary plus-sign" : "btn btn-danger trash-can";
	},
	"setAddDeleteButtonText": function() {
		return Session.get("buttonSuccess") ? "Add new" : "Delete";
	}

	
});


Template.ContactViewTable.rendered = function() {

};

Template.ContactViewTable.events({
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
		var oldSortBy = pageSession.get("ContactViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("ContactViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("ContactViewSortAscending") || false;
			pageSession.set("ContactViewSortAscending", !sortAscending);
		} else {
			pageSession.set("ContactViewSortAscending", true);
		}
	}
});

Template.ContactViewTable.helpers({
	"tableItems": function() {
		return ContactViewItems(this.contact_list);
	}

});


Template.ContactViewTableItems.rendered = function() {

};

Template.ContactViewTableItems.events({
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
		Router.go("crm.documents.contact.edit", {contactId: this._id});
		return false;
	}

});

Template.ContactViewTableItems.helpers({
	"checkComplete": function() {
		return Session.get("checkComplete");
	},

	"editButtonClass": function() {
		return Contact.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Contact.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.ContactViewTableFooter.rendered = function() {

};

Template.ContactViewTableFooter.events({

	"click #dataview-contact-paginate-buttons": function(e) {
		var documentNumber = parseInt(e.target.textContent, 10);
		Session.set("limit", documentNumber);
	}

});

Template.ContactViewTableFooter.helpers({

});
