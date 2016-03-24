var pageSession = new ReactiveDict();

Template.NewsletterListInsert.rendered = function() {
	
};

Template.NewsletterListInsert.events({
	
});

Template.NewsletterListInsert.helpers({
	
});

Template.NewsletterListInsertInsertForm.rendered = function() {
	

	pageSession.set("newsletterListInsertInsertFormInfoMessage", "");
	pageSession.set("newsletterListInsertInsertFormErrorMessage", "");

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

Template.NewsletterListInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("newsletterListInsertInsertFormInfoMessage", "");
		pageSession.set("newsletterListInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var newsletterListInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(newsletterListInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("newsletterListInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("crm.setup.newsletter_list", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("newsletterListInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = NewsletterList.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("crm.setup.newsletter_list", {});
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

Template.NewsletterListInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("newsletterListInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("newsletterListInsertInsertFormErrorMessage");
	}
	
});
