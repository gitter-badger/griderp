var pageSession = new ReactiveDict();

Template.ReportsCustomerCreditBalance.rendered = function() {
	
};

Template.ReportsCustomerCreditBalance.events({
	
});

Template.ReportsCustomerCreditBalance.helpers({
	
});

Template.ReportsCustomerCreditBalanceForm.rendered = function() {
	

	pageSession.set("reportsCustomerCreditBalanceFormInfoMessage", "");
	pageSession.set("reportsCustomerCreditBalanceFormErrorMessage", "");

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

Template.ReportsCustomerCreditBalanceForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("reportsCustomerCreditBalanceFormInfoMessage", "");
		pageSession.set("reportsCustomerCreditBalanceFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var reportsCustomerCreditBalanceFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(reportsCustomerCreditBalanceFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("reportsCustomerCreditBalanceFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("reportsCustomerCreditBalanceFormErrorMessage", message);
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

Template.ReportsCustomerCreditBalanceForm.helpers({
	"infoMessage": function() {
		return pageSession.get("reportsCustomerCreditBalanceFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("reportsCustomerCreditBalanceFormErrorMessage");
	}
	
});
