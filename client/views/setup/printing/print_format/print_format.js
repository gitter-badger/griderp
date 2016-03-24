var pageSession = new ReactiveDict();
var recordSelect = new ReactiveArray();


Template.SetupPrintingPrintFormat.rendered = function() {

};

Template.SetupPrintingPrintFormat.events({
	
});

Template.SetupPrintingPrintFormat.helpers({
	
});

var PrintFormatViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("PrintFormatViewSearchString");
	var sortBy = pageSession.get("PrintFormatViewSortBy");
	var sortAscending = pageSession.get("PrintFormatViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["name", "doc_type"];
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

var PrintFormatViewExport = function(cursor, fileType) {
	var data = PrintFormatViewItems(cursor);
	var exportFields = ["name", "doc_type"];

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


Template.PrintFormatView.rendered = function() {
	pageSession.set("PrintFormatViewStyle", "table");
	Session.set("buttonSuccess", true);
	
};

Template.PrintFormatView.events({
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
				pageSession.set("PrintFormatViewSearchString", searchString);
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
					pageSession.set("PrintFormatViewSearchString", searchString);
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
					pageSession.set("PrintFormatViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-print-format-insert-delete-button": function(e, t) {
		e.preventDefault();
		if ($(e.target).hasClass("plus-sign")) {
			Router.go("setup.printing.print_format.insert", {});
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
							Meteor.call("removePrintFormat", docIds);
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
		PrintFormatViewExport(this.print_format_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		PrintFormatViewExport(this.print_format_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		PrintFormatViewExport(this.print_format_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		PrintFormatViewExport(this.print_format_list, "json");
	}

	
});

Template.PrintFormatView.helpers({

	"insertButtonClass": function() {
		return PrintFormat.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.print_format_list || this.print_format_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.print_format_list && this.print_format_list.count() > 0;
	},
	"isNotFound": function() {
		return this.print_format_list && pageSession.get("PrintFormatViewSearchString") && PrintFormatViewItems(this.print_format_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("PrintFormatViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("PrintFormatViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("PrintFormatViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("PrintFormatViewStyle") == "gallery";
	},
	"toggleAddDeleteButton": function() {
		return Session.get("buttonSuccess") ? "btn btn-primary plus-sign" : "btn btn-danger trash-can";
	},
	"setAddDeleteButtonText": function() {
		return Session.get("buttonSuccess") ? "Add new" : "Delete";
	}

	
});


Template.PrintFormatViewTable.rendered = function() {

};

Template.PrintFormatViewTable.events({
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
		var oldSortBy = pageSession.get("PrintFormatViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("PrintFormatViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("PrintFormatViewSortAscending") || false;
			pageSession.set("PrintFormatViewSortAscending", !sortAscending);
		} else {
			pageSession.set("PrintFormatViewSortAscending", true);
		}
	}
});

Template.PrintFormatViewTable.helpers({
	"tableItems": function() {
		return PrintFormatViewItems(this.print_format_list);
	}

});


Template.PrintFormatViewTableItems.rendered = function() {

};

Template.PrintFormatViewTableItems.events({
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
		Router.go("setup.printing.print_format.edit", {printFormatId: this._id});
		return false;
	}

});

Template.PrintFormatViewTableItems.helpers({
	"checkComplete": function() {
		return Session.get("checkComplete");
	},

	"editButtonClass": function() {
		return PrintFormat.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return PrintFormat.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.PrintFormatViewTableFooter.rendered = function() {

};

Template.PrintFormatViewTableFooter.events({

	"click #dataview-print-format-paginate-buttons": function(e) {
		var documentNumber = parseInt(e.target.textContent, 10);
		Session.set("limit", documentNumber);
	}

});

Template.PrintFormatViewTableFooter.helpers({

});
