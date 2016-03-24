var pageSession = new ReactiveDict();

Template.DoctypesModeOfPaymentAccount.rendered = function() {
	
};

Template.DoctypesModeOfPaymentAccount.events({
	
});

Template.DoctypesModeOfPaymentAccount.helpers({
	
});

Template.DoctypesModeOfPaymentAccountForm.rendered = function() {
	

	pageSession.set("doctypesModeOfPaymentAccountFormInfoMessage", "");
	pageSession.set("doctypesModeOfPaymentAccountFormErrorMessage", "");

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

Template.DoctypesModeOfPaymentAccountForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("doctypesModeOfPaymentAccountFormInfoMessage", "");
		pageSession.set("doctypesModeOfPaymentAccountFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var doctypesModeOfPaymentAccountFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(doctypesModeOfPaymentAccountFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("doctypesModeOfPaymentAccountFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("doctypesModeOfPaymentAccountFormErrorMessage", message);
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

		Router.go("setup.customize.doctype", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("setup.customize.doctype", {});
	}

	
});

Template.DoctypesModeOfPaymentAccountForm.helpers({
	"infoMessage": function() {
		return pageSession.get("doctypesModeOfPaymentAccountFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("doctypesModeOfPaymentAccountFormErrorMessage");
	}
	
});
