var pageSession = new ReactiveDict();
var recordSelect = new ReactiveArray();


Template.AccountsToolsPeriodClosingVoucher.rendered = function() {

};

Template.AccountsToolsPeriodClosingVoucher.events({
	
});

Template.AccountsToolsPeriodClosingVoucher.helpers({
	
});

var PeriodClosingVoucherViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("PeriodClosingVoucherViewSearchString");
	var sortBy = pageSession.get("PeriodClosingVoucherViewSortBy");
	var sortAscending = pageSession.get("PeriodClosingVoucherViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["closing_account_head", "status", "fiscal_year", "name"];
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

var PeriodClosingVoucherViewExport = function(cursor, fileType) {
	var data = PeriodClosingVoucherViewItems(cursor);
	var exportFields = ["closing_account_head", "status", "fiscal_year", "name"];

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


Template.PeriodClosingVoucherView.rendered = function() {
	pageSession.set("PeriodClosingVoucherViewStyle", "table");
	Session.set("buttonSuccess", true);
	
};

Template.PeriodClosingVoucherView.events({
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
				pageSession.set("PeriodClosingVoucherViewSearchString", searchString);
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
					pageSession.set("PeriodClosingVoucherViewSearchString", searchString);
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
					pageSession.set("PeriodClosingVoucherViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-p-c-v-insert-delete-button": function(e, t) {
		e.preventDefault();
		if ($(e.target).hasClass("plus-sign")) {
			Router.go("accounts.tools.period_closing_voucher.insert", {});
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
							Meteor.call("removePeriodClosingVoucher", docIds);
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
		PeriodClosingVoucherViewExport(this.period_closing_voucher_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		PeriodClosingVoucherViewExport(this.period_closing_voucher_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		PeriodClosingVoucherViewExport(this.period_closing_voucher_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		PeriodClosingVoucherViewExport(this.period_closing_voucher_list, "json");
	}

	
});

Template.PeriodClosingVoucherView.helpers({

	"insertButtonClass": function() {
		return PeriodClosingVoucher.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.period_closing_voucher_list || this.period_closing_voucher_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.period_closing_voucher_list && this.period_closing_voucher_list.count() > 0;
	},
	"isNotFound": function() {
		return this.period_closing_voucher_list && pageSession.get("PeriodClosingVoucherViewSearchString") && PeriodClosingVoucherViewItems(this.period_closing_voucher_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("PeriodClosingVoucherViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("PeriodClosingVoucherViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("PeriodClosingVoucherViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("PeriodClosingVoucherViewStyle") == "gallery";
	},
	"toggleAddDeleteButton": function() {
		return Session.get("buttonSuccess") ? "btn btn-primary plus-sign" : "btn btn-danger trash-can";
	},
	"setAddDeleteButtonText": function() {
		return Session.get("buttonSuccess") ? "Add new" : "Delete";
	}

	
});


Template.PeriodClosingVoucherViewTable.rendered = function() {

};

Template.PeriodClosingVoucherViewTable.events({
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
		var oldSortBy = pageSession.get("PeriodClosingVoucherViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("PeriodClosingVoucherViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("PeriodClosingVoucherViewSortAscending") || false;
			pageSession.set("PeriodClosingVoucherViewSortAscending", !sortAscending);
		} else {
			pageSession.set("PeriodClosingVoucherViewSortAscending", true);
		}
	}
});

Template.PeriodClosingVoucherViewTable.helpers({
	"tableItems": function() {
		return PeriodClosingVoucherViewItems(this.period_closing_voucher_list);
	}

});


Template.PeriodClosingVoucherViewTableItems.rendered = function() {

};

Template.PeriodClosingVoucherViewTableItems.events({
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
		Router.go("accounts.tools.period_closing_voucher.edit", {periodClosingVoucherId: this._id});
		return false;
	}

});

Template.PeriodClosingVoucherViewTableItems.helpers({
	"checkComplete": function() {
		return Session.get("checkComplete");
	},

	"editButtonClass": function() {
		return PeriodClosingVoucher.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return PeriodClosingVoucher.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.PeriodClosingVoucherViewTableFooter.rendered = function() {

};

Template.PeriodClosingVoucherViewTableFooter.events({

	"click #dataview-p-c-v-paginate-buttons": function(e) {
		var documentNumber = parseInt(e.target.textContent, 10);
		Session.set("limit", documentNumber);
	}

});

Template.PeriodClosingVoucherViewTableFooter.helpers({

});
