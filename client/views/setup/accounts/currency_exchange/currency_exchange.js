var pageSession = new ReactiveDict();
var recordSelect = new ReactiveArray();


Template.SetupAccountsCurrencyExchange.rendered = function() {

};

Template.SetupAccountsCurrencyExchange.events({
	
});

Template.SetupAccountsCurrencyExchange.helpers({
	
});

var CurrencyExchangeViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("CurrencyExchangeViewSearchString");
	var sortBy = pageSession.get("CurrencyExchangeViewSortBy");
	var sortAscending = pageSession.get("CurrencyExchangeViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["name", "from_currency", "to_currency"];
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

var CurrencyExchangeViewExport = function(cursor, fileType) {
	var data = CurrencyExchangeViewItems(cursor);
	var exportFields = ["name", "from_currency", "to_currency"];

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


Template.CurrencyExchangeView.rendered = function() {
	pageSession.set("CurrencyExchangeViewStyle", "table");
	Session.set("buttonSuccess", true);
	
};

Template.CurrencyExchangeView.events({
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
				pageSession.set("CurrencyExchangeViewSearchString", searchString);
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
					pageSession.set("CurrencyExchangeViewSearchString", searchString);
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
					pageSession.set("CurrencyExchangeViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-currency-exchange-insert-delete-button": function(e, t) {
		e.preventDefault();
		if ($(e.target).hasClass("plus-sign")) {
			Router.go("setup.accounts.currency_exchange.insert", {});
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
							Meteor.call("removeCurrencyExchange", docIds);
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
		CurrencyExchangeViewExport(this.currency_exchange_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		CurrencyExchangeViewExport(this.currency_exchange_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		CurrencyExchangeViewExport(this.currency_exchange_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		CurrencyExchangeViewExport(this.currency_exchange_list, "json");
	}

	
});

Template.CurrencyExchangeView.helpers({

	"insertButtonClass": function() {
		return CurrencyExchange.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.currency_exchange_list || this.currency_exchange_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.currency_exchange_list && this.currency_exchange_list.count() > 0;
	},
	"isNotFound": function() {
		return this.currency_exchange_list && pageSession.get("CurrencyExchangeViewSearchString") && CurrencyExchangeViewItems(this.currency_exchange_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("CurrencyExchangeViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("CurrencyExchangeViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("CurrencyExchangeViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("CurrencyExchangeViewStyle") == "gallery";
	},
	"toggleAddDeleteButton": function() {
		return Session.get("buttonSuccess") ? "btn btn-primary plus-sign" : "btn btn-danger trash-can";
	},
	"setAddDeleteButtonText": function() {
		return Session.get("buttonSuccess") ? "Add new" : "Delete";
	}

	
});


Template.CurrencyExchangeViewTable.rendered = function() {

};

Template.CurrencyExchangeViewTable.events({
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
		var oldSortBy = pageSession.get("CurrencyExchangeViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("CurrencyExchangeViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("CurrencyExchangeViewSortAscending") || false;
			pageSession.set("CurrencyExchangeViewSortAscending", !sortAscending);
		} else {
			pageSession.set("CurrencyExchangeViewSortAscending", true);
		}
	}
});

Template.CurrencyExchangeViewTable.helpers({
	"tableItems": function() {
		return CurrencyExchangeViewItems(this.currency_exchange_list);
	}

});


Template.CurrencyExchangeViewTableItems.rendered = function() {

};

Template.CurrencyExchangeViewTableItems.events({
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
		Router.go("setup.accounts.currency_exchange.edit", {currencyExchangeId: this._id});
		return false;
	}

});

Template.CurrencyExchangeViewTableItems.helpers({
	"checkComplete": function() {
		return Session.get("checkComplete");
	},

	"editButtonClass": function() {
		return CurrencyExchange.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return CurrencyExchange.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.CurrencyExchangeViewTableFooter.rendered = function() {

};

Template.CurrencyExchangeViewTableFooter.events({

	"click #dataview-currency-exchange-paginate-buttons": function(e) {
		var documentNumber = parseInt(e.target.textContent, 10);
		Session.set("limit", documentNumber);
	}

});

Template.CurrencyExchangeViewTableFooter.helpers({

});
