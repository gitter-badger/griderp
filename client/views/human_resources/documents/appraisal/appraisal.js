var pageSession = new ReactiveDict();
var recordSelect = new ReactiveArray();


Template.HumanResourcesDocumentsAppraisal.rendered = function() {

};

Template.HumanResourcesDocumentsAppraisal.events({
	
});

Template.HumanResourcesDocumentsAppraisal.helpers({
	
});

var AppraisalViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("AppraisalViewSearchString");
	var sortBy = pageSession.get("AppraisalViewSortBy");
	var sortAscending = pageSession.get("AppraisalViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["employee_name", "status", "start_date", "name"];
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

var AppraisalViewExport = function(cursor, fileType) {
	var data = AppraisalViewItems(cursor);
	var exportFields = ["employee_name", "status", "start_date", "name"];

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


Template.AppraisalView.rendered = function() {
	pageSession.set("AppraisalViewStyle", "table");
	Session.set("buttonSuccess", true);
	
};

Template.AppraisalView.events({
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
				pageSession.set("AppraisalViewSearchString", searchString);
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
					pageSession.set("AppraisalViewSearchString", searchString);
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
					pageSession.set("AppraisalViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-appraisal-insert-delete-button": function(e, t) {
		e.preventDefault();
		if ($(e.target).hasClass("plus-sign")) {
			Router.go("human_resources.documents.appraisal.insert", {});
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
							Meteor.call("removeAppraisal", docIds);
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
		AppraisalViewExport(this.appraisal_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		AppraisalViewExport(this.appraisal_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		AppraisalViewExport(this.appraisal_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		AppraisalViewExport(this.appraisal_list, "json");
	}

	
});

Template.AppraisalView.helpers({

	"insertButtonClass": function() {
		return Appraisal.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.appraisal_list || this.appraisal_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.appraisal_list && this.appraisal_list.count() > 0;
	},
	"isNotFound": function() {
		return this.appraisal_list && pageSession.get("AppraisalViewSearchString") && AppraisalViewItems(this.appraisal_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("AppraisalViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("AppraisalViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("AppraisalViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("AppraisalViewStyle") == "gallery";
	},
	"toggleAddDeleteButton": function() {
		return Session.get("buttonSuccess") ? "btn btn-primary plus-sign" : "btn btn-danger trash-can";
	},
	"setAddDeleteButtonText": function() {
		return Session.get("buttonSuccess") ? "Add new" : "Delete";
	}

	
});


Template.AppraisalViewTable.rendered = function() {

};

Template.AppraisalViewTable.events({
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
		var oldSortBy = pageSession.get("AppraisalViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("AppraisalViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("AppraisalViewSortAscending") || false;
			pageSession.set("AppraisalViewSortAscending", !sortAscending);
		} else {
			pageSession.set("AppraisalViewSortAscending", true);
		}
	}
});

Template.AppraisalViewTable.helpers({
	"tableItems": function() {
		return AppraisalViewItems(this.appraisal_list);
	}

});


Template.AppraisalViewTableItems.rendered = function() {

};

Template.AppraisalViewTableItems.events({
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
		Router.go("human_resources.documents.appraisal.edit", {appraisalId: this._id});
		return false;
	}

});

Template.AppraisalViewTableItems.helpers({
	"checkComplete": function() {
		return Session.get("checkComplete");
	},

	"editButtonClass": function() {
		return Appraisal.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Appraisal.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.AppraisalViewTableFooter.rendered = function() {

};

Template.AppraisalViewTableFooter.events({

	"click #dataview-appraisal-paginate-buttons": function(e) {
		var documentNumber = parseInt(e.target.textContent, 10);
		Session.set("limit", documentNumber);
	}

});

Template.AppraisalViewTableFooter.helpers({

});
