var pageSession = new ReactiveDict();

Template.TermsAndConditionsDetails.rendered = function() {
	
};

Template.TermsAndConditionsDetails.events({
	
});

Template.TermsAndConditionsDetails.helpers({
	
});

Template.TermsAndConditionsDetailsDetailsForm.rendered = function() {
	

	pageSession.set("termsAndConditionsDetailsDetailsFormInfoMessage", "");
	pageSession.set("termsAndConditionsDetailsDetailsFormErrorMessage", "");

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

Template.TermsAndConditionsDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("termsAndConditionsDetailsDetailsFormInfoMessage", "");
		pageSession.set("termsAndConditionsDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var termsAndConditionsDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(termsAndConditionsDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("termsAndConditionsDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("termsAndConditionsDetailsDetailsFormErrorMessage", message);
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

		Router.go("setup.printing.terms_and_conditions", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("setup.printing.terms_and_conditions", {});
	}

	
});

Template.TermsAndConditionsDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("termsAndConditionsDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("termsAndConditionsDetailsDetailsFormErrorMessage");
	}
	
});
