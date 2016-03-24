var pageSession = new ReactiveDict();
var recordSelect = new ReactiveArray();


Template.SetupWebsiteWebsiteTheme.rendered = function() {

};

Template.SetupWebsiteWebsiteTheme.events({
	
});

Template.SetupWebsiteWebsiteTheme.helpers({
	
});

var WebsiteThemeViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("WebsiteThemeViewSearchString");
	var sortBy = pageSession.get("WebsiteThemeViewSortBy");
	var sortAscending = pageSession.get("WebsiteThemeViewSortAscending");
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

var WebsiteThemeViewExport = function(cursor, fileType) {
	var data = WebsiteThemeViewItems(cursor);
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


Template.WebsiteThemeView.rendered = function() {
	pageSession.set("WebsiteThemeViewStyle", "table");
	Session.set("buttonSuccess", true);
	
};

Template.WebsiteThemeView.events({
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
				pageSession.set("WebsiteThemeViewSearchString", searchString);
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
					pageSession.set("WebsiteThemeViewSearchString", searchString);
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
					pageSession.set("WebsiteThemeViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-website-theme-insert-delete-button": function(e, t) {
		e.preventDefault();
		if ($(e.target).hasClass("plus-sign")) {
			Router.go("setup.website.website_theme.insert", {});
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
							Meteor.call("removeWebsiteTheme", docIds);
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
		WebsiteThemeViewExport(this.website_theme_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		WebsiteThemeViewExport(this.website_theme_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		WebsiteThemeViewExport(this.website_theme_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		WebsiteThemeViewExport(this.website_theme_list, "json");
	}

	
});

Template.WebsiteThemeView.helpers({

	"insertButtonClass": function() {
		return WebsiteTheme.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.website_theme_list || this.website_theme_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.website_theme_list && this.website_theme_list.count() > 0;
	},
	"isNotFound": function() {
		return this.website_theme_list && pageSession.get("WebsiteThemeViewSearchString") && WebsiteThemeViewItems(this.website_theme_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("WebsiteThemeViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("WebsiteThemeViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("WebsiteThemeViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("WebsiteThemeViewStyle") == "gallery";
	},
	"toggleAddDeleteButton": function() {
		return Session.get("buttonSuccess") ? "btn btn-primary plus-sign" : "btn btn-danger trash-can";
	},
	"setAddDeleteButtonText": function() {
		return Session.get("buttonSuccess") ? "Add new" : "Delete";
	}

	
});


Template.WebsiteThemeViewTable.rendered = function() {

};

Template.WebsiteThemeViewTable.events({
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
		var oldSortBy = pageSession.get("WebsiteThemeViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("WebsiteThemeViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("WebsiteThemeViewSortAscending") || false;
			pageSession.set("WebsiteThemeViewSortAscending", !sortAscending);
		} else {
			pageSession.set("WebsiteThemeViewSortAscending", true);
		}
	}
});

Template.WebsiteThemeViewTable.helpers({
	"tableItems": function() {
		return WebsiteThemeViewItems(this.website_theme_list);
	}

});


Template.WebsiteThemeViewTableItems.rendered = function() {

};

Template.WebsiteThemeViewTableItems.events({
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
		Router.go("setup.website.website_theme.edit", {websiteThemeId: this._id});
		return false;
	}

});

Template.WebsiteThemeViewTableItems.helpers({
	"checkComplete": function() {
		return Session.get("checkComplete");
	},

	"editButtonClass": function() {
		return WebsiteTheme.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return WebsiteTheme.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.WebsiteThemeViewTableFooter.rendered = function() {

};

Template.WebsiteThemeViewTableFooter.events({

	"click #dataview-website-theme-paginate-buttons": function(e) {
		var documentNumber = parseInt(e.target.textContent, 10);
		Session.set("limit", documentNumber);
	}

});

Template.WebsiteThemeViewTableFooter.helpers({

});
