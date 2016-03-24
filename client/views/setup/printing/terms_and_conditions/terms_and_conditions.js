var pageSession = new ReactiveDict();
var recordSelect = new ReactiveArray();


Template.SetupPrintingTermsAndConditions.rendered = function() {

};

Template.SetupPrintingTermsAndConditions.events({
	
});

Template.SetupPrintingTermsAndConditions.helpers({
	
});

var TermsAndConditionsViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("TermsAndConditionsViewSearchString");
	var sortBy = pageSession.get("TermsAndConditionsViewSortBy");
	var sortAscending = pageSession.get("TermsAndConditionsViewSortAscending");
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

var TermsAndConditionsViewExport = function(cursor, fileType) {
	var data = TermsAndConditionsViewItems(cursor);
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


Template.TermsAndConditionsView.rendered = function() {
	pageSession.set("TermsAndConditionsViewStyle", "table");
	Session.set("buttonSuccess", true);
	
};

Template.TermsAndConditionsView.events({
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
				pageSession.set("TermsAndConditionsViewSearchString", searchString);
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
					pageSession.set("TermsAndConditionsViewSearchString", searchString);
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
					pageSession.set("TermsAndConditionsViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-terms-and-conditions-insert-delete-button": function(e, t) {
		e.preventDefault();
		if ($(e.target).hasClass("plus-sign")) {
			Router.go("setup.printing.terms_and_conditions.insert", {});
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
							Meteor.call("removeTermsAndConditions", docIds);
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
		TermsAndConditionsViewExport(this.terms_and_conditions_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		TermsAndConditionsViewExport(this.terms_and_conditions_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		TermsAndConditionsViewExport(this.terms_and_conditions_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		TermsAndConditionsViewExport(this.terms_and_conditions_list, "json");
	}

	
});

Template.TermsAndConditionsView.helpers({

	"insertButtonClass": function() {
		return TermsAndConditions.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.terms_and_conditions_list || this.terms_and_conditions_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.terms_and_conditions_list && this.terms_and_conditions_list.count() > 0;
	},
	"isNotFound": function() {
		return this.terms_and_conditions_list && pageSession.get("TermsAndConditionsViewSearchString") && TermsAndConditionsViewItems(this.terms_and_conditions_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("TermsAndConditionsViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("TermsAndConditionsViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("TermsAndConditionsViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("TermsAndConditionsViewStyle") == "gallery";
	},
	"toggleAddDeleteButton": function() {
		return Session.get("buttonSuccess") ? "btn btn-primary plus-sign" : "btn btn-danger trash-can";
	},
	"setAddDeleteButtonText": function() {
		return Session.get("buttonSuccess") ? "Add new" : "Delete";
	}

	
});


Template.TermsAndConditionsViewTable.rendered = function() {

};

Template.TermsAndConditionsViewTable.events({
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
		var oldSortBy = pageSession.get("TermsAndConditionsViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("TermsAndConditionsViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("TermsAndConditionsViewSortAscending") || false;
			pageSession.set("TermsAndConditionsViewSortAscending", !sortAscending);
		} else {
			pageSession.set("TermsAndConditionsViewSortAscending", true);
		}
	}
});

Template.TermsAndConditionsViewTable.helpers({
	"tableItems": function() {
		return TermsAndConditionsViewItems(this.terms_and_conditions_list);
	}

});


Template.TermsAndConditionsViewTableItems.rendered = function() {

};

Template.TermsAndConditionsViewTableItems.events({
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
		Router.go("setup.printing.terms_and_conditions.edit", {termsAndConditionsId: this._id});
		return false;
	}

});

Template.TermsAndConditionsViewTableItems.helpers({
	"checkComplete": function() {
		return Session.get("checkComplete");
	},

	"editButtonClass": function() {
		return TermsAndConditions.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return TermsAndConditions.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.TermsAndConditionsViewTableFooter.rendered = function() {

};

Template.TermsAndConditionsViewTableFooter.events({

	"click #dataview-terms-and-conditions-paginate-buttons": function(e) {
		var documentNumber = parseInt(e.target.textContent, 10);
		Session.set("limit", documentNumber);
	}

});

Template.TermsAndConditionsViewTableFooter.helpers({

});
