var pageSession = new ReactiveDict();
var recordSelect = new ReactiveArray();


Template.ProjectsDocumentsActivityType.rendered = function() {

};

Template.ProjectsDocumentsActivityType.events({
	
});

Template.ProjectsDocumentsActivityType.helpers({
	
});

var ActivityTypeViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("ActivityTypeViewSearchString");
	var sortBy = pageSession.get("ActivityTypeViewSortBy");
	var sortAscending = pageSession.get("ActivityTypeViewSortAscending");
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

var ActivityTypeViewExport = function(cursor, fileType) {
	var data = ActivityTypeViewItems(cursor);
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


Template.ActivityTypeView.rendered = function() {
	pageSession.set("ActivityTypeViewStyle", "table");
	Session.set("buttonSuccess", true);
	
};

Template.ActivityTypeView.events({
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
				pageSession.set("ActivityTypeViewSearchString", searchString);
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
					pageSession.set("ActivityTypeViewSearchString", searchString);
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
					pageSession.set("ActivityTypeViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-activity-type-insert-delete-button": function(e, t) {
		e.preventDefault();
		if ($(e.target).hasClass("plus-sign")) {
			Router.go("projects.documents.activity_type.insert", {});
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
							Meteor.call("removeActivityType", docIds);
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
		ActivityTypeViewExport(this.activity_type_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		ActivityTypeViewExport(this.activity_type_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		ActivityTypeViewExport(this.activity_type_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		ActivityTypeViewExport(this.activity_type_list, "json");
	}

	
});

Template.ActivityTypeView.helpers({

	"insertButtonClass": function() {
		return ActivityType.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.activity_type_list || this.activity_type_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.activity_type_list && this.activity_type_list.count() > 0;
	},
	"isNotFound": function() {
		return this.activity_type_list && pageSession.get("ActivityTypeViewSearchString") && ActivityTypeViewItems(this.activity_type_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("ActivityTypeViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("ActivityTypeViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("ActivityTypeViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("ActivityTypeViewStyle") == "gallery";
	},
	"toggleAddDeleteButton": function() {
		return Session.get("buttonSuccess") ? "btn btn-primary plus-sign" : "btn btn-danger trash-can";
	},
	"setAddDeleteButtonText": function() {
		return Session.get("buttonSuccess") ? "Add new" : "Delete";
	}

	
});


Template.ActivityTypeViewTable.rendered = function() {

};

Template.ActivityTypeViewTable.events({
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
		var oldSortBy = pageSession.get("ActivityTypeViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("ActivityTypeViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("ActivityTypeViewSortAscending") || false;
			pageSession.set("ActivityTypeViewSortAscending", !sortAscending);
		} else {
			pageSession.set("ActivityTypeViewSortAscending", true);
		}
	}
});

Template.ActivityTypeViewTable.helpers({
	"tableItems": function() {
		return ActivityTypeViewItems(this.activity_type_list);
	}

});


Template.ActivityTypeViewTableItems.rendered = function() {

};

Template.ActivityTypeViewTableItems.events({
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
		Router.go("projects.documents.activity_type.edit", {activityTypeId: this._id});
		return false;
	}

});

Template.ActivityTypeViewTableItems.helpers({
	"checkComplete": function() {
		return Session.get("checkComplete");
	},

	"editButtonClass": function() {
		return ActivityType.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return ActivityType.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.ActivityTypeViewTableFooter.rendered = function() {

};

Template.ActivityTypeViewTableFooter.events({

	"click #dataview-activity-type-paginate-buttons": function(e) {
		var documentNumber = parseInt(e.target.textContent, 10);
		Session.set("limit", documentNumber);
	}

});

Template.ActivityTypeViewTableFooter.helpers({

});
