var pageSession = new ReactiveDict();
var recordSelect = new ReactiveArray();


Template.SetupStockItemAttribute.rendered = function() {

};

Template.SetupStockItemAttribute.events({
	
});

Template.SetupStockItemAttribute.helpers({
	
});

var ItemAttributeViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("ItemAttributeViewSearchString");
	var sortBy = pageSession.get("ItemAttributeViewSortBy");
	var sortAscending = pageSession.get("ItemAttributeViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["name", "attribute_name"];
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

var ItemAttributeViewExport = function(cursor, fileType) {
	var data = ItemAttributeViewItems(cursor);
	var exportFields = ["name", "attribute_name"];

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


Template.ItemAttributeView.rendered = function() {
	pageSession.set("ItemAttributeViewStyle", "table");
	Session.set("buttonSuccess", true);
	
};

Template.ItemAttributeView.events({
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
				pageSession.set("ItemAttributeViewSearchString", searchString);
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
					pageSession.set("ItemAttributeViewSearchString", searchString);
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
					pageSession.set("ItemAttributeViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-item-attribute-insert-delete-button": function(e, t) {
		e.preventDefault();
		if ($(e.target).hasClass("plus-sign")) {
			Router.go("setup.stock.item_attribute.insert", {});
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
							Meteor.call("removeItemAttribute", docIds);
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
		ItemAttributeViewExport(this.item_attribute_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		ItemAttributeViewExport(this.item_attribute_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		ItemAttributeViewExport(this.item_attribute_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		ItemAttributeViewExport(this.item_attribute_list, "json");
	}

	
});

Template.ItemAttributeView.helpers({

	"insertButtonClass": function() {
		return ItemAttribute.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.item_attribute_list || this.item_attribute_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.item_attribute_list && this.item_attribute_list.count() > 0;
	},
	"isNotFound": function() {
		return this.item_attribute_list && pageSession.get("ItemAttributeViewSearchString") && ItemAttributeViewItems(this.item_attribute_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("ItemAttributeViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("ItemAttributeViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("ItemAttributeViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("ItemAttributeViewStyle") == "gallery";
	},
	"toggleAddDeleteButton": function() {
		return Session.get("buttonSuccess") ? "btn btn-primary plus-sign" : "btn btn-danger trash-can";
	},
	"setAddDeleteButtonText": function() {
		return Session.get("buttonSuccess") ? "Add new" : "Delete";
	}

	
});


Template.ItemAttributeViewTable.rendered = function() {

};

Template.ItemAttributeViewTable.events({
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
		var oldSortBy = pageSession.get("ItemAttributeViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("ItemAttributeViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("ItemAttributeViewSortAscending") || false;
			pageSession.set("ItemAttributeViewSortAscending", !sortAscending);
		} else {
			pageSession.set("ItemAttributeViewSortAscending", true);
		}
	}
});

Template.ItemAttributeViewTable.helpers({
	"tableItems": function() {
		return ItemAttributeViewItems(this.item_attribute_list);
	}

});


Template.ItemAttributeViewTableItems.rendered = function() {

};

Template.ItemAttributeViewTableItems.events({
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
		Router.go("setup.stock.item_attribute.edit", {itemAttributeId: this._id});
		return false;
	}

});

Template.ItemAttributeViewTableItems.helpers({
	"checkComplete": function() {
		return Session.get("checkComplete");
	},

	"editButtonClass": function() {
		return ItemAttribute.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return ItemAttribute.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.ItemAttributeViewTableFooter.rendered = function() {

};

Template.ItemAttributeViewTableFooter.events({

	"click #dataview-item-attribute-paginate-buttons": function(e) {
		var documentNumber = parseInt(e.target.textContent, 10);
		Session.set("limit", documentNumber);
	}

});

Template.ItemAttributeViewTableFooter.helpers({

});
