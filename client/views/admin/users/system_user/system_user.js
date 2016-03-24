var pageSession = new ReactiveDict();
var recordSelect = new ReactiveArray();


Template.AdminUsersSystemUser.rendered = function() {

};

Template.AdminUsersSystemUser.events({
	
});

Template.AdminUsersSystemUser.helpers({
	
});

var SystemUserViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("SystemUserViewSearchString");
	var sortBy = pageSession.get("SystemUserViewSortBy");
	var sortAscending = pageSession.get("SystemUserViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["name", "email", "role"];
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

var SystemUserViewExport = function(cursor, fileType) {
	var data = SystemUserViewItems(cursor);
	var exportFields = ["name", "email", "role"];

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


Template.SystemUserView.rendered = function() {
	pageSession.set("SystemUserViewStyle", "table");
	Session.set("buttonSuccess", true);
	
};

Template.SystemUserView.events({
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
				pageSession.set("SystemUserViewSearchString", searchString);
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
					pageSession.set("SystemUserViewSearchString", searchString);
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
					pageSession.set("SystemUserViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-system-user-insert-delete-button": function(e, t) {
		e.preventDefault();
		if ($(e.target).hasClass("plus-sign")) {
			Router.go("admin.users.system_user.insert", {});
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
							Meteor.call("removeSystemUser", docIds);
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
		SystemUserViewExport(this.system_user_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		SystemUserViewExport(this.system_user_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		SystemUserViewExport(this.system_user_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		SystemUserViewExport(this.system_user_list, "json");
	}

	
});

Template.SystemUserView.helpers({

	//"insertButtonClass": function() {
	//	return Users.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	//},

	"isEmpty": function() {
		return !this.system_user_list || this.system_user_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.system_user_list && this.system_user_list.count() > 0;
	},
	"isNotFound": function() {
		return this.system_user_list && pageSession.get("SystemUserViewSearchString") && SystemUserViewItems(this.system_user_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("SystemUserViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("SystemUserViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("SystemUserViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("SystemUserViewStyle") == "gallery";
	},
	"toggleAddDeleteButton": function() {
		return Session.get("buttonSuccess") ? "btn btn-primary plus-sign" : "btn btn-danger trash-can";
	},
	"setAddDeleteButtonText": function() {
		return Session.get("buttonSuccess") ? "Add new" : "Delete";
	}

	
});


Template.SystemUserViewTable.rendered = function() {

};

Template.SystemUserViewTable.events({
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
		var oldSortBy = pageSession.get("SystemUserViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("SystemUserViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("SystemUserViewSortAscending") || false;
			pageSession.set("SystemUserViewSortAscending", !sortAscending);
		} else {
			pageSession.set("SystemUserViewSortAscending", true);
		}
	}
});

Template.SystemUserViewTable.helpers({
	"tableItems": function() {
		return SystemUserViewItems(this.system_user_list);
	}

});


Template.SystemUserViewTableItems.rendered = function() {

};

Template.SystemUserViewTableItems.events({
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
		Router.go("admin.users.system_user.edit", {systemUserId: this._id});
		return false;
	}

});

Template.SystemUserViewTableItems.helpers({
	"checkComplete": function() {
		return Session.get("checkComplete");
	},

	"editButtonClass": function() {
		return Users.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Users.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.SystemUserViewTableFooter.rendered = function() {

};

Template.SystemUserViewTableFooter.events({

	"click #dataview-system-user-paginate-buttons": function(e) {
		var documentNumber = parseInt(e.target.textContent, 10);
		Session.set("limit", documentNumber);
	}

});

Template.SystemUserViewTableFooter.helpers({

});
