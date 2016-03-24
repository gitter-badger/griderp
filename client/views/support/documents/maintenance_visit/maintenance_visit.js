var pageSession = new ReactiveDict();
var recordSelect = new ReactiveArray();


Template.SupportDocumentsMaintenanceVisit.rendered = function() {

};

Template.SupportDocumentsMaintenanceVisit.events({
	
});

Template.SupportDocumentsMaintenanceVisit.helpers({
	
});

var MaintenanceVisitViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("MaintenanceVisitViewSearchString");
	var sortBy = pageSession.get("MaintenanceVisitViewSortBy");
	var sortAscending = pageSession.get("MaintenanceVisitViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["customer", "status", "completion_status"];
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

var MaintenanceVisitViewExport = function(cursor, fileType) {
	var data = MaintenanceVisitViewItems(cursor);
	var exportFields = ["customer", "status", "completion_status"];

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


Template.MaintenanceVisitView.rendered = function() {
	pageSession.set("MaintenanceVisitViewStyle", "table");
	Session.set("buttonSuccess", true);
	
};

Template.MaintenanceVisitView.events({
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
				pageSession.set("MaintenanceVisitViewSearchString", searchString);
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
					pageSession.set("MaintenanceVisitViewSearchString", searchString);
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
					pageSession.set("MaintenanceVisitViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-maintenance-visit-insert-delete-button": function(e, t) {
		e.preventDefault();
		if ($(e.target).hasClass("plus-sign")) {
			Router.go("support.documents.maintenance_visit.insert", {});
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
							Meteor.call("removeMaintenanceVisit", docIds);
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
		MaintenanceVisitViewExport(this.maintenance_visit_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		MaintenanceVisitViewExport(this.maintenance_visit_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		MaintenanceVisitViewExport(this.maintenance_visit_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		MaintenanceVisitViewExport(this.maintenance_visit_list, "json");
	}

	
});

Template.MaintenanceVisitView.helpers({

	"insertButtonClass": function() {
		return MaintenanceVisit.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.maintenance_visit_list || this.maintenance_visit_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.maintenance_visit_list && this.maintenance_visit_list.count() > 0;
	},
	"isNotFound": function() {
		return this.maintenance_visit_list && pageSession.get("MaintenanceVisitViewSearchString") && MaintenanceVisitViewItems(this.maintenance_visit_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("MaintenanceVisitViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("MaintenanceVisitViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("MaintenanceVisitViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("MaintenanceVisitViewStyle") == "gallery";
	},
	"toggleAddDeleteButton": function() {
		return Session.get("buttonSuccess") ? "btn btn-primary plus-sign" : "btn btn-danger trash-can";
	},
	"setAddDeleteButtonText": function() {
		return Session.get("buttonSuccess") ? "Add new" : "Delete";
	}

	
});


Template.MaintenanceVisitViewTable.rendered = function() {

};

Template.MaintenanceVisitViewTable.events({
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
		var oldSortBy = pageSession.get("MaintenanceVisitViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("MaintenanceVisitViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("MaintenanceVisitViewSortAscending") || false;
			pageSession.set("MaintenanceVisitViewSortAscending", !sortAscending);
		} else {
			pageSession.set("MaintenanceVisitViewSortAscending", true);
		}
	}
});

Template.MaintenanceVisitViewTable.helpers({
	"tableItems": function() {
		return MaintenanceVisitViewItems(this.maintenance_visit_list);
	}

});


Template.MaintenanceVisitViewTableItems.rendered = function() {

};

Template.MaintenanceVisitViewTableItems.events({
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
		Router.go("support.documents.maintenance_visit.edit", {maintenanceVisitId: this._id});
		return false;
	}

});

Template.MaintenanceVisitViewTableItems.helpers({
	"checkComplete": function() {
		return Session.get("checkComplete");
	},

	"editButtonClass": function() {
		return MaintenanceVisit.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return MaintenanceVisit.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.MaintenanceVisitViewTableFooter.rendered = function() {

};

Template.MaintenanceVisitViewTableFooter.events({

	"click #dataview-maintenance-visit-paginate-buttons": function(e) {
		var documentNumber = parseInt(e.target.textContent, 10);
		Session.set("limit", documentNumber);
	}

});

Template.MaintenanceVisitViewTableFooter.helpers({

});
