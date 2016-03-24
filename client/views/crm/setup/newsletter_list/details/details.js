var pageSession = new ReactiveDict();

Template.NewsletterListDetails.rendered = function() {
	
};

Template.NewsletterListDetails.events({
	
});

Template.NewsletterListDetails.helpers({
	
});

Template.NewsletterListDetailsDetailsForm.rendered = function() {
	

	pageSession.set("newsletterListDetailsDetailsFormInfoMessage", "");
	pageSession.set("newsletterListDetailsDetailsFormErrorMessage", "");

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

Template.NewsletterListDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("newsletterListDetailsDetailsFormInfoMessage", "");
		pageSession.set("newsletterListDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var newsletterListDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(newsletterListDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("newsletterListDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("newsletterListDetailsDetailsFormErrorMessage", message);
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

		Router.go("crm.setup.newsletter_list", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("crm.setup.newsletter_list", {});
	}

	
});

Template.NewsletterListDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("newsletterListDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("newsletterListDetailsDetailsFormErrorMessage");
	}
	
});
