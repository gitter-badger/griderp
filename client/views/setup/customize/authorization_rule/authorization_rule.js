var pageSession = new ReactiveDict();
var recordSelect = new ReactiveArray();


Template.SetupCustomizeAuthorizationRule.rendered = function() {

};

Template.SetupCustomizeAuthorizationRule.events({
	
});

Template.SetupCustomizeAuthorizationRule.helpers({
	
});

var AuthorizationRuleViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("AuthorizationRuleViewSearchString");
	var sortBy = pageSession.get("AuthorizationRuleViewSortBy");
	var sortAscending = pageSession.get("AuthorizationRuleViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["name", "transaction", "Based On"];
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

var AuthorizationRuleViewExport = function(cursor, fileType) {
	var data = AuthorizationRuleViewItems(cursor);
	var exportFields = ["name", "transaction", "Based On"];

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


Template.AuthorizationRuleView.rendered = function() {
	pageSession.set("AuthorizationRuleViewStyle", "table");
	Session.set("buttonSuccess", true);
	
};

Template.AuthorizationRuleView.events({
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
				pageSession.set("AuthorizationRuleViewSearchString", searchString);
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
					pageSession.set("AuthorizationRuleViewSearchString", searchString);
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
					pageSession.set("AuthorizationRuleViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-authorization-rule-insert-delete-button": function(e, t) {
		e.preventDefault();
		if ($(e.target).hasClass("plus-sign")) {
			Router.go("setup.customize.authorization_rule.insert", {});
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
							Meteor.call("removeAuthorizationRule", docIds);
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
		AuthorizationRuleViewExport(this.authorization_rule_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		AuthorizationRuleViewExport(this.authorization_rule_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		AuthorizationRuleViewExport(this.authorization_rule_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		AuthorizationRuleViewExport(this.authorization_rule_list, "json");
	}

	
});

Template.AuthorizationRuleView.helpers({

	"insertButtonClass": function() {
		return AuthorizationRule.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.authorization_rule_list || this.authorization_rule_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.authorization_rule_list && this.authorization_rule_list.count() > 0;
	},
	"isNotFound": function() {
		return this.authorization_rule_list && pageSession.get("AuthorizationRuleViewSearchString") && AuthorizationRuleViewItems(this.authorization_rule_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("AuthorizationRuleViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("AuthorizationRuleViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("AuthorizationRuleViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("AuthorizationRuleViewStyle") == "gallery";
	},
	"toggleAddDeleteButton": function() {
		return Session.get("buttonSuccess") ? "btn btn-primary plus-sign" : "btn btn-danger trash-can";
	},
	"setAddDeleteButtonText": function() {
		return Session.get("buttonSuccess") ? "Add new" : "Delete";
	}

	
});


Template.AuthorizationRuleViewTable.rendered = function() {

};

Template.AuthorizationRuleViewTable.events({
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
		var oldSortBy = pageSession.get("AuthorizationRuleViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("AuthorizationRuleViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("AuthorizationRuleViewSortAscending") || false;
			pageSession.set("AuthorizationRuleViewSortAscending", !sortAscending);
		} else {
			pageSession.set("AuthorizationRuleViewSortAscending", true);
		}
	}
});

Template.AuthorizationRuleViewTable.helpers({
	"tableItems": function() {
		return AuthorizationRuleViewItems(this.authorization_rule_list);
	}

});


Template.AuthorizationRuleViewTableItems.rendered = function() {

};

Template.AuthorizationRuleViewTableItems.events({
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
		Router.go("setup.customize.authorization_rule.edit", {authorizationRuleId: this._id});
		return false;
	}

});

Template.AuthorizationRuleViewTableItems.helpers({
	"checkComplete": function() {
		return Session.get("checkComplete");
	},

	"editButtonClass": function() {
		return AuthorizationRule.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return AuthorizationRule.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.AuthorizationRuleViewTableFooter.rendered = function() {

};

Template.AuthorizationRuleViewTableFooter.events({

	"click #dataview-authorization-rule-paginate-buttons": function(e) {
		var documentNumber = parseInt(e.target.textContent, 10);
		Session.set("limit", documentNumber);
	}

});

Template.AuthorizationRuleViewTableFooter.helpers({

});
