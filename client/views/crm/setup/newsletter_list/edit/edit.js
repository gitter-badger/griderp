var pageSession = new ReactiveDict();

Template.NewsletterListEdit.rendered = function() {
	
};

Template.NewsletterListEdit.events({
	
});

Template.NewsletterListEdit.helpers({
	
});

Template.NewsletterListEditEditForm.rendered = function() {
	

	pageSession.set("newsletterListEditEditFormInfoMessage", "");
	pageSession.set("newsletterListEditEditFormErrorMessage", "");

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

Template.NewsletterListEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("newsletterListEditEditFormInfoMessage", "");
		pageSession.set("newsletterListEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var newsletterListEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(newsletterListEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("newsletterListEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("crm.setup.newsletter_list", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("newsletterListEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				NewsletterList.update({ _id: t.data.newsletter_list_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
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

Template.NewsletterListEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("newsletterListEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("newsletterListEditEditFormErrorMessage");
	}
	
});
