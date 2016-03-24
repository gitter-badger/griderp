var pageSession = new ReactiveDict();

Template.ReportsItemPrices.rendered = function() {
	
};

Template.ReportsItemPrices.events({
	
});

Template.ReportsItemPrices.helpers({
	
});

Template.ReportsItemPricesForm.rendered = function() {
	

	pageSession.set("reportsItemPricesFormInfoMessage", "");
	pageSession.set("reportsItemPricesFormErrorMessage", "");

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

Template.ReportsItemPricesForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("reportsItemPricesFormInfoMessage", "");
		pageSession.set("reportsItemPricesFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var reportsItemPricesFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(reportsItemPricesFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("reportsItemPricesFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("reportsItemPricesFormErrorMessage", message);
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

Template.ReportsItemPricesForm.helpers({
	"infoMessage": function() {
		return pageSession.get("reportsItemPricesFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("reportsItemPricesFormErrorMessage");
	}
	
});
