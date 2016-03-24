var pageSession = new ReactiveDict();
var recordSelect = new ReactiveArray();


Template.SupportDocumentsMaintenanceSchedule.rendered = function() {

};

Template.SupportDocumentsMaintenanceSchedule.events({
	
});

Template.SupportDocumentsMaintenanceSchedule.helpers({
	
});

var MaintenanceScheduleViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("MaintenanceScheduleViewSearchString");
	var sortBy = pageSession.get("MaintenanceScheduleViewSortBy");
	var sortAscending = pageSession.get("MaintenanceScheduleViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["name", "status", "customer_name"];
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

var MaintenanceScheduleViewExport = function(cursor, fileType) {
	var data = MaintenanceScheduleViewItems(cursor);
	var exportFields = ["name", "status", "customer_name"];

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


Template.MaintenanceScheduleView.rendered = function() {
	pageSession.set("MaintenanceScheduleViewStyle", "table");
	Session.set("buttonSuccess", true);
	
};

Template.MaintenanceScheduleView.events({
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
				pageSession.set("MaintenanceScheduleViewSearchString", searchString);
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
					pageSession.set("MaintenanceScheduleViewSearchString", searchString);
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
					pageSession.set("MaintenanceScheduleViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-maintenance-schedule-insert-delete-button": function(e, t) {
		e.preventDefault();
		if ($(e.target).hasClass("plus-sign")) {
			Router.go("support.documents.maintenance_schedule.insert", {});
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
							Meteor.call("removeMaintenanceSchedule", docIds);
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
		MaintenanceScheduleViewExport(this.maintenance_schedule_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		MaintenanceScheduleViewExport(this.maintenance_schedule_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		MaintenanceScheduleViewExport(this.maintenance_schedule_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		MaintenanceScheduleViewExport(this.maintenance_schedule_list, "json");
	}

	
});

Template.MaintenanceScheduleView.helpers({

	"insertButtonClass": function() {
		return MaintenanceSchedule.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.maintenance_schedule_list || this.maintenance_schedule_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.maintenance_schedule_list && this.maintenance_schedule_list.count() > 0;
	},
	"isNotFound": function() {
		return this.maintenance_schedule_list && pageSession.get("MaintenanceScheduleViewSearchString") && MaintenanceScheduleViewItems(this.maintenance_schedule_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("MaintenanceScheduleViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("MaintenanceScheduleViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("MaintenanceScheduleViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("MaintenanceScheduleViewStyle") == "gallery";
	},
	"toggleAddDeleteButton": function() {
		return Session.get("buttonSuccess") ? "btn btn-primary plus-sign" : "btn btn-danger trash-can";
	},
	"setAddDeleteButtonText": function() {
		return Session.get("buttonSuccess") ? "Add new" : "Delete";
	}

	
});


Template.MaintenanceScheduleViewTable.rendered = function() {

};

Template.MaintenanceScheduleViewTable.events({
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
		var oldSortBy = pageSession.get("MaintenanceScheduleViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("MaintenanceScheduleViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("MaintenanceScheduleViewSortAscending") || false;
			pageSession.set("MaintenanceScheduleViewSortAscending", !sortAscending);
		} else {
			pageSession.set("MaintenanceScheduleViewSortAscending", true);
		}
	}
});

Template.MaintenanceScheduleViewTable.helpers({
	"tableItems": function() {
		return MaintenanceScheduleViewItems(this.maintenance_schedule_list);
	}

});


Template.MaintenanceScheduleViewTableItems.rendered = function() {

};

Template.MaintenanceScheduleViewTableItems.events({
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
		Router.go("support.documents.maintenance_schedule.edit", {maintenanceScheduleId: this._id});
		return false;
	}

});

Template.MaintenanceScheduleViewTableItems.helpers({
	"checkComplete": function() {
		return Session.get("checkComplete");
	},

	"editButtonClass": function() {
		return MaintenanceSchedule.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return MaintenanceSchedule.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.MaintenanceScheduleViewTableFooter.rendered = function() {

};

Template.MaintenanceScheduleViewTableFooter.events({

	"click #dataview-maintenance-schedule-paginate-buttons": function(e) {
		var documentNumber = parseInt(e.target.textContent, 10);
		Session.set("limit", documentNumber);
	}

});

Template.MaintenanceScheduleViewTableFooter.helpers({

});
