var pageSession = new ReactiveDict();
var recordSelect = new ReactiveArray();


Template.AccountsDocumentsPurchaseInvoice.rendered = function() {

};

Template.AccountsDocumentsPurchaseInvoice.events({
	
});

Template.AccountsDocumentsPurchaseInvoice.helpers({
	
});

var PurchaseInvoiceViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("PurchaseInvoiceViewSearchString");
	var sortBy = pageSession.get("PurchaseInvoiceViewSortBy");
	var sortAscending = pageSession.get("PurchaseInvoiceViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["title", "status", "grand_total", "name"];
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

var PurchaseInvoiceViewExport = function(cursor, fileType) {
	var data = PurchaseInvoiceViewItems(cursor);
	var exportFields = ["title", "status", "grand_total", "name"];

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

Template.PurchaseInvoiceView.rendered = function() {
	pageSession.set("PurchaseInvoiceViewStyle", "table");
	Session.set("buttonSuccess", true);
	
};

Template.PurchaseInvoiceView.events({
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
				pageSession.set("PurchaseInvoiceViewSearchString", searchString);
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
					pageSession.set("PurchaseInvoiceViewSearchString", searchString);
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
					pageSession.set("PurchaseInvoiceViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-purchase-invoice-insert-delete-button": function(e, t) {
		e.preventDefault();
		if ($(e.target).hasClass("plus-sign")) {
			Router.go("accounts.documents.purchase_invoice.insert", {});
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
							Meteor.call("removePurchaseInvoice", docIds);
							Session.set("buttonSuccess", true);
						}
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
		PurchaseInvoiceViewExport(this.purchase_invoice_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		PurchaseInvoiceViewExport(this.purchase_invoice_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		PurchaseInvoiceViewExport(this.purchase_invoice_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		PurchaseInvoiceViewExport(this.purchase_invoice_list, "json");
	}

	
});

Template.PurchaseInvoiceView.helpers({

	"insertButtonClass": function() {
		return PurchaseInvoice.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.purchase_invoice_list || this.purchase_invoice_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.purchase_invoice_list && this.purchase_invoice_list.count() > 0;
	},
	"isNotFound": function() {
		return this.purchase_invoice_list && pageSession.get("PurchaseInvoiceViewSearchString") && PurchaseInvoiceViewItems(this.purchase_invoice_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("PurchaseInvoiceViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("PurchaseInvoiceViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("PurchaseInvoiceViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("PurchaseInvoiceViewStyle") == "gallery";
	},
	"toggleAddDeleteButton": function() {
		return Session.get("buttonSuccess") ? "btn btn-primary plus-sign" : "btn btn-danger trash-can";
	},
	"setAddDeleteButtonText": function() {
		return Session.get("buttonSuccess") ? "Add new" : "Delete";
	}

	
});


Template.PurchaseInvoiceViewTable.rendered = function() {

};

Template.PurchaseInvoiceViewTable.events({
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
		var oldSortBy = pageSession.get("PurchaseInvoiceViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("PurchaseInvoiceViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("PurchaseInvoiceViewSortAscending") || false;
			pageSession.set("PurchaseInvoiceViewSortAscending", !sortAscending);
		} else {
			pageSession.set("PurchaseInvoiceViewSortAscending", true);
		}
	}
});

Template.PurchaseInvoiceViewTable.helpers({
	"tableItems": function() {
		return PurchaseInvoiceViewItems(this.purchase_invoice_list);
	}

});


Template.PurchaseInvoiceViewTableItems.rendered = function() {

};

Template.PurchaseInvoiceViewTableItems.events({
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
		Router.go("accounts.documents.purchase_invoice.edit", {purchaseInvoiceId: this._id});
		return false;
	}

});

Template.PurchaseInvoiceViewTableItems.helpers({
	"checkComplete": function() {
		return Session.get("checkComplete");
	},

	"editButtonClass": function() {
		return PurchaseInvoice.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return PurchaseInvoice.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	},

	"paymentStatus": function() {
		var currentStatus = PurchaseInvoice.findOne({_id: this._id});
		return (currentStatus.outstanding_amount > 0) ? true : false;
	},

	"grandTotal": function() {
		var currentGrandTotal = PurchaseInvoice.findOne({_id: this._id});
		return accounting.formatMoney(currentGrandTotal.grand_total);
	}
	
});

Template.PurchaseInvoiceViewTableFooter.rendered = function() {

};

Template.PurchaseInvoiceViewTableFooter.events({

	"click #dataview-purchase-invoice-paginate-buttons": function(e) {
		var documentNumber = parseInt(e.target.textContent, 10);
		Session.set("limit", documentNumber);
	}

});

Template.PurchaseInvoiceViewTableFooter.helpers({

});
