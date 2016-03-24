var pageSession = new ReactiveDict();
var recordSelect = new ReactiveArray();


Template.SetupUsersRole.rendered = function() {

};

Template.SetupUsersRole.events({
	
});

Template.SetupUsersRole.helpers({
	
});

var RoleViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("RoleViewSearchString");
	var sortBy = pageSession.get("RoleViewSortBy");
	var sortAscending = pageSession.get("RoleViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["name", "role_name"];
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

var RoleViewExport = function(cursor, fileType) {
	var data = RoleViewItems(cursor);
	var exportFields = ["name", "role_name"];

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


Template.RoleView.rendered = function() {
	pageSession.set("RoleViewStyle", "table");
	Session.set("buttonSuccess", true);
	
};

Template.RoleView.events({
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
				pageSession.set("RoleViewSearchString", searchString);
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
					pageSession.set("RoleViewSearchString", searchString);
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
					pageSession.set("RoleViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-role-insert-delete-button": function(e, t) {
		e.preventDefault();
		if ($(e.target).hasClass("plus-sign")) {
			Router.go("setup.users.role.insert", {});
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
							Meteor.call("removeRole", docIds);
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
		RoleViewExport(this.role_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		RoleViewExport(this.role_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		RoleViewExport(this.role_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		RoleViewExport(this.role_list, "json");
	}

	
});

Template.RoleView.helpers({

	"insertButtonClass": function() {
		return Role.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.role_list || this.role_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.role_list && this.role_list.count() > 0;
	},
	"isNotFound": function() {
		return this.role_list && pageSession.get("RoleViewSearchString") && RoleViewItems(this.role_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("RoleViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("RoleViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("RoleViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("RoleViewStyle") == "gallery";
	},
	"toggleAddDeleteButton": function() {
		return Session.get("buttonSuccess") ? "btn btn-primary plus-sign" : "btn btn-danger trash-can";
	},
	"setAddDeleteButtonText": function() {
		return Session.get("buttonSuccess") ? "Add new" : "Delete";
	}

	
});


Template.RoleViewTable.rendered = function() {

};

Template.RoleViewTable.events({
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
		var oldSortBy = pageSession.get("RoleViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("RoleViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("RoleViewSortAscending") || false;
			pageSession.set("RoleViewSortAscending", !sortAscending);
		} else {
			pageSession.set("RoleViewSortAscending", true);
		}
	}
});

Template.RoleViewTable.helpers({
	"tableItems": function() {
		return RoleViewItems(this.role_list);
	}

});


Template.RoleViewTableItems.rendered = function() {

};

Template.RoleViewTableItems.events({
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
		Router.go("setup.users.role.edit", {roleId: this._id});
		return false;
	}

});

Template.RoleViewTableItems.helpers({
	"checkComplete": function() {
		return Session.get("checkComplete");
	},

	"editButtonClass": function() {
		return Role.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Role.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.RoleViewTableFooter.rendered = function() {

};

Template.RoleViewTableFooter.events({

	"click #dataview-role-paginate-buttons": function(e) {
		var documentNumber = parseInt(e.target.textContent, 10);
		Session.set("limit", documentNumber);
	}

});

Template.RoleViewTableFooter.helpers({

});
