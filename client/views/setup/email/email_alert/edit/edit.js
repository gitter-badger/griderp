var pageSession = new ReactiveDict();

Template.EmailAlertEdit.rendered = function() {
	
};

Template.EmailAlertEdit.events({
	
});

Template.EmailAlertEdit.helpers({
	
});

Template.EmailAlertEditEditForm.rendered = function() {
	

	pageSession.set("emailAlertEditEditFormInfoMessage", "");
	pageSession.set("emailAlertEditEditFormErrorMessage", "");

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

Template.EmailAlertEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("emailAlertEditEditFormInfoMessage", "");
		pageSession.set("emailAlertEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var emailAlertEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(emailAlertEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("emailAlertEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("setup.email.email_alert", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("emailAlertEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				EmailAlert.update({ _id: t.data.email_alert_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
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

Template.EmailAlertEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("emailAlertEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("emailAlertEditEditFormErrorMessage");
	}
	
});
