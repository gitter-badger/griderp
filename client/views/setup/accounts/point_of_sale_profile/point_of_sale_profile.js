var pageSession = new ReactiveDict();
var recordSelect = new ReactiveArray();


Template.SetupAccountsPointOfSaleProfile.rendered = function() {

};

Template.SetupAccountsPointOfSaleProfile.events({
	
});

Template.SetupAccountsPointOfSaleProfile.helpers({
	
});

var PosProfileViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("PosProfileViewSearchString");
	var sortBy = pageSession.get("PosProfileViewSortBy");
	var sortAscending = pageSession.get("PosProfileViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["user", "naming_series", "company", "name"];
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

var PosProfileViewExport = function(cursor, fileType) {
	var data = PosProfileViewItems(cursor);
	var exportFields = ["user", "naming_series", "company", "name"];

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


Template.PosProfileView.rendered = function() {
	pageSession.set("PosProfileViewStyle", "table");
	Session.set("buttonSuccess", true);
	
};

Template.PosProfileView.events({
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
				pageSession.set("PosProfileViewSearchString", searchString);
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
					pageSession.set("PosProfileViewSearchString", searchString);
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
					pageSession.set("PosProfileViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-pos-profile-insert-delete-button": function(e, t) {
		e.preventDefault();
		if ($(e.target).hasClass("plus-sign")) {
			Router.go("setup.accounts.point_of_sale_profile.insert", {});
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
							Meteor.call("removePosProfile", docIds);
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
		PosProfileViewExport(this.pos_profile_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		PosProfileViewExport(this.pos_profile_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		PosProfileViewExport(this.pos_profile_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		PosProfileViewExport(this.pos_profile_list, "json");
	}

	
});

Template.PosProfileView.helpers({

	"insertButtonClass": function() {
		return PosProfile.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.pos_profile_list || this.pos_profile_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.pos_profile_list && this.pos_profile_list.count() > 0;
	},
	"isNotFound": function() {
		return this.pos_profile_list && pageSession.get("PosProfileViewSearchString") && PosProfileViewItems(this.pos_profile_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("PosProfileViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("PosProfileViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("PosProfileViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("PosProfileViewStyle") == "gallery";
	},
	"toggleAddDeleteButton": function() {
		return Session.get("buttonSuccess") ? "btn btn-primary plus-sign" : "btn btn-danger trash-can";
	},
	"setAddDeleteButtonText": function() {
		return Session.get("buttonSuccess") ? "Add new" : "Delete";
	}

	
});


Template.PosProfileViewTable.rendered = function() {

};

Template.PosProfileViewTable.events({
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
		var oldSortBy = pageSession.get("PosProfileViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("PosProfileViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("PosProfileViewSortAscending") || false;
			pageSession.set("PosProfileViewSortAscending", !sortAscending);
		} else {
			pageSession.set("PosProfileViewSortAscending", true);
		}
	}
});

Template.PosProfileViewTable.helpers({
	"tableItems": function() {
		return PosProfileViewItems(this.pos_profile_list);
	}

});


Template.PosProfileViewTableItems.rendered = function() {

};

Template.PosProfileViewTableItems.events({
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
		Router.go("setup.accounts.point_of_sale_profile.edit", {posProfileId: this._id});
		return false;
	}

});

Template.PosProfileViewTableItems.helpers({
	"checkComplete": function() {
		return Session.get("checkComplete");
	},

	"editButtonClass": function() {
		return PosProfile.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return PosProfile.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.PosProfileViewTableFooter.rendered = function() {

};

Template.PosProfileViewTableFooter.events({

	"click #dataview-pos-profile-paginate-buttons": function(e) {
		var documentNumber = parseInt(e.target.textContent, 10);
		Session.set("limit", documentNumber);
	}

});

Template.PosProfileViewTableFooter.helpers({

});
