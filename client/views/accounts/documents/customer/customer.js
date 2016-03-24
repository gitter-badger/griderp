var pageSession = new ReactiveDict();
var recordSelect = new ReactiveArray();
var status = false;

Template.AccountsDocumentsCustomer.rendered = function() {

};

Template.AccountsDocumentsCustomer.events({
	
});

Template.AccountsDocumentsCustomer.helpers({
	
});

var CustomerViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("CustomerViewSearchString");
	var sortBy = pageSession.get("CustomerViewSortBy");
	var sortAscending = pageSession.get("CustomerViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["name", "customer_group", "territory"];
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

var CustomerViewExport = function(cursor, fileType) {
	var data = CustomerViewItems(cursor);
	var exportFields = ["name", "customer_group", "territory"];

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


Template.CustomerView.rendered = function() {
	pageSession.set("CustomerViewStyle", "table");
	Session.set("buttonSuccess", true);
	
};

Template.CustomerView.events({
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
				pageSession.set("CustomerViewSearchString", searchString);
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
					pageSession.set("CustomerViewSearchString", searchString);
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
					pageSession.set("CustomerViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-customer-insert-delete-button": function(e, t) {
		e.preventDefault();
		if ($(e.target).hasClass("plus-sign")) {
			Router.go("accounts.documents.customer.insert", {});
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
							Meteor.call("removeCustomer", docIds);
							Session.set("buttonSuccess", true);
						}
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
		CustomerViewExport(this.customer_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		CustomerViewExport(this.customer_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		CustomerViewExport(this.customer_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		CustomerViewExport(this.customer_list, "json");
	}

	
});

Template.CustomerView.helpers({

	"insertButtonClass": function() {
		return Customer.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.customer_list || this.customer_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.customer_list && this.customer_list.count() > 0;
	},
	"isNotFound": function() {
		return this.customer_list && pageSession.get("CustomerViewSearchString") && CustomerViewItems(this.customer_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("CustomerViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("CustomerViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("CustomerViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("CustomerViewStyle") == "gallery";
	},
	"toggleAddDeleteButton": function() {
		return Session.get("buttonSuccess") ? "btn btn-primary plus-sign" : "btn btn-danger trash-can";
	},
	"setAddDeleteButtonText": function() {
		return Session.get("buttonSuccess") ? "Add new" : "Delete";
	}

	
});


Template.CustomerViewTable.rendered = function() {

};

Template.CustomerViewTable.events({
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
		var oldSortBy = pageSession.get("CustomerViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("CustomerViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("CustomerViewSortAscending") || false;
			pageSession.set("CustomerViewSortAscending", !sortAscending);
		} else {
			pageSession.set("CustomerViewSortAscending", true);
		}
	}
});

Template.CustomerViewTable.helpers({
	"tableItems": function() {
		return CustomerViewItems(this.customer_list);
	}

});


Template.CustomerViewTableItems.rendered = function() {

};

Template.CustomerViewTableItems.events({
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
		Router.go("accounts.documents.customer.edit", {customerId: this._id});
		return false;
	}

});

Template.CustomerViewTableItems.helpers({
	"checkComplete": function() {
		return Session.get("checkComplete");
	},

	"editButtonClass": function() {
		return Customer.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Customer.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.CustomerViewTableFooter.rendered = function() {

};

Template.CustomerViewTableFooter.events({

	"click #dataview-customer-paginate-buttons": function(e) {
		var documentNumber = parseInt(e.target.textContent, 10);
		Session.set("limit", documentNumber);
	}

});

Template.CustomerViewTableFooter.helpers({

});
