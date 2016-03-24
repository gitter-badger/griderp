var pageSession = new ReactiveDict();
var recordSelect = new ReactiveArray();


Template.WebsiteDocumentsWebForm.rendered = function() {

};

Template.WebsiteDocumentsWebForm.events({
	
});

Template.WebsiteDocumentsWebForm.helpers({
	
});

var WebFormViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("WebFormViewSearchString");
	var sortBy = pageSession.get("WebFormViewSortBy");
	var sortAscending = pageSession.get("WebFormViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["title", "doc_type", "name"];
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

var WebFormViewExport = function(cursor, fileType) {
	var data = WebFormViewItems(cursor);
	var exportFields = ["title", "doc_type", "name"];

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


Template.WebFormView.rendered = function() {
	pageSession.set("WebFormViewStyle", "table");
	Session.set("buttonSuccess", true);
	
};

Template.WebFormView.events({
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
				pageSession.set("WebFormViewSearchString", searchString);
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
					pageSession.set("WebFormViewSearchString", searchString);
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
					pageSession.set("WebFormViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-web-form-insert-delete-button": function(e, t) {
		e.preventDefault();
		if ($(e.target).hasClass("plus-sign")) {
			Router.go("website.documents.web_form.insert", {});
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
							Meteor.call("removeWebForm", docIds);
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
		WebFormViewExport(this.web_form_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		WebFormViewExport(this.web_form_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		WebFormViewExport(this.web_form_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		WebFormViewExport(this.web_form_list, "json");
	}

	
});

Template.WebFormView.helpers({

	"insertButtonClass": function() {
		return WebForm.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.web_form_list || this.web_form_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.web_form_list && this.web_form_list.count() > 0;
	},
	"isNotFound": function() {
		return this.web_form_list && pageSession.get("WebFormViewSearchString") && WebFormViewItems(this.web_form_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("WebFormViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("WebFormViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("WebFormViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("WebFormViewStyle") == "gallery";
	},
	"toggleAddDeleteButton": function() {
		return Session.get("buttonSuccess") ? "btn btn-primary plus-sign" : "btn btn-danger trash-can";
	},
	"setAddDeleteButtonText": function() {
		return Session.get("buttonSuccess") ? "Add new" : "Delete";
	}

	
});


Template.WebFormViewTable.rendered = function() {

};

Template.WebFormViewTable.events({
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
		var oldSortBy = pageSession.get("WebFormViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("WebFormViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("WebFormViewSortAscending") || false;
			pageSession.set("WebFormViewSortAscending", !sortAscending);
		} else {
			pageSession.set("WebFormViewSortAscending", true);
		}
	}
});

Template.WebFormViewTable.helpers({
	"tableItems": function() {
		return WebFormViewItems(this.web_form_list);
	}

});


Template.WebFormViewTableItems.rendered = function() {

};

Template.WebFormViewTableItems.events({
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
		Router.go("website.documents.web_form.edit", {webFormId: this._id});
		return false;
	}

});

Template.WebFormViewTableItems.helpers({
	"checkComplete": function() {
		return Session.get("checkComplete");
	},

	"editButtonClass": function() {
		return WebForm.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return WebForm.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.WebFormViewTableFooter.rendered = function() {

};

Template.WebFormViewTableFooter.events({

	"click #dataview-web-form-paginate-buttons": function(e) {
		var documentNumber = parseInt(e.target.textContent, 10);
		Session.set("limit", documentNumber);
	}

});

Template.WebFormViewTableFooter.helpers({

});
