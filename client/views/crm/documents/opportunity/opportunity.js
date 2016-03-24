var pageSession = new ReactiveDict();
var recordSelect = new ReactiveArray();


Template.CrmDocumentsOpportunity.rendered = function() {

};

Template.CrmDocumentsOpportunity.events({
	
});

Template.CrmDocumentsOpportunity.helpers({
	
});

var OpportunityViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("OpportunityViewSearchString");
	var sortBy = pageSession.get("OpportunityViewSortBy");
	var sortAscending = pageSession.get("OpportunityViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["title", "status", "territory", "name"];
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

var OpportunityViewExport = function(cursor, fileType) {
	var data = OpportunityViewItems(cursor);
	var exportFields = ["title", "status", "territory", "name"];

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


Template.OpportunityView.rendered = function() {
	pageSession.set("OpportunityViewStyle", "table");
	Session.set("buttonSuccess", true);
	
};

Template.OpportunityView.events({
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
				pageSession.set("OpportunityViewSearchString", searchString);
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
					pageSession.set("OpportunityViewSearchString", searchString);
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
					pageSession.set("OpportunityViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-opportunity-insert-delete-button": function(e, t) {
		e.preventDefault();
		if ($(e.target).hasClass("plus-sign")) {
			Router.go("crm.documents.opportunity.insert", {});
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
							Meteor.call("removeOpportunity", docIds);
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
		OpportunityViewExport(this.opportunity_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		OpportunityViewExport(this.opportunity_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		OpportunityViewExport(this.opportunity_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		OpportunityViewExport(this.opportunity_list, "json");
	}

	
});

Template.OpportunityView.helpers({

	"insertButtonClass": function() {
		return Opportunity.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.opportunity_list || this.opportunity_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.opportunity_list && this.opportunity_list.count() > 0;
	},
	"isNotFound": function() {
		return this.opportunity_list && pageSession.get("OpportunityViewSearchString") && OpportunityViewItems(this.opportunity_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("OpportunityViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("OpportunityViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("OpportunityViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("OpportunityViewStyle") == "gallery";
	},
	"toggleAddDeleteButton": function() {
		return Session.get("buttonSuccess") ? "btn btn-primary plus-sign" : "btn btn-danger trash-can";
	},
	"setAddDeleteButtonText": function() {
		return Session.get("buttonSuccess") ? "Add new" : "Delete";
	}

	
});


Template.OpportunityViewTable.rendered = function() {

};

Template.OpportunityViewTable.events({
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
		var oldSortBy = pageSession.get("OpportunityViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("OpportunityViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("OpportunityViewSortAscending") || false;
			pageSession.set("OpportunityViewSortAscending", !sortAscending);
		} else {
			pageSession.set("OpportunityViewSortAscending", true);
		}
	}
});

Template.OpportunityViewTable.helpers({
	"tableItems": function() {
		return OpportunityViewItems(this.opportunity_list);
	}

});


Template.OpportunityViewTableItems.rendered = function() {

};

Template.OpportunityViewTableItems.events({
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
		Router.go("crm.documents.opportunity.edit", {opportunityId: this._id});
		return false;
	}

});

Template.OpportunityViewTableItems.helpers({
	"checkComplete": function() {
		return Session.get("checkComplete");
	},

	"editButtonClass": function() {
		return Opportunity.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Opportunity.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.OpportunityViewTableFooter.rendered = function() {

};

Template.OpportunityViewTableFooter.events({

	"click #dataview-opportunity-paginate-buttons": function(e) {
		var documentNumber = parseInt(e.target.textContent, 10);
		Session.set("limit", documentNumber);
	}

});

Template.OpportunityViewTableFooter.helpers({

});
