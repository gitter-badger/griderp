var pageSession = new ReactiveDict();

Template.EmailDigestEdit.rendered = function() {
	
};

Template.EmailDigestEdit.events({
	
});

Template.EmailDigestEdit.helpers({
	
});

Template.EmailDigestEditEditForm.rendered = function() {
	

	pageSession.set("emailDigestEditEditFormInfoMessage", "");
	pageSession.set("emailDigestEditEditFormErrorMessage", "");

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

Template.EmailDigestEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("emailDigestEditEditFormInfoMessage", "");
		pageSession.set("emailDigestEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var emailDigestEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(emailDigestEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("emailDigestEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("setup.email.email_digest", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("emailDigestEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				EmailDigest.update({ _id: t.data.email_digest_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
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

Template.EmailDigestEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("emailDigestEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("emailDigestEditEditFormErrorMessage");
	}
	
});
