var pageSession = new ReactiveDict();
var recordSelect = new ReactiveArray();


Template.PurchasingDocumentsAddress.rendered = function() {

};

Template.PurchasingDocumentsAddress.events({
	
});

Template.PurchasingDocumentsAddress.helpers({
	
});

var AddressViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("AddressViewSearchString");
	var sortBy = pageSession.get("AddressViewSortBy");
	var sortAscending = pageSession.get("AddressViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["name", "address_type", "city"];
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

var AddressViewExport = function(cursor, fileType) {
	var data = AddressViewItems(cursor);
	var exportFields = ["name", "address_type", "city"];

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


Template.AddressView.rendered = function() {
	pageSession.set("AddressViewStyle", "table");
	Session.set("buttonSuccess", true);
	
};

Template.AddressView.events({
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
				pageSession.set("AddressViewSearchString", searchString);
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
					pageSession.set("AddressViewSearchString", searchString);
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
					pageSession.set("AddressViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-address-insert-delete-button": function(e, t) {
		e.preventDefault();
		if ($(e.target).hasClass("plus-sign")) {
			Router.go("purchasing.documents.address.insert", {});
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
							Meteor.call("removeAddress", docIds);
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
		AddressViewExport(this.address_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		AddressViewExport(this.address_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		AddressViewExport(this.address_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		AddressViewExport(this.address_list, "json");
	}

	
});

Template.AddressView.helpers({

	"insertButtonClass": function() {
		return Address.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.address_list || this.address_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.address_list && this.address_list.count() > 0;
	},
	"isNotFound": function() {
		return this.address_list && pageSession.get("AddressViewSearchString") && AddressViewItems(this.address_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("AddressViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("AddressViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("AddressViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("AddressViewStyle") == "gallery";
	},
	"toggleAddDeleteButton": function() {
		return Session.get("buttonSuccess") ? "btn btn-primary plus-sign" : "btn btn-danger trash-can";
	},
	"setAddDeleteButtonText": function() {
		return Session.get("buttonSuccess") ? "Add new" : "Delete";
	}

	
});


Template.AddressViewTable.rendered = function() {

};

Template.AddressViewTable.events({
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
		var oldSortBy = pageSession.get("AddressViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("AddressViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("AddressViewSortAscending") || false;
			pageSession.set("AddressViewSortAscending", !sortAscending);
		} else {
			pageSession.set("AddressViewSortAscending", true);
		}
	}
});

Template.AddressViewTable.helpers({
	"tableItems": function() {
		return AddressViewItems(this.address_list);
	}

});


Template.AddressViewTableItems.rendered = function() {

};

Template.AddressViewTableItems.events({
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
		Router.go("purchasing.documents.address.edit", {addressId: this._id});
		return false;
	}

});

Template.AddressViewTableItems.helpers({
	"checkComplete": function() {
		return Session.get("checkComplete");
	},

	"editButtonClass": function() {
		return Address.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Address.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.AddressViewTableFooter.rendered = function() {

};

Template.AddressViewTableFooter.events({

	"click #dataview-address-paginate-buttons": function(e) {
		var documentNumber = parseInt(e.target.textContent, 10);
		Session.set("limit", documentNumber);
	}

});

Template.AddressViewTableFooter.helpers({

});
