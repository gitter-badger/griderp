var pageSession = new ReactiveDict();

Template.EmailAccountInsert.rendered = function() {
	
};

Template.EmailAccountInsert.events({
	
});

Template.EmailAccountInsert.helpers({
	
});

Template.EmailAccountInsertInsertForm.rendered = function() {
	

	pageSession.set("emailAccountInsertInsertFormInfoMessage", "");
	pageSession.set("emailAccountInsertInsertFormErrorMessage", "");

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

Template.EmailAccountInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("emailAccountInsertInsertFormInfoMessage", "");
		pageSession.set("emailAccountInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var emailAccountInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(emailAccountInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("emailAccountInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("setup.email.email_account", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("emailAccountInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = EmailAccount.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
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

Template.EmailAccountInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("emailAccountInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("emailAccountInsertInsertFormErrorMessage");
	}
	
});
