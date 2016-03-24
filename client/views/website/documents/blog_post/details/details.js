var pageSession = new ReactiveDict();

Template.BlogPostDetails.rendered = function() {
	
};

Template.BlogPostDetails.events({
	
});

Template.BlogPostDetails.helpers({
	
});

Template.BlogPostDetailsDetailsForm.rendered = function() {
	

	pageSession.set("blogPostDetailsDetailsFormInfoMessage", "");
	pageSession.set("blogPostDetailsDetailsFormErrorMessage", "");

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

Template.BlogPostDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("blogPostDetailsDetailsFormInfoMessage", "");
		pageSession.set("blogPostDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var blogPostDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(blogPostDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("blogPostDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("blogPostDetailsDetailsFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		/*CANCEL_REDIRECT*/
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		Router.go("website.documents.blog_post", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("website.documents.blog_post", {});
	}

	
});

Template.BlogPostDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("blogPostDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("blogPostDetailsDetailsFormErrorMessage");
	}
	
});
