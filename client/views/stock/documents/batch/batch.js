var pageSession = new ReactiveDict();
var recordSelect = new ReactiveArray();


Template.StockDocumentsBatch.rendered = function() {

};

Template.StockDocumentsBatch.events({
	
});

Template.StockDocumentsBatch.helpers({
	
});

var BatchViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("BatchViewSearchString");
	var sortBy = pageSession.get("BatchViewSortBy");
	var sortAscending = pageSession.get("BatchViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["item", "status", "name"];
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

var BatchViewExport = function(cursor, fileType) {
	var data = BatchViewItems(cursor);
	var exportFields = ["item", "status", "name"];

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


Template.BatchView.rendered = function() {
	pageSession.set("BatchViewStyle", "table");
	Session.set("buttonSuccess", true);
	
};

Template.BatchView.events({
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
				pageSession.set("BatchViewSearchString", searchString);
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
					pageSession.set("BatchViewSearchString", searchString);
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
					pageSession.set("BatchViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-batch-insert-delete-button": function(e, t) {
		e.preventDefault();
		if ($(e.target).hasClass("plus-sign")) {
			Router.go("stock.documents.batch.insert", {});
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
							Meteor.call("removeBatch", docIds);
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
		BatchViewExport(this.batch_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		BatchViewExport(this.batch_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		BatchViewExport(this.batch_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		BatchViewExport(this.batch_list, "json");
	}

	
});

Template.BatchView.helpers({

	"insertButtonClass": function() {
		return Batch.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.batch_list || this.batch_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.batch_list && this.batch_list.count() > 0;
	},
	"isNotFound": function() {
		return this.batch_list && pageSession.get("BatchViewSearchString") && BatchViewItems(this.batch_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("BatchViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("BatchViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("BatchViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("BatchViewStyle") == "gallery";
	},
	"toggleAddDeleteButton": function() {
		return Session.get("buttonSuccess") ? "btn btn-primary plus-sign" : "btn btn-danger trash-can";
	},
	"setAddDeleteButtonText": function() {
		return Session.get("buttonSuccess") ? "Add new" : "Delete";
	}

	
});


Template.BatchViewTable.rendered = function() {

};

Template.BatchViewTable.events({
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
		var oldSortBy = pageSession.get("BatchViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("BatchViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("BatchViewSortAscending") || false;
			pageSession.set("BatchViewSortAscending", !sortAscending);
		} else {
			pageSession.set("BatchViewSortAscending", true);
		}
	}
});

Template.BatchViewTable.helpers({
	"tableItems": function() {
		return BatchViewItems(this.batch_list);
	}

});


Template.BatchViewTableItems.rendered = function() {

};

Template.BatchViewTableItems.events({
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
		Router.go("stock.documents.batch.edit", {batchId: this._id});
		return false;
	}

});

Template.BatchViewTableItems.helpers({
	"checkComplete": function() {
		return Session.get("checkComplete");
	},

	"editButtonClass": function() {
		return Batch.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Batch.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.BatchViewTableFooter.rendered = function() {

};

Template.BatchViewTableFooter.events({

	"click #dataview-batch-paginate-buttons": function(e) {
		var documentNumber = parseInt(e.target.textContent, 10);
		Session.set("limit", documentNumber);
	}

});

Template.BatchViewTableFooter.helpers({

});
