var pageSession = new ReactiveDict();
var recordSelect = new ReactiveArray();


Template.StockToolsLandedCostVoucher.rendered = function() {

};

Template.StockToolsLandedCostVoucher.events({
	
});

Template.StockToolsLandedCostVoucher.helpers({
	
});

var LandedCostVoucherViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("LandedCostVoucherViewSearchString");
	var sortBy = pageSession.get("LandedCostVoucherViewSortBy");
	var sortAscending = pageSession.get("LandedCostVoucherViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["name", "docstatus", "company"];
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

var LandedCostVoucherViewExport = function(cursor, fileType) {
	var data = LandedCostVoucherViewItems(cursor);
	var exportFields = ["name", "docstatus", "company"];

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


Template.LandedCostVoucherView.rendered = function() {
	pageSession.set("LandedCostVoucherViewStyle", "table");
	Session.set("buttonSuccess", true);
	
};

Template.LandedCostVoucherView.events({
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
				pageSession.set("LandedCostVoucherViewSearchString", searchString);
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
					pageSession.set("LandedCostVoucherViewSearchString", searchString);
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
					pageSession.set("LandedCostVoucherViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-landed-cost-voucher-insert-delete-button": function(e, t) {
		e.preventDefault();
		if ($(e.target).hasClass("plus-sign")) {
			Router.go("stock.tools.landed_cost_voucher.insert", {});
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
							Meteor.call("removeLandedCostVoucher", docIds);
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
		LandedCostVoucherViewExport(this.landed_cost_voucher_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		LandedCostVoucherViewExport(this.landed_cost_voucher_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		LandedCostVoucherViewExport(this.landed_cost_voucher_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		LandedCostVoucherViewExport(this.landed_cost_voucher_list, "json");
	}

	
});

Template.LandedCostVoucherView.helpers({

	"insertButtonClass": function() {
		return LandedCostVoucher.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.landed_cost_voucher_list || this.landed_cost_voucher_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.landed_cost_voucher_list && this.landed_cost_voucher_list.count() > 0;
	},
	"isNotFound": function() {
		return this.landed_cost_voucher_list && pageSession.get("LandedCostVoucherViewSearchString") && LandedCostVoucherViewItems(this.landed_cost_voucher_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("LandedCostVoucherViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("LandedCostVoucherViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("LandedCostVoucherViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("LandedCostVoucherViewStyle") == "gallery";
	},
	"toggleAddDeleteButton": function() {
		return Session.get("buttonSuccess") ? "btn btn-primary plus-sign" : "btn btn-danger trash-can";
	},
	"setAddDeleteButtonText": function() {
		return Session.get("buttonSuccess") ? "Add new" : "Delete";
	}

	
});


Template.LandedCostVoucherViewTable.rendered = function() {

};

Template.LandedCostVoucherViewTable.events({
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
		var oldSortBy = pageSession.get("LandedCostVoucherViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("LandedCostVoucherViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("LandedCostVoucherViewSortAscending") || false;
			pageSession.set("LandedCostVoucherViewSortAscending", !sortAscending);
		} else {
			pageSession.set("LandedCostVoucherViewSortAscending", true);
		}
	}
});

Template.LandedCostVoucherViewTable.helpers({
	"tableItems": function() {
		return LandedCostVoucherViewItems(this.landed_cost_voucher_list);
	}

});


Template.LandedCostVoucherViewTableItems.rendered = function() {

};

Template.LandedCostVoucherViewTableItems.events({
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
		Router.go("stock.tools.landed_cost_voucher.edit", {landedCostVoucherId: this._id});
		return false;
	}

});

Template.LandedCostVoucherViewTableItems.helpers({
	"checkComplete": function() {
		return Session.get("checkComplete");
	},

	"editButtonClass": function() {
		return LandedCostVoucher.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return LandedCostVoucher.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.LandedCostVoucherViewTableFooter.rendered = function() {

};

Template.LandedCostVoucherViewTableFooter.events({

	"click #dataview-landed-cost-voucher-paginate-buttons": function(e) {
		var documentNumber = parseInt(e.target.textContent, 10);
		Session.set("limit", documentNumber);
	}

});

Template.LandedCostVoucherViewTableFooter.helpers({

});
