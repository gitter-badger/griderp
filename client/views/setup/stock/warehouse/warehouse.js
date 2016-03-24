var pageSession = new ReactiveDict();
var recordSelect = new ReactiveArray();


Template.SetupStockWarehouse.rendered = function() {

};

Template.SetupStockWarehouse.events({
	
});

Template.SetupStockWarehouse.helpers({
	
});

var WarehouseViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("WarehouseViewSearchString");
	var sortBy = pageSession.get("WarehouseViewSortBy");
	var sortAscending = pageSession.get("WarehouseViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["name", "city"];
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

var WarehouseViewExport = function(cursor, fileType) {
	var data = WarehouseViewItems(cursor);
	var exportFields = ["name", "city"];

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


Template.WarehouseView.rendered = function() {
	pageSession.set("WarehouseViewStyle", "table");
	Session.set("buttonSuccess", true);
	
};

Template.WarehouseView.events({
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
				pageSession.set("WarehouseViewSearchString", searchString);
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
					pageSession.set("WarehouseViewSearchString", searchString);
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
					pageSession.set("WarehouseViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-warehouse-insert-delete-button": function(e, t) {
		e.preventDefault();
		if ($(e.target).hasClass("plus-sign")) {
			Router.go("setup.stock.warehouse.insert", {});
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
							Meteor.call("removeWarehouse", docIds);
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
		WarehouseViewExport(this.warehouse_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		WarehouseViewExport(this.warehouse_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		WarehouseViewExport(this.warehouse_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		WarehouseViewExport(this.warehouse_list, "json");
	}

	
});

Template.WarehouseView.helpers({

	"insertButtonClass": function() {
		return Warehouse.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.warehouse_list || this.warehouse_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.warehouse_list && this.warehouse_list.count() > 0;
	},
	"isNotFound": function() {
		return this.warehouse_list && pageSession.get("WarehouseViewSearchString") && WarehouseViewItems(this.warehouse_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("WarehouseViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("WarehouseViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("WarehouseViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("WarehouseViewStyle") == "gallery";
	},
	"toggleAddDeleteButton": function() {
		return Session.get("buttonSuccess") ? "btn btn-primary plus-sign" : "btn btn-danger trash-can";
	},
	"setAddDeleteButtonText": function() {
		return Session.get("buttonSuccess") ? "Add new" : "Delete";
	}

	
});


Template.WarehouseViewTable.rendered = function() {

};

Template.WarehouseViewTable.events({
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
		var oldSortBy = pageSession.get("WarehouseViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("WarehouseViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("WarehouseViewSortAscending") || false;
			pageSession.set("WarehouseViewSortAscending", !sortAscending);
		} else {
			pageSession.set("WarehouseViewSortAscending", true);
		}
	}
});

Template.WarehouseViewTable.helpers({
	"tableItems": function() {
		return WarehouseViewItems(this.warehouse_list);
	}

});


Template.WarehouseViewTableItems.rendered = function() {

};

Template.WarehouseViewTableItems.events({
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
		Router.go("setup.stock.warehouse.edit", {warehouseId: this._id});
		return false;
	}

});

Template.WarehouseViewTableItems.helpers({
	"checkComplete": function() {
		return Session.get("checkComplete");
	},

	"editButtonClass": function() {
		return Warehouse.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Warehouse.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.WarehouseViewTableFooter.rendered = function() {

};

Template.WarehouseViewTableFooter.events({

	"click #dataview-warehouse-paginate-buttons": function(e) {
		var documentNumber = parseInt(e.target.textContent, 10);
		Session.set("limit", documentNumber);
	}

});

Template.WarehouseViewTableFooter.helpers({

});
