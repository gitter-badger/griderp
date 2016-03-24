var pageSession = new ReactiveDict();
var recordSelect = new ReactiveArray();


Template.SetupPrintingLetterHead.rendered = function() {

};

Template.SetupPrintingLetterHead.events({
	
});

Template.SetupPrintingLetterHead.helpers({
	
});

var LetterHeadViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("LetterHeadViewSearchString");
	var sortBy = pageSession.get("LetterHeadViewSortBy");
	var sortAscending = pageSession.get("LetterHeadViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["name", "letter_head_name", "disabled", "is_default"];
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

var LetterHeadViewExport = function(cursor, fileType) {
	var data = LetterHeadViewItems(cursor);
	var exportFields = ["name", "letter_head_name", "disabled", "is_default"];

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


Template.LetterHeadView.rendered = function() {
	pageSession.set("LetterHeadViewStyle", "table");
	Session.set("buttonSuccess", true);
	
};

Template.LetterHeadView.events({
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
				pageSession.set("LetterHeadViewSearchString", searchString);
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
					pageSession.set("LetterHeadViewSearchString", searchString);
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
					pageSession.set("LetterHeadViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-letter-head-insert-delete-button": function(e, t) {
		e.preventDefault();
		if ($(e.target).hasClass("plus-sign")) {
			Router.go("setup.printing.letter_head.insert", {});
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
							Meteor.call("removeLetterHead", docIds);
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
		LetterHeadViewExport(this.letter_head_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		LetterHeadViewExport(this.letter_head_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		LetterHeadViewExport(this.letter_head_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		LetterHeadViewExport(this.letter_head_list, "json");
	}

	
});

Template.LetterHeadView.helpers({

	"insertButtonClass": function() {
		return LetterHead.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.letter_head_list || this.letter_head_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.letter_head_list && this.letter_head_list.count() > 0;
	},
	"isNotFound": function() {
		return this.letter_head_list && pageSession.get("LetterHeadViewSearchString") && LetterHeadViewItems(this.letter_head_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("LetterHeadViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("LetterHeadViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("LetterHeadViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("LetterHeadViewStyle") == "gallery";
	},
	"toggleAddDeleteButton": function() {
		return Session.get("buttonSuccess") ? "btn btn-primary plus-sign" : "btn btn-danger trash-can";
	},
	"setAddDeleteButtonText": function() {
		return Session.get("buttonSuccess") ? "Add new" : "Delete";
	}

	
});


Template.LetterHeadViewTable.rendered = function() {

};

Template.LetterHeadViewTable.events({
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
		var oldSortBy = pageSession.get("LetterHeadViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("LetterHeadViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("LetterHeadViewSortAscending") || false;
			pageSession.set("LetterHeadViewSortAscending", !sortAscending);
		} else {
			pageSession.set("LetterHeadViewSortAscending", true);
		}
	}
});

Template.LetterHeadViewTable.helpers({
	"tableItems": function() {
		return LetterHeadViewItems(this.letter_head_list);
	}

});


Template.LetterHeadViewTableItems.rendered = function() {

};

Template.LetterHeadViewTableItems.events({
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
		Router.go("setup.printing.letter_head.edit", {letterHeadId: this._id});
		return false;
	}

});

Template.LetterHeadViewTableItems.helpers({
	"checkComplete": function() {
		return Session.get("checkComplete");
	},

	"editButtonClass": function() {
		return LetterHead.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return LetterHead.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.LetterHeadViewTableFooter.rendered = function() {

};

Template.LetterHeadViewTableFooter.events({

	"click #dataview-letter-head-paginate-buttons": function(e) {
		var documentNumber = parseInt(e.target.textContent, 10);
		Session.set("limit", documentNumber);
	}

});

Template.LetterHeadViewTableFooter.helpers({

});
