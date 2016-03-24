var pageSession = new ReactiveDict();
var recordSelect = new ReactiveArray();


Template.SellingDocumentsSalesOrder.rendered = function() {

};

Template.SellingDocumentsSalesOrder.events({
	
});

Template.SellingDocumentsSalesOrder.helpers({
	
});

var SalesOrderViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("SalesOrderViewSearchString");
	var sortBy = pageSession.get("SalesOrderViewSortBy");
	var sortAscending = pageSession.get("SalesOrderViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["customer", "status", "grand_total", "name"];
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

var SalesOrderViewExport = function(cursor, fileType) {
	var data = SalesOrderViewItems(cursor);
	var exportFields = ["customer", "status", "grand_total", "name"];

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


Template.SalesOrderView.rendered = function() {
	pageSession.set("SalesOrderViewStyle", "table");
	Session.set("buttonSuccess", true);
	
};

Template.SalesOrderView.events({
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
				pageSession.set("SalesOrderViewSearchString", searchString);
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
					pageSession.set("SalesOrderViewSearchString", searchString);
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
					pageSession.set("SalesOrderViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-sales-order-insert-delete-button": function(e, t) {
		e.preventDefault();
		if ($(e.target).hasClass("plus-sign")) {
			Router.go("selling.documents.sales_order.insert", {});
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
							Meteor.call("removeSalesOrder", docIds);
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
		SalesOrderViewExport(this.sales_order_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		SalesOrderViewExport(this.sales_order_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		SalesOrderViewExport(this.sales_order_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		SalesOrderViewExport(this.sales_order_list, "json");
	}

	
});

Template.SalesOrderView.helpers({

	"insertButtonClass": function() {
		return SalesOrder.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.sales_order_list || this.sales_order_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.sales_order_list && this.sales_order_list.count() > 0;
	},
	"isNotFound": function() {
		return this.sales_order_list && pageSession.get("SalesOrderViewSearchString") && SalesOrderViewItems(this.sales_order_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("SalesOrderViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("SalesOrderViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("SalesOrderViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("SalesOrderViewStyle") == "gallery";
	},
	"toggleAddDeleteButton": function() {
		return Session.get("buttonSuccess") ? "btn btn-primary plus-sign" : "btn btn-danger trash-can";
	},
	"setAddDeleteButtonText": function() {
		return Session.get("buttonSuccess") ? "Add new" : "Delete";
	}

	
});


Template.SalesOrderViewTable.rendered = function() {

};

Template.SalesOrderViewTable.events({
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
		var oldSortBy = pageSession.get("SalesOrderViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("SalesOrderViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("SalesOrderViewSortAscending") || false;
			pageSession.set("SalesOrderViewSortAscending", !sortAscending);
		} else {
			pageSession.set("SalesOrderViewSortAscending", true);
		}
	}
});

Template.SalesOrderViewTable.helpers({
	"tableItems": function() {
		return SalesOrderViewItems(this.sales_order_list);
	}

});


Template.SalesOrderViewTableItems.rendered = function() {

};

Template.SalesOrderViewTableItems.events({
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
		Router.go("selling.documents.sales_order.edit", {salesOrderId: this._id});
		return false;
	}

});

Template.SalesOrderViewTableItems.helpers({
	"checkComplete": function() {
		return Session.get("checkComplete");
	},

	"editButtonClass": function() {
		return SalesOrder.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return SalesOrder.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	},

	"paymentStatus": function() {
		var currentStatus = SalesOrder.findOne({_id: this._id});
		return (currentStatus.outstanding_amount > 0) ? true : false;
	},

	"grandTotal": function() {
		var currentGrandTotal = SalesOrder.findOne({_id: this._id});
		return accounting.formatMoney(currentGrandTotal.grand_total);
	}
});

Template.SalesOrderViewTableFooter.rendered = function() {

};

Template.SalesOrderViewTableFooter.events({

	"click #dataview-sales-order-paginate-buttons": function(e) {
		var documentNumber = parseInt(e.target.textContent, 10);
		Session.set("limit", documentNumber);
	}

});

Template.SalesOrderViewTableFooter.helpers({

});
