var pageSession = new ReactiveDict();

Template.OfferLetterDetails.rendered = function() {
	
};

Template.OfferLetterDetails.events({
	
});

Template.OfferLetterDetails.helpers({
	
});

Template.OfferLetterDetailsDetailsForm.rendered = function() {
	

	pageSession.set("offerLetterDetailsDetailsFormInfoMessage", "");
	pageSession.set("offerLetterDetailsDetailsFormErrorMessage", "");

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

Template.OfferLetterDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("offerLetterDetailsDetailsFormInfoMessage", "");
		pageSession.set("offerLetterDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var offerLetterDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(offerLetterDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("offerLetterDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("offerLetterDetailsDetailsFormErrorMessage", message);
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

		Router.go("human_resources.documents.offer_letter", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("human_resources.documents.offer_letter", {});
	}

	
});

Template.OfferLetterDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("offerLetterDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("offerLetterDetailsDetailsFormErrorMessage");
	}
	
});
