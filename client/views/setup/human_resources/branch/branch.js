var pageSession = new ReactiveDict();
var recordSelect = new ReactiveArray();


Template.SetupHumanResourcesBranch.rendered = function() {

};

Template.SetupHumanResourcesBranch.events({
	
});

Template.SetupHumanResourcesBranch.helpers({
	
});

var BranchViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("BranchViewSearchString");
	var sortBy = pageSession.get("BranchViewSortBy");
	var sortAscending = pageSession.get("BranchViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["name", "branch"];
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

var BranchViewExport = function(cursor, fileType) {
	var data = BranchViewItems(cursor);
	var exportFields = ["name", "branch"];

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


Template.BranchView.rendered = function() {
	pageSession.set("BranchViewStyle", "table");
	Session.set("buttonSuccess", true);
	
};

Template.BranchView.events({
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
				pageSession.set("BranchViewSearchString", searchString);
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
					pageSession.set("BranchViewSearchString", searchString);
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
					pageSession.set("BranchViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-branch-insert-delete-button": function(e, t) {
		e.preventDefault();
		if ($(e.target).hasClass("plus-sign")) {
			Router.go("setup.human_resources.branch.insert", {});
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
							Meteor.call("removeBranch", docIds);
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
		BranchViewExport(this.branch_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		BranchViewExport(this.branch_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		BranchViewExport(this.branch_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		BranchViewExport(this.branch_list, "json");
	}

	
});

Template.BranchView.helpers({

	"insertButtonClass": function() {
		return Branch.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.branch_list || this.branch_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.branch_list && this.branch_list.count() > 0;
	},
	"isNotFound": function() {
		return this.branch_list && pageSession.get("BranchViewSearchString") && BranchViewItems(this.branch_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("BranchViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("BranchViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("BranchViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("BranchViewStyle") == "gallery";
	},
	"toggleAddDeleteButton": function() {
		return Session.get("buttonSuccess") ? "btn btn-primary plus-sign" : "btn btn-danger trash-can";
	},
	"setAddDeleteButtonText": function() {
		return Session.get("buttonSuccess") ? "Add new" : "Delete";
	}

	
});


Template.BranchViewTable.rendered = function() {

};

Template.BranchViewTable.events({
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
		var oldSortBy = pageSession.get("BranchViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("BranchViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("BranchViewSortAscending") || false;
			pageSession.set("BranchViewSortAscending", !sortAscending);
		} else {
			pageSession.set("BranchViewSortAscending", true);
		}
	}
});

Template.BranchViewTable.helpers({
	"tableItems": function() {
		return BranchViewItems(this.branch_list);
	}

});


Template.BranchViewTableItems.rendered = function() {

};

Template.BranchViewTableItems.events({
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
		Router.go("setup.human_resources.branch.edit", {branchId: this._id});
		return false;
	}

});

Template.BranchViewTableItems.helpers({
	"checkComplete": function() {
		return Session.get("checkComplete");
	},

	"editButtonClass": function() {
		return Branch.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Branch.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.BranchViewTableFooter.rendered = function() {

};

Template.BranchViewTableFooter.events({

	"click #dataview-branch-paginate-buttons": function(e) {
		var documentNumber = parseInt(e.target.textContent, 10);
		Session.set("limit", documentNumber);
	}

});

Template.BranchViewTableFooter.helpers({

});
