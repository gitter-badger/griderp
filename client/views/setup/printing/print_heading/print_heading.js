var pageSession = new ReactiveDict();
var recordSelect = new ReactiveArray();


Template.SetupPrintingPrintHeading.rendered = function() {

};

Template.SetupPrintingPrintHeading.events({
	
});

Template.SetupPrintingPrintHeading.helpers({
	
});

var PrintHeadingViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("PrintHeadingViewSearchString");
	var sortBy = pageSession.get("PrintHeadingViewSortBy");
	var sortAscending = pageSession.get("PrintHeadingViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["name", "print_heading", "description"];
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

var PrintHeadingViewExport = function(cursor, fileType) {
	var data = PrintHeadingViewItems(cursor);
	var exportFields = ["name", "print_heading", "description"];

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


Template.PrintHeadingView.rendered = function() {
	pageSession.set("PrintHeadingViewStyle", "table");
	Session.set("buttonSuccess", true);
	
};

Template.PrintHeadingView.events({
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
				pageSession.set("PrintHeadingViewSearchString", searchString);
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
					pageSession.set("PrintHeadingViewSearchString", searchString);
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
					pageSession.set("PrintHeadingViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-print-heading-insert-delete-button": function(e, t) {
		e.preventDefault();
		if ($(e.target).hasClass("plus-sign")) {
			Router.go("setup.printing.print_heading.insert", {});
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
							Meteor.call("removePrintHeading", docIds);
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
		PrintHeadingViewExport(this.print_heading_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		PrintHeadingViewExport(this.print_heading_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		PrintHeadingViewExport(this.print_heading_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		PrintHeadingViewExport(this.print_heading_list, "json");
	}

	
});

Template.PrintHeadingView.helpers({

	"insertButtonClass": function() {
		return PrintHeading.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.print_heading_list || this.print_heading_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.print_heading_list && this.print_heading_list.count() > 0;
	},
	"isNotFound": function() {
		return this.print_heading_list && pageSession.get("PrintHeadingViewSearchString") && PrintHeadingViewItems(this.print_heading_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("PrintHeadingViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("PrintHeadingViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("PrintHeadingViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("PrintHeadingViewStyle") == "gallery";
	},
	"toggleAddDeleteButton": function() {
		return Session.get("buttonSuccess") ? "btn btn-primary plus-sign" : "btn btn-danger trash-can";
	},
	"setAddDeleteButtonText": function() {
		return Session.get("buttonSuccess") ? "Add new" : "Delete";
	}

	
});


Template.PrintHeadingViewTable.rendered = function() {

};

Template.PrintHeadingViewTable.events({
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
		var oldSortBy = pageSession.get("PrintHeadingViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("PrintHeadingViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("PrintHeadingViewSortAscending") || false;
			pageSession.set("PrintHeadingViewSortAscending", !sortAscending);
		} else {
			pageSession.set("PrintHeadingViewSortAscending", true);
		}
	}
});

Template.PrintHeadingViewTable.helpers({
	"tableItems": function() {
		return PrintHeadingViewItems(this.print_heading_list);
	}

});


Template.PrintHeadingViewTableItems.rendered = function() {

};

Template.PrintHeadingViewTableItems.events({
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
		Router.go("setup.printing.print_heading.edit", {printHeadingId: this._id});
		return false;
	}

});

Template.PrintHeadingViewTableItems.helpers({
	"checkComplete": function() {
		return Session.get("checkComplete");
	},

	"editButtonClass": function() {
		return PrintHeading.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return PrintHeading.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.PrintHeadingViewTableFooter.rendered = function() {

};

Template.PrintHeadingViewTableFooter.events({

	"click #dataview-print-heading-paginate-buttons": function(e) {
		var documentNumber = parseInt(e.target.textContent, 10);
		Session.set("limit", documentNumber);
	}

});

Template.PrintHeadingViewTableFooter.helpers({

});
