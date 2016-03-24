var pageSession = new ReactiveDict();
var recordSelect = new ReactiveArray();


Template.SetupAccountsCompany.rendered = function() {

};

Template.SetupAccountsCompany.events({
	
});

Template.SetupAccountsCompany.helpers({
	
});

var CompanyViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("CompanyViewSearchString");
	var sortBy = pageSession.get("CompanyViewSortBy");
	var sortAscending = pageSession.get("CompanyViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["name", "country"];
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

var CompanyViewExport = function(cursor, fileType) {
	var data = CompanyViewItems(cursor);
	var exportFields = ["name", "country"];

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

Template.CompanyView.rendered = function() {
	pageSession.set("CompanyViewStyle", "table");
	Session.set("buttonSuccess", true);
	
};

Template.CompanyView.events({
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
				pageSession.set("CompanyViewSearchString", searchString);
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
					pageSession.set("CompanyViewSearchString", searchString);
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
					pageSession.set("CompanyViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-company-insert-delete-button": function(e, t) {
		e.preventDefault();
		if ($(e.target).hasClass("plus-sign")) {
			Router.go("setup.accounts.company.insert", {});
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
							Meteor.call("removeCompany", docIds);
							Session.set("buttonSuccess", true);
						}
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
		CompanyViewExport(this.company_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		CompanyViewExport(this.company_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		CompanyViewExport(this.company_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		CompanyViewExport(this.company_list, "json");
	}

	
});

Template.CompanyView.helpers({

	"insertButtonClass": function() {
		return Company.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.company_list || this.company_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.company_list && this.company_list.count() > 0;
	},
	"isNotFound": function() {
		return this.company_list && pageSession.get("CompanyViewSearchString") && CompanyViewItems(this.company_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("CompanyViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("CompanyViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("CompanyViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("CompanyViewStyle") == "gallery";
	},
	"toggleAddDeleteButton": function() {
		return Session.get("buttonSuccess") ? "btn btn-primary plus-sign" : "btn btn-danger trash-can";
	},
	"setAddDeleteButtonText": function() {
		return Session.get("buttonSuccess") ? "Add new" : "Delete";
	}

	
});


Template.CompanyViewTable.rendered = function() {

};

Template.CompanyViewTable.events({
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
		var oldSortBy = pageSession.get("CompanyViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("CompanyViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("CompanyViewSortAscending") || false;
			pageSession.set("CompanyViewSortAscending", !sortAscending);
		} else {
			pageSession.set("CompanyViewSortAscending", true);
		}
	}
});

Template.CompanyViewTable.helpers({
	"tableItems": function() {
		return CompanyViewItems(this.company_list);
	}

});


Template.CompanyViewTableItems.rendered = function() {

};

Template.CompanyViewTableItems.events({
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
		Router.go("setup.accounts.company.edit", {companyId: this._id});
		return false;
	}

});

Template.CompanyViewTableItems.helpers({
	"checkComplete": function() {
		return Session.get("checkComplete");
	},

	"editButtonClass": function() {
		return Company.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Company.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.CompanyViewTableFooter.rendered = function() {

};

Template.CompanyViewTableFooter.events({

	"click #dataview-company-paginate-buttons": function(e) {
		var documentNumber = parseInt(e.target.textContent, 10);
		Session.set("limit", documentNumber);
	}

});

Template.CompanyViewTableFooter.helpers({

});
