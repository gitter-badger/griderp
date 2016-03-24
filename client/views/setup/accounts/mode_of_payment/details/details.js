var pageSession = new ReactiveDict();

Template.ModeOfPaymentDetails.rendered = function() {
	
};

Template.ModeOfPaymentDetails.events({
	
});

Template.ModeOfPaymentDetails.helpers({
	
});

Template.ModeOfPaymentDetailsDetailsForm.rendered = function() {
	

	pageSession.set("modeOfPaymentDetailsDetailsFormInfoMessage", "");
	pageSession.set("modeOfPaymentDetailsDetailsFormErrorMessage", "");

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

Template.ModeOfPaymentDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("modeOfPaymentDetailsDetailsFormInfoMessage", "");
		pageSession.set("modeOfPaymentDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var modeOfPaymentDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(modeOfPaymentDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("modeOfPaymentDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("modeOfPaymentDetailsDetailsFormErrorMessage", message);
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

		Router.go("setup.accounts.mode_of_payment", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("setup.accounts.mode_of_payment", {});
	}

	
});

Template.ModeOfPaymentDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("modeOfPaymentDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("modeOfPaymentDetailsDetailsFormErrorMessage");
	}
	
});
