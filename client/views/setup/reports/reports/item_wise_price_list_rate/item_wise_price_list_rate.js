var pageSession = new ReactiveDict();

Template.ReportsItemWisePriceListRate.rendered = function() {
	
};

Template.ReportsItemWisePriceListRate.events({
	
});

Template.ReportsItemWisePriceListRate.helpers({
	
});

Template.ReportsItemWisePriceListRateForm.rendered = function() {
	

	pageSession.set("reportsItemWisePriceListRateFormInfoMessage", "");
	pageSession.set("reportsItemWisePriceListRateFormErrorMessage", "");

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

Template.ReportsItemWisePriceListRateForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("reportsItemWisePriceListRateFormInfoMessage", "");
		pageSession.set("reportsItemWisePriceListRateFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var reportsItemWisePriceListRateFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(reportsItemWisePriceListRateFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("reportsItemWisePriceListRateFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("reportsItemWisePriceListRateFormErrorMessage", message);
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

Template.ReportsItemWisePriceListRateForm.helpers({
	"infoMessage": function() {
		return pageSession.get("reportsItemWisePriceListRateFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("reportsItemWisePriceListRateFormErrorMessage");
	}
	
});
