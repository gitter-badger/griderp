var pageSession = new ReactiveDict();
var recordSelect = new ReactiveArray();


Template.SetupSellingSalesPartner.rendered = function() {

};

Template.SetupSellingSalesPartner.events({
	
});

Template.SetupSellingSalesPartner.helpers({
	
});

var SalesPartnerViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("SalesPartnerViewSearchString");
	var sortBy = pageSession.get("SalesPartnerViewSortBy");
	var sortAscending = pageSession.get("SalesPartnerViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["name", "partner_type", "territory"];
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

var SalesPartnerViewExport = function(cursor, fileType) {
	var data = SalesPartnerViewItems(cursor);
	var exportFields = ["name", "partner_type", "territory"];

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


Template.SalesPartnerView.rendered = function() {
	pageSession.set("SalesPartnerViewStyle", "table");
	Session.set("buttonSuccess", true);
	
};

Template.SalesPartnerView.events({
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
				pageSession.set("SalesPartnerViewSearchString", searchString);
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
					pageSession.set("SalesPartnerViewSearchString", searchString);
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
					pageSession.set("SalesPartnerViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-sales-partner-insert-delete-button": function(e, t) {
		e.preventDefault();
		if ($(e.target).hasClass("plus-sign")) {
			Router.go("setup.selling.sales_partner.insert", {});
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
							Meteor.call("removeSalesPartner", docIds);
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
		SalesPartnerViewExport(this.sales_partner_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		SalesPartnerViewExport(this.sales_partner_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		SalesPartnerViewExport(this.sales_partner_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		SalesPartnerViewExport(this.sales_partner_list, "json");
	}

	
});

Template.SalesPartnerView.helpers({

	"insertButtonClass": function() {
		return SalesPartner.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.sales_partner_list || this.sales_partner_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.sales_partner_list && this.sales_partner_list.count() > 0;
	},
	"isNotFound": function() {
		return this.sales_partner_list && pageSession.get("SalesPartnerViewSearchString") && SalesPartnerViewItems(this.sales_partner_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("SalesPartnerViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("SalesPartnerViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("SalesPartnerViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("SalesPartnerViewStyle") == "gallery";
	},
	"toggleAddDeleteButton": function() {
		return Session.get("buttonSuccess") ? "btn btn-primary plus-sign" : "btn btn-danger trash-can";
	},
	"setAddDeleteButtonText": function() {
		return Session.get("buttonSuccess") ? "Add new" : "Delete";
	}

	
});


Template.SalesPartnerViewTable.rendered = function() {

};

Template.SalesPartnerViewTable.events({
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
		var oldSortBy = pageSession.get("SalesPartnerViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("SalesPartnerViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("SalesPartnerViewSortAscending") || false;
			pageSession.set("SalesPartnerViewSortAscending", !sortAscending);
		} else {
			pageSession.set("SalesPartnerViewSortAscending", true);
		}
	}
});

Template.SalesPartnerViewTable.helpers({
	"tableItems": function() {
		return SalesPartnerViewItems(this.sales_partner_list);
	}

});


Template.SalesPartnerViewTableItems.rendered = function() {

};

Template.SalesPartnerViewTableItems.events({
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
		Router.go("setup.selling.sales_partner.edit", {salesPartnerId: this._id});
		return false;
	}

});

Template.SalesPartnerViewTableItems.helpers({
	"checkComplete": function() {
		return Session.get("checkComplete");
	},

	"editButtonClass": function() {
		return SalesPartner.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return SalesPartner.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.SalesPartnerViewTableFooter.rendered = function() {

};

Template.SalesPartnerViewTableFooter.events({

	"click #dataview-sales-partner-paginate-buttons": function(e) {
		var documentNumber = parseInt(e.target.textContent, 10);
		Session.set("limit", documentNumber);
	}

});

Template.SalesPartnerViewTableFooter.helpers({

});
