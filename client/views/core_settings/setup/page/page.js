var pageSession = new ReactiveDict();
var recordSelect = new ReactiveArray();


Template.CoreSettingsSetupPage.rendered = function() {

};

Template.CoreSettingsSetupPage.events({
	
});

Template.CoreSettingsSetupPage.helpers({
	
});

var PageViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("PageViewSearchString");
	var sortBy = pageSession.get("PageViewSortBy");
	var sortAscending = pageSession.get("PageViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["name", "page_name"];
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

var PageViewExport = function(cursor, fileType) {
	var data = PageViewItems(cursor);
	var exportFields = ["name", "page_name"];

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


Template.PageView.rendered = function() {
	pageSession.set("PageViewStyle", "table");
	Session.set("buttonSuccess", true);
	
};

Template.PageView.events({
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
				pageSession.set("PageViewSearchString", searchString);
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
					pageSession.set("PageViewSearchString", searchString);
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
					pageSession.set("PageViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-page-insert-delete-button": function(e, t) {
		e.preventDefault();
		if ($(e.target).hasClass("plus-sign")) {
			Router.go("core_settings.setup.page.insert", {});
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
							Meteor.call("removePage", docIds);
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
		PageViewExport(this.page_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		PageViewExport(this.page_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		PageViewExport(this.page_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		PageViewExport(this.page_list, "json");
	}

	
});

Template.PageView.helpers({

	"insertButtonClass": function() {
		return Page.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.page_list || this.page_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.page_list && this.page_list.count() > 0;
	},
	"isNotFound": function() {
		return this.page_list && pageSession.get("PageViewSearchString") && PageViewItems(this.page_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("PageViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("PageViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("PageViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("PageViewStyle") == "gallery";
	},
	"toggleAddDeleteButton": function() {
		return Session.get("buttonSuccess") ? "btn btn-primary plus-sign" : "btn btn-danger trash-can";
	},
	"setAddDeleteButtonText": function() {
		return Session.get("buttonSuccess") ? "Add new" : "Delete";
	}

	
});


Template.PageViewTable.rendered = function() {

};

Template.PageViewTable.events({
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
		var oldSortBy = pageSession.get("PageViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("PageViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("PageViewSortAscending") || false;
			pageSession.set("PageViewSortAscending", !sortAscending);
		} else {
			pageSession.set("PageViewSortAscending", true);
		}
	}
});

Template.PageViewTable.helpers({
	"tableItems": function() {
		return PageViewItems(this.page_list);
	}

});


Template.PageViewTableItems.rendered = function() {

};

Template.PageViewTableItems.events({
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
		Router.go("core_settings.setup.page.edit", {pageId: this._id});
		return false;
	}

});

Template.PageViewTableItems.helpers({
	"checkComplete": function() {
		return Session.get("checkComplete");
	},

	"editButtonClass": function() {
		return Page.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Page.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.PageViewTableFooter.rendered = function() {

};

Template.PageViewTableFooter.events({

	"click #dataview-page-paginate-buttons": function(e) {
		var documentNumber = parseInt(e.target.textContent, 10);
		Session.set("limit", documentNumber);
	}

});

Template.PageViewTableFooter.helpers({

});
