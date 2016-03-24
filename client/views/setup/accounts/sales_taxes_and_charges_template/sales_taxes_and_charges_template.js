var pageSession = new ReactiveDict();
var recordSelect = new ReactiveArray();


Template.SetupAccountsSalesTaxesAndChargesTemplate.rendered = function() {

};

Template.SetupAccountsSalesTaxesAndChargesTemplate.events({
	
});

Template.SetupAccountsSalesTaxesAndChargesTemplate.helpers({
	
});

var SalesTaxesAndChargesTemplateViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("SalesTaxesAndChargesTemplateViewSearchString");
	var sortBy = pageSession.get("SalesTaxesAndChargesTemplateViewSortBy");
	var sortAscending = pageSession.get("SalesTaxesAndChargesTemplateViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["name", "is_default", "company"];
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

var SalesTaxesAndChargesTemplateViewExport = function(cursor, fileType) {
	var data = SalesTaxesAndChargesTemplateViewItems(cursor);
	var exportFields = ["name", "is_default", "company"];

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


Template.SalesTaxesAndChargesTemplateView.rendered = function() {
	pageSession.set("SalesTaxesAndChargesTemplateViewStyle", "table");
	Session.set("buttonSuccess", true);
	
};

Template.SalesTaxesAndChargesTemplateView.events({
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
				pageSession.set("SalesTaxesAndChargesTemplateViewSearchString", searchString);
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
					pageSession.set("SalesTaxesAndChargesTemplateViewSearchString", searchString);
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
					pageSession.set("SalesTaxesAndChargesTemplateViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-sales-taxes-and-charges-template-insert-delete-button": function(e, t) {
		e.preventDefault();
		if ($(e.target).hasClass("plus-sign")) {
			Router.go("setup.accounts.sales_taxes_and_charges_template.insert", {});
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
							Meteor.call("removeSalesTaxesAndChargesTemplate", docIds);
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
		SalesTaxesAndChargesTemplateViewExport(this.sales_taxes_and_charges_template_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		SalesTaxesAndChargesTemplateViewExport(this.sales_taxes_and_charges_template_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		SalesTaxesAndChargesTemplateViewExport(this.sales_taxes_and_charges_template_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		SalesTaxesAndChargesTemplateViewExport(this.sales_taxes_and_charges_template_list, "json");
	}

	
});

Template.SalesTaxesAndChargesTemplateView.helpers({

	"insertButtonClass": function() {
		return SalesTaxesAndChargesTemplate.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.sales_taxes_and_charges_template_list || this.sales_taxes_and_charges_template_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.sales_taxes_and_charges_template_list && this.sales_taxes_and_charges_template_list.count() > 0;
	},
	"isNotFound": function() {
		return this.sales_taxes_and_charges_template_list && pageSession.get("SalesTaxesAndChargesTemplateViewSearchString") && SalesTaxesAndChargesTemplateViewItems(this.sales_taxes_and_charges_template_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("SalesTaxesAndChargesTemplateViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("SalesTaxesAndChargesTemplateViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("SalesTaxesAndChargesTemplateViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("SalesTaxesAndChargesTemplateViewStyle") == "gallery";
	},
	"toggleAddDeleteButton": function() {
		return Session.get("buttonSuccess") ? "btn btn-primary plus-sign" : "btn btn-danger trash-can";
	},
	"setAddDeleteButtonText": function() {
		return Session.get("buttonSuccess") ? "Add new" : "Delete";
	}

	
});


Template.SalesTaxesAndChargesTemplateViewTable.rendered = function() {

};

Template.SalesTaxesAndChargesTemplateViewTable.events({
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
		var oldSortBy = pageSession.get("SalesTaxesAndChargesTemplateViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("SalesTaxesAndChargesTemplateViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("SalesTaxesAndChargesTemplateViewSortAscending") || false;
			pageSession.set("SalesTaxesAndChargesTemplateViewSortAscending", !sortAscending);
		} else {
			pageSession.set("SalesTaxesAndChargesTemplateViewSortAscending", true);
		}
	}
});

Template.SalesTaxesAndChargesTemplateViewTable.helpers({
	"tableItems": function() {
		return SalesTaxesAndChargesTemplateViewItems(this.sales_taxes_and_charges_template_list);
	}

});


Template.SalesTaxesAndChargesTemplateViewTableItems.rendered = function() {

};

Template.SalesTaxesAndChargesTemplateViewTableItems.events({
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
		Router.go("setup.accounts.sales_taxes_and_charges_template.edit", {salesTaxesAndChargesTemplateId: this._id});
		return false;
	}

});

Template.SalesTaxesAndChargesTemplateViewTableItems.helpers({
	"checkComplete": function() {
		return Session.get("checkComplete");
	},

	"editButtonClass": function() {
		return SalesTaxesAndChargesTemplate.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return SalesTaxesAndChargesTemplate.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.SalesTaxesAndChargesTemplateViewTableFooter.rendered = function() {

};

Template.SalesTaxesAndChargesTemplateViewTableFooter.events({

	"click #dataview-sales-taxes-and-charges-template-paginate-buttons": function(e) {
		var documentNumber = parseInt(e.target.textContent, 10);
		Session.set("limit", documentNumber);
	}

});

Template.SalesTaxesAndChargesTemplateViewTableFooter.helpers({

});
