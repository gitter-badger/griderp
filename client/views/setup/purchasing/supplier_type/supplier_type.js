var pageSession = new ReactiveDict();
var recordSelect = new ReactiveArray();


Template.SetupPurchasingSupplierType.rendered = function() {

};

Template.SetupPurchasingSupplierType.events({
	
});

Template.SetupPurchasingSupplierType.helpers({
	
});

var SupplierTypeViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("SupplierTypeViewSearchString");
	var sortBy = pageSession.get("SupplierTypeViewSortBy");
	var sortAscending = pageSession.get("SupplierTypeViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["name", "supplier_type"];
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

var SupplierTypeViewExport = function(cursor, fileType) {
	var data = SupplierTypeViewItems(cursor);
	var exportFields = ["name", "supplier_type"];

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


Template.SupplierTypeView.rendered = function() {
	pageSession.set("SupplierTypeViewStyle", "table");
	Session.set("buttonSuccess", true);
	
};

Template.SupplierTypeView.events({
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
				pageSession.set("SupplierTypeViewSearchString", searchString);
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
					pageSession.set("SupplierTypeViewSearchString", searchString);
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
					pageSession.set("SupplierTypeViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-supplier-type-insert-delete-button": function(e, t) {
		e.preventDefault();
		if ($(e.target).hasClass("plus-sign")) {
			Router.go("setup.purchasing.supplier_type.insert", {});
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
							Meteor.call("removeSupplierType", docIds);
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
		SupplierTypeViewExport(this.supplier_type_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		SupplierTypeViewExport(this.supplier_type_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		SupplierTypeViewExport(this.supplier_type_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		SupplierTypeViewExport(this.supplier_type_list, "json");
	}

	
});

Template.SupplierTypeView.helpers({

	"insertButtonClass": function() {
		return SupplierType.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.supplier_type_list || this.supplier_type_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.supplier_type_list && this.supplier_type_list.count() > 0;
	},
	"isNotFound": function() {
		return this.supplier_type_list && pageSession.get("SupplierTypeViewSearchString") && SupplierTypeViewItems(this.supplier_type_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("SupplierTypeViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("SupplierTypeViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("SupplierTypeViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("SupplierTypeViewStyle") == "gallery";
	},
	"toggleAddDeleteButton": function() {
		return Session.get("buttonSuccess") ? "btn btn-primary plus-sign" : "btn btn-danger trash-can";
	},
	"setAddDeleteButtonText": function() {
		return Session.get("buttonSuccess") ? "Add new" : "Delete";
	}

	
});


Template.SupplierTypeViewTable.rendered = function() {

};

Template.SupplierTypeViewTable.events({
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
		var oldSortBy = pageSession.get("SupplierTypeViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("SupplierTypeViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("SupplierTypeViewSortAscending") || false;
			pageSession.set("SupplierTypeViewSortAscending", !sortAscending);
		} else {
			pageSession.set("SupplierTypeViewSortAscending", true);
		}
	}
});

Template.SupplierTypeViewTable.helpers({
	"tableItems": function() {
		return SupplierTypeViewItems(this.supplier_type_list);
	}

});


Template.SupplierTypeViewTableItems.rendered = function() {

};

Template.SupplierTypeViewTableItems.events({
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
		Router.go("setup.purchasing.supplier_type.edit", {supplierTypeId: this._id});
		return false;
	}

});

Template.SupplierTypeViewTableItems.helpers({
	"checkComplete": function() {
		return Session.get("checkComplete");
	},

	"editButtonClass": function() {
		return SupplierType.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return SupplierType.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.SupplierTypeViewTableFooter.rendered = function() {

};

Template.SupplierTypeViewTableFooter.events({

	"click #dataview-supplier-type-paginate-buttons": function(e) {
		var documentNumber = parseInt(e.target.textContent, 10);
		Session.set("limit", documentNumber);
	}

});

Template.SupplierTypeViewTableFooter.helpers({

});
