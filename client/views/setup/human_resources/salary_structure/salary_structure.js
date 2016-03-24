var pageSession = new ReactiveDict();
var recordSelect = new ReactiveArray();


Template.SetupHumanResourcesSalaryStructure.rendered = function() {

};

Template.SetupHumanResourcesSalaryStructure.events({
	
});

Template.SetupHumanResourcesSalaryStructure.helpers({
	
});

var SalaryStructureViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("SalaryStructureViewSearchString");
	var sortBy = pageSession.get("SalaryStructureViewSortBy");
	var sortAscending = pageSession.get("SalaryStructureViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["employee_name", "is_active", "from_date"];
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

var SalaryStructureViewExport = function(cursor, fileType) {
	var data = SalaryStructureViewItems(cursor);
	var exportFields = ["employee_name", "is_active", "from_date"];

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


Template.SalaryStructureView.rendered = function() {
	pageSession.set("SalaryStructureViewStyle", "table");
	Session.set("buttonSuccess", true);
	
};

Template.SalaryStructureView.events({
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
				pageSession.set("SalaryStructureViewSearchString", searchString);
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
					pageSession.set("SalaryStructureViewSearchString", searchString);
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
					pageSession.set("SalaryStructureViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-salary-structure-insert-delete-button": function(e, t) {
		e.preventDefault();
		if ($(e.target).hasClass("plus-sign")) {
			Router.go("setup.human_resources.salary_structure.insert", {});
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
							Meteor.call("removeSalaryStructure", docIds);
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
		SalaryStructureViewExport(this.salary_structure_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		SalaryStructureViewExport(this.salary_structure_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		SalaryStructureViewExport(this.salary_structure_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		SalaryStructureViewExport(this.salary_structure_list, "json");
	}

	
});

Template.SalaryStructureView.helpers({

	"insertButtonClass": function() {
		return SalaryStructure.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.salary_structure_list || this.salary_structure_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.salary_structure_list && this.salary_structure_list.count() > 0;
	},
	"isNotFound": function() {
		return this.salary_structure_list && pageSession.get("SalaryStructureViewSearchString") && SalaryStructureViewItems(this.salary_structure_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("SalaryStructureViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("SalaryStructureViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("SalaryStructureViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("SalaryStructureViewStyle") == "gallery";
	},
	"toggleAddDeleteButton": function() {
		return Session.get("buttonSuccess") ? "btn btn-primary plus-sign" : "btn btn-danger trash-can";
	},
	"setAddDeleteButtonText": function() {
		return Session.get("buttonSuccess") ? "Add new" : "Delete";
	}

	
});


Template.SalaryStructureViewTable.rendered = function() {

};

Template.SalaryStructureViewTable.events({
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
		var oldSortBy = pageSession.get("SalaryStructureViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("SalaryStructureViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("SalaryStructureViewSortAscending") || false;
			pageSession.set("SalaryStructureViewSortAscending", !sortAscending);
		} else {
			pageSession.set("SalaryStructureViewSortAscending", true);
		}
	}
});

Template.SalaryStructureViewTable.helpers({
	"tableItems": function() {
		return SalaryStructureViewItems(this.salary_structure_list);
	}

});


Template.SalaryStructureViewTableItems.rendered = function() {

};

Template.SalaryStructureViewTableItems.events({
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
		Router.go("setup.human_resources.salary_structure.edit", {salaryStructureId: this._id});
		return false;
	}

});

Template.SalaryStructureViewTableItems.helpers({
	"checkComplete": function() {
		return Session.get("checkComplete");
	},

	"editButtonClass": function() {
		return SalaryStructure.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return SalaryStructure.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.SalaryStructureViewTableFooter.rendered = function() {

};

Template.SalaryStructureViewTableFooter.events({

	"click #dataview-salary-structure-paginate-buttons": function(e) {
		var documentNumber = parseInt(e.target.textContent, 10);
		Session.set("limit", documentNumber);
	}

});

Template.SalaryStructureViewTableFooter.helpers({

});
