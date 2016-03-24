var pageSession = new ReactiveDict();
var recordSelect = new ReactiveArray();


Template.ManufacturingDocumentsOperation.rendered = function() {

};

Template.ManufacturingDocumentsOperation.events({
	
});

Template.ManufacturingDocumentsOperation.helpers({
	
});

var OperationViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("OperationViewSearchString");
	var sortBy = pageSession.get("OperationViewSortBy");
	var sortAscending = pageSession.get("OperationViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["name", "workstation"];
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

var OperationViewExport = function(cursor, fileType) {
	var data = OperationViewItems(cursor);
	var exportFields = ["name", "workstation"];

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


Template.OperationView.rendered = function() {
	pageSession.set("OperationViewStyle", "table");
	Session.set("buttonSuccess", true);
	
};

Template.OperationView.events({
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
				pageSession.set("OperationViewSearchString", searchString);
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
					pageSession.set("OperationViewSearchString", searchString);
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
					pageSession.set("OperationViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-operation-insert-delete-button": function(e, t) {
		e.preventDefault();
		if ($(e.target).hasClass("plus-sign")) {
			Router.go("manufacturing.documents.operation.insert", {});
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
							Meteor.call("removeOperation", docIds);
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
		OperationViewExport(this.operation_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		OperationViewExport(this.operation_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		OperationViewExport(this.operation_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		OperationViewExport(this.operation_list, "json");
	}

	
});

Template.OperationView.helpers({

	"insertButtonClass": function() {
		return Operation.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.operation_list || this.operation_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.operation_list && this.operation_list.count() > 0;
	},
	"isNotFound": function() {
		return this.operation_list && pageSession.get("OperationViewSearchString") && OperationViewItems(this.operation_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("OperationViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("OperationViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("OperationViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("OperationViewStyle") == "gallery";
	},
	"toggleAddDeleteButton": function() {
		return Session.get("buttonSuccess") ? "btn btn-primary plus-sign" : "btn btn-danger trash-can";
	},
	"setAddDeleteButtonText": function() {
		return Session.get("buttonSuccess") ? "Add new" : "Delete";
	}

	
});


Template.OperationViewTable.rendered = function() {

};

Template.OperationViewTable.events({
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
		var oldSortBy = pageSession.get("OperationViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("OperationViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("OperationViewSortAscending") || false;
			pageSession.set("OperationViewSortAscending", !sortAscending);
		} else {
			pageSession.set("OperationViewSortAscending", true);
		}
	}
});

Template.OperationViewTable.helpers({
	"tableItems": function() {
		return OperationViewItems(this.operation_list);
	}

});


Template.OperationViewTableItems.rendered = function() {

};

Template.OperationViewTableItems.events({
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
		Router.go("manufacturing.documents.operation.edit", {operationId: this._id});
		return false;
	}

});

Template.OperationViewTableItems.helpers({
	"checkComplete": function() {
		return Session.get("checkComplete");
	},

	"editButtonClass": function() {
		return Operation.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Operation.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.OperationViewTableFooter.rendered = function() {

};

Template.OperationViewTableFooter.events({

	"click #dataview-operation-paginate-buttons": function(e) {
		var documentNumber = parseInt(e.target.textContent, 10);
		Session.set("limit", documentNumber);
	}

});

Template.OperationViewTableFooter.helpers({

});
