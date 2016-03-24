var pageSession = new ReactiveDict();
var recordSelect = new ReactiveArray();


Template.StockDocumentsDeliveryNote.rendered = function() {

};

Template.StockDocumentsDeliveryNote.events({
	
});

Template.StockDocumentsDeliveryNote.helpers({
	
});

var DeliveryNoteViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("DeliveryNoteViewSearchString");
	var sortBy = pageSession.get("DeliveryNoteViewSortBy");
	var sortAscending = pageSession.get("DeliveryNoteViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["customer_name", "docstatus", "grand_total", "name"];
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

var DeliveryNoteViewExport = function(cursor, fileType) {
	var data = DeliveryNoteViewItems(cursor);
	var exportFields = ["customer_name", "docstatus", "grand_total", "name"];

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


Template.DeliveryNoteView.rendered = function() {
	pageSession.set("DeliveryNoteViewStyle", "table");
	Session.set("buttonSuccess", true);
	
};

Template.DeliveryNoteView.events({
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
				pageSession.set("DeliveryNoteViewSearchString", searchString);
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
					pageSession.set("DeliveryNoteViewSearchString", searchString);
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
					pageSession.set("DeliveryNoteViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-delivery-note-insert-delete-button": function(e, t) {
		e.preventDefault();
		if ($(e.target).hasClass("plus-sign")) {
			Router.go("stock.documents.delivery_note.insert", {});
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
							Meteor.call("removeDeliveryNote", docIds);
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
		DeliveryNoteViewExport(this.delivery_note_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		DeliveryNoteViewExport(this.delivery_note_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		DeliveryNoteViewExport(this.delivery_note_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		DeliveryNoteViewExport(this.delivery_note_list, "json");
	}

	
});

Template.DeliveryNoteView.helpers({

	"insertButtonClass": function() {
		return DeliveryNote.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.delivery_note_list || this.delivery_note_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.delivery_note_list && this.delivery_note_list.count() > 0;
	},
	"isNotFound": function() {
		return this.delivery_note_list && pageSession.get("DeliveryNoteViewSearchString") && DeliveryNoteViewItems(this.delivery_note_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("DeliveryNoteViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("DeliveryNoteViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("DeliveryNoteViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("DeliveryNoteViewStyle") == "gallery";
	},
	"toggleAddDeleteButton": function() {
		return Session.get("buttonSuccess") ? "btn btn-primary plus-sign" : "btn btn-danger trash-can";
	},
	"setAddDeleteButtonText": function() {
		return Session.get("buttonSuccess") ? "Add new" : "Delete";
	}

	
});


Template.DeliveryNoteViewTable.rendered = function() {

};

Template.DeliveryNoteViewTable.events({
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
		var oldSortBy = pageSession.get("DeliveryNoteViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("DeliveryNoteViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("DeliveryNoteViewSortAscending") || false;
			pageSession.set("DeliveryNoteViewSortAscending", !sortAscending);
		} else {
			pageSession.set("DeliveryNoteViewSortAscending", true);
		}
	}
});

Template.DeliveryNoteViewTable.helpers({
	"tableItems": function() {
		return DeliveryNoteViewItems(this.delivery_note_list);
	}

});


Template.DeliveryNoteViewTableItems.rendered = function() {

};

Template.DeliveryNoteViewTableItems.events({
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
		Router.go("stock.documents.delivery_note.edit", {deliveryNoteId: this._id});
		return false;
	}

});

Template.DeliveryNoteViewTableItems.helpers({
	"checkComplete": function() {
		return Session.get("checkComplete");
	},

	"editButtonClass": function() {
		return DeliveryNote.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return DeliveryNote.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	},

	"paymentStatus": function() {
		var currentStatus = DeliveryNote.findOne({_id: this._id});
		return (currentStatus.outstanding_amount > 0) ? true : false;
	},

	"grandTotal": function() {
		var currentGrandTotal = DeliveryNote.findOne({_id: this._id});
		return accounting.formatMoney(currentGrandTotal.grand_total);
	}
});

Template.DeliveryNoteViewTableFooter.rendered = function() {

};

Template.DeliveryNoteViewTableFooter.events({

	"click #dataview-delivery-note-paginate-buttons": function(e) {
		var documentNumber = parseInt(e.target.textContent, 10);
		Session.set("limit", documentNumber);
	}

});

Template.DeliveryNoteViewTableFooter.helpers({

});
