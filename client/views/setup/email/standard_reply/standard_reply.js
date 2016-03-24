var pageSession = new ReactiveDict();
var recordSelect = new ReactiveArray();


Template.SetupEmailStandardReply.rendered = function() {

};

Template.SetupEmailStandardReply.events({
	
});

Template.SetupEmailStandardReply.helpers({
	
});

var StandardReplyViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("StandardReplyViewSearchString");
	var sortBy = pageSession.get("StandardReplyViewSortBy");
	var sortAscending = pageSession.get("StandardReplyViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["name", "subject"];
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

var StandardReplyViewExport = function(cursor, fileType) {
	var data = StandardReplyViewItems(cursor);
	var exportFields = ["name", "subject"];

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


Template.StandardReplyView.rendered = function() {
	pageSession.set("StandardReplyViewStyle", "table");
	Session.set("buttonSuccess", true);
	
};

Template.StandardReplyView.events({
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
				pageSession.set("StandardReplyViewSearchString", searchString);
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
					pageSession.set("StandardReplyViewSearchString", searchString);
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
					pageSession.set("StandardReplyViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-standard-reply-insert-delete-button": function(e, t) {
		e.preventDefault();
		if ($(e.target).hasClass("plus-sign")) {
			Router.go("setup.email.standard_reply.insert", {});
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
							Meteor.call("removeStandardReply", docIds);
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
		StandardReplyViewExport(this.standard_reply_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		StandardReplyViewExport(this.standard_reply_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		StandardReplyViewExport(this.standard_reply_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		StandardReplyViewExport(this.standard_reply_list, "json");
	}

	
});

Template.StandardReplyView.helpers({

	"insertButtonClass": function() {
		return StandardReply.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.standard_reply_list || this.standard_reply_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.standard_reply_list && this.standard_reply_list.count() > 0;
	},
	"isNotFound": function() {
		return this.standard_reply_list && pageSession.get("StandardReplyViewSearchString") && StandardReplyViewItems(this.standard_reply_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("StandardReplyViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("StandardReplyViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("StandardReplyViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("StandardReplyViewStyle") == "gallery";
	},
	"toggleAddDeleteButton": function() {
		return Session.get("buttonSuccess") ? "btn btn-primary plus-sign" : "btn btn-danger trash-can";
	},
	"setAddDeleteButtonText": function() {
		return Session.get("buttonSuccess") ? "Add new" : "Delete";
	}

	
});


Template.StandardReplyViewTable.rendered = function() {

};

Template.StandardReplyViewTable.events({
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
		var oldSortBy = pageSession.get("StandardReplyViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("StandardReplyViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("StandardReplyViewSortAscending") || false;
			pageSession.set("StandardReplyViewSortAscending", !sortAscending);
		} else {
			pageSession.set("StandardReplyViewSortAscending", true);
		}
	}
});

Template.StandardReplyViewTable.helpers({
	"tableItems": function() {
		return StandardReplyViewItems(this.standard_reply_list);
	}

});


Template.StandardReplyViewTableItems.rendered = function() {

};

Template.StandardReplyViewTableItems.events({
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
		Router.go("setup.email.standard_reply.edit", {standardReplyId: this._id});
		return false;
	}

});

Template.StandardReplyViewTableItems.helpers({
	"checkComplete": function() {
		return Session.get("checkComplete");
	},

	"editButtonClass": function() {
		return StandardReply.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return StandardReply.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.StandardReplyViewTableFooter.rendered = function() {

};

Template.StandardReplyViewTableFooter.events({

	"click #dataview-standard-reply-paginate-buttons": function(e) {
		var documentNumber = parseInt(e.target.textContent, 10);
		Session.set("limit", documentNumber);
	}

});

Template.StandardReplyViewTableFooter.helpers({

});
