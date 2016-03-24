var pageSession = new ReactiveDict();
var recordSelect = new ReactiveArray();


Template.SetupCustomizeCustomField.rendered = function() {

};

Template.SetupCustomizeCustomField.events({
	
});

Template.SetupCustomizeCustomField.helpers({
	
});

var CustomFieldViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("CustomFieldViewSearchString");
	var sortBy = pageSession.get("CustomFieldViewSortBy");
	var sortAscending = pageSession.get("CustomFieldViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["name", "dt", "fieldtype"];
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

var CustomFieldViewExport = function(cursor, fileType) {
	var data = CustomFieldViewItems(cursor);
	var exportFields = ["name", "dt", "fieldtype"];

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


Template.CustomFieldView.rendered = function() {
	pageSession.set("CustomFieldViewStyle", "table");
	Session.set("buttonSuccess", true);
	
};

Template.CustomFieldView.events({
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
				pageSession.set("CustomFieldViewSearchString", searchString);
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
					pageSession.set("CustomFieldViewSearchString", searchString);
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
					pageSession.set("CustomFieldViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-custom-field-insert-delete-button": function(e, t) {
		e.preventDefault();
		if ($(e.target).hasClass("plus-sign")) {
			Router.go("setup.customize.custom_field.insert", {});
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
							Meteor.call("removeCustomField", docIds);
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
		CustomFieldViewExport(this.custom_field_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		CustomFieldViewExport(this.custom_field_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		CustomFieldViewExport(this.custom_field_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		CustomFieldViewExport(this.custom_field_list, "json");
	}

	
});

Template.CustomFieldView.helpers({

	"insertButtonClass": function() {
		return CustomField.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.custom_field_list || this.custom_field_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.custom_field_list && this.custom_field_list.count() > 0;
	},
	"isNotFound": function() {
		return this.custom_field_list && pageSession.get("CustomFieldViewSearchString") && CustomFieldViewItems(this.custom_field_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("CustomFieldViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("CustomFieldViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("CustomFieldViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("CustomFieldViewStyle") == "gallery";
	},
	"toggleAddDeleteButton": function() {
		return Session.get("buttonSuccess") ? "btn btn-primary plus-sign" : "btn btn-danger trash-can";
	},
	"setAddDeleteButtonText": function() {
		return Session.get("buttonSuccess") ? "Add new" : "Delete";
	}

	
});


Template.CustomFieldViewTable.rendered = function() {

};

Template.CustomFieldViewTable.events({
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
		var oldSortBy = pageSession.get("CustomFieldViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("CustomFieldViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("CustomFieldViewSortAscending") || false;
			pageSession.set("CustomFieldViewSortAscending", !sortAscending);
		} else {
			pageSession.set("CustomFieldViewSortAscending", true);
		}
	}
});

Template.CustomFieldViewTable.helpers({
	"tableItems": function() {
		return CustomFieldViewItems(this.custom_field_list);
	}

});


Template.CustomFieldViewTableItems.rendered = function() {

};

Template.CustomFieldViewTableItems.events({
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
		Router.go("setup.customize.custom_field.edit", {customFieldId: this._id});
		return false;
	}

});

Template.CustomFieldViewTableItems.helpers({
	"checkComplete": function() {
		return Session.get("checkComplete");
	},

	"editButtonClass": function() {
		return CustomField.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return CustomField.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.CustomFieldViewTableFooter.rendered = function() {

};

Template.CustomFieldViewTableFooter.events({

	"click #dataview-custom-field-paginate-buttons": function(e) {
		var documentNumber = parseInt(e.target.textContent, 10);
		Session.set("limit", documentNumber);
	}

});

Template.CustomFieldViewTableFooter.helpers({

});
