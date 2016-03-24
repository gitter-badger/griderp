var pageSession = new ReactiveDict();

Template.NewsletterEdit.rendered = function() {
	
};

Template.NewsletterEdit.events({
	
});

Template.NewsletterEdit.helpers({
	
});

Template.NewsletterEditEditForm.rendered = function() {
	

	pageSession.set("newsletterEditEditFormInfoMessage", "");
	pageSession.set("newsletterEditEditFormErrorMessage", "");

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

Template.NewsletterEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("newsletterEditEditFormInfoMessage", "");
		pageSession.set("newsletterEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var newsletterEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(newsletterEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("newsletterEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("crm.documents.newsletter", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("newsletterEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Newsletter.update({ _id: t.data.newsletter_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
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

Template.NewsletterEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("newsletterEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("newsletterEditEditFormErrorMessage");
	}
	
});
