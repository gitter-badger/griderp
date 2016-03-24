var pageSession = new ReactiveDict();
var recordSelect = new ReactiveArray();


Template.SetupAccountsMonthlyDistribution.rendered = function() {

};

Template.SetupAccountsMonthlyDistribution.events({
	
});

Template.SetupAccountsMonthlyDistribution.helpers({
	
});

var MonthlyDistributionViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("MonthlyDistributionViewSearchString");
	var sortBy = pageSession.get("MonthlyDistributionViewSortBy");
	var sortAscending = pageSession.get("MonthlyDistributionViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["name", "distribution_id", "fiscal_year"];
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

var MonthlyDistributionViewExport = function(cursor, fileType) {
	var data = MonthlyDistributionViewItems(cursor);
	var exportFields = ["name", "distribution_id", "fiscal_year"];

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


Template.MonthlyDistributionView.rendered = function() {
	pageSession.set("MonthlyDistributionViewStyle", "table");
	Session.set("buttonSuccess", true);
	
};

Template.MonthlyDistributionView.events({
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
				pageSession.set("MonthlyDistributionViewSearchString", searchString);
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
					pageSession.set("MonthlyDistributionViewSearchString", searchString);
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
					pageSession.set("MonthlyDistributionViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-monthly-distribution-insert-delete-button": function(e, t) {
		e.preventDefault();
		if ($(e.target).hasClass("plus-sign")) {
			Router.go("setup.accounts.monthly_distribution.insert", {});
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
							Meteor.call("removeMonthlyDistribution", docIds);
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
		MonthlyDistributionViewExport(this.monthly_distribution_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		MonthlyDistributionViewExport(this.monthly_distribution_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		MonthlyDistributionViewExport(this.monthly_distribution_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		MonthlyDistributionViewExport(this.monthly_distribution_list, "json");
	}

	
});

Template.MonthlyDistributionView.helpers({

	"insertButtonClass": function() {
		return MonthlyDistribution.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.monthly_distribution_list || this.monthly_distribution_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.monthly_distribution_list && this.monthly_distribution_list.count() > 0;
	},
	"isNotFound": function() {
		return this.monthly_distribution_list && pageSession.get("MonthlyDistributionViewSearchString") && MonthlyDistributionViewItems(this.monthly_distribution_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("MonthlyDistributionViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("MonthlyDistributionViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("MonthlyDistributionViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("MonthlyDistributionViewStyle") == "gallery";
	},
	"toggleAddDeleteButton": function() {
		return Session.get("buttonSuccess") ? "btn btn-primary plus-sign" : "btn btn-danger trash-can";
	},
	"setAddDeleteButtonText": function() {
		return Session.get("buttonSuccess") ? "Add new" : "Delete";
	}

	
});


Template.MonthlyDistributionViewTable.rendered = function() {

};

Template.MonthlyDistributionViewTable.events({
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
		var oldSortBy = pageSession.get("MonthlyDistributionViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("MonthlyDistributionViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("MonthlyDistributionViewSortAscending") || false;
			pageSession.set("MonthlyDistributionViewSortAscending", !sortAscending);
		} else {
			pageSession.set("MonthlyDistributionViewSortAscending", true);
		}
	}
});

Template.MonthlyDistributionViewTable.helpers({
	"tableItems": function() {
		return MonthlyDistributionViewItems(this.monthly_distribution_list);
	}

});


Template.MonthlyDistributionViewTableItems.rendered = function() {

};

Template.MonthlyDistributionViewTableItems.events({
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
		Router.go("setup.accounts.monthly_distribution.edit", {monthlyDistributionId: this._id});
		return false;
	}

});

Template.MonthlyDistributionViewTableItems.helpers({
	"checkComplete": function() {
		return Session.get("checkComplete");
	},

	"editButtonClass": function() {
		return MonthlyDistribution.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return MonthlyDistribution.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.MonthlyDistributionViewTableFooter.rendered = function() {

};

Template.MonthlyDistributionViewTableFooter.events({

	"click #dataview-monthly-distribution-paginate-buttons": function(e) {
		var documentNumber = parseInt(e.target.textContent, 10);
		Session.set("limit", documentNumber);
	}

});

Template.MonthlyDistributionViewTableFooter.helpers({

});
