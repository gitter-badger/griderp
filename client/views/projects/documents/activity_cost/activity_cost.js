var pageSession = new ReactiveDict();
var recordSelect = new ReactiveArray();


Template.ProjectsDocumentsActivityCost.rendered = function() {

};

Template.ProjectsDocumentsActivityCost.events({
	
});

Template.ProjectsDocumentsActivityCost.helpers({
	
});

var ActivityCostViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("ActivityCostViewSearchString");
	var sortBy = pageSession.get("ActivityCostViewSortBy");
	var sortAscending = pageSession.get("ActivityCostViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["name"];
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

var ActivityCostViewExport = function(cursor, fileType) {
	var data = ActivityCostViewItems(cursor);
	var exportFields = ["name"];

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


Template.ActivityCostView.rendered = function() {
	pageSession.set("ActivityCostViewStyle", "table");
	Session.set("buttonSuccess", true);
	
};

Template.ActivityCostView.events({
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
				pageSession.set("ActivityCostViewSearchString", searchString);
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
					pageSession.set("ActivityCostViewSearchString", searchString);
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
					pageSession.set("ActivityCostViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-activity-cost-insert-delete-button": function(e, t) {
		e.preventDefault();
		if ($(e.target).hasClass("plus-sign")) {
			Router.go("projects.documents.activity_cost.insert", {});
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
							Meteor.call("removeActivityCost", docIds);
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
		ActivityCostViewExport(this.activity_cost_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		ActivityCostViewExport(this.activity_cost_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		ActivityCostViewExport(this.activity_cost_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		ActivityCostViewExport(this.activity_cost_list, "json");
	}

	
});

Template.ActivityCostView.helpers({

	"insertButtonClass": function() {
		return ActivityCost.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.activity_cost_list || this.activity_cost_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.activity_cost_list && this.activity_cost_list.count() > 0;
	},
	"isNotFound": function() {
		return this.activity_cost_list && pageSession.get("ActivityCostViewSearchString") && ActivityCostViewItems(this.activity_cost_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("ActivityCostViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("ActivityCostViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("ActivityCostViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("ActivityCostViewStyle") == "gallery";
	},
	"toggleAddDeleteButton": function() {
		return Session.get("buttonSuccess") ? "btn btn-primary plus-sign" : "btn btn-danger trash-can";
	},
	"setAddDeleteButtonText": function() {
		return Session.get("buttonSuccess") ? "Add new" : "Delete";
	}

	
});


Template.ActivityCostViewTable.rendered = function() {

};

Template.ActivityCostViewTable.events({
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
		var oldSortBy = pageSession.get("ActivityCostViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("ActivityCostViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("ActivityCostViewSortAscending") || false;
			pageSession.set("ActivityCostViewSortAscending", !sortAscending);
		} else {
			pageSession.set("ActivityCostViewSortAscending", true);
		}
	}
});

Template.ActivityCostViewTable.helpers({
	"tableItems": function() {
		return ActivityCostViewItems(this.activity_cost_list);
	}

});


Template.ActivityCostViewTableItems.rendered = function() {

};

Template.ActivityCostViewTableItems.events({
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
		Router.go("projects.documents.activity_cost.edit", {activityCostId: this._id});
		return false;
	}

});

Template.ActivityCostViewTableItems.helpers({
	"checkComplete": function() {
		return Session.get("checkComplete");
	},

	"editButtonClass": function() {
		return ActivityCost.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return ActivityCost.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.ActivityCostViewTableFooter.rendered = function() {

};

Template.ActivityCostViewTableFooter.events({

	"click #dataview-activity-cost-paginate-buttons": function(e) {
		var documentNumber = parseInt(e.target.textContent, 10);
		Session.set("limit", documentNumber);
	}

});

Template.ActivityCostViewTableFooter.helpers({

});
