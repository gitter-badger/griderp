var pageSession = new ReactiveDict();
var recordSelect = new ReactiveArray();


Template.ManufacturingDocumentsProductionOrder.rendered = function() {

};

Template.ManufacturingDocumentsProductionOrder.events({
	
});

Template.ManufacturingDocumentsProductionOrder.helpers({
	
});

var ProductionOrderViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("ProductionOrderViewSearchString");
	var sortBy = pageSession.get("ProductionOrderViewSortBy");
	var sortAscending = pageSession.get("ProductionOrderViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["production_item", "status", "name"];
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

var ProductionOrderViewExport = function(cursor, fileType) {
	var data = ProductionOrderViewItems(cursor);
	var exportFields = ["production_item", "status", "name"];

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


Template.ProductionOrderView.rendered = function() {
	pageSession.set("ProductionOrderViewStyle", "table");
	Session.set("buttonSuccess", true);
	
};

Template.ProductionOrderView.events({
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
				pageSession.set("ProductionOrderViewSearchString", searchString);
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
					pageSession.set("ProductionOrderViewSearchString", searchString);
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
					pageSession.set("ProductionOrderViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-production-order-insert-delete-button": function(e, t) {
		e.preventDefault();
		if ($(e.target).hasClass("plus-sign")) {
			Router.go("manufacturing.documents.production_order.insert", {});
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
							Meteor.call("removeProductionOrder", docIds);
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
		ProductionOrderViewExport(this.production_order_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		ProductionOrderViewExport(this.production_order_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		ProductionOrderViewExport(this.production_order_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		ProductionOrderViewExport(this.production_order_list, "json");
	}

	
});

Template.ProductionOrderView.helpers({

	"insertButtonClass": function() {
		return ProductionOrder.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.production_order_list || this.production_order_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.production_order_list && this.production_order_list.count() > 0;
	},
	"isNotFound": function() {
		return this.production_order_list && pageSession.get("ProductionOrderViewSearchString") && ProductionOrderViewItems(this.production_order_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("ProductionOrderViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("ProductionOrderViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("ProductionOrderViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("ProductionOrderViewStyle") == "gallery";
	},
	"toggleAddDeleteButton": function() {
		return Session.get("buttonSuccess") ? "btn btn-primary plus-sign" : "btn btn-danger trash-can";
	},
	"setAddDeleteButtonText": function() {
		return Session.get("buttonSuccess") ? "Add new" : "Delete";
	}

	
});


Template.ProductionOrderViewTable.rendered = function() {

};

Template.ProductionOrderViewTable.events({
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
		var oldSortBy = pageSession.get("ProductionOrderViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("ProductionOrderViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("ProductionOrderViewSortAscending") || false;
			pageSession.set("ProductionOrderViewSortAscending", !sortAscending);
		} else {
			pageSession.set("ProductionOrderViewSortAscending", true);
		}
	}
});

Template.ProductionOrderViewTable.helpers({
	"tableItems": function() {
		return ProductionOrderViewItems(this.production_order_list);
	}

});


Template.ProductionOrderViewTableItems.rendered = function() {

};

Template.ProductionOrderViewTableItems.events({
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
		Router.go("manufacturing.documents.production_order.edit", {productionOrderId: this._id});
		return false;
	}

});

Template.ProductionOrderViewTableItems.helpers({
	"checkComplete": function() {
		return Session.get("checkComplete");
	},

	"editButtonClass": function() {
		return ProductionOrder.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return ProductionOrder.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.ProductionOrderViewTableFooter.rendered = function() {

};

Template.ProductionOrderViewTableFooter.events({

	"click #dataview-production-order-paginate-buttons": function(e) {
		var documentNumber = parseInt(e.target.textContent, 10);
		Session.set("limit", documentNumber);
	}

});

Template.ProductionOrderViewTableFooter.helpers({

});
