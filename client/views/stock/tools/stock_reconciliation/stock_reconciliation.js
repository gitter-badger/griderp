var pageSession = new ReactiveDict();
var recordSelect = new ReactiveArray();


Template.StockToolsStockReconciliation.rendered = function() {

};

Template.StockToolsStockReconciliation.events({
	
});

Template.StockToolsStockReconciliation.helpers({
	
});

var StockReconciliationViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("StockReconciliationViewSearchString");
	var sortBy = pageSession.get("StockReconciliationViewSortBy");
	var sortAscending = pageSession.get("StockReconciliationViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["name", "docstatus", "posting_date"];
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

var StockReconciliationViewExport = function(cursor, fileType) {
	var data = StockReconciliationViewItems(cursor);
	var exportFields = ["name", "docstatus", "posting_date"];

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


Template.StockReconciliationView.rendered = function() {
	pageSession.set("StockReconciliationViewStyle", "table");
	Session.set("buttonSuccess", true);
	
};

Template.StockReconciliationView.events({
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
				pageSession.set("StockReconciliationViewSearchString", searchString);
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
					pageSession.set("StockReconciliationViewSearchString", searchString);
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
					pageSession.set("StockReconciliationViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-stock-reconciliation-insert-delete-button": function(e, t) {
		e.preventDefault();
		if ($(e.target).hasClass("plus-sign")) {
			Router.go("stock.tools.stock_reconciliation.insert", {});
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
							Meteor.call("removeStockReconciliation", docIds);
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
		StockReconciliationViewExport(this.stock_reconciliation_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		StockReconciliationViewExport(this.stock_reconciliation_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		StockReconciliationViewExport(this.stock_reconciliation_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		StockReconciliationViewExport(this.stock_reconciliation_list, "json");
	}

	
});

Template.StockReconciliationView.helpers({

	"insertButtonClass": function() {
		return StockReconciliation.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.stock_reconciliation_list || this.stock_reconciliation_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.stock_reconciliation_list && this.stock_reconciliation_list.count() > 0;
	},
	"isNotFound": function() {
		return this.stock_reconciliation_list && pageSession.get("StockReconciliationViewSearchString") && StockReconciliationViewItems(this.stock_reconciliation_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("StockReconciliationViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("StockReconciliationViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("StockReconciliationViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("StockReconciliationViewStyle") == "gallery";
	},
	"toggleAddDeleteButton": function() {
		return Session.get("buttonSuccess") ? "btn btn-primary plus-sign" : "btn btn-danger trash-can";
	},
	"setAddDeleteButtonText": function() {
		return Session.get("buttonSuccess") ? "Add new" : "Delete";
	}

	
});


Template.StockReconciliationViewTable.rendered = function() {

};

Template.StockReconciliationViewTable.events({
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
		var oldSortBy = pageSession.get("StockReconciliationViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("StockReconciliationViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("StockReconciliationViewSortAscending") || false;
			pageSession.set("StockReconciliationViewSortAscending", !sortAscending);
		} else {
			pageSession.set("StockReconciliationViewSortAscending", true);
		}
	}
});

Template.StockReconciliationViewTable.helpers({
	"tableItems": function() {
		return StockReconciliationViewItems(this.stock_reconciliation_list);
	}

});


Template.StockReconciliationViewTableItems.rendered = function() {

};

Template.StockReconciliationViewTableItems.events({
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
		Router.go("stock.tools.stock_reconciliation.edit", {stockReconciliationId: this._id});
		return false;
	}

});

Template.StockReconciliationViewTableItems.helpers({
	"checkComplete": function() {
		return Session.get("checkComplete");
	},

	"editButtonClass": function() {
		return StockReconciliation.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return StockReconciliation.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.StockReconciliationViewTableFooter.rendered = function() {

};

Template.StockReconciliationViewTableFooter.events({

	"click #dataview-stock-reconciliation-paginate-buttons": function(e) {
		var documentNumber = parseInt(e.target.textContent, 10);
		Session.set("limit", documentNumber);
	}

});

Template.StockReconciliationViewTableFooter.helpers({

});
