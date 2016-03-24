var pageSession = new ReactiveDict();
var recordSelect = new ReactiveArray();


Template.SetupStockBrand.rendered = function() {

};

Template.SetupStockBrand.events({
	
});

Template.SetupStockBrand.helpers({
	
});

var BrandViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("BrandViewSearchString");
	var sortBy = pageSession.get("BrandViewSortBy");
	var sortAscending = pageSession.get("BrandViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["name", "description"];
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

var BrandViewExport = function(cursor, fileType) {
	var data = BrandViewItems(cursor);
	var exportFields = ["name", "description"];

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


Template.BrandView.rendered = function() {
	pageSession.set("BrandViewStyle", "table");
	Session.set("buttonSuccess", true);
	
};

Template.BrandView.events({
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
				pageSession.set("BrandViewSearchString", searchString);
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
					pageSession.set("BrandViewSearchString", searchString);
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
					pageSession.set("BrandViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-brand-insert-delete-button": function(e, t) {
		e.preventDefault();
		if ($(e.target).hasClass("plus-sign")) {
			Router.go("setup.stock.brand.insert", {});
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
							Meteor.call("removeBrand", docIds);
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
		BrandViewExport(this.brand_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		BrandViewExport(this.brand_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		BrandViewExport(this.brand_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		BrandViewExport(this.brand_list, "json");
	}

	
});

Template.BrandView.helpers({

	"insertButtonClass": function() {
		return Brand.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.brand_list || this.brand_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.brand_list && this.brand_list.count() > 0;
	},
	"isNotFound": function() {
		return this.brand_list && pageSession.get("BrandViewSearchString") && BrandViewItems(this.brand_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("BrandViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("BrandViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("BrandViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("BrandViewStyle") == "gallery";
	},
	"toggleAddDeleteButton": function() {
		return Session.get("buttonSuccess") ? "btn btn-primary plus-sign" : "btn btn-danger trash-can";
	},
	"setAddDeleteButtonText": function() {
		return Session.get("buttonSuccess") ? "Add new" : "Delete";
	}

	
});


Template.BrandViewTable.rendered = function() {

};

Template.BrandViewTable.events({
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
		var oldSortBy = pageSession.get("BrandViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("BrandViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("BrandViewSortAscending") || false;
			pageSession.set("BrandViewSortAscending", !sortAscending);
		} else {
			pageSession.set("BrandViewSortAscending", true);
		}
	}
});

Template.BrandViewTable.helpers({
	"tableItems": function() {
		return BrandViewItems(this.brand_list);
	}

});


Template.BrandViewTableItems.rendered = function() {

};

Template.BrandViewTableItems.events({
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
		Router.go("setup.stock.brand.edit", {brandId: this._id});
		return false;
	}

});

Template.BrandViewTableItems.helpers({
	"checkComplete": function() {
		return Session.get("checkComplete");
	},

	"editButtonClass": function() {
		return Brand.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Brand.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.BrandViewTableFooter.rendered = function() {

};

Template.BrandViewTableFooter.events({

	"click #dataview-brand-paginate-buttons": function(e) {
		var documentNumber = parseInt(e.target.textContent, 10);
		Session.set("limit", documentNumber);
	}

});

Template.BrandViewTableFooter.helpers({

});
