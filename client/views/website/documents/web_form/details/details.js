var pageSession = new ReactiveDict();

Template.WebFormDetails.rendered = function() {
	
};

Template.WebFormDetails.events({
	
});

Template.WebFormDetails.helpers({
	
});

Template.WebFormDetailsDetailsForm.rendered = function() {
	

	pageSession.set("webFormDetailsDetailsFormInfoMessage", "");
	pageSession.set("webFormDetailsDetailsFormErrorMessage", "");

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

Template.WebFormDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("webFormDetailsDetailsFormInfoMessage", "");
		pageSession.set("webFormDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var webFormDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(webFormDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("webFormDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("webFormDetailsDetailsFormErrorMessage", message);
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

		Router.go("website.documents.web_form", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("website.documents.web_form", {});
	}

	
});

Template.WebFormDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("webFormDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("webFormDetailsDetailsFormErrorMessage");
	}
	
});
