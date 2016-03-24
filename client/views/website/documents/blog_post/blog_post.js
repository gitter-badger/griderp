var pageSession = new ReactiveDict();
var recordSelect = new ReactiveArray();


Template.WebsiteDocumentsBlogPost.rendered = function() {

};

Template.WebsiteDocumentsBlogPost.events({
	
});

Template.WebsiteDocumentsBlogPost.helpers({
	
});

var BlogPostViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("BlogPostViewSearchString");
	var sortBy = pageSession.get("BlogPostViewSortBy");
	var sortAscending = pageSession.get("BlogPostViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["title", "published", "blog_category", "name"];
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

var BlogPostViewExport = function(cursor, fileType) {
	var data = BlogPostViewItems(cursor);
	var exportFields = ["title", "published", "blog_category", "name"];

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


Template.BlogPostView.rendered = function() {
	pageSession.set("BlogPostViewStyle", "table");
	Session.set("buttonSuccess", true);
	
};

Template.BlogPostView.events({
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
				pageSession.set("BlogPostViewSearchString", searchString);
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
					pageSession.set("BlogPostViewSearchString", searchString);
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
					pageSession.set("BlogPostViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-blog-post-insert-delete-button": function(e, t) {
		e.preventDefault();
		if ($(e.target).hasClass("plus-sign")) {
			Router.go("website.documents.blog_post.insert", {});
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
							Meteor.call("removeBlogPost", docIds);
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
		BlogPostViewExport(this.blog_post_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		BlogPostViewExport(this.blog_post_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		BlogPostViewExport(this.blog_post_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		BlogPostViewExport(this.blog_post_list, "json");
	}

	
});

Template.BlogPostView.helpers({

	"insertButtonClass": function() {
		return BlogPost.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.blog_post_list || this.blog_post_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.blog_post_list && this.blog_post_list.count() > 0;
	},
	"isNotFound": function() {
		return this.blog_post_list && pageSession.get("BlogPostViewSearchString") && BlogPostViewItems(this.blog_post_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("BlogPostViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("BlogPostViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("BlogPostViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("BlogPostViewStyle") == "gallery";
	},
	"toggleAddDeleteButton": function() {
		return Session.get("buttonSuccess") ? "btn btn-primary plus-sign" : "btn btn-danger trash-can";
	},
	"setAddDeleteButtonText": function() {
		return Session.get("buttonSuccess") ? "Add new" : "Delete";
	}

	
});


Template.BlogPostViewTable.rendered = function() {

};

Template.BlogPostViewTable.events({
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
		var oldSortBy = pageSession.get("BlogPostViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("BlogPostViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("BlogPostViewSortAscending") || false;
			pageSession.set("BlogPostViewSortAscending", !sortAscending);
		} else {
			pageSession.set("BlogPostViewSortAscending", true);
		}
	}
});

Template.BlogPostViewTable.helpers({
	"tableItems": function() {
		return BlogPostViewItems(this.blog_post_list);
	}

});


Template.BlogPostViewTableItems.rendered = function() {

};

Template.BlogPostViewTableItems.events({
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
		Router.go("website.documents.blog_post.edit", {blogPostId: this._id});
		return false;
	}

});

Template.BlogPostViewTableItems.helpers({
	"checkComplete": function() {
		return Session.get("checkComplete");
	},

	"editButtonClass": function() {
		return BlogPost.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return BlogPost.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.BlogPostViewTableFooter.rendered = function() {

};

Template.BlogPostViewTableFooter.events({

	"click #dataview-blog-post-paginate-buttons": function(e) {
		var documentNumber = parseInt(e.target.textContent, 10);
		Session.set("limit", documentNumber);
	}

});

Template.BlogPostViewTableFooter.helpers({

});
