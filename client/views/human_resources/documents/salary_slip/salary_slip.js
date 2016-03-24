var pageSession = new ReactiveDict();
var recordSelect = new ReactiveArray();


Template.HumanResourcesDocumentsSalarySlip.rendered = function() {

};

Template.HumanResourcesDocumentsSalarySlip.events({
	
});

Template.HumanResourcesDocumentsSalarySlip.helpers({
	
});

var SalarySlipViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("SalarySlipViewSearchString");
	var sortBy = pageSession.get("SalarySlipViewSortBy");
	var sortAscending = pageSession.get("SalarySlipViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["employee_name", "docstatus", "month", "name"];
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

var SalarySlipViewExport = function(cursor, fileType) {
	var data = SalarySlipViewItems(cursor);
	var exportFields = ["employee_name", "docstatus", "month", "name"];

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


Template.SalarySlipView.rendered = function() {
	pageSession.set("SalarySlipViewStyle", "table");
	Session.set("buttonSuccess", true);
	
};

Template.SalarySlipView.events({
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
				pageSession.set("SalarySlipViewSearchString", searchString);
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
					pageSession.set("SalarySlipViewSearchString", searchString);
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
					pageSession.set("SalarySlipViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-salary-slip-insert-delete-button": function(e, t) {
		e.preventDefault();
		if ($(e.target).hasClass("plus-sign")) {
			Router.go("human_resources.documents.salary_slip.insert", {});
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
							Meteor.call("removeSalarySlip", docIds);
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
		SalarySlipViewExport(this.salary_slip_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		SalarySlipViewExport(this.salary_slip_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		SalarySlipViewExport(this.salary_slip_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		SalarySlipViewExport(this.salary_slip_list, "json");
	}

	
});

Template.SalarySlipView.helpers({

	"insertButtonClass": function() {
		return SalarySlip.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.salary_slip_list || this.salary_slip_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.salary_slip_list && this.salary_slip_list.count() > 0;
	},
	"isNotFound": function() {
		return this.salary_slip_list && pageSession.get("SalarySlipViewSearchString") && SalarySlipViewItems(this.salary_slip_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("SalarySlipViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("SalarySlipViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("SalarySlipViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("SalarySlipViewStyle") == "gallery";
	},
	"toggleAddDeleteButton": function() {
		return Session.get("buttonSuccess") ? "btn btn-primary plus-sign" : "btn btn-danger trash-can";
	},
	"setAddDeleteButtonText": function() {
		return Session.get("buttonSuccess") ? "Add new" : "Delete";
	}

	
});


Template.SalarySlipViewTable.rendered = function() {

};

Template.SalarySlipViewTable.events({
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
		var oldSortBy = pageSession.get("SalarySlipViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("SalarySlipViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("SalarySlipViewSortAscending") || false;
			pageSession.set("SalarySlipViewSortAscending", !sortAscending);
		} else {
			pageSession.set("SalarySlipViewSortAscending", true);
		}
	}
});

Template.SalarySlipViewTable.helpers({
	"tableItems": function() {
		return SalarySlipViewItems(this.salary_slip_list);
	}

});


Template.SalarySlipViewTableItems.rendered = function() {

};

Template.SalarySlipViewTableItems.events({
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
		Router.go("human_resources.documents.salary_slip.edit", {salarySlipId: this._id});
		return false;
	}

});

Template.SalarySlipViewTableItems.helpers({
	"checkComplete": function() {
		return Session.get("checkComplete");
	},

	"editButtonClass": function() {
		return SalarySlip.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return SalarySlip.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.SalarySlipViewTableFooter.rendered = function() {

};

Template.SalarySlipViewTableFooter.events({

	"click #dataview-salary-slip-paginate-buttons": function(e) {
		var documentNumber = parseInt(e.target.textContent, 10);
		Session.set("limit", documentNumber);
	}

});

Template.SalarySlipViewTableFooter.helpers({

});
