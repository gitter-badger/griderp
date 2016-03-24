var pageSession = new ReactiveDict();
var recordSelect = new ReactiveArray();


Template.StockToolsQualityInspection.rendered = function() {

};

Template.StockToolsQualityInspection.events({
	
});

Template.StockToolsQualityInspection.helpers({
	
});

var QualityInspectionViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("QualityInspectionViewSearchString");
	var sortBy = pageSession.get("QualityInspectionViewSortBy");
	var sortAscending = pageSession.get("QualityInspectionViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["name", "docstatus", "report_date"];
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

var QualityInspectionViewExport = function(cursor, fileType) {
	var data = QualityInspectionViewItems(cursor);
	var exportFields = ["name", "docstatus", "report_date"];

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


Template.QualityInspectionView.rendered = function() {
	pageSession.set("QualityInspectionViewStyle", "table");
	Session.set("buttonSuccess", true);
	
};

Template.QualityInspectionView.events({
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
				pageSession.set("QualityInspectionViewSearchString", searchString);
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
					pageSession.set("QualityInspectionViewSearchString", searchString);
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
					pageSession.set("QualityInspectionViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-quality-inspection-insert-delete-button": function(e, t) {
		e.preventDefault();
		if ($(e.target).hasClass("plus-sign")) {
			Router.go("stock.tools.quality_inspection.insert", {});
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
							Meteor.call("removeQualityInspection", docIds);
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
		QualityInspectionViewExport(this.quality_inspection_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		QualityInspectionViewExport(this.quality_inspection_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		QualityInspectionViewExport(this.quality_inspection_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		QualityInspectionViewExport(this.quality_inspection_list, "json");
	}

	
});

Template.QualityInspectionView.helpers({

	"insertButtonClass": function() {
		return QualityInspection.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.quality_inspection_list || this.quality_inspection_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.quality_inspection_list && this.quality_inspection_list.count() > 0;
	},
	"isNotFound": function() {
		return this.quality_inspection_list && pageSession.get("QualityInspectionViewSearchString") && QualityInspectionViewItems(this.quality_inspection_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("QualityInspectionViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("QualityInspectionViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("QualityInspectionViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("QualityInspectionViewStyle") == "gallery";
	},
	"toggleAddDeleteButton": function() {
		return Session.get("buttonSuccess") ? "btn btn-primary plus-sign" : "btn btn-danger trash-can";
	},
	"setAddDeleteButtonText": function() {
		return Session.get("buttonSuccess") ? "Add new" : "Delete";
	}

	
});


Template.QualityInspectionViewTable.rendered = function() {

};

Template.QualityInspectionViewTable.events({
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
		var oldSortBy = pageSession.get("QualityInspectionViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("QualityInspectionViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("QualityInspectionViewSortAscending") || false;
			pageSession.set("QualityInspectionViewSortAscending", !sortAscending);
		} else {
			pageSession.set("QualityInspectionViewSortAscending", true);
		}
	}
});

Template.QualityInspectionViewTable.helpers({
	"tableItems": function() {
		return QualityInspectionViewItems(this.quality_inspection_list);
	}

});


Template.QualityInspectionViewTableItems.rendered = function() {

};

Template.QualityInspectionViewTableItems.events({
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
		Router.go("stock.tools.quality_inspection.edit", {qualityInspectionId: this._id});
		return false;
	}

});

Template.QualityInspectionViewTableItems.helpers({
	"checkComplete": function() {
		return Session.get("checkComplete");
	},

	"editButtonClass": function() {
		return QualityInspection.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return QualityInspection.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.QualityInspectionViewTableFooter.rendered = function() {

};

Template.QualityInspectionViewTableFooter.events({

	"click #dataview-quality-inspection-paginate-buttons": function(e) {
		var documentNumber = parseInt(e.target.textContent, 10);
		Session.set("limit", documentNumber);
	}

});

Template.QualityInspectionViewTableFooter.helpers({

});
