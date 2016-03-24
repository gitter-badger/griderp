var pageSession = new ReactiveDict();
var recordSelect = new ReactiveArray();


Template.WebsiteDocumentsBlogger.rendered = function() {

};

Template.WebsiteDocumentsBlogger.events({
	
});

Template.WebsiteDocumentsBlogger.helpers({
	
});

var BloggerViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("BloggerViewSearchString");
	var sortBy = pageSession.get("BloggerViewSortBy");
	var sortAscending = pageSession.get("BloggerViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["full_name", "posts", "name"];
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

var BloggerViewExport = function(cursor, fileType) {
	var data = BloggerViewItems(cursor);
	var exportFields = ["full_name", "posts", "name"];

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


Template.BloggerView.rendered = function() {
	pageSession.set("BloggerViewStyle", "table");
	Session.set("buttonSuccess", true);
	
};

Template.BloggerView.events({
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
				pageSession.set("BloggerViewSearchString", searchString);
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
					pageSession.set("BloggerViewSearchString", searchString);
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
					pageSession.set("BloggerViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-blogger-insert-delete-button": function(e, t) {
		e.preventDefault();
		if ($(e.target).hasClass("plus-sign")) {
			Router.go("website.documents.blogger.insert", {});
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
							Meteor.call("removeBlogger", docIds);
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
		BloggerViewExport(this.blogger_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		BloggerViewExport(this.blogger_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		BloggerViewExport(this.blogger_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		BloggerViewExport(this.blogger_list, "json");
	}

	
});

Template.BloggerView.helpers({

	"insertButtonClass": function() {
		return Blogger.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.blogger_list || this.blogger_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.blogger_list && this.blogger_list.count() > 0;
	},
	"isNotFound": function() {
		return this.blogger_list && pageSession.get("BloggerViewSearchString") && BloggerViewItems(this.blogger_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("BloggerViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("BloggerViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("BloggerViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("BloggerViewStyle") == "gallery";
	},
	"toggleAddDeleteButton": function() {
		return Session.get("buttonSuccess") ? "btn btn-primary plus-sign" : "btn btn-danger trash-can";
	},
	"setAddDeleteButtonText": function() {
		return Session.get("buttonSuccess") ? "Add new" : "Delete";
	}

	
});


Template.BloggerViewTable.rendered = function() {

};

Template.BloggerViewTable.events({
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
		var oldSortBy = pageSession.get("BloggerViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("BloggerViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("BloggerViewSortAscending") || false;
			pageSession.set("BloggerViewSortAscending", !sortAscending);
		} else {
			pageSession.set("BloggerViewSortAscending", true);
		}
	}
});

Template.BloggerViewTable.helpers({
	"tableItems": function() {
		return BloggerViewItems(this.blogger_list);
	}

});


Template.BloggerViewTableItems.rendered = function() {

};

Template.BloggerViewTableItems.events({
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
		Router.go("website.documents.blogger.edit", {bloggerId: this._id});
		return false;
	}

});

Template.BloggerViewTableItems.helpers({
	"checkComplete": function() {
		return Session.get("checkComplete");
	},

	"editButtonClass": function() {
		return Blogger.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Blogger.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.BloggerViewTableFooter.rendered = function() {

};

Template.BloggerViewTableFooter.events({

	"click #dataview-blogger-paginate-buttons": function(e) {
		var documentNumber = parseInt(e.target.textContent, 10);
		Session.set("limit", documentNumber);
	}

});

Template.BloggerViewTableFooter.helpers({

});
