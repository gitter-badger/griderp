var pageSession = new ReactiveDict();
var recordSelect = new ReactiveArray();


Template.SetupAccountsModeOfPayment.rendered = function() {

};

Template.SetupAccountsModeOfPayment.events({
	
});

Template.SetupAccountsModeOfPayment.helpers({
	
});

var ModeOfPaymentViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("ModeOfPaymentViewSearchString");
	var sortBy = pageSession.get("ModeOfPaymentViewSortBy");
	var sortAscending = pageSession.get("ModeOfPaymentViewSortAscending");
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

var ModeOfPaymentViewExport = function(cursor, fileType) {
	var data = ModeOfPaymentViewItems(cursor);
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


Template.ModeOfPaymentView.rendered = function() {
	pageSession.set("ModeOfPaymentViewStyle", "table");
	Session.set("buttonSuccess", true);
	
};

Template.ModeOfPaymentView.events({
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
				pageSession.set("ModeOfPaymentViewSearchString", searchString);
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
					pageSession.set("ModeOfPaymentViewSearchString", searchString);
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
					pageSession.set("ModeOfPaymentViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-mode-of-payment-insert-delete-button": function(e, t) {
		e.preventDefault();
		if ($(e.target).hasClass("plus-sign")) {
			Router.go("setup.accounts.mode_of_payment.insert", {});
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
							Meteor.call("removeModeOfPayment", docIds);
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
		ModeOfPaymentViewExport(this.mode_of_payment_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		ModeOfPaymentViewExport(this.mode_of_payment_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		ModeOfPaymentViewExport(this.mode_of_payment_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		ModeOfPaymentViewExport(this.mode_of_payment_list, "json");
	}

	
});

Template.ModeOfPaymentView.helpers({

	"insertButtonClass": function() {
		return ModeOfPayment.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.mode_of_payment_list || this.mode_of_payment_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.mode_of_payment_list && this.mode_of_payment_list.count() > 0;
	},
	"isNotFound": function() {
		return this.mode_of_payment_list && pageSession.get("ModeOfPaymentViewSearchString") && ModeOfPaymentViewItems(this.mode_of_payment_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("ModeOfPaymentViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("ModeOfPaymentViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("ModeOfPaymentViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("ModeOfPaymentViewStyle") == "gallery";
	},
	"toggleAddDeleteButton": function() {
		return Session.get("buttonSuccess") ? "btn btn-primary plus-sign" : "btn btn-danger trash-can";
	},
	"setAddDeleteButtonText": function() {
		return Session.get("buttonSuccess") ? "Add new" : "Delete";
	}

	
});


Template.ModeOfPaymentViewTable.rendered = function() {

};

Template.ModeOfPaymentViewTable.events({
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
		var oldSortBy = pageSession.get("ModeOfPaymentViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("ModeOfPaymentViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("ModeOfPaymentViewSortAscending") || false;
			pageSession.set("ModeOfPaymentViewSortAscending", !sortAscending);
		} else {
			pageSession.set("ModeOfPaymentViewSortAscending", true);
		}
	}
});

Template.ModeOfPaymentViewTable.helpers({
	"tableItems": function() {
		return ModeOfPaymentViewItems(this.mode_of_payment_list);
	}

});


Template.ModeOfPaymentViewTableItems.rendered = function() {

};

Template.ModeOfPaymentViewTableItems.events({
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
		Router.go("setup.accounts.mode_of_payment.edit", {modeOfPaymentId: this._id});
		return false;
	}

});

Template.ModeOfPaymentViewTableItems.helpers({
	"checkComplete": function() {
		return Session.get("checkComplete");
	},

	"editButtonClass": function() {
		return ModeOfPayment.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return ModeOfPayment.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.ModeOfPaymentViewTableFooter.rendered = function() {

};

Template.ModeOfPaymentViewTableFooter.events({

	"click #dataview-mode-of-payment-paginate-buttons": function(e) {
		var documentNumber = parseInt(e.target.textContent, 10);
		Session.set("limit", documentNumber);
	}

});

Template.ModeOfPaymentViewTableFooter.helpers({

});
