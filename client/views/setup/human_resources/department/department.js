var pageSession = new ReactiveDict();
var recordSelect = new ReactiveArray();


Template.SetupHumanResourcesDepartment.rendered = function() {

};

Template.SetupHumanResourcesDepartment.events({
	
});

Template.SetupHumanResourcesDepartment.helpers({
	
});

var DepartmentViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("DepartmentViewSearchString");
	var sortBy = pageSession.get("DepartmentViewSortBy");
	var sortAscending = pageSession.get("DepartmentViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["name", "department_name", "leave_block_list"];
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

var DepartmentViewExport = function(cursor, fileType) {
	var data = DepartmentViewItems(cursor);
	var exportFields = ["name", "department_name", "leave_block_list"];

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


Template.DepartmentView.rendered = function() {
	pageSession.set("DepartmentViewStyle", "table");
	Session.set("buttonSuccess", true);
	
};

Template.DepartmentView.events({
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
				pageSession.set("DepartmentViewSearchString", searchString);
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
					pageSession.set("DepartmentViewSearchString", searchString);
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
					pageSession.set("DepartmentViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-department-insert-delete-button": function(e, t) {
		e.preventDefault();
		if ($(e.target).hasClass("plus-sign")) {
			Router.go("setup.human_resources.department.insert", {});
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
							Meteor.call("removeDepartment", docIds);
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
		DepartmentViewExport(this.department_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		DepartmentViewExport(this.department_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		DepartmentViewExport(this.department_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		DepartmentViewExport(this.department_list, "json");
	}

	
});

Template.DepartmentView.helpers({

	"insertButtonClass": function() {
		return Department.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.department_list || this.department_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.department_list && this.department_list.count() > 0;
	},
	"isNotFound": function() {
		return this.department_list && pageSession.get("DepartmentViewSearchString") && DepartmentViewItems(this.department_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("DepartmentViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("DepartmentViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("DepartmentViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("DepartmentViewStyle") == "gallery";
	},
	"toggleAddDeleteButton": function() {
		return Session.get("buttonSuccess") ? "btn btn-primary plus-sign" : "btn btn-danger trash-can";
	},
	"setAddDeleteButtonText": function() {
		return Session.get("buttonSuccess") ? "Add new" : "Delete";
	}

	
});


Template.DepartmentViewTable.rendered = function() {

};

Template.DepartmentViewTable.events({
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
		var oldSortBy = pageSession.get("DepartmentViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("DepartmentViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("DepartmentViewSortAscending") || false;
			pageSession.set("DepartmentViewSortAscending", !sortAscending);
		} else {
			pageSession.set("DepartmentViewSortAscending", true);
		}
	}
});

Template.DepartmentViewTable.helpers({
	"tableItems": function() {
		return DepartmentViewItems(this.department_list);
	}

});


Template.DepartmentViewTableItems.rendered = function() {

};

Template.DepartmentViewTableItems.events({
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
		Router.go("setup.human_resources.department.edit", {departmentId: this._id});
		return false;
	}

});

Template.DepartmentViewTableItems.helpers({
	"checkComplete": function() {
		return Session.get("checkComplete");
	},

	"editButtonClass": function() {
		return Department.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Department.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.DepartmentViewTableFooter.rendered = function() {

};

Template.DepartmentViewTableFooter.events({

	"click #dataview-department-paginate-buttons": function(e) {
		var documentNumber = parseInt(e.target.textContent, 10);
		Session.set("limit", documentNumber);
	}

});

Template.DepartmentViewTableFooter.helpers({

});
