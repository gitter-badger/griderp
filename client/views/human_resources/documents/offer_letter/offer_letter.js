var pageSession = new ReactiveDict();
var recordSelect = new ReactiveArray();


Template.HumanResourcesDocumentsOfferLetter.rendered = function() {

};

Template.HumanResourcesDocumentsOfferLetter.events({
	
});

Template.HumanResourcesDocumentsOfferLetter.helpers({
	
});

var OfferLetterViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("OfferLetterViewSearchString");
	var sortBy = pageSession.get("OfferLetterViewSortBy");
	var sortAscending = pageSession.get("OfferLetterViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["applicant_name", "status", "name"];
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

var OfferLetterViewExport = function(cursor, fileType) {
	var data = OfferLetterViewItems(cursor);
	var exportFields = ["applicant_name", "status", "name"];

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


Template.OfferLetterView.rendered = function() {
	pageSession.set("OfferLetterViewStyle", "table");
	Session.set("buttonSuccess", true);
	
};

Template.OfferLetterView.events({
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
				pageSession.set("OfferLetterViewSearchString", searchString);
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
					pageSession.set("OfferLetterViewSearchString", searchString);
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
					pageSession.set("OfferLetterViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-offer-letter-insert-delete-button": function(e, t) {
		e.preventDefault();
		if ($(e.target).hasClass("plus-sign")) {
			Router.go("human_resources.documents.offer_letter.insert", {});
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
							Meteor.call("removeOfferLetter", docIds);
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
		OfferLetterViewExport(this.offer_letter_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		OfferLetterViewExport(this.offer_letter_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		OfferLetterViewExport(this.offer_letter_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		OfferLetterViewExport(this.offer_letter_list, "json");
	}

	
});

Template.OfferLetterView.helpers({

	"insertButtonClass": function() {
		return OfferLetter.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.offer_letter_list || this.offer_letter_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.offer_letter_list && this.offer_letter_list.count() > 0;
	},
	"isNotFound": function() {
		return this.offer_letter_list && pageSession.get("OfferLetterViewSearchString") && OfferLetterViewItems(this.offer_letter_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("OfferLetterViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("OfferLetterViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("OfferLetterViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("OfferLetterViewStyle") == "gallery";
	},
	"toggleAddDeleteButton": function() {
		return Session.get("buttonSuccess") ? "btn btn-primary plus-sign" : "btn btn-danger trash-can";
	},
	"setAddDeleteButtonText": function() {
		return Session.get("buttonSuccess") ? "Add new" : "Delete";
	}

	
});


Template.OfferLetterViewTable.rendered = function() {

};

Template.OfferLetterViewTable.events({
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
		var oldSortBy = pageSession.get("OfferLetterViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("OfferLetterViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("OfferLetterViewSortAscending") || false;
			pageSession.set("OfferLetterViewSortAscending", !sortAscending);
		} else {
			pageSession.set("OfferLetterViewSortAscending", true);
		}
	}
});

Template.OfferLetterViewTable.helpers({
	"tableItems": function() {
		return OfferLetterViewItems(this.offer_letter_list);
	}

});


Template.OfferLetterViewTableItems.rendered = function() {

};

Template.OfferLetterViewTableItems.events({
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
		Router.go("human_resources.documents.offer_letter.edit", {offerLetterId: this._id});
		return false;
	}

});

Template.OfferLetterViewTableItems.helpers({
	"checkComplete": function() {
		return Session.get("checkComplete");
	},

	"editButtonClass": function() {
		return OfferLetter.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return OfferLetter.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.OfferLetterViewTableFooter.rendered = function() {

};

Template.OfferLetterViewTableFooter.events({

	"click #dataview-offer-letter-paginate-buttons": function(e) {
		var documentNumber = parseInt(e.target.textContent, 10);
		Session.set("limit", documentNumber);
	}

});

Template.OfferLetterViewTableFooter.helpers({

});
