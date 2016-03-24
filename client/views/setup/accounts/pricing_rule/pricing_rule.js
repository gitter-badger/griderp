var pageSession = new ReactiveDict();
var recordSelect = new ReactiveArray();


Template.SetupAccountsPricingRule.rendered = function() {

};

Template.SetupAccountsPricingRule.events({
	
});

Template.SetupAccountsPricingRule.helpers({
	
});

var PricingRuleViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("PricingRuleViewSearchString");
	var sortBy = pageSession.get("PricingRuleViewSortBy");
	var sortAscending = pageSession.get("PricingRuleViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["title", "apply_on", "item_code", "name"];
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

var PricingRuleViewExport = function(cursor, fileType) {
	var data = PricingRuleViewItems(cursor);
	var exportFields = ["title", "apply_on", "item_code", "name"];

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


Template.PricingRuleView.rendered = function() {
	pageSession.set("PricingRuleViewStyle", "table");
	Session.set("buttonSuccess", true);
	
};

Template.PricingRuleView.events({
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
				pageSession.set("PricingRuleViewSearchString", searchString);
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
					pageSession.set("PricingRuleViewSearchString", searchString);
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
					pageSession.set("PricingRuleViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-pricing-rule-insert-delete-button": function(e, t) {
		e.preventDefault();
		if ($(e.target).hasClass("plus-sign")) {
			Router.go("setup.accounts.pricing_rule.insert", {});
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
							Meteor.call("removePricingRule", docIds);
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
		PricingRuleViewExport(this.pricing_rule_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		PricingRuleViewExport(this.pricing_rule_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		PricingRuleViewExport(this.pricing_rule_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		PricingRuleViewExport(this.pricing_rule_list, "json");
	}

	
});

Template.PricingRuleView.helpers({

	"insertButtonClass": function() {
		return PricingRule.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.pricing_rule_list || this.pricing_rule_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.pricing_rule_list && this.pricing_rule_list.count() > 0;
	},
	"isNotFound": function() {
		return this.pricing_rule_list && pageSession.get("PricingRuleViewSearchString") && PricingRuleViewItems(this.pricing_rule_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("PricingRuleViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("PricingRuleViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("PricingRuleViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("PricingRuleViewStyle") == "gallery";
	},
	"toggleAddDeleteButton": function() {
		return Session.get("buttonSuccess") ? "btn btn-primary plus-sign" : "btn btn-danger trash-can";
	},
	"setAddDeleteButtonText": function() {
		return Session.get("buttonSuccess") ? "Add new" : "Delete";
	}

	
});


Template.PricingRuleViewTable.rendered = function() {

};

Template.PricingRuleViewTable.events({
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
		var oldSortBy = pageSession.get("PricingRuleViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("PricingRuleViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("PricingRuleViewSortAscending") || false;
			pageSession.set("PricingRuleViewSortAscending", !sortAscending);
		} else {
			pageSession.set("PricingRuleViewSortAscending", true);
		}
	}
});

Template.PricingRuleViewTable.helpers({
	"tableItems": function() {
		return PricingRuleViewItems(this.pricing_rule_list);
	}

});


Template.PricingRuleViewTableItems.rendered = function() {

};

Template.PricingRuleViewTableItems.events({
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
		Router.go("setup.accounts.pricing_rule.edit", {pricingRuleId: this._id});
		return false;
	}

});

Template.PricingRuleViewTableItems.helpers({
	"checkComplete": function() {
		return Session.get("checkComplete");
	},

	"editButtonClass": function() {
		return PricingRule.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return PricingRule.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.PricingRuleViewTableFooter.rendered = function() {

};

Template.PricingRuleViewTableFooter.events({

	"click #dataview-pricing-rule-paginate-buttons": function(e) {
		var documentNumber = parseInt(e.target.textContent, 10);
		Session.set("limit", documentNumber);
	}

});

Template.PricingRuleViewTableFooter.helpers({

});
