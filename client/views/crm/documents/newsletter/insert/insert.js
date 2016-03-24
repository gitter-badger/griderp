var pageSession = new ReactiveDict();

Template.NewsletterInsert.rendered = function() {
	
};

Template.NewsletterInsert.events({
	
});

Template.NewsletterInsert.helpers({
	
});

Template.NewsletterInsertInsertForm.rendered = function() {
	

	pageSession.set("newsletterInsertInsertFormInfoMessage", "");
	pageSession.set("newsletterInsertInsertFormErrorMessage", "");

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

Template.NewsletterInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("newsletterInsertInsertFormInfoMessage", "");
		pageSession.set("newsletterInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var newsletterInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(newsletterInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("newsletterInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("crm.documents.newsletter", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("newsletterInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = Newsletter.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("crm.documents.newsletter", {});
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

Template.NewsletterInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("newsletterInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("newsletterInsertInsertFormErrorMessage");
	}
	
});
