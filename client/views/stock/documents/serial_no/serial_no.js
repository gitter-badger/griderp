var pageSession = new ReactiveDict();
var recordSelect = new ReactiveArray();


Template.StockDocumentsSerialNo.rendered = function() {

};

Template.StockDocumentsSerialNo.events({
	
});

Template.StockDocumentsSerialNo.helpers({
	
});

var SerialNoViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("SerialNoViewSearchString");
	var sortBy = pageSession.get("SerialNoViewSortBy");
	var sortAscending = pageSession.get("SerialNoViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["name", "item_code", "warehouse"];
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

var SerialNoViewExport = function(cursor, fileType) {
	var data = SerialNoViewItems(cursor);
	var exportFields = ["name", "item_code", "warehouse"];

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


Template.SerialNoView.rendered = function() {
	pageSession.set("SerialNoViewStyle", "table");
	Session.set("buttonSuccess", true);
	
};

Template.SerialNoView.events({
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
				pageSession.set("SerialNoViewSearchString", searchString);
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
					pageSession.set("SerialNoViewSearchString", searchString);
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
					pageSession.set("SerialNoViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-serial-no-insert-delete-button": function(e, t) {
		e.preventDefault();
		if ($(e.target).hasClass("plus-sign")) {
			Router.go("stock.documents.serial_no.insert", {});
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
							Meteor.call("removeSerialNo", docIds);
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
		SerialNoViewExport(this.serial_no_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		SerialNoViewExport(this.serial_no_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		SerialNoViewExport(this.serial_no_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		SerialNoViewExport(this.serial_no_list, "json");
	}

	
});

Template.SerialNoView.helpers({

	"insertButtonClass": function() {
		return SerialNo.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.serial_no_list || this.serial_no_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.serial_no_list && this.serial_no_list.count() > 0;
	},
	"isNotFound": function() {
		return this.serial_no_list && pageSession.get("SerialNoViewSearchString") && SerialNoViewItems(this.serial_no_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("SerialNoViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("SerialNoViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("SerialNoViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("SerialNoViewStyle") == "gallery";
	},
	"toggleAddDeleteButton": function() {
		return Session.get("buttonSuccess") ? "btn btn-primary plus-sign" : "btn btn-danger trash-can";
	},
	"setAddDeleteButtonText": function() {
		return Session.get("buttonSuccess") ? "Add new" : "Delete";
	}

	
});


Template.SerialNoViewTable.rendered = function() {

};

Template.SerialNoViewTable.events({
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
		var oldSortBy = pageSession.get("SerialNoViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("SerialNoViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("SerialNoViewSortAscending") || false;
			pageSession.set("SerialNoViewSortAscending", !sortAscending);
		} else {
			pageSession.set("SerialNoViewSortAscending", true);
		}
	}
});

Template.SerialNoViewTable.helpers({
	"tableItems": function() {
		return SerialNoViewItems(this.serial_no_list);
	}

});


Template.SerialNoViewTableItems.rendered = function() {

};

Template.SerialNoViewTableItems.events({
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
		Router.go("stock.documents.serial_no.edit", {serialNoId: this._id});
		return false;
	}

});

Template.SerialNoViewTableItems.helpers({
	"checkComplete": function() {
		return Session.get("checkComplete");
	},

	"editButtonClass": function() {
		return SerialNo.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return SerialNo.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.SerialNoViewTableFooter.rendered = function() {

};

Template.SerialNoViewTableFooter.events({

	"click #dataview-serial-no-paginate-buttons": function(e) {
		var documentNumber = parseInt(e.target.textContent, 10);
		Session.set("limit", documentNumber);
	}

});

Template.SerialNoViewTableFooter.helpers({

});
