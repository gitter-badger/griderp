var pageSession = new ReactiveDict();
var recordSelect = new ReactiveArray();


Template.SetupAccountsTaxRule.rendered = function() {

};

Template.SetupAccountsTaxRule.events({
	
});

Template.SetupAccountsTaxRule.helpers({
	
});

var TaxRuleViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("TaxRuleViewSearchString");
	var sortBy = pageSession.get("TaxRuleViewSortBy");
	var sortAscending = pageSession.get("TaxRuleViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["name", "tax_type"];
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

var TaxRuleViewExport = function(cursor, fileType) {
	var data = TaxRuleViewItems(cursor);
	var exportFields = ["name", "tax_type"];

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


Template.TaxRuleView.rendered = function() {
	pageSession.set("TaxRuleViewStyle", "table");
	Session.set("buttonSuccess", true);
	
};

Template.TaxRuleView.events({
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
				pageSession.set("TaxRuleViewSearchString", searchString);
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
					pageSession.set("TaxRuleViewSearchString", searchString);
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
					pageSession.set("TaxRuleViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-tax-rule-insert-delete-button": function(e, t) {
		e.preventDefault();
		if ($(e.target).hasClass("plus-sign")) {
			Router.go("setup.accounts.tax_rule.insert", {});
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
							Meteor.call("removeTaxRule", docIds);
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
		TaxRuleViewExport(this.tax_rule_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		TaxRuleViewExport(this.tax_rule_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		TaxRuleViewExport(this.tax_rule_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		TaxRuleViewExport(this.tax_rule_list, "json");
	}

	
});

Template.TaxRuleView.helpers({

	"insertButtonClass": function() {
		return TaxRule.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.tax_rule_list || this.tax_rule_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.tax_rule_list && this.tax_rule_list.count() > 0;
	},
	"isNotFound": function() {
		return this.tax_rule_list && pageSession.get("TaxRuleViewSearchString") && TaxRuleViewItems(this.tax_rule_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("TaxRuleViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("TaxRuleViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("TaxRuleViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("TaxRuleViewStyle") == "gallery";
	},
	"toggleAddDeleteButton": function() {
		return Session.get("buttonSuccess") ? "btn btn-primary plus-sign" : "btn btn-danger trash-can";
	},
	"setAddDeleteButtonText": function() {
		return Session.get("buttonSuccess") ? "Add new" : "Delete";
	}

	
});


Template.TaxRuleViewTable.rendered = function() {

};

Template.TaxRuleViewTable.events({
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
		var oldSortBy = pageSession.get("TaxRuleViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("TaxRuleViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("TaxRuleViewSortAscending") || false;
			pageSession.set("TaxRuleViewSortAscending", !sortAscending);
		} else {
			pageSession.set("TaxRuleViewSortAscending", true);
		}
	}
});

Template.TaxRuleViewTable.helpers({
	"tableItems": function() {
		return TaxRuleViewItems(this.tax_rule_list);
	}

});


Template.TaxRuleViewTableItems.rendered = function() {

};

Template.TaxRuleViewTableItems.events({
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
		Router.go("setup.accounts.tax_rule.edit", {taxRuleId: this._id});
		return false;
	}

});

Template.TaxRuleViewTableItems.helpers({
	"checkComplete": function() {
		return Session.get("checkComplete");
	},

	"editButtonClass": function() {
		return TaxRule.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return TaxRule.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.TaxRuleViewTableFooter.rendered = function() {

};

Template.TaxRuleViewTableFooter.events({

	"click #dataview-tax-rule-paginate-buttons": function(e) {
		var documentNumber = parseInt(e.target.textContent, 10);
		Session.set("limit", documentNumber);
	}

});

Template.TaxRuleViewTableFooter.helpers({

});
