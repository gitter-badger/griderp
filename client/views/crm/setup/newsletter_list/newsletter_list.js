var pageSession = new ReactiveDict();
var recordSelect = new ReactiveArray();


Template.CrmSetupNewsletterList.rendered = function() {

};

Template.CrmSetupNewsletterList.events({
	
});

Template.CrmSetupNewsletterList.helpers({
	
});

var NewsletterListViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("NewsletterListViewSearchString");
	var sortBy = pageSession.get("NewsletterListViewSortBy");
	var sortAscending = pageSession.get("NewsletterListViewSortAscending");
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

var NewsletterListViewExport = function(cursor, fileType) {
	var data = NewsletterListViewItems(cursor);
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


Template.NewsletterListView.rendered = function() {
	pageSession.set("NewsletterListViewStyle", "table");
	Session.set("buttonSuccess", true);
	
};

Template.NewsletterListView.events({
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
				pageSession.set("NewsletterListViewSearchString", searchString);
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
					pageSession.set("NewsletterListViewSearchString", searchString);
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
					pageSession.set("NewsletterListViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-newsletter-list-insert-delete-button": function(e, t) {
		e.preventDefault();
		if ($(e.target).hasClass("plus-sign")) {
			Router.go("crm.setup.newsletter_list.insert", {});
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
							Meteor.call("removeNewsletterList", docIds);
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
		NewsletterListViewExport(this.newsletter_list_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		NewsletterListViewExport(this.newsletter_list_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		NewsletterListViewExport(this.newsletter_list_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		NewsletterListViewExport(this.newsletter_list_list, "json");
	}

	
});

Template.NewsletterListView.helpers({

	"insertButtonClass": function() {
		return NewsletterList.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.newsletter_list_list || this.newsletter_list_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.newsletter_list_list && this.newsletter_list_list.count() > 0;
	},
	"isNotFound": function() {
		return this.newsletter_list_list && pageSession.get("NewsletterListViewSearchString") && NewsletterListViewItems(this.newsletter_list_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("NewsletterListViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("NewsletterListViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("NewsletterListViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("NewsletterListViewStyle") == "gallery";
	},
	"toggleAddDeleteButton": function() {
		return Session.get("buttonSuccess") ? "btn btn-primary plus-sign" : "btn btn-danger trash-can";
	},
	"setAddDeleteButtonText": function() {
		return Session.get("buttonSuccess") ? "Add new" : "Delete";
	}

	
});


Template.NewsletterListViewTable.rendered = function() {

};

Template.NewsletterListViewTable.events({
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
		var oldSortBy = pageSession.get("NewsletterListViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("NewsletterListViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("NewsletterListViewSortAscending") || false;
			pageSession.set("NewsletterListViewSortAscending", !sortAscending);
		} else {
			pageSession.set("NewsletterListViewSortAscending", true);
		}
	}
});

Template.NewsletterListViewTable.helpers({
	"tableItems": function() {
		return NewsletterListViewItems(this.newsletter_list_list);
	}

});


Template.NewsletterListViewTableItems.rendered = function() {

};

Template.NewsletterListViewTableItems.events({
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
		Router.go("crm.setup.newsletter_list.edit", {newsletterListId: this._id});
		return false;
	}

});

Template.NewsletterListViewTableItems.helpers({
	"checkComplete": function() {
		return Session.get("checkComplete");
	},

	"editButtonClass": function() {
		return NewsletterList.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return NewsletterList.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.NewsletterListViewTableFooter.rendered = function() {

};

Template.NewsletterListViewTableFooter.events({

	"click #dataview-newsletter-list-paginate-buttons": function(e) {
		var documentNumber = parseInt(e.target.textContent, 10);
		Session.set("limit", documentNumber);
	}

});

Template.NewsletterListViewTableFooter.helpers({

});
