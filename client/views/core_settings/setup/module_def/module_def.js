var pageSession = new ReactiveDict();
var recordSelect = new ReactiveArray();


Template.CoreSettingsSetupModuleDef.rendered = function() {

};

Template.CoreSettingsSetupModuleDef.events({
	
});

Template.CoreSettingsSetupModuleDef.helpers({
	
});

var ModuleDefViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("ModuleDefViewSearchString");
	var sortBy = pageSession.get("ModuleDefViewSortBy");
	var sortAscending = pageSession.get("ModuleDefViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["name", "module_name", "app_name"];
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

var ModuleDefViewExport = function(cursor, fileType) {
	var data = ModuleDefViewItems(cursor);
	var exportFields = ["name", "module_name", "app_name"];

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


Template.ModuleDefView.rendered = function() {
	pageSession.set("ModuleDefViewStyle", "table");
	Session.set("buttonSuccess", true);
	
};

Template.ModuleDefView.events({
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
				pageSession.set("ModuleDefViewSearchString", searchString);
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
					pageSession.set("ModuleDefViewSearchString", searchString);
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
					pageSession.set("ModuleDefViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-module-def-insert-delete-button": function(e, t) {
		e.preventDefault();
		if ($(e.target).hasClass("plus-sign")) {
			Router.go("core_settings.setup.module_def.insert", {});
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
							Meteor.call("removeModuleDef", docIds);
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
		ModuleDefViewExport(this.module_def_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		ModuleDefViewExport(this.module_def_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		ModuleDefViewExport(this.module_def_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		ModuleDefViewExport(this.module_def_list, "json");
	}

	
});

Template.ModuleDefView.helpers({

	"insertButtonClass": function() {
		return ModuleDef.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.module_def_list || this.module_def_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.module_def_list && this.module_def_list.count() > 0;
	},
	"isNotFound": function() {
		return this.module_def_list && pageSession.get("ModuleDefViewSearchString") && ModuleDefViewItems(this.module_def_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("ModuleDefViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("ModuleDefViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("ModuleDefViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("ModuleDefViewStyle") == "gallery";
	},
	"toggleAddDeleteButton": function() {
		return Session.get("buttonSuccess") ? "btn btn-primary plus-sign" : "btn btn-danger trash-can";
	},
	"setAddDeleteButtonText": function() {
		return Session.get("buttonSuccess") ? "Add new" : "Delete";
	}

	
});


Template.ModuleDefViewTable.rendered = function() {

};

Template.ModuleDefViewTable.events({
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
		var oldSortBy = pageSession.get("ModuleDefViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("ModuleDefViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("ModuleDefViewSortAscending") || false;
			pageSession.set("ModuleDefViewSortAscending", !sortAscending);
		} else {
			pageSession.set("ModuleDefViewSortAscending", true);
		}
	}
});

Template.ModuleDefViewTable.helpers({
	"tableItems": function() {
		return ModuleDefViewItems(this.module_def_list);
	}

});


Template.ModuleDefViewTableItems.rendered = function() {

};

Template.ModuleDefViewTableItems.events({
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
		Router.go("core_settings.setup.module_def.edit", {moduleDefId: this._id});
		return false;
	}

});

Template.ModuleDefViewTableItems.helpers({
	"checkComplete": function() {
		return Session.get("checkComplete");
	},

	"editButtonClass": function() {
		return ModuleDef.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return ModuleDef.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.ModuleDefViewTableFooter.rendered = function() {

};

Template.ModuleDefViewTableFooter.events({

	"click #dataview-module-def-paginate-buttons": function(e) {
		var documentNumber = parseInt(e.target.textContent, 10);
		Session.set("limit", documentNumber);
	}

});

Template.ModuleDefViewTableFooter.helpers({

});
