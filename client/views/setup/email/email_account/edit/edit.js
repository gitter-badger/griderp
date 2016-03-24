var pageSession = new ReactiveDict();

Template.EmailAccountEdit.rendered = function() {
	
};

Template.EmailAccountEdit.events({
	
});

Template.EmailAccountEdit.helpers({
	
});

Template.EmailAccountEditEditForm.rendered = function() {
	

	pageSession.set("emailAccountEditEditFormInfoMessage", "");
	pageSession.set("emailAccountEditEditFormErrorMessage", "");

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

	$('.summernote').summernote({
		height: 300,
		focus: false,
		codemirror: {
			htmlMode: true,
			lineNumbers: true,
			mode: 'text/html'
		}
	});

};

Template.EmailAccountEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("emailAccountEditEditFormInfoMessage", "");
		pageSession.set("emailAccountEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var emailAccountEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(emailAccountEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("emailAccountEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("setup.email.email_account", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("emailAccountEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				EmailAccount.update({ _id: t.data.email_account_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("setup.email.email_account", {});
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

Template.EmailAccountEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("emailAccountEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("emailAccountEditEditFormErrorMessage");
	}
	
});
