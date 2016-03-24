var pageSession = new ReactiveDict();
var recordSelect = new ReactiveArray();


Template.AccountsDocumentsSupplier.rendered = function() {

};

Template.AccountsDocumentsSupplier.events({
	
});

Template.AccountsDocumentsSupplier.helpers({
	
});

var SupplierViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("SupplierViewSearchString");
	var sortBy = pageSession.get("SupplierViewSortBy");
	var sortAscending = pageSession.get("SupplierViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["supplier_name", "supplier_type"];
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

var SupplierViewExport = function(cursor, fileType) {
	var data = SupplierViewItems(cursor);
	var exportFields = ["supplier_name", "supplier_type"];

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


Template.SupplierView.rendered = function() {
	pageSession.set("SupplierViewStyle", "table");
	
};

Template.SupplierView.events({
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
				pageSession.set("SupplierViewSearchString", searchString);
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
					pageSession.set("SupplierViewSearchString", searchString);
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
					pageSession.set("SupplierViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-supplier-insert-delete-button": function(e, t) {
		e.preventDefault();
		if ($(e.target).hasClass("plus-sign")) {
			Router.go("accounts.documents.supplier.insert", {});
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
							Meteor.call("removeSupplier", docIds);
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
		SupplierViewExport(this.supplier_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		SupplierViewExport(this.supplier_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		SupplierViewExport(this.supplier_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		SupplierViewExport(this.supplier_list, "json");
	}

	
});

Template.SupplierView.helpers({

	"insertButtonClass": function() {
		return Supplier.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.supplier_list || this.supplier_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.supplier_list && this.supplier_list.count() > 0;
	},
	"isNotFound": function() {
		return this.supplier_list && pageSession.get("SupplierViewSearchString") && SupplierViewItems(this.supplier_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("SupplierViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("SupplierViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("SupplierViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("SupplierViewStyle") == "gallery";
	},
	"toggleAddDeleteButton": function() {
		return Session.get("buttonSuccess") ? "btn btn-primary plus-sign" : "btn btn-danger trash-can";
	},
	"setAddDeleteButtonText": function() {
		return Session.get("buttonSuccess") ? "Add new" : "Delete";
	}

	
});


Template.SupplierViewTable.rendered = function() {

};

Template.SupplierViewTable.events({
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
		var oldSortBy = pageSession.get("SupplierViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("SupplierViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("SupplierViewSortAscending") || false;
			pageSession.set("SupplierViewSortAscending", !sortAscending);
		} else {
			pageSession.set("SupplierViewSortAscending", true);
		}
	}
});

Template.SupplierViewTable.helpers({
	"tableItems": function() {
		return SupplierViewItems(this.supplier_list);
	}

});


Template.SupplierViewTableItems.rendered = function() {

};

Template.SupplierViewTableItems.events({
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
		Router.go("accounts.documents.supplier.edit", {supplierId: this._id});
		return false;
	}

});

Template.SupplierViewTableItems.helpers({
	"checkComplete": function() {
		return Session.get("checkComplete");
	},

	"editButtonClass": function() {
		return Supplier.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Supplier.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.SupplierViewTableFooter.rendered = function() {

};

Template.SupplierViewTableFooter.events({

	"click #dataview-supplier-paginate-buttons": function(e) {
		var documentNumber = parseInt(e.target.textContent, 10);
		Session.set("limit", documentNumber);
	}

});

Template.SupplierViewTableFooter.helpers({

});
