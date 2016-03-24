var pageSession = new ReactiveDict();
var recordSelect = new ReactiveArray();


Template.ProjectsDocumentsProject.rendered = function() {

};

Template.ProjectsDocumentsProject.events({
	
});

Template.ProjectsDocumentsProject.helpers({
	
});

var ProjectViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("ProjectViewSearchString");
	var sortBy = pageSession.get("ProjectViewSortBy");
	var sortAscending = pageSession.get("ProjectViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["name", "status", "estimated_costing"];
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

var ProjectViewExport = function(cursor, fileType) {
	var data = ProjectViewItems(cursor);
	var exportFields = ["name", "status", "estimated_costing"];

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


Template.ProjectView.rendered = function() {
	pageSession.set("ProjectViewStyle", "table");
	Session.set("buttonSuccess", true);
	
};

Template.ProjectView.events({
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
				pageSession.set("ProjectViewSearchString", searchString);
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
					pageSession.set("ProjectViewSearchString", searchString);
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
					pageSession.set("ProjectViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-project-insert-delete-button": function(e, t) {
		e.preventDefault();
		if ($(e.target).hasClass("plus-sign")) {
			Router.go("projects.documents.project.insert", {});
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
							Meteor.call("removeProject", docIds);
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
		ProjectViewExport(this.project_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		ProjectViewExport(this.project_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		ProjectViewExport(this.project_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		ProjectViewExport(this.project_list, "json");
	}

	
});

Template.ProjectView.helpers({

	"insertButtonClass": function() {
		return Project.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.project_list || this.project_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.project_list && this.project_list.count() > 0;
	},
	"isNotFound": function() {
		return this.project_list && pageSession.get("ProjectViewSearchString") && ProjectViewItems(this.project_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("ProjectViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("ProjectViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("ProjectViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("ProjectViewStyle") == "gallery";
	},
	"toggleAddDeleteButton": function() {
		return Session.get("buttonSuccess") ? "btn btn-primary plus-sign" : "btn btn-danger trash-can";
	},
	"setAddDeleteButtonText": function() {
		return Session.get("buttonSuccess") ? "Add new" : "Delete";
	}

	
});


Template.ProjectViewTable.rendered = function() {

};

Template.ProjectViewTable.events({
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
		var oldSortBy = pageSession.get("ProjectViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("ProjectViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("ProjectViewSortAscending") || false;
			pageSession.set("ProjectViewSortAscending", !sortAscending);
		} else {
			pageSession.set("ProjectViewSortAscending", true);
		}
	}
});

Template.ProjectViewTable.helpers({
	"tableItems": function() {
		return ProjectViewItems(this.project_list);
	}

});


Template.ProjectViewTableItems.rendered = function() {

};

Template.ProjectViewTableItems.events({
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
		Router.go("projects.documents.project.edit", {projectId: this._id});
		return false;
	}

});

Template.ProjectViewTableItems.helpers({
	"checkComplete": function() {
		return Session.get("checkComplete");
	},

	"editButtonClass": function() {
		return Project.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Project.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.ProjectViewTableFooter.rendered = function() {

};

Template.ProjectViewTableFooter.events({

	"click #dataview-project-paginate-buttons": function(e) {
		var documentNumber = parseInt(e.target.textContent, 10);
		Session.set("limit", documentNumber);
	}

});

Template.ProjectViewTableFooter.helpers({

});
