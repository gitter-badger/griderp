var pageSession = new ReactiveDict();
var recordSelect = new ReactiveArray();


Template.PurchasingDocumentsMaterialRequest.rendered = function() {

};

Template.PurchasingDocumentsMaterialRequest.events({
	
});

Template.PurchasingDocumentsMaterialRequest.helpers({
	
});

var MaterialRequestViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("MaterialRequestViewSearchString");
	var sortBy = pageSession.get("MaterialRequestViewSortBy");
	var sortAscending = pageSession.get("MaterialRequestViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["material_request_type", "status", "requested_by", "name"];
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

var MaterialRequestViewExport = function(cursor, fileType) {
	var data = MaterialRequestViewItems(cursor);
	var exportFields = ["material_request_type", "status", "requested_by", "name"];

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


Template.MaterialRequestView.rendered = function() {
	pageSession.set("MaterialRequestViewStyle", "table");
	Session.set("buttonSuccess", true);
	
};

Template.MaterialRequestView.events({
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
				pageSession.set("MaterialRequestViewSearchString", searchString);
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
					pageSession.set("MaterialRequestViewSearchString", searchString);
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
					pageSession.set("MaterialRequestViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-material-request-insert-delete-button": function(e, t) {
		e.preventDefault();
		if ($(e.target).hasClass("plus-sign")) {
			Router.go("purchasing.documents.material_request.insert", {});
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
							Meteor.call("removeMaterialRequest", docIds);
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
		MaterialRequestViewExport(this.material_request_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		MaterialRequestViewExport(this.material_request_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		MaterialRequestViewExport(this.material_request_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		MaterialRequestViewExport(this.material_request_list, "json");
	}

	
});

Template.MaterialRequestView.helpers({

	"insertButtonClass": function() {
		return MaterialRequest.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.material_request_list || this.material_request_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.material_request_list && this.material_request_list.count() > 0;
	},
	"isNotFound": function() {
		return this.material_request_list && pageSession.get("MaterialRequestViewSearchString") && MaterialRequestViewItems(this.material_request_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("MaterialRequestViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("MaterialRequestViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("MaterialRequestViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("MaterialRequestViewStyle") == "gallery";
	},
	"toggleAddDeleteButton": function() {
		return Session.get("buttonSuccess") ? "btn btn-primary plus-sign" : "btn btn-danger trash-can";
	},
	"setAddDeleteButtonText": function() {
		return Session.get("buttonSuccess") ? "Add new" : "Delete";
	}

	
});


Template.MaterialRequestViewTable.rendered = function() {

};

Template.MaterialRequestViewTable.events({
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
		var oldSortBy = pageSession.get("MaterialRequestViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("MaterialRequestViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("MaterialRequestViewSortAscending") || false;
			pageSession.set("MaterialRequestViewSortAscending", !sortAscending);
		} else {
			pageSession.set("MaterialRequestViewSortAscending", true);
		}
	}
});

Template.MaterialRequestViewTable.helpers({
	"tableItems": function() {
		return MaterialRequestViewItems(this.material_request_list);
	}

});


Template.MaterialRequestViewTableItems.rendered = function() {

};

Template.MaterialRequestViewTableItems.events({
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
		Router.go("purchasing.documents.material_request.edit", {materialRequestId: this._id});
		return false;
	}

});

Template.MaterialRequestViewTableItems.helpers({
	"checkComplete": function() {
		return Session.get("checkComplete");
	},

	"editButtonClass": function() {
		return MaterialRequest.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return MaterialRequest.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.MaterialRequestViewTableFooter.rendered = function() {

};

Template.MaterialRequestViewTableFooter.events({

	"click #dataview-material-request-paginate-buttons": function(e) {
		var documentNumber = parseInt(e.target.textContent, 10);
		Session.set("limit", documentNumber);
	}

});

Template.MaterialRequestViewTableFooter.helpers({

});
