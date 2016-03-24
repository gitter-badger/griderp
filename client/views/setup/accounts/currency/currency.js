var pageSession = new ReactiveDict();
var recordSelect = new ReactiveArray();


Template.SetupAccountsCurrency.rendered = function() {

};

Template.SetupAccountsCurrency.events({
	
});

Template.SetupAccountsCurrency.helpers({
	
});

var CurrencyViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("CurrencyViewSearchString");
	var sortBy = pageSession.get("CurrencyViewSortBy");
	var sortAscending = pageSession.get("CurrencyViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["name", "enabled", "fraction", "fraction_units"];
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

var CurrencyViewExport = function(cursor, fileType) {
	var data = CurrencyViewItems(cursor);
	var exportFields = ["name", "enabled", "fraction", "fraction_units"];

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


Template.CurrencyView.rendered = function() {
	pageSession.set("CurrencyViewStyle", "table");
	Session.set("buttonSuccess", true);
	
};

Template.CurrencyView.events({
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
				pageSession.set("CurrencyViewSearchString", searchString);
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
					pageSession.set("CurrencyViewSearchString", searchString);
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
					pageSession.set("CurrencyViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-currency-insert-delete-button": function(e, t) {
		e.preventDefault();
		if ($(e.target).hasClass("plus-sign")) {
			Router.go("setup.accounts.currency.insert", {});
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
							Meteor.call("removeCurrency", docIds);
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
		CurrencyViewExport(this.currency_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		CurrencyViewExport(this.currency_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		CurrencyViewExport(this.currency_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		CurrencyViewExport(this.currency_list, "json");
	}

	
});

Template.CurrencyView.helpers({

	"insertButtonClass": function() {
		return Currency.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.currency_list || this.currency_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.currency_list && this.currency_list.count() > 0;
	},
	"isNotFound": function() {
		return this.currency_list && pageSession.get("CurrencyViewSearchString") && CurrencyViewItems(this.currency_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("CurrencyViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("CurrencyViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("CurrencyViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("CurrencyViewStyle") == "gallery";
	},
	"toggleAddDeleteButton": function() {
		return Session.get("buttonSuccess") ? "btn btn-primary plus-sign" : "btn btn-danger trash-can";
	},
	"setAddDeleteButtonText": function() {
		return Session.get("buttonSuccess") ? "Add new" : "Delete";
	}

	
});


Template.CurrencyViewTable.rendered = function() {

};

Template.CurrencyViewTable.events({
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
		var oldSortBy = pageSession.get("CurrencyViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("CurrencyViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("CurrencyViewSortAscending") || false;
			pageSession.set("CurrencyViewSortAscending", !sortAscending);
		} else {
			pageSession.set("CurrencyViewSortAscending", true);
		}
	}
});

Template.CurrencyViewTable.helpers({
	"tableItems": function() {
		return CurrencyViewItems(this.currency_list);
	}

});


Template.CurrencyViewTableItems.rendered = function() {

};

Template.CurrencyViewTableItems.events({
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
		Router.go("setup.accounts.currency.edit", {currencyId: this._id});
		return false;
	}

});

Template.CurrencyViewTableItems.helpers({
	"checkComplete": function() {
		return Session.get("checkComplete");
	},

	"editButtonClass": function() {
		return Currency.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Currency.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.CurrencyViewTableFooter.rendered = function() {

};

Template.CurrencyViewTableFooter.events({

	"click #dataview-currency-paginate-buttons": function(e) {
		var documentNumber = parseInt(e.target.textContent, 10);
		Session.set("limit", documentNumber);
	}

});

Template.CurrencyViewTableFooter.helpers({

});
