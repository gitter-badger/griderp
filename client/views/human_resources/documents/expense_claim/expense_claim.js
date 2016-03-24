var pageSession = new ReactiveDict();
var recordSelect = new ReactiveArray();


Template.HumanResourcesDocumentsExpenseClaim.rendered = function() {

};

Template.HumanResourcesDocumentsExpenseClaim.events({
	
});

Template.HumanResourcesDocumentsExpenseClaim.helpers({
	
});

var ExpenseClaimViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("ExpenseClaimViewSearchString");
	var sortBy = pageSession.get("ExpenseClaimViewSortBy");
	var sortAscending = pageSession.get("ExpenseClaimViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["title", "approval_status", "total_claimed_amount", "name"];
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

var ExpenseClaimViewExport = function(cursor, fileType) {
	var data = ExpenseClaimViewItems(cursor);
	var exportFields = ["title", "approval_status", "total_claimed_amount", "name"];

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


Template.ExpenseClaimView.rendered = function() {
	pageSession.set("ExpenseClaimViewStyle", "table");
	Session.set("buttonSuccess", true);
	
};

Template.ExpenseClaimView.events({
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
				pageSession.set("ExpenseClaimViewSearchString", searchString);
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
					pageSession.set("ExpenseClaimViewSearchString", searchString);
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
					pageSession.set("ExpenseClaimViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-expense-claim-insert-delete-button": function(e, t) {
		e.preventDefault();
		if ($(e.target).hasClass("plus-sign")) {
			Router.go("human_resources.documents.expense_claim.insert", {});
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
							Meteor.call("removeExpenseClaim", docIds);
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
		ExpenseClaimViewExport(this.expense_claim_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		ExpenseClaimViewExport(this.expense_claim_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		ExpenseClaimViewExport(this.expense_claim_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		ExpenseClaimViewExport(this.expense_claim_list, "json");
	}

	
});

Template.ExpenseClaimView.helpers({

	"insertButtonClass": function() {
		return ExpenseClaim.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.expense_claim_list || this.expense_claim_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.expense_claim_list && this.expense_claim_list.count() > 0;
	},
	"isNotFound": function() {
		return this.expense_claim_list && pageSession.get("ExpenseClaimViewSearchString") && ExpenseClaimViewItems(this.expense_claim_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("ExpenseClaimViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("ExpenseClaimViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("ExpenseClaimViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("ExpenseClaimViewStyle") == "gallery";
	},
	"toggleAddDeleteButton": function() {
		return Session.get("buttonSuccess") ? "btn btn-primary plus-sign" : "btn btn-danger trash-can";
	},
	"setAddDeleteButtonText": function() {
		return Session.get("buttonSuccess") ? "Add new" : "Delete";
	}

	
});


Template.ExpenseClaimViewTable.rendered = function() {

};

Template.ExpenseClaimViewTable.events({
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
		var oldSortBy = pageSession.get("ExpenseClaimViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("ExpenseClaimViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("ExpenseClaimViewSortAscending") || false;
			pageSession.set("ExpenseClaimViewSortAscending", !sortAscending);
		} else {
			pageSession.set("ExpenseClaimViewSortAscending", true);
		}
	}
});

Template.ExpenseClaimViewTable.helpers({
	"tableItems": function() {
		return ExpenseClaimViewItems(this.expense_claim_list);
	}

});


Template.ExpenseClaimViewTableItems.rendered = function() {

};

Template.ExpenseClaimViewTableItems.events({
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
		Router.go("human_resources.documents.expense_claim.edit", {expenseClaimId: this._id});
		return false;
	}

});

Template.ExpenseClaimViewTableItems.helpers({
	"checkComplete": function() {
		return Session.get("checkComplete");
	},

	"editButtonClass": function() {
		return ExpenseClaim.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return ExpenseClaim.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	},

	"totalClaimedAmount": function() {
		var claimedAmount = ExpenseClaim.findOne({_id: this._id});
		return accounting.formatMoney(claimedAmount.total_claimed_amount);
	}

});

Template.ExpenseClaimViewTableFooter.rendered = function() {

};

Template.ExpenseClaimViewTableFooter.events({

	"click #dataview-expense-claim-paginate-buttons": function(e) {
		var documentNumber = parseInt(e.target.textContent, 10);
		Session.set("limit", documentNumber);
	}

});

Template.ExpenseClaimViewTableFooter.helpers({

});
