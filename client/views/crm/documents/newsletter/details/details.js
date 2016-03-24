var pageSession = new ReactiveDict();

Template.NewsletterDetails.rendered = function() {
	
};

Template.NewsletterDetails.events({
	
});

Template.NewsletterDetails.helpers({
	
});

Template.NewsletterDetailsDetailsForm.rendered = function() {
	

	pageSession.set("newsletterDetailsDetailsFormInfoMessage", "");
	pageSession.set("newsletterDetailsDetailsFormErrorMessage", "");

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

Template.NewsletterDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("newsletterDetailsDetailsFormInfoMessage", "");
		pageSession.set("newsletterDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var newsletterDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(newsletterDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("newsletterDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("newsletterDetailsDetailsFormErrorMessage", message);
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

		Router.go("crm.documents.newsletter", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("crm.documents.newsletter", {});
	}

	
});

Template.NewsletterDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("newsletterDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("newsletterDetailsDetailsFormErrorMessage");
	}
	
});
