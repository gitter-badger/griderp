var pageSession = new ReactiveDict();
var recordSelect = new ReactiveArray();


Template.StockDocumentsItem.rendered = function() {

};

Template.StockDocumentsItem.events({
	
});

Template.StockDocumentsItem.helpers({
	
});

var ItemViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("ItemViewSearchString");
	var sortBy = pageSession.get("ItemViewSortBy");
	var sortAscending = pageSession.get("ItemViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["name", "status", "item_group"];
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

var ItemViewExport = function(cursor, fileType) {
	var data = ItemViewItems(cursor);
	var exportFields = ["name", "status", "item_group"];

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


Template.ItemView.rendered = function() {
	pageSession.set("ItemViewStyle", "table");
	Session.set("buttonSuccess", true);
	
};

Template.ItemView.events({
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
				pageSession.set("ItemViewSearchString", searchString);
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
					pageSession.set("ItemViewSearchString", searchString);
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
					pageSession.set("ItemViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-item-insert-delete-button": function(e, t) {
		e.preventDefault();
		if ($(e.target).hasClass("plus-sign")) {
			Router.go("stock.documents.item.insert", {});
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
							Meteor.call("removeItem", docIds);
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
		ItemViewExport(this.item_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		ItemViewExport(this.item_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		ItemViewExport(this.item_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		ItemViewExport(this.item_list, "json");
	}

	
});

Template.ItemView.helpers({

	"insertButtonClass": function() {
		return Item.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.item_list || this.item_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.item_list && this.item_list.count() > 0;
	},
	"isNotFound": function() {
		return this.item_list && pageSession.get("ItemViewSearchString") && ItemViewItems(this.item_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("ItemViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("ItemViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("ItemViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("ItemViewStyle") == "gallery";
	},
	"toggleAddDeleteButton": function() {
		return Session.get("buttonSuccess") ? "btn btn-primary plus-sign" : "btn btn-danger trash-can";
	},
	"setAddDeleteButtonText": function() {
		return Session.get("buttonSuccess") ? "Add new" : "Delete";
	}

	
});


Template.ItemViewTable.rendered = function() {

};

Template.ItemViewTable.events({
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
		var oldSortBy = pageSession.get("ItemViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("ItemViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("ItemViewSortAscending") || false;
			pageSession.set("ItemViewSortAscending", !sortAscending);
		} else {
			pageSession.set("ItemViewSortAscending", true);
		}
	}
});

Template.ItemViewTable.helpers({
	"tableItems": function() {
		return ItemViewItems(this.item_list);
	}

});


Template.ItemViewTableItems.rendered = function() {

};

Template.ItemViewTableItems.events({
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
		Router.go("stock.documents.item.edit", {itemId: this._id});
		return false;
	}

});

Template.ItemViewTableItems.helpers({
	"checkComplete": function() {
		return Session.get("checkComplete");
	},

	"editButtonClass": function() {
		return Item.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Item.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.ItemViewTableFooter.rendered = function() {

};

Template.ItemViewTableFooter.events({

	"click #dataview-item-paginate-buttons": function(e) {
		var documentNumber = parseInt(e.target.textContent, 10);
		Session.set("limit", documentNumber);
	}

});

Template.ItemViewTableFooter.helpers({

});
