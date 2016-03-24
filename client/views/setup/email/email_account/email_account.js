var pageSession = new ReactiveDict();
var recordSelect = new ReactiveArray();


Template.SetupEmailEmailAccount.rendered = function() {

};

Template.SetupEmailEmailAccount.events({
	
});

Template.SetupEmailEmailAccount.helpers({
	
});

var EmailAccountViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("EmailAccountViewSearchString");
	var sortBy = pageSession.get("EmailAccountViewSortBy");
	var sortAscending = pageSession.get("EmailAccountViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["name", "docstatus", "append_to"];
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

var EmailAccountViewExport = function(cursor, fileType) {
	var data = EmailAccountViewItems(cursor);
	var exportFields = ["name", "docstatus", "append_to"];

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


Template.EmailAccountView.rendered = function() {
	pageSession.set("EmailAccountViewStyle", "table");
	Session.set("buttonSuccess", true);
	
};

Template.EmailAccountView.events({
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
				pageSession.set("EmailAccountViewSearchString", searchString);
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
					pageSession.set("EmailAccountViewSearchString", searchString);
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
					pageSession.set("EmailAccountViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-email-account-insert-delete-button": function(e, t) {
		e.preventDefault();
		if ($(e.target).hasClass("plus-sign")) {
			Router.go("setup.email.email_account.insert", {});
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
							Meteor.call("removeEmailAccount", docIds);
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
		EmailAccountViewExport(this.email_account_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		EmailAccountViewExport(this.email_account_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		EmailAccountViewExport(this.email_account_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		EmailAccountViewExport(this.email_account_list, "json");
	}

	
});

Template.EmailAccountView.helpers({

	"insertButtonClass": function() {
		return EmailAccount.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.email_account_list || this.email_account_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.email_account_list && this.email_account_list.count() > 0;
	},
	"isNotFound": function() {
		return this.email_account_list && pageSession.get("EmailAccountViewSearchString") && EmailAccountViewItems(this.email_account_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("EmailAccountViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("EmailAccountViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("EmailAccountViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("EmailAccountViewStyle") == "gallery";
	},
	"toggleAddDeleteButton": function() {
		return Session.get("buttonSuccess") ? "btn btn-primary plus-sign" : "btn btn-danger trash-can";
	},
	"setAddDeleteButtonText": function() {
		return Session.get("buttonSuccess") ? "Add new" : "Delete";
	}

	
});


Template.EmailAccountViewTable.rendered = function() {

};

Template.EmailAccountViewTable.events({
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
		var oldSortBy = pageSession.get("EmailAccountViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("EmailAccountViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("EmailAccountViewSortAscending") || false;
			pageSession.set("EmailAccountViewSortAscending", !sortAscending);
		} else {
			pageSession.set("EmailAccountViewSortAscending", true);
		}
	}
});

Template.EmailAccountViewTable.helpers({
	"tableItems": function() {
		return EmailAccountViewItems(this.email_account_list);
	}

});


Template.EmailAccountViewTableItems.rendered = function() {

};

Template.EmailAccountViewTableItems.events({
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
		Router.go("setup.email.email_account.edit", {emailAccountId: this._id});
		return false;
	}

});

Template.EmailAccountViewTableItems.helpers({
	"checkComplete": function() {
		return Session.get("checkComplete");
	},

	"editButtonClass": function() {
		return EmailAccount.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return EmailAccount.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.EmailAccountViewTableFooter.rendered = function() {

};

Template.EmailAccountViewTableFooter.events({

	"click #dataview-email-account-paginate-buttons": function(e) {
		var documentNumber = parseInt(e.target.textContent, 10);
		Session.set("limit", documentNumber);
	}

});

Template.EmailAccountViewTableFooter.helpers({

});
