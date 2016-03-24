var pageSession = new ReactiveDict();
var recordSelect = new ReactiveArray();


Template.SetupAccountsShippingRule.rendered = function() {

};

Template.SetupAccountsShippingRule.events({
	
});

Template.SetupAccountsShippingRule.helpers({
	
});

var ShippingRuleViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("ShippingRuleViewSearchString");
	var sortBy = pageSession.get("ShippingRuleViewSortBy");
	var sortAscending = pageSession.get("ShippingRuleViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["name", "label", "calculate_based_on"];
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

var ShippingRuleViewExport = function(cursor, fileType) {
	var data = ShippingRuleViewItems(cursor);
	var exportFields = ["name", "label", "calculate_based_on"];

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


Template.ShippingRuleView.rendered = function() {
	pageSession.set("ShippingRuleViewStyle", "table");
	Session.set("buttonSuccess", true);
	
};

Template.ShippingRuleView.events({
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
				pageSession.set("ShippingRuleViewSearchString", searchString);
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
					pageSession.set("ShippingRuleViewSearchString", searchString);
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
					pageSession.set("ShippingRuleViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-shipping-rule-insert-delete-button": function(e, t) {
		e.preventDefault();
		if ($(e.target).hasClass("plus-sign")) {
			Router.go("setup.accounts.shipping_rule.insert", {});
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
							Meteor.call("removeShippingRule", docIds);
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
		ShippingRuleViewExport(this.shipping_rule_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		ShippingRuleViewExport(this.shipping_rule_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		ShippingRuleViewExport(this.shipping_rule_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		ShippingRuleViewExport(this.shipping_rule_list, "json");
	}

	
});

Template.ShippingRuleView.helpers({

	"insertButtonClass": function() {
		return ShippingRule.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.shipping_rule_list || this.shipping_rule_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.shipping_rule_list && this.shipping_rule_list.count() > 0;
	},
	"isNotFound": function() {
		return this.shipping_rule_list && pageSession.get("ShippingRuleViewSearchString") && ShippingRuleViewItems(this.shipping_rule_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("ShippingRuleViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("ShippingRuleViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("ShippingRuleViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("ShippingRuleViewStyle") == "gallery";
	},
	"toggleAddDeleteButton": function() {
		return Session.get("buttonSuccess") ? "btn btn-primary plus-sign" : "btn btn-danger trash-can";
	},
	"setAddDeleteButtonText": function() {
		return Session.get("buttonSuccess") ? "Add new" : "Delete";
	}

	
});


Template.ShippingRuleViewTable.rendered = function() {

};

Template.ShippingRuleViewTable.events({
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
		var oldSortBy = pageSession.get("ShippingRuleViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("ShippingRuleViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("ShippingRuleViewSortAscending") || false;
			pageSession.set("ShippingRuleViewSortAscending", !sortAscending);
		} else {
			pageSession.set("ShippingRuleViewSortAscending", true);
		}
	}
});

Template.ShippingRuleViewTable.helpers({
	"tableItems": function() {
		return ShippingRuleViewItems(this.shipping_rule_list);
	}

});


Template.ShippingRuleViewTableItems.rendered = function() {

};

Template.ShippingRuleViewTableItems.events({
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
		Router.go("setup.accounts.shipping_rule.edit", {shippingRuleId: this._id});
		return false;
	}

});

Template.ShippingRuleViewTableItems.helpers({
	"checkComplete": function() {
		return Session.get("checkComplete");
	},

	"editButtonClass": function() {
		return ShippingRule.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return ShippingRule.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.ShippingRuleViewTableFooter.rendered = function() {

};

Template.ShippingRuleViewTableFooter.events({

	"click #dataview-shipping-rule-paginate-buttons": function(e) {
		var documentNumber = parseInt(e.target.textContent, 10);
		Session.set("limit", documentNumber);
	}

});

Template.ShippingRuleViewTableFooter.helpers({

});
