var pageSession = new ReactiveDict();
var recordSelect = new ReactiveArray();


Template.CrmSetupCampaign.rendered = function() {

};

Template.CrmSetupCampaign.events({
	
});

Template.CrmSetupCampaign.helpers({
	
});

var CampaignViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("CampaignViewSearchString");
	var sortBy = pageSession.get("CampaignViewSortBy");
	var sortAscending = pageSession.get("CampaignViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["name", "description"];
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

var CampaignViewExport = function(cursor, fileType) {
	var data = CampaignViewItems(cursor);
	var exportFields = ["name", "description"];

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

Template.CampaignView.rendered = function() {
	pageSession.set("CampaignViewStyle", "table");
	Session.set("buttonSuccess", true);
	
};

Template.CampaignView.events({
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
				pageSession.set("CampaignViewSearchString", searchString);
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
					pageSession.set("CampaignViewSearchString", searchString);
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
					pageSession.set("CampaignViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-campaign-insert-delete-button": function(e, t) {
		e.preventDefault();
		if ($(e.target).hasClass("plus-sign")) {
			Router.go("crm.setup.campaign.insert", {});
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
							Meteor.call("removeCampaign", docIds);
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
		CampaignViewExport(this.campaign_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		CampaignViewExport(this.campaign_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		CampaignViewExport(this.campaign_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		CampaignViewExport(this.campaign_list, "json");
	}

	
});

Template.CampaignView.helpers({

	"insertButtonClass": function() {
		return Campaign.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.campaign_list || this.campaign_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.campaign_list && this.campaign_list.count() > 0;
	},
	"isNotFound": function() {
		return this.campaign_list && pageSession.get("CampaignViewSearchString") && CampaignViewItems(this.campaign_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("CampaignViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("CampaignViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("CampaignViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("CampaignViewStyle") == "gallery";
	},
	"toggleAddDeleteButton": function() {
		return Session.get("buttonSuccess") ? "btn btn-primary plus-sign" : "btn btn-danger trash-can";
	},
	"setAddDeleteButtonText": function() {
		return Session.get("buttonSuccess") ? "Add new" : "Delete";
	}

	
});


Template.CampaignViewTable.rendered = function() {

};

Template.CampaignViewTable.events({
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
		var oldSortBy = pageSession.get("CampaignViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("CampaignViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("CampaignViewSortAscending") || false;
			pageSession.set("CampaignViewSortAscending", !sortAscending);
		} else {
			pageSession.set("CampaignViewSortAscending", true);
		}
	}
});

Template.CampaignViewTable.helpers({
	"tableItems": function() {
		return CampaignViewItems(this.campaign_list);
	}

});


Template.CampaignViewTableItems.rendered = function() {

};

Template.CampaignViewTableItems.events({
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
		Router.go("crm.setup.campaign.edit", {campaignId: this._id});
		return false;
	}

});

Template.CampaignViewTableItems.helpers({
	"checkComplete": function() {
		return Session.get("checkComplete");
	},

	"editButtonClass": function() {
		return Campaign.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Campaign.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.CampaignViewTableFooter.rendered = function() {

};

Template.CampaignViewTableFooter.events({

	"click #dataview-campaign-paginate-buttons": function(e) {
		var documentNumber = parseInt(e.target.textContent, 10);
		Session.set("limit", documentNumber);
	}

});

Template.CampaignViewTableFooter.helpers({

});
