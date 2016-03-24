var pageSession = new ReactiveDict();

Template.EmailAlertDetails.rendered = function() {
	
};

Template.EmailAlertDetails.events({
	
});

Template.EmailAlertDetails.helpers({
	
});

Template.EmailAlertDetailsDetailsForm.rendered = function() {
	

	pageSession.set("emailAlertDetailsDetailsFormInfoMessage", "");
	pageSession.set("emailAlertDetailsDetailsFormErrorMessage", "");

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

Template.EmailAlertDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("emailAlertDetailsDetailsFormInfoMessage", "");
		pageSession.set("emailAlertDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var emailAlertDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(emailAlertDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("emailAlertDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("emailAlertDetailsDetailsFormErrorMessage", message);
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

		Router.go("setup.email.email_alert", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("setup.email.email_alert", {});
	}

	
});

Template.EmailAlertDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("emailAlertDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("emailAlertDetailsDetailsFormErrorMessage");
	}
	
});
