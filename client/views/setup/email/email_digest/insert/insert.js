var pageSession = new ReactiveDict();

Template.EmailDigestInsert.rendered = function() {
	
};

Template.EmailDigestInsert.events({
	
});

Template.EmailDigestInsert.helpers({
	
});

Template.EmailDigestInsertInsertForm.rendered = function() {
	

	pageSession.set("emailDigestInsertInsertFormInfoMessage", "");
	pageSession.set("emailDigestInsertInsertFormErrorMessage", "");

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

Template.EmailDigestInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("emailDigestInsertInsertFormInfoMessage", "");
		pageSession.set("emailDigestInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var emailDigestInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(emailDigestInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("emailDigestInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("setup.email.email_digest", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("emailDigestInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = EmailDigest.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("setup.email.email_digest", {});
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		/*CLOSE_REDIRECT*/
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		/*BACK_REDIRECT*/
	}

	
});

Template.EmailDigestInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("emailDigestInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("emailDigestInsertInsertFormErrorMessage");
	}
	
});
