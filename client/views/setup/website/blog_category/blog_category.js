var pageSession = new ReactiveDict();
var recordSelect = new ReactiveArray();


Template.SetupWebsiteBlogCategory.rendered = function() {

};

Template.SetupWebsiteBlogCategory.events({
	
});

Template.SetupWebsiteBlogCategory.helpers({
	
});

var BlogCategoryViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("BlogCategoryViewSearchString");
	var sortBy = pageSession.get("BlogCategoryViewSortBy");
	var sortAscending = pageSession.get("BlogCategoryViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["name", "category_name"];
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

var BlogCategoryViewExport = function(cursor, fileType) {
	var data = BlogCategoryViewItems(cursor);
	var exportFields = ["name", "category_name"];

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


Template.BlogCategoryView.rendered = function() {
	pageSession.set("BlogCategoryViewStyle", "table");
	Session.set("buttonSuccess", true);
	
};

Template.BlogCategoryView.events({
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
				pageSession.set("BlogCategoryViewSearchString", searchString);
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
					pageSession.set("BlogCategoryViewSearchString", searchString);
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
					pageSession.set("BlogCategoryViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-blog-category-insert-delete-button": function(e, t) {
		e.preventDefault();
		if ($(e.target).hasClass("plus-sign")) {
			Router.go("setup.website.blog_category.insert", {});
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
							Meteor.call("removeBlogCategory", docIds);
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
		BlogCategoryViewExport(this.blog_category_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		BlogCategoryViewExport(this.blog_category_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		BlogCategoryViewExport(this.blog_category_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		BlogCategoryViewExport(this.blog_category_list, "json");
	}

	
});

Template.BlogCategoryView.helpers({

	"insertButtonClass": function() {
		return BlogCategory.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.blog_category_list || this.blog_category_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.blog_category_list && this.blog_category_list.count() > 0;
	},
	"isNotFound": function() {
		return this.blog_category_list && pageSession.get("BlogCategoryViewSearchString") && BlogCategoryViewItems(this.blog_category_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("BlogCategoryViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("BlogCategoryViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("BlogCategoryViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("BlogCategoryViewStyle") == "gallery";
	},
	"toggleAddDeleteButton": function() {
		return Session.get("buttonSuccess") ? "btn btn-primary plus-sign" : "btn btn-danger trash-can";
	},
	"setAddDeleteButtonText": function() {
		return Session.get("buttonSuccess") ? "Add new" : "Delete";
	}

	
});


Template.BlogCategoryViewTable.rendered = function() {

};

Template.BlogCategoryViewTable.events({
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
		var oldSortBy = pageSession.get("BlogCategoryViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("BlogCategoryViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("BlogCategoryViewSortAscending") || false;
			pageSession.set("BlogCategoryViewSortAscending", !sortAscending);
		} else {
			pageSession.set("BlogCategoryViewSortAscending", true);
		}
	}
});

Template.BlogCategoryViewTable.helpers({
	"tableItems": function() {
		return BlogCategoryViewItems(this.blog_category_list);
	}

});


Template.BlogCategoryViewTableItems.rendered = function() {

};

Template.BlogCategoryViewTableItems.events({
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
		Router.go("setup.website.blog_category.edit", {blogCategoryId: this._id});
		return false;
	}

});

Template.BlogCategoryViewTableItems.helpers({
	"checkComplete": function() {
		return Session.get("checkComplete");
	},

	"editButtonClass": function() {
		return BlogCategory.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return BlogCategory.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.BlogCategoryViewTableFooter.rendered = function() {

};

Template.BlogCategoryViewTableFooter.events({

	"click #dataview-blog-category-paginate-buttons": function(e) {
		var documentNumber = parseInt(e.target.textContent, 10);
		Session.set("limit", documentNumber);
	}

});

Template.BlogCategoryViewTableFooter.helpers({

});
