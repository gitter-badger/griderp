var pageSession = new ReactiveDict();
var recordSelect = new ReactiveArray();


Template.CoreSettingsSetupCommunication.rendered = function() {

};

Template.CoreSettingsSetupCommunication.events({
	
});

Template.CoreSettingsSetupCommunication.helpers({
	
});

var CommunicationViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("CommunicationViewSearchString");
	var sortBy = pageSession.get("CommunicationViewSortBy");
	var sortAscending = pageSession.get("CommunicationViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["subject", "status", "sent_or_received", "name"];
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

var CommunicationViewExport = function(cursor, fileType) {
	var data = CommunicationViewItems(cursor);
	var exportFields = ["subject", "status", "sent_or_received", "name"];

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


Template.CommunicationView.rendered = function() {
	pageSession.set("CommunicationViewStyle", "table");
	Session.set("buttonSuccess", true);
	
};

Template.CommunicationView.events({
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
				pageSession.set("CommunicationViewSearchString", searchString);
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
					pageSession.set("CommunicationViewSearchString", searchString);
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
					pageSession.set("CommunicationViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-communication-insert-delete-button": function(e, t) {
		e.preventDefault();
		if ($(e.target).hasClass("plus-sign")) {
			Router.go("core_settings.setup.communication.insert", {});
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
							Meteor.call("removeCommunication", docIds);
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
		CommunicationViewExport(this.communication_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		CommunicationViewExport(this.communication_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		CommunicationViewExport(this.communication_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		CommunicationViewExport(this.communication_list, "json");
	}

	
});

Template.CommunicationView.helpers({

	"insertButtonClass": function() {
		return Communication.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.communication_list || this.communication_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.communication_list && this.communication_list.count() > 0;
	},
	"isNotFound": function() {
		return this.communication_list && pageSession.get("CommunicationViewSearchString") && CommunicationViewItems(this.communication_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("CommunicationViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("CommunicationViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("CommunicationViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("CommunicationViewStyle") == "gallery";
	},
	"toggleAddDeleteButton": function() {
		return Session.get("buttonSuccess") ? "btn btn-primary plus-sign" : "btn btn-danger trash-can";
	},
	"setAddDeleteButtonText": function() {
		return Session.get("buttonSuccess") ? "Add new" : "Delete";
	}

	
});


Template.CommunicationViewTable.rendered = function() {

};

Template.CommunicationViewTable.events({
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
		var oldSortBy = pageSession.get("CommunicationViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("CommunicationViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("CommunicationViewSortAscending") || false;
			pageSession.set("CommunicationViewSortAscending", !sortAscending);
		} else {
			pageSession.set("CommunicationViewSortAscending", true);
		}
	}
});

Template.CommunicationViewTable.helpers({
	"tableItems": function() {
		return CommunicationViewItems(this.communication_list);
	}

});


Template.CommunicationViewTableItems.rendered = function() {

};

Template.CommunicationViewTableItems.events({
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
		Router.go("core_settings.setup.communication.edit", {communicationId: this._id});
		return false;
	}

});

Template.CommunicationViewTableItems.helpers({
	"checkComplete": function() {
		return Session.get("checkComplete");
	},

	"editButtonClass": function() {
		return Communication.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Communication.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.CommunicationViewTableFooter.rendered = function() {

};

Template.CommunicationViewTableFooter.events({

	"click #dataview-communication-paginate-buttons": function(e) {
		var documentNumber = parseInt(e.target.textContent, 10);
		Session.set("limit", documentNumber);
	}

});

Template.CommunicationViewTableFooter.helpers({

});
