var pageSession = new ReactiveDict();
var recordSelect = new ReactiveArray();


Template.StockDocumentsStockEntry.rendered = function() {

};

Template.StockDocumentsStockEntry.events({
	
});

Template.StockDocumentsStockEntry.helpers({
	
});

var StockEntryViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("StockEntryViewSearchString");
	var sortBy = pageSession.get("StockEntryViewSortBy");
	var sortAscending = pageSession.get("StockEntryViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["purpose", "docstatus", "purpose", "name"];
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

var StockEntryViewExport = function(cursor, fileType) {
	var data = StockEntryViewItems(cursor);
	var exportFields = ["purpose", "docstatus", "purpose", "name"];

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


Template.StockEntryView.rendered = function() {
	pageSession.set("StockEntryViewStyle", "table");
	Session.set("buttonSuccess", true);
	
};

Template.StockEntryView.events({
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
				pageSession.set("StockEntryViewSearchString", searchString);
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
					pageSession.set("StockEntryViewSearchString", searchString);
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
					pageSession.set("StockEntryViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-stock-entry-insert-delete-button": function(e, t) {
		e.preventDefault();
		if ($(e.target).hasClass("plus-sign")) {
			Router.go("stock.documents.stock_entry.insert", {});
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
							Meteor.call("removeStockEntry", docIds);
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
		StockEntryViewExport(this.stock_entry_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		StockEntryViewExport(this.stock_entry_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		StockEntryViewExport(this.stock_entry_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		StockEntryViewExport(this.stock_entry_list, "json");
	}

	
});

Template.StockEntryView.helpers({

	"insertButtonClass": function() {
		return StockEntry.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.stock_entry_list || this.stock_entry_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.stock_entry_list && this.stock_entry_list.count() > 0;
	},
	"isNotFound": function() {
		return this.stock_entry_list && pageSession.get("StockEntryViewSearchString") && StockEntryViewItems(this.stock_entry_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("StockEntryViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("StockEntryViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("StockEntryViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("StockEntryViewStyle") == "gallery";
	},
	"toggleAddDeleteButton": function() {
		return Session.get("buttonSuccess") ? "btn btn-primary plus-sign" : "btn btn-danger trash-can";
	},
	"setAddDeleteButtonText": function() {
		return Session.get("buttonSuccess") ? "Add new" : "Delete";
	}

	
});


Template.StockEntryViewTable.rendered = function() {

};

Template.StockEntryViewTable.events({
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
		var oldSortBy = pageSession.get("StockEntryViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("StockEntryViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("StockEntryViewSortAscending") || false;
			pageSession.set("StockEntryViewSortAscending", !sortAscending);
		} else {
			pageSession.set("StockEntryViewSortAscending", true);
		}
	}
});

Template.StockEntryViewTable.helpers({
	"tableItems": function() {
		return StockEntryViewItems(this.stock_entry_list);
	}

});


Template.StockEntryViewTableItems.rendered = function() {

};

Template.StockEntryViewTableItems.events({
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
		Router.go("stock.documents.stock_entry.edit", {stockEntryId: this._id});
		return false;
	}

});

Template.StockEntryViewTableItems.helpers({
	"checkComplete": function() {
		return Session.get("checkComplete");
	},

	"editButtonClass": function() {
		return StockEntry.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return StockEntry.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.StockEntryViewTableFooter.rendered = function() {

};

Template.StockEntryViewTableFooter.events({

	"click #dataview-stock-entry-paginate-buttons": function(e) {
		var documentNumber = parseInt(e.target.textContent, 10);
		Session.set("limit", documentNumber);
	}

});

Template.StockEntryViewTableFooter.helpers({

});
