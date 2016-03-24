var pageSession = new ReactiveDict();
var recordSelect = new ReactiveArray();


Template.CrmToolsSmsLog.rendered = function() {

};

Template.CrmToolsSmsLog.events({
	
});

Template.CrmToolsSmsLog.helpers({
	
});

var SmsLogViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("SmsLogViewSearchString");
	var sortBy = pageSession.get("SmsLogViewSortBy");
	var sortAscending = pageSession.get("SmsLogViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["name", "sender_name", "sent_on"];
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

var SmsLogViewExport = function(cursor, fileType) {
	var data = SmsLogViewItems(cursor);
	var exportFields = ["name", "sender_name", "sent_on"];

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


Template.SmsLogView.rendered = function() {
	pageSession.set("SmsLogViewStyle", "table");
	Session.set("buttonSuccess", true);
	
};

Template.SmsLogView.events({
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
				pageSession.set("SmsLogViewSearchString", searchString);
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
					pageSession.set("SmsLogViewSearchString", searchString);
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
					pageSession.set("SmsLogViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-sms-log-insert-delete-button": function(e, t) {
		e.preventDefault();
		if ($(e.target).hasClass("plus-sign")) {
			Router.go("crm.tools.sms_log.insert", {});
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
							Meteor.call("removeSmsLog", docIds);
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
		SmsLogViewExport(this.sms_log_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		SmsLogViewExport(this.sms_log_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		SmsLogViewExport(this.sms_log_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		SmsLogViewExport(this.sms_log_list, "json");
	}

	
});

Template.SmsLogView.helpers({

	"insertButtonClass": function() {
		return SmsLog.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.sms_log_list || this.sms_log_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.sms_log_list && this.sms_log_list.count() > 0;
	},
	"isNotFound": function() {
		return this.sms_log_list && pageSession.get("SmsLogViewSearchString") && SmsLogViewItems(this.sms_log_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("SmsLogViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("SmsLogViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("SmsLogViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("SmsLogViewStyle") == "gallery";
	},
	"toggleAddDeleteButton": function() {
		return Session.get("buttonSuccess") ? "btn btn-primary plus-sign" : "btn btn-danger trash-can";
	},
	"setAddDeleteButtonText": function() {
		return Session.get("buttonSuccess") ? "Add new" : "Delete";
	}

	
});


Template.SmsLogViewTable.rendered = function() {

};

Template.SmsLogViewTable.events({
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
		var oldSortBy = pageSession.get("SmsLogViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("SmsLogViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("SmsLogViewSortAscending") || false;
			pageSession.set("SmsLogViewSortAscending", !sortAscending);
		} else {
			pageSession.set("SmsLogViewSortAscending", true);
		}
	}
});

Template.SmsLogViewTable.helpers({
	"tableItems": function() {
		return SmsLogViewItems(this.sms_log_list);
	}

});


Template.SmsLogViewTableItems.rendered = function() {

};

Template.SmsLogViewTableItems.events({
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
		Router.go("crm.tools.sms_log.edit", {smsLogId: this._id});
		return false;
	}

});

Template.SmsLogViewTableItems.helpers({
	"checkComplete": function() {
		return Session.get("checkComplete");
	},

	"editButtonClass": function() {
		return SmsLog.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return SmsLog.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.SmsLogViewTableFooter.rendered = function() {

};

Template.SmsLogViewTableFooter.events({

	"click #dataview-sms-log-paginate-buttons": function(e) {
		var documentNumber = parseInt(e.target.textContent, 10);
		Session.set("limit", documentNumber);
	}

});

Template.SmsLogViewTableFooter.helpers({

});
