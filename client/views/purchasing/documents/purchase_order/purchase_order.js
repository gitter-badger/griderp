var pageSession = new ReactiveDict();
var recordSelect = new ReactiveArray();


Template.PurchasingDocumentsPurchaseOrder.rendered = function() {

};

Template.PurchasingDocumentsPurchaseOrder.events({
	
});

Template.PurchasingDocumentsPurchaseOrder.helpers({
	
});

var PurchaseOrderViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("PurchaseOrderViewSearchString");
	var sortBy = pageSession.get("PurchaseOrderViewSortBy");
	var sortAscending = pageSession.get("PurchaseOrderViewSortAscending");
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

var PurchaseOrderViewExport = function(cursor, fileType) {
	var data = PurchaseOrderViewItems(cursor);
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


Template.PurchaseOrderView.rendered = function() {
	pageSession.set("PurchaseOrderViewStyle", "table");
	Session.set("buttonSuccess", true);
	
};

Template.PurchaseOrderView.events({
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
				pageSession.set("PurchaseOrderViewSearchString", searchString);
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
					pageSession.set("PurchaseOrderViewSearchString", searchString);
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
					pageSession.set("PurchaseOrderViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-purchase-order-insert-delete-button": function(e, t) {
		e.preventDefault();
		if ($(e.target).hasClass("plus-sign")) {
			Router.go("purchasing.documents.purchase_order.insert", {});
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
							Meteor.call("removePurchaseOrder", docIds);
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
		PurchaseOrderViewExport(this.purchase_order_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		PurchaseOrderViewExport(this.purchase_order_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		PurchaseOrderViewExport(this.purchase_order_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		PurchaseOrderViewExport(this.purchase_order_list, "json");
	}

	
});

Template.PurchaseOrderView.helpers({

	"insertButtonClass": function() {
		return PurchaseOrder.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.purchase_order_list || this.purchase_order_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.purchase_order_list && this.purchase_order_list.count() > 0;
	},
	"isNotFound": function() {
		return this.purchase_order_list && pageSession.get("PurchaseOrderViewSearchString") && PurchaseOrderViewItems(this.purchase_order_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("PurchaseOrderViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("PurchaseOrderViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("PurchaseOrderViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("PurchaseOrderViewStyle") == "gallery";
	},
	"toggleAddDeleteButton": function() {
		return Session.get("buttonSuccess") ? "btn btn-primary plus-sign" : "btn btn-danger trash-can";
	},
	"setAddDeleteButtonText": function() {
		return Session.get("buttonSuccess") ? "Add new" : "Delete";
	}

	
});


Template.PurchaseOrderViewTable.rendered = function() {

};

Template.PurchaseOrderViewTable.events({
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
		var oldSortBy = pageSession.get("PurchaseOrderViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("PurchaseOrderViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("PurchaseOrderViewSortAscending") || false;
			pageSession.set("PurchaseOrderViewSortAscending", !sortAscending);
		} else {
			pageSession.set("PurchaseOrderViewSortAscending", true);
		}
	}
});

Template.PurchaseOrderViewTable.helpers({
	"tableItems": function() {
		return PurchaseOrderViewItems(this.purchase_order_list);
	}

});


Template.PurchaseOrderViewTableItems.rendered = function() {

};

Template.PurchaseOrderViewTableItems.events({
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
		Router.go("purchasing.documents.purchase_order.edit", {purchaseOrderId: this._id});
		return false;
	}

});

Template.PurchaseOrderViewTableItems.helpers({
	"checkComplete": function() {
		return Session.get("checkComplete");
	},

	"editButtonClass": function() {
		return PurchaseOrder.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return PurchaseOrder.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	},

	"paymentStatus": function() {
		var currentStatus = PurchaseOrder.findOne({_id: this._id});
		return (currentStatus.outstanding_amount > 0) ? true : false;
	},

	"grandTotal": function() {
		var currentGrandTotal = PurchaseOrder.findOne({_id: this._id});
		return accounting.formatMoney(currentGrandTotal.grand_total);
	}
});

Template.PurchaseOrderViewTableFooter.rendered = function() {

};

Template.PurchaseOrderViewTableFooter.events({

	"click #dataview-purchase-order-paginate-buttons": function(e) {
		var documentNumber = parseInt(e.target.textContent, 10);
		Session.set("limit", documentNumber);
	}

});

Template.PurchaseOrderViewTableFooter.helpers({

});
