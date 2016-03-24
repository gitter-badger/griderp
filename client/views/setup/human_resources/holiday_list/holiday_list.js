var pageSession = new ReactiveDict();
var recordSelect = new ReactiveArray();


Template.SetupHumanResourcesHolidayList.rendered = function() {

};

Template.SetupHumanResourcesHolidayList.events({
	
});

Template.SetupHumanResourcesHolidayList.helpers({
	
});

var HolidayListViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("HolidayListViewSearchString");
	var sortBy = pageSession.get("HolidayListViewSortBy");
	var sortAscending = pageSession.get("HolidayListViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["name", "holiday_list_name", "is_default"];
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

var HolidayListViewExport = function(cursor, fileType) {
	var data = HolidayListViewItems(cursor);
	var exportFields = ["name", "holiday_list_name", "is_default"];

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


Template.HolidayListView.rendered = function() {
	pageSession.set("HolidayListViewStyle", "table");
	Session.set("buttonSuccess", true);
	
};

Template.HolidayListView.events({
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
				pageSession.set("HolidayListViewSearchString", searchString);
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
					pageSession.set("HolidayListViewSearchString", searchString);
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
					pageSession.set("HolidayListViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-holiday-list-insert-delete-button": function(e, t) {
		e.preventDefault();
		if ($(e.target).hasClass("plus-sign")) {
			Router.go("setup.human_resources.holiday_list.insert", {});
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
							Meteor.call("removeHolidayList", docIds);
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
		HolidayListViewExport(this.holiday_list_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		HolidayListViewExport(this.holiday_list_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		HolidayListViewExport(this.holiday_list_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		HolidayListViewExport(this.holiday_list_list, "json");
	}

	
});

Template.HolidayListView.helpers({

	"insertButtonClass": function() {
		return HolidayList.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.holiday_list_list || this.holiday_list_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.holiday_list_list && this.holiday_list_list.count() > 0;
	},
	"isNotFound": function() {
		return this.holiday_list_list && pageSession.get("HolidayListViewSearchString") && HolidayListViewItems(this.holiday_list_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("HolidayListViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("HolidayListViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("HolidayListViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("HolidayListViewStyle") == "gallery";
	},
	"toggleAddDeleteButton": function() {
		return Session.get("buttonSuccess") ? "btn btn-primary plus-sign" : "btn btn-danger trash-can";
	},
	"setAddDeleteButtonText": function() {
		return Session.get("buttonSuccess") ? "Add new" : "Delete";
	}

	
});


Template.HolidayListViewTable.rendered = function() {

};

Template.HolidayListViewTable.events({
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
		var oldSortBy = pageSession.get("HolidayListViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("HolidayListViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("HolidayListViewSortAscending") || false;
			pageSession.set("HolidayListViewSortAscending", !sortAscending);
		} else {
			pageSession.set("HolidayListViewSortAscending", true);
		}
	}
});

Template.HolidayListViewTable.helpers({
	"tableItems": function() {
		return HolidayListViewItems(this.holiday_list_list);
	}

});


Template.HolidayListViewTableItems.rendered = function() {

};

Template.HolidayListViewTableItems.events({
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
		Router.go("setup.human_resources.holiday_list.edit", {holidayListId: this._id});
		return false;
	}

});

Template.HolidayListViewTableItems.helpers({
	"checkComplete": function() {
		return Session.get("checkComplete");
	},

	"editButtonClass": function() {
		return HolidayList.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return HolidayList.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.HolidayListViewTableFooter.rendered = function() {

};

Template.HolidayListViewTableFooter.events({

	"click #dataview-holiday-list-paginate-buttons": function(e) {
		var documentNumber = parseInt(e.target.textContent, 10);
		Session.set("limit", documentNumber);
	}

});

Template.HolidayListViewTableFooter.helpers({

});
