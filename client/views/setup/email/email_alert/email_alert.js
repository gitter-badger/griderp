var pageSession = new ReactiveDict();
var recordSelect = new ReactiveArray();


Template.SetupEmailEmailAlert.rendered = function() {

};

Template.SetupEmailEmailAlert.events({
	
});

Template.SetupEmailEmailAlert.helpers({
	
});

var EmailAlertViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("EmailAlertViewSearchString");
	var sortBy = pageSession.get("EmailAlertViewSortBy");
	var sortAscending = pageSession.get("EmailAlertViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["subject", "document_type", "event", "name"];
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

var EmailAlertViewExport = function(cursor, fileType) {
	var data = EmailAlertViewItems(cursor);
	var exportFields = ["subject", "document_type", "event", "name"];

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


Template.EmailAlertView.rendered = function() {
	pageSession.set("EmailAlertViewStyle", "table");
	Session.set("buttonSuccess", true);
	
};

Template.EmailAlertView.events({
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
				pageSession.set("EmailAlertViewSearchString", searchString);
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
					pageSession.set("EmailAlertViewSearchString", searchString);
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
					pageSession.set("EmailAlertViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-email-alert-insert-delete-button": function(e, t) {
		e.preventDefault();
		if ($(e.target).hasClass("plus-sign")) {
			Router.go("setup.email.email_alert.insert", {});
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
							Meteor.call("removeEmailAlert", docIds);
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
		EmailAlertViewExport(this.email_alert_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		EmailAlertViewExport(this.email_alert_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		EmailAlertViewExport(this.email_alert_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		EmailAlertViewExport(this.email_alert_list, "json");
	}

	
});

Template.EmailAlertView.helpers({

	"insertButtonClass": function() {
		return EmailAlert.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.email_alert_list || this.email_alert_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.email_alert_list && this.email_alert_list.count() > 0;
	},
	"isNotFound": function() {
		return this.email_alert_list && pageSession.get("EmailAlertViewSearchString") && EmailAlertViewItems(this.email_alert_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("EmailAlertViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("EmailAlertViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("EmailAlertViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("EmailAlertViewStyle") == "gallery";
	},
	"toggleAddDeleteButton": function() {
		return Session.get("buttonSuccess") ? "btn btn-primary plus-sign" : "btn btn-danger trash-can";
	},
	"setAddDeleteButtonText": function() {
		return Session.get("buttonSuccess") ? "Add new" : "Delete";
	}

	
});


Template.EmailAlertViewTable.rendered = function() {

};

Template.EmailAlertViewTable.events({
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
		var oldSortBy = pageSession.get("EmailAlertViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("EmailAlertViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("EmailAlertViewSortAscending") || false;
			pageSession.set("EmailAlertViewSortAscending", !sortAscending);
		} else {
			pageSession.set("EmailAlertViewSortAscending", true);
		}
	}
});

Template.EmailAlertViewTable.helpers({
	"tableItems": function() {
		return EmailAlertViewItems(this.email_alert_list);
	}

});


Template.EmailAlertViewTableItems.rendered = function() {

};

Template.EmailAlertViewTableItems.events({
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
		Router.go("setup.email.email_alert.edit", {emailAlertId: this._id});
		return false;
	}

});

Template.EmailAlertViewTableItems.helpers({
	"checkComplete": function() {
		return Session.get("checkComplete");
	},

	"editButtonClass": function() {
		return EmailAlert.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return EmailAlert.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.EmailAlertViewTableFooter.rendered = function() {

};

Template.EmailAlertViewTableFooter.events({

	"click #dataview-email-alert-paginate-buttons": function(e) {
		var documentNumber = parseInt(e.target.textContent, 10);
		Session.set("limit", documentNumber);
	}

});

Template.EmailAlertViewTableFooter.helpers({

});
