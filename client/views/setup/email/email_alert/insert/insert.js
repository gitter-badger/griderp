var pageSession = new ReactiveDict();

Template.EmailAlertInsert.rendered = function() {
	
};

Template.EmailAlertInsert.events({
	
});

Template.EmailAlertInsert.helpers({
	
});

Template.EmailAlertInsertInsertForm.rendered = function() {
	

	pageSession.set("emailAlertInsertInsertFormInfoMessage", "");
	pageSession.set("emailAlertInsertInsertFormErrorMessage", "");

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

Template.EmailAlertInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("emailAlertInsertInsertFormInfoMessage", "");
		pageSession.set("emailAlertInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var emailAlertInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(emailAlertInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("emailAlertInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("setup.email.email_alert", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("emailAlertInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = EmailAlert.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("setup.email.email_alert", {});
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

Template.EmailAlertInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("emailAlertInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("emailAlertInsertInsertFormErrorMessage");
	}
	
});
