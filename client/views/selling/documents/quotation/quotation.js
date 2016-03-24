var pageSession = new ReactiveDict();
var recordSelect = new ReactiveArray();


Template.SellingDocumentsQuotation.rendered = function() {

};

Template.SellingDocumentsQuotation.events({
	
});

Template.SellingDocumentsQuotation.helpers({
	
});

var QuotationViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("QuotationViewSearchString");
	var sortBy = pageSession.get("QuotationViewSortBy");
	var sortAscending = pageSession.get("QuotationViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["customer_name", "status", "grand_total", "name"];
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

var QuotationViewExport = function(cursor, fileType) {
	var data = QuotationViewItems(cursor);
	var exportFields = ["customer_name", "status", "grand_total", "name"];

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


Template.QuotationView.rendered = function() {
	pageSession.set("QuotationViewStyle", "table");
	Session.set("buttonSuccess", true);
	
};

Template.QuotationView.events({
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
				pageSession.set("QuotationViewSearchString", searchString);
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
					pageSession.set("QuotationViewSearchString", searchString);
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
					pageSession.set("QuotationViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-quotation-insert-delete-button": function(e, t) {
		e.preventDefault();
		if ($(e.target).hasClass("plus-sign")) {
			Router.go("selling.documents.quotation.insert", {});
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
							Meteor.call("removeQuotation", docIds);
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
		QuotationViewExport(this.quotation_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		QuotationViewExport(this.quotation_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		QuotationViewExport(this.quotation_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		QuotationViewExport(this.quotation_list, "json");
	}

	
});

Template.QuotationView.helpers({

	"insertButtonClass": function() {
		return Quotation.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.quotation_list || this.quotation_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.quotation_list && this.quotation_list.count() > 0;
	},
	"isNotFound": function() {
		return this.quotation_list && pageSession.get("QuotationViewSearchString") && QuotationViewItems(this.quotation_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("QuotationViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("QuotationViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("QuotationViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("QuotationViewStyle") == "gallery";
	},
	"toggleAddDeleteButton": function() {
		return Session.get("buttonSuccess") ? "btn btn-primary plus-sign" : "btn btn-danger trash-can";
	},
	"setAddDeleteButtonText": function() {
		return Session.get("buttonSuccess") ? "Add new" : "Delete";
	}

	
});


Template.QuotationViewTable.rendered = function() {

};

Template.QuotationViewTable.events({
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
		var oldSortBy = pageSession.get("QuotationViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("QuotationViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("QuotationViewSortAscending") || false;
			pageSession.set("QuotationViewSortAscending", !sortAscending);
		} else {
			pageSession.set("QuotationViewSortAscending", true);
		}
	}
});

Template.QuotationViewTable.helpers({
	"tableItems": function() {
		return QuotationViewItems(this.quotation_list);
	}

});


Template.QuotationViewTableItems.rendered = function() {

};

Template.QuotationViewTableItems.events({
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
		Router.go("selling.documents.quotation.edit", {quotationId: this._id});
		return false;
	}

});

Template.QuotationViewTableItems.helpers({
	"checkComplete": function() {
		return Session.get("checkComplete");
	},

	"editButtonClass": function() {
		return Quotation.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Quotation.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	},

	"paymentStatus": function() {
		var currentStatus = Quotation.findOne({_id: this._id});
		return (currentStatus.outstanding_amount > 0) ? true : false;
	},

	"grandTotal": function() {
		var currentGrandTotal = Quotation.findOne({_id: this._id});
		return accounting.formatMoney(currentGrandTotal.grand_total);
	}
});

Template.QuotationViewTableFooter.rendered = function() {

};

Template.QuotationViewTableFooter.events({

	"click #dataview-quotation-paginate-buttons": function(e) {
		var documentNumber = parseInt(e.target.textContent, 10);
		Session.set("limit", documentNumber);
	}

});

Template.QuotationViewTableFooter.helpers({

});
