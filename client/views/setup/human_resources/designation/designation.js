var pageSession = new ReactiveDict();
var recordSelect = new ReactiveArray();


Template.SetupHumanResourcesDesignation.rendered = function() {

};

Template.SetupHumanResourcesDesignation.events({
	
});

Template.SetupHumanResourcesDesignation.helpers({
	
});

var DesignationViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("DesignationViewSearchString");
	var sortBy = pageSession.get("DesignationViewSortBy");
	var sortAscending = pageSession.get("DesignationViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["name", "designation_name"];
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

var DesignationViewExport = function(cursor, fileType) {
	var data = DesignationViewItems(cursor);
	var exportFields = ["name", "designation_name"];

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


Template.DesignationView.rendered = function() {
	pageSession.set("DesignationViewStyle", "table");
	Session.set("buttonSuccess", true);
	
};

Template.DesignationView.events({
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
				pageSession.set("DesignationViewSearchString", searchString);
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
					pageSession.set("DesignationViewSearchString", searchString);
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
					pageSession.set("DesignationViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-designation-insert-delete-button": function(e, t) {
		e.preventDefault();
		if ($(e.target).hasClass("plus-sign")) {
			Router.go("setup.human_resources.designation.insert", {});
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
							Meteor.call("removeDesignation", docIds);
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
		DesignationViewExport(this.designation_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		DesignationViewExport(this.designation_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		DesignationViewExport(this.designation_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		DesignationViewExport(this.designation_list, "json");
	}

	
});

Template.DesignationView.helpers({

	"insertButtonClass": function() {
		return Designation.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.designation_list || this.designation_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.designation_list && this.designation_list.count() > 0;
	},
	"isNotFound": function() {
		return this.designation_list && pageSession.get("DesignationViewSearchString") && DesignationViewItems(this.designation_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("DesignationViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("DesignationViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("DesignationViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("DesignationViewStyle") == "gallery";
	},
	"toggleAddDeleteButton": function() {
		return Session.get("buttonSuccess") ? "btn btn-primary plus-sign" : "btn btn-danger trash-can";
	},
	"setAddDeleteButtonText": function() {
		return Session.get("buttonSuccess") ? "Add new" : "Delete";
	}

	
});


Template.DesignationViewTable.rendered = function() {

};

Template.DesignationViewTable.events({
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
		var oldSortBy = pageSession.get("DesignationViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("DesignationViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("DesignationViewSortAscending") || false;
			pageSession.set("DesignationViewSortAscending", !sortAscending);
		} else {
			pageSession.set("DesignationViewSortAscending", true);
		}
	}
});

Template.DesignationViewTable.helpers({
	"tableItems": function() {
		return DesignationViewItems(this.designation_list);
	}

});


Template.DesignationViewTableItems.rendered = function() {

};

Template.DesignationViewTableItems.events({
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
		Router.go("setup.human_resources.designation.edit", {designationId: this._id});
		return false;
	}

});

Template.DesignationViewTableItems.helpers({
	"checkComplete": function() {
		return Session.get("checkComplete");
	},

	"editButtonClass": function() {
		return Designation.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Designation.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.DesignationViewTableFooter.rendered = function() {

};

Template.DesignationViewTableFooter.events({

	"click #dataview-designation-paginate-buttons": function(e) {
		var documentNumber = parseInt(e.target.textContent, 10);
		Session.set("limit", documentNumber);
	}

});

Template.DesignationViewTableFooter.helpers({

});
