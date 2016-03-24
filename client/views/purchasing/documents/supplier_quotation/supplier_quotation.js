var pageSession = new ReactiveDict();
var recordSelect = new ReactiveArray();


Template.PurchasingDocumentsSupplierQuotation.rendered = function() {

};

Template.PurchasingDocumentsSupplierQuotation.events({
	
});

Template.PurchasingDocumentsSupplierQuotation.helpers({
	
});

var SupplierQuotationViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("SupplierQuotationViewSearchString");
	var sortBy = pageSession.get("SupplierQuotationViewSortBy");
	var sortAscending = pageSession.get("SupplierQuotationViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["supplier_name", "status", "grand_total", "name"];
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

var SupplierQuotationViewExport = function(cursor, fileType) {
	var data = SupplierQuotationViewItems(cursor);
	var exportFields = ["supplier_name", "status", "grand_total", "name"];

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


Template.SupplierQuotationView.rendered = function() {
	pageSession.set("SupplierQuotationViewStyle", "table");
	Session.set("buttonSuccess", true);
	
};

Template.SupplierQuotationView.events({
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
				pageSession.set("SupplierQuotationViewSearchString", searchString);
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
					pageSession.set("SupplierQuotationViewSearchString", searchString);
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
					pageSession.set("SupplierQuotationViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-supplier-quotation-insert-delete-button": function(e, t) {
		e.preventDefault();
		if ($(e.target).hasClass("plus-sign")) {
			Router.go("purchasing.documents.supplier_quotation.insert", {});
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
							Meteor.call("removeSupplierQuotation", docIds);
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
		SupplierQuotationViewExport(this.supplier_quotation_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		SupplierQuotationViewExport(this.supplier_quotation_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		SupplierQuotationViewExport(this.supplier_quotation_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		SupplierQuotationViewExport(this.supplier_quotation_list, "json");
	}

	
});

Template.SupplierQuotationView.helpers({

	"insertButtonClass": function() {
		return SupplierQuotation.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.supplier_quotation_list || this.supplier_quotation_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.supplier_quotation_list && this.supplier_quotation_list.count() > 0;
	},
	"isNotFound": function() {
		return this.supplier_quotation_list && pageSession.get("SupplierQuotationViewSearchString") && SupplierQuotationViewItems(this.supplier_quotation_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("SupplierQuotationViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("SupplierQuotationViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("SupplierQuotationViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("SupplierQuotationViewStyle") == "gallery";
	},
	"toggleAddDeleteButton": function() {
		return Session.get("buttonSuccess") ? "btn btn-primary plus-sign" : "btn btn-danger trash-can";
	},
	"setAddDeleteButtonText": function() {
		return Session.get("buttonSuccess") ? "Add new" : "Delete";
	}

	
});


Template.SupplierQuotationViewTable.rendered = function() {

};

Template.SupplierQuotationViewTable.events({
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
		var oldSortBy = pageSession.get("SupplierQuotationViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("SupplierQuotationViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("SupplierQuotationViewSortAscending") || false;
			pageSession.set("SupplierQuotationViewSortAscending", !sortAscending);
		} else {
			pageSession.set("SupplierQuotationViewSortAscending", true);
		}
	}
});

Template.SupplierQuotationViewTable.helpers({
	"tableItems": function() {
		return SupplierQuotationViewItems(this.supplier_quotation_list);
	}

});


Template.SupplierQuotationViewTableItems.rendered = function() {

};

Template.SupplierQuotationViewTableItems.events({
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
		Router.go("purchasing.documents.supplier_quotation.edit", {supplierQuotationId: this._id});
		return false;
	}

});

Template.SupplierQuotationViewTableItems.helpers({
	"checkComplete": function() {
		return Session.get("checkComplete");
	},

	"editButtonClass": function() {
		return SupplierQuotation.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return SupplierQuotation.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	},

	"paymentStatus": function() {
		var currentStatus = SupplierQuotation.findOne({_id: this._id});
		return (currentStatus.outstanding_amount > 0) ? true : false;
	},

	"grandTotal": function() {
		var currentGrandTotal = SupplierQuotation.findOne({_id: this._id});
		return accounting.formatMoney(currentGrandTotal.grand_total);
	}
});

Template.SupplierQuotationViewTableFooter.rendered = function() {

};

Template.SupplierQuotationViewTableFooter.events({

	"click #dataview-supplier-quotation-paginate-buttons": function(e) {
		var documentNumber = parseInt(e.target.textContent, 10);
		Session.set("limit", documentNumber);
	}

});

Template.SupplierQuotationViewTableFooter.helpers({

});
