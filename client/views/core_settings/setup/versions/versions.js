var pageSession = new ReactiveDict();
var recordSelect = new ReactiveArray();


Template.CoreSettingsSetupVersions.rendered = function() {

};

Template.CoreSettingsSetupVersions.events({
	
});

Template.CoreSettingsSetupVersions.helpers({
	
});

var VersionsViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("VersionsViewSearchString");
	var sortBy = pageSession.get("VersionsViewSortBy");
	var sortAscending = pageSession.get("VersionsViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["name", "ref_doctype", "docname"];
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

var VersionsViewExport = function(cursor, fileType) {
	var data = VersionsViewItems(cursor);
	var exportFields = ["name", "ref_doctype", "docname"];

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


Template.VersionsView.rendered = function() {
	pageSession.set("VersionsViewStyle", "table");
	Session.set("buttonSuccess", true);
	
};

Template.VersionsView.events({
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
				pageSession.set("VersionsViewSearchString", searchString);
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
					pageSession.set("VersionsViewSearchString", searchString);
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
					pageSession.set("VersionsViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-versions-insert-delete-button": function(e, t) {
		e.preventDefault();
		if ($(e.target).hasClass("plus-sign")) {
			Router.go("core_settings.setup.versions.insert", {});
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
							Meteor.call("removeVersions", docIds);
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
		VersionsViewExport(this.versions_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		VersionsViewExport(this.versions_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		VersionsViewExport(this.versions_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		VersionsViewExport(this.versions_list, "json");
	}

	
});

Template.VersionsView.helpers({

	"insertButtonClass": function() {
		return Versions.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.versions_list || this.versions_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.versions_list && this.versions_list.count() > 0;
	},
	"isNotFound": function() {
		return this.versions_list && pageSession.get("VersionsViewSearchString") && VersionsViewItems(this.versions_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("VersionsViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("VersionsViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("VersionsViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("VersionsViewStyle") == "gallery";
	},
	"toggleAddDeleteButton": function() {
		return Session.get("buttonSuccess") ? "btn btn-primary plus-sign" : "btn btn-danger trash-can";
	},
	"setAddDeleteButtonText": function() {
		return Session.get("buttonSuccess") ? "Add new" : "Delete";
	}

	
});


Template.VersionsViewTable.rendered = function() {

};

Template.VersionsViewTable.events({
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
		var oldSortBy = pageSession.get("VersionsViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("VersionsViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("VersionsViewSortAscending") || false;
			pageSession.set("VersionsViewSortAscending", !sortAscending);
		} else {
			pageSession.set("VersionsViewSortAscending", true);
		}
	}
});

Template.VersionsViewTable.helpers({
	"tableItems": function() {
		return VersionsViewItems(this.versions_list);
	}

});


Template.VersionsViewTableItems.rendered = function() {

};

Template.VersionsViewTableItems.events({
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
		Router.go("core_settings.setup.versions.edit", {versionsId: this._id});
		return false;
	}

});

Template.VersionsViewTableItems.helpers({
	"checkComplete": function() {
		return Session.get("checkComplete");
	},

	"editButtonClass": function() {
		return Versions.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Versions.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.VersionsViewTableFooter.rendered = function() {

};

Template.VersionsViewTableFooter.events({

	"click #dataview-versions-paginate-buttons": function(e) {
		var documentNumber = parseInt(e.target.textContent, 10);
		Session.set("limit", documentNumber);
	}

});

Template.VersionsViewTableFooter.helpers({

});
