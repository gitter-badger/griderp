var pageSession = new ReactiveDict();
var recordSelect = new ReactiveArray();


Template.SetupStockUnitOfMeasureUom.rendered = function() {

};

Template.SetupStockUnitOfMeasureUom.events({
	
});

Template.SetupStockUnitOfMeasureUom.helpers({
	
});

var UomViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("UomViewSearchString");
	var sortBy = pageSession.get("UomViewSortBy");
	var sortAscending = pageSession.get("UomViewSortAscending");
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

var UomViewExport = function(cursor, fileType) {
	var data = UomViewItems(cursor);
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


Template.UomView.rendered = function() {
	pageSession.set("UomViewStyle", "table");
	Session.set("buttonSuccess", true);
	
};

Template.UomView.events({
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
				pageSession.set("UomViewSearchString", searchString);
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
					pageSession.set("UomViewSearchString", searchString);
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
					pageSession.set("UomViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-uom-insert-delete-button": function(e, t) {
		e.preventDefault();
		if ($(e.target).hasClass("plus-sign")) {
			Router.go("setup.stock.unit_of_measure_uom.insert", {});
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
							Meteor.call("removeUom", docIds);
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
		UomViewExport(this.uom_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		UomViewExport(this.uom_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		UomViewExport(this.uom_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		UomViewExport(this.uom_list, "json");
	}

	
});

Template.UomView.helpers({

	"insertButtonClass": function() {
		return Uom.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.uom_list || this.uom_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.uom_list && this.uom_list.count() > 0;
	},
	"isNotFound": function() {
		return this.uom_list && pageSession.get("UomViewSearchString") && UomViewItems(this.uom_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("UomViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("UomViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("UomViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("UomViewStyle") == "gallery";
	},
	"toggleAddDeleteButton": function() {
		return Session.get("buttonSuccess") ? "btn btn-primary plus-sign" : "btn btn-danger trash-can";
	},
	"setAddDeleteButtonText": function() {
		return Session.get("buttonSuccess") ? "Add new" : "Delete";
	}

	
});


Template.UomViewTable.rendered = function() {

};

Template.UomViewTable.events({
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
		var oldSortBy = pageSession.get("UomViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("UomViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("UomViewSortAscending") || false;
			pageSession.set("UomViewSortAscending", !sortAscending);
		} else {
			pageSession.set("UomViewSortAscending", true);
		}
	}
});

Template.UomViewTable.helpers({
	"tableItems": function() {
		return UomViewItems(this.uom_list);
	}

});


Template.UomViewTableItems.rendered = function() {

};

Template.UomViewTableItems.events({
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
		Router.go("setup.stock.unit_of_measure_uom.edit", {uomId: this._id});
		return false;
	}

});

Template.UomViewTableItems.helpers({
	"checkComplete": function() {
		return Session.get("checkComplete");
	},

	"editButtonClass": function() {
		return Uom.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Uom.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.UomViewTableFooter.rendered = function() {

};

Template.UomViewTableFooter.events({

	"click #dataview-uom-paginate-buttons": function(e) {
		var documentNumber = parseInt(e.target.textContent, 10);
		Session.set("limit", documentNumber);
	}

});

Template.UomViewTableFooter.helpers({

});
