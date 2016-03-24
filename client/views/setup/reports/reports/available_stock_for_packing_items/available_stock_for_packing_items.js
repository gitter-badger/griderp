var pageSession = new ReactiveDict();

Template.ReportsAvailableStockForPackingItems.rendered = function() {
	
};

Template.ReportsAvailableStockForPackingItems.events({
	
});

Template.ReportsAvailableStockForPackingItems.helpers({
	
});

Template.ReportsAvailableStockForPackingItemsForm.rendered = function() {
	

	pageSession.set("reportsAvailableStockForPackingItemsFormInfoMessage", "");
	pageSession.set("reportsAvailableStockForPackingItemsFormErrorMessage", "");

	$(".input-group.date").each(function() {
		var format = $(this).find("input[type='text']").attr("data-format");

		if(format) {
			format = format.toLowerCase();
		}
		else {
			format = "mm/dd/yyyy";
		}

		$(this).datepicker({
			autoclose: true,
			todayHighlight: true,
			todayBtn: true,
			forceParse: false,
			keyboardNavigation: false,
			format: format
		});
	});

	$("input[type='file']").fileinput();
	$("select[data-role='tagsinput']").tagsinput();
	$(".bootstrap-tagsinput").addClass("form-control");
	$("input[autofocus]").focus();
};

Template.ReportsAvailableStockForPackingItemsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("reportsAvailableStockForPackingItemsFormInfoMessage", "");
		pageSession.set("reportsAvailableStockForPackingItemsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var reportsAvailableStockForPackingItemsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(reportsAvailableStockForPackingItemsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("reportsAvailableStockForPackingItemsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("reportsAvailableStockForPackingItemsFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		/*CANCEL_REDIRECT*/
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		Router.go("setup.reports.reports", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("setup.reports.reports", {});
	}

	
});

Template.ReportsAvailableStockForPackingItemsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("reportsAvailableStockForPackingItemsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("reportsAvailableStockForPackingItemsFormErrorMessage");
	}
	
});
