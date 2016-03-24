var pageSession = new ReactiveDict();

Template.EmailDigestDetails.rendered = function() {
	
};

Template.EmailDigestDetails.events({
	
});

Template.EmailDigestDetails.helpers({
	
});

Template.EmailDigestDetailsDetailsForm.rendered = function() {
	

	pageSession.set("emailDigestDetailsDetailsFormInfoMessage", "");
	pageSession.set("emailDigestDetailsDetailsFormErrorMessage", "");

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

Template.EmailDigestDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("emailDigestDetailsDetailsFormInfoMessage", "");
		pageSession.set("emailDigestDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var emailDigestDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(emailDigestDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("emailDigestDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("emailDigestDetailsDetailsFormErrorMessage", message);
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

		Router.go("setup.email.email_digest", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("setup.email.email_digest", {});
	}

	
});

Template.EmailDigestDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("emailDigestDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("emailDigestDetailsDetailsFormErrorMessage");
	}
	
});
