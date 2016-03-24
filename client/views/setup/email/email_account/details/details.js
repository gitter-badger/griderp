var pageSession = new ReactiveDict();

Template.EmailAccountDetails.rendered = function() {
	
};

Template.EmailAccountDetails.events({
	
});

Template.EmailAccountDetails.helpers({
	
});

Template.EmailAccountDetailsDetailsForm.rendered = function() {
	

	pageSession.set("emailAccountDetailsDetailsFormInfoMessage", "");
	pageSession.set("emailAccountDetailsDetailsFormErrorMessage", "");

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

Template.EmailAccountDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("emailAccountDetailsDetailsFormInfoMessage", "");
		pageSession.set("emailAccountDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var emailAccountDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(emailAccountDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("emailAccountDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("emailAccountDetailsDetailsFormErrorMessage", message);
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

		Router.go("setup.email.email_account", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("setup.email.email_account", {});
	}

	
});

Template.EmailAccountDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("emailAccountDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("emailAccountDetailsDetailsFormErrorMessage");
	}
	
});
