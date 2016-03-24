var pageSession = new ReactiveDict();
var recordSelect = new ReactiveArray();


Template.CrmDocumentsLead.rendered = function() {

};

Template.CrmDocumentsLead.events({
	
});

Template.CrmDocumentsLead.helpers({
	
});

var LeadViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("LeadViewSearchString");
	var sortBy = pageSession.get("LeadViewSortBy");
	var sortAscending = pageSession.get("LeadViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["lead_name", "company_name", "status", "name"];
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

var LeadViewExport = function(cursor, fileType) {
	var data = LeadViewItems(cursor);
	var exportFields = ["lead_name", "company_name", "status", "name"];

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


Template.LeadView.rendered = function() {
	pageSession.set("LeadViewStyle", "table");
	Session.set("buttonSuccess", true);
	
};

Template.LeadView.events({
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
				pageSession.set("LeadViewSearchString", searchString);
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
					pageSession.set("LeadViewSearchString", searchString);
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
					pageSession.set("LeadViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-lead-insert-delete-button": function(e, t) {
		e.preventDefault();
		if ($(e.target).hasClass("plus-sign")) {
			Router.go("crm.documents.lead.insert", {});
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
							Meteor.call("removeLead", docIds);
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
		LeadViewExport(this.lead_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		LeadViewExport(this.lead_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		LeadViewExport(this.lead_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		LeadViewExport(this.lead_list, "json");
	}

	
});

Template.LeadView.helpers({

	"insertButtonClass": function() {
		return Lead.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.lead_list || this.lead_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.lead_list && this.lead_list.count() > 0;
	},
	"isNotFound": function() {
		return this.lead_list && pageSession.get("LeadViewSearchString") && LeadViewItems(this.lead_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("LeadViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("LeadViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("LeadViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("LeadViewStyle") == "gallery";
	},
	"toggleAddDeleteButton": function() {
		return Session.get("buttonSuccess") ? "btn btn-primary plus-sign" : "btn btn-danger trash-can";
	},
	"setAddDeleteButtonText": function() {
		return Session.get("buttonSuccess") ? "Add new" : "Delete";
	}

	
});


Template.LeadViewTable.rendered = function() {

};

Template.LeadViewTable.events({
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
		var oldSortBy = pageSession.get("LeadViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("LeadViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("LeadViewSortAscending") || false;
			pageSession.set("LeadViewSortAscending", !sortAscending);
		} else {
			pageSession.set("LeadViewSortAscending", true);
		}
	}
});

Template.LeadViewTable.helpers({
	"tableItems": function() {
		return LeadViewItems(this.lead_list);
	}

});


Template.LeadViewTableItems.rendered = function() {

};

Template.LeadViewTableItems.events({
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
		Router.go("crm.documents.lead.edit", {leadId: this._id});
		return false;
	}

});

Template.LeadViewTableItems.helpers({
	"checkComplete": function() {
		return Session.get("checkComplete");
	},

	"editButtonClass": function() {
		return Lead.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Lead.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.LeadViewTableFooter.rendered = function() {

};

Template.LeadViewTableFooter.events({

	"click #dataview-lead-paginate-buttons": function(e) {
		var documentNumber = parseInt(e.target.textContent, 10);
		Session.set("limit", documentNumber);
	}

});

Template.LeadViewTableFooter.helpers({

});
