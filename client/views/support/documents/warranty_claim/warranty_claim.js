var pageSession = new ReactiveDict();
var recordSelect = new ReactiveArray();


Template.SupportDocumentsWarrantyClaim.rendered = function() {

};

Template.SupportDocumentsWarrantyClaim.events({
	
});

Template.SupportDocumentsWarrantyClaim.helpers({
	
});

var WarrantyClaimViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("WarrantyClaimViewSearchString");
	var sortBy = pageSession.get("WarrantyClaimViewSortBy");
	var sortAscending = pageSession.get("WarrantyClaimViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["customer", "status", "item_code", "name"];
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

var WarrantyClaimViewExport = function(cursor, fileType) {
	var data = WarrantyClaimViewItems(cursor);
	var exportFields = ["customer", "status", "item_code", "name"];

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


Template.WarrantyClaimView.rendered = function() {
	pageSession.set("WarrantyClaimViewStyle", "table");
	Session.set("buttonSuccess", true);
	
};

Template.WarrantyClaimView.events({
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
				pageSession.set("WarrantyClaimViewSearchString", searchString);
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
					pageSession.set("WarrantyClaimViewSearchString", searchString);
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
					pageSession.set("WarrantyClaimViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-warranty-claim-insert-delete-button": function(e, t) {
		e.preventDefault();
		if ($(e.target).hasClass("plus-sign")) {
			Router.go("support.documents.warranty_claim.insert", {});
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
							Meteor.call("removeWarrantyClaim", docIds);
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
		WarrantyClaimViewExport(this.warranty_claim_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		WarrantyClaimViewExport(this.warranty_claim_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		WarrantyClaimViewExport(this.warranty_claim_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		WarrantyClaimViewExport(this.warranty_claim_list, "json");
	}

	
});

Template.WarrantyClaimView.helpers({

	"insertButtonClass": function() {
		return WarrantyClaim.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.warranty_claim_list || this.warranty_claim_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.warranty_claim_list && this.warranty_claim_list.count() > 0;
	},
	"isNotFound": function() {
		return this.warranty_claim_list && pageSession.get("WarrantyClaimViewSearchString") && WarrantyClaimViewItems(this.warranty_claim_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("WarrantyClaimViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("WarrantyClaimViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("WarrantyClaimViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("WarrantyClaimViewStyle") == "gallery";
	},
	"toggleAddDeleteButton": function() {
		return Session.get("buttonSuccess") ? "btn btn-primary plus-sign" : "btn btn-danger trash-can";
	},
	"setAddDeleteButtonText": function() {
		return Session.get("buttonSuccess") ? "Add new" : "Delete";
	}

	
});


Template.WarrantyClaimViewTable.rendered = function() {

};

Template.WarrantyClaimViewTable.events({
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
		var oldSortBy = pageSession.get("WarrantyClaimViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("WarrantyClaimViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("WarrantyClaimViewSortAscending") || false;
			pageSession.set("WarrantyClaimViewSortAscending", !sortAscending);
		} else {
			pageSession.set("WarrantyClaimViewSortAscending", true);
		}
	}
});

Template.WarrantyClaimViewTable.helpers({
	"tableItems": function() {
		return WarrantyClaimViewItems(this.warranty_claim_list);
	}

});


Template.WarrantyClaimViewTableItems.rendered = function() {

};

Template.WarrantyClaimViewTableItems.events({
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
		Router.go("support.documents.warranty_claim.edit", {warrantyClaimId: this._id});
		return false;
	}

});

Template.WarrantyClaimViewTableItems.helpers({
	"checkComplete": function() {
		return Session.get("checkComplete");
	},

	"editButtonClass": function() {
		return WarrantyClaim.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return WarrantyClaim.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.WarrantyClaimViewTableFooter.rendered = function() {

};

Template.WarrantyClaimViewTableFooter.events({

	"click #dataview-warranty-claim-paginate-buttons": function(e) {
		var documentNumber = parseInt(e.target.textContent, 10);
		Session.set("limit", documentNumber);
	}

});

Template.WarrantyClaimViewTableFooter.helpers({

});
