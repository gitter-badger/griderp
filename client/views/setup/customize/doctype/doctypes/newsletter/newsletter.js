var pageSession = new ReactiveDict();

Template.DoctypesNewsletter.rendered = function() {
	
};

Template.DoctypesNewsletter.events({
	
});

Template.DoctypesNewsletter.helpers({
	
});

Template.DoctypesNewsletterForm.rendered = function() {
	

	pageSession.set("doctypesNewsletterFormInfoMessage", "");
	pageSession.set("doctypesNewsletterFormErrorMessage", "");

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

Template.DoctypesNewsletterForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("doctypesNewsletterFormInfoMessage", "");
		pageSession.set("doctypesNewsletterFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var doctypesNewsletterFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(doctypesNewsletterFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("doctypesNewsletterFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("doctypesNewsletterFormErrorMessage", message);
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

Template.DoctypesNewsletterForm.helpers({
	"infoMessage": function() {
		return pageSession.get("doctypesNewsletterFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("doctypesNewsletterFormErrorMessage");
	}
	
});
