var pageSession = new ReactiveDict();
var recordSelect = new ReactiveArray();


Template.SetupPrintingAddressTemplate.rendered = function() {

};

Template.SetupPrintingAddressTemplate.events({
	
});

Template.SetupPrintingAddressTemplate.helpers({
	
});

var AddressTemplateViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("AddressTemplateViewSearchString");
	var sortBy = pageSession.get("AddressTemplateViewSortBy");
	var sortAscending = pageSession.get("AddressTemplateViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["name", "country", "is_default"];
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

var AddressTemplateViewExport = function(cursor, fileType) {
	var data = AddressTemplateViewItems(cursor);
	var exportFields = ["name", "country", "is_default"];

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


Template.AddressTemplateView.rendered = function() {
	pageSession.set("AddressTemplateViewStyle", "table");
	Session.set("buttonSuccess", true);
	
};

Template.AddressTemplateView.events({
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
				pageSession.set("AddressTemplateViewSearchString", searchString);
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
					pageSession.set("AddressTemplateViewSearchString", searchString);
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
					pageSession.set("AddressTemplateViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-address-template-insert-delete-button": function(e, t) {
		e.preventDefault();
		if ($(e.target).hasClass("plus-sign")) {
			Router.go("setup.printing.address_template.insert", {});
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
							Meteor.call("removeAddressTemplate", docIds);
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
		AddressTemplateViewExport(this.address_template_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		AddressTemplateViewExport(this.address_template_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		AddressTemplateViewExport(this.address_template_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		AddressTemplateViewExport(this.address_template_list, "json");
	}

	
});

Template.AddressTemplateView.helpers({

	"insertButtonClass": function() {
		return AddressTemplate.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.address_template_list || this.address_template_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.address_template_list && this.address_template_list.count() > 0;
	},
	"isNotFound": function() {
		return this.address_template_list && pageSession.get("AddressTemplateViewSearchString") && AddressTemplateViewItems(this.address_template_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("AddressTemplateViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("AddressTemplateViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("AddressTemplateViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("AddressTemplateViewStyle") == "gallery";
	},
	"toggleAddDeleteButton": function() {
		return Session.get("buttonSuccess") ? "btn btn-primary plus-sign" : "btn btn-danger trash-can";
	},
	"setAddDeleteButtonText": function() {
		return Session.get("buttonSuccess") ? "Add new" : "Delete";
	}

	
});


Template.AddressTemplateViewTable.rendered = function() {

};

Template.AddressTemplateViewTable.events({
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
		var oldSortBy = pageSession.get("AddressTemplateViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("AddressTemplateViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("AddressTemplateViewSortAscending") || false;
			pageSession.set("AddressTemplateViewSortAscending", !sortAscending);
		} else {
			pageSession.set("AddressTemplateViewSortAscending", true);
		}
	}
});

Template.AddressTemplateViewTable.helpers({
	"tableItems": function() {
		return AddressTemplateViewItems(this.address_template_list);
	}

});


Template.AddressTemplateViewTableItems.rendered = function() {

};

Template.AddressTemplateViewTableItems.events({
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
		Router.go("setup.printing.address_template.edit", {addressTemplateId: this._id});
		return false;
	}

});

Template.AddressTemplateViewTableItems.helpers({
	"checkComplete": function() {
		return Session.get("checkComplete");
	},

	"editButtonClass": function() {
		return AddressTemplate.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return AddressTemplate.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.AddressTemplateViewTableFooter.rendered = function() {

};

Template.AddressTemplateViewTableFooter.events({

	"click #dataview-address-template-paginate-buttons": function(e) {
		var documentNumber = parseInt(e.target.textContent, 10);
		Session.set("limit", documentNumber);
	}

});

Template.AddressTemplateViewTableFooter.helpers({

});
