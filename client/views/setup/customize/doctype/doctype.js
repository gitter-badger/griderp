var pageSession = new ReactiveDict();
var recordSelect = new ReactiveArray();


Template.SetupCustomizeDoctype.rendered = function() {

};

Template.SetupCustomizeDoctype.events({
	
});

Template.SetupCustomizeDoctype.helpers({
	
});

var DoctypeViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("DoctypeViewSearchString");
	var sortBy = pageSession.get("DoctypeViewSortBy");
	var sortAscending = pageSession.get("DoctypeViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["name", "module"];
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

var DoctypeViewExport = function(cursor, fileType) {
	var data = DoctypeViewItems(cursor);
	var exportFields = ["name", "module"];

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


Template.DoctypeView.rendered = function() {
	pageSession.set("DoctypeViewStyle", "table");
	Session.set("buttonSuccess", true);
	
};

Template.DoctypeView.events({
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
				pageSession.set("DoctypeViewSearchString", searchString);
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
					pageSession.set("DoctypeViewSearchString", searchString);
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
					pageSession.set("DoctypeViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-doctype-insert-delete-button": function(e, t) {
		e.preventDefault();
		if ($(e.target).hasClass("plus-sign")) {
			Router.go("setup.customize.doctype.insert", {});
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
							Meteor.call("removeDoctype", docIds);
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
		DoctypeViewExport(this.doctype_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		DoctypeViewExport(this.doctype_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		DoctypeViewExport(this.doctype_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		DoctypeViewExport(this.doctype_list, "json");
	}

	
});

Template.DoctypeView.helpers({

	"insertButtonClass": function() {
		return Doctype.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.doctype_list || this.doctype_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.doctype_list && this.doctype_list.count() > 0;
	},
	"isNotFound": function() {
		return this.doctype_list && pageSession.get("DoctypeViewSearchString") && DoctypeViewItems(this.doctype_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("DoctypeViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("DoctypeViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("DoctypeViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("DoctypeViewStyle") == "gallery";
	},
	"toggleAddDeleteButton": function() {
		return Session.get("buttonSuccess") ? "btn btn-primary plus-sign" : "btn btn-danger trash-can";
	},
	"setAddDeleteButtonText": function() {
		return Session.get("buttonSuccess") ? "Add new" : "Delete";
	}

	
});


Template.DoctypeViewTable.rendered = function() {

};

Template.DoctypeViewTable.events({
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
		var oldSortBy = pageSession.get("DoctypeViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("DoctypeViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("DoctypeViewSortAscending") || false;
			pageSession.set("DoctypeViewSortAscending", !sortAscending);
		} else {
			pageSession.set("DoctypeViewSortAscending", true);
		}
	}
});

Template.DoctypeViewTable.helpers({
	"tableItems": function() {
		return DoctypeViewItems(this.doctype_list);
	}

});


Template.DoctypeViewTableItems.rendered = function() {

};

Template.DoctypeViewTableItems.events({
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
		Router.go("setup.customize.doctype.details", {doctypeId: this._id});
		return false;
	}

});

Template.DoctypeViewTableItems.helpers({
	"checkComplete": function() {
		return Session.get("checkComplete");
	},

	"editButtonClass": function() {
		return Doctype.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Doctype.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	},

	"buildDoctypeDirectoryName": function(docTypeName) {
		return s.underscored(docTypeName);
	}

});

Template.DoctypeViewTableFooter.rendered = function() {

};

Template.DoctypeViewTableFooter.events({

	"click #dataview-doctype-paginate-buttons": function(e) {
		var documentNumber = parseInt(e.target.textContent, 10);
		Session.set("limit", documentNumber);
	}

});

Template.DoctypeViewTableFooter.helpers({

});
