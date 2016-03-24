var pageSession = new ReactiveDict();
var recordSelect = new ReactiveArray();


Template.SetupPurchasingPriceList.rendered = function() {

};

Template.SetupPurchasingPriceList.events({
	
});

Template.SetupPurchasingPriceList.helpers({
	
});

var PriceListViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("PriceListViewSearchString");
	var sortBy = pageSession.get("PriceListViewSortBy");
	var sortAscending = pageSession.get("PriceListViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["name", "currency", "buying", "selling"];
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

var PriceListViewExport = function(cursor, fileType) {
	var data = PriceListViewItems(cursor);
	var exportFields = ["name", "currency", "buying", "selling"];

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


Template.PriceListView.rendered = function() {
	pageSession.set("PriceListViewStyle", "table");
	Session.set("buttonSuccess", true);
	
};

Template.PriceListView.events({
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
				pageSession.set("PriceListViewSearchString", searchString);
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
					pageSession.set("PriceListViewSearchString", searchString);
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
					pageSession.set("PriceListViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-price-list-insert-delete-button": function(e, t) {
		e.preventDefault();
		if ($(e.target).hasClass("plus-sign")) {
			Router.go("setup.purchasing.price_list.insert", {});
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
							Meteor.call("removePriceList", docIds);
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
		PriceListViewExport(this.price_list_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		PriceListViewExport(this.price_list_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		PriceListViewExport(this.price_list_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		PriceListViewExport(this.price_list_list, "json");
	}

	
});

Template.PriceListView.helpers({

	"insertButtonClass": function() {
		return PriceList.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.price_list_list || this.price_list_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.price_list_list && this.price_list_list.count() > 0;
	},
	"isNotFound": function() {
		return this.price_list_list && pageSession.get("PriceListViewSearchString") && PriceListViewItems(this.price_list_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("PriceListViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("PriceListViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("PriceListViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("PriceListViewStyle") == "gallery";
	},
	"toggleAddDeleteButton": function() {
		return Session.get("buttonSuccess") ? "btn btn-primary plus-sign" : "btn btn-danger trash-can";
	},
	"setAddDeleteButtonText": function() {
		return Session.get("buttonSuccess") ? "Add new" : "Delete";
	}

	
});


Template.PriceListViewTable.rendered = function() {

};

Template.PriceListViewTable.events({
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
		var oldSortBy = pageSession.get("PriceListViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("PriceListViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("PriceListViewSortAscending") || false;
			pageSession.set("PriceListViewSortAscending", !sortAscending);
		} else {
			pageSession.set("PriceListViewSortAscending", true);
		}
	}
});

Template.PriceListViewTable.helpers({
	"tableItems": function() {
		return PriceListViewItems(this.price_list_list);
	}

});


Template.PriceListViewTableItems.rendered = function() {

};

Template.PriceListViewTableItems.events({
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
		Router.go("setup.purchasing.price_list.edit", {priceListId: this._id});
		return false;
	}

});

Template.PriceListViewTableItems.helpers({
	"checkComplete": function() {
		return Session.get("checkComplete");
	},

	"editButtonClass": function() {
		return PriceList.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return PriceList.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.PriceListViewTableFooter.rendered = function() {

};

Template.PriceListViewTableFooter.events({

	"click #dataview-price-list-paginate-buttons": function(e) {
		var documentNumber = parseInt(e.target.textContent, 10);
		Session.set("limit", documentNumber);
	}

});

Template.PriceListViewTableFooter.helpers({

});
