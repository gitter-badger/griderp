var pageSession = new ReactiveDict();

Template.BlogCategoryDetails.rendered = function() {
	
};

Template.BlogCategoryDetails.events({
	
});

Template.BlogCategoryDetails.helpers({
	
});

Template.BlogCategoryDetailsDetailsForm.rendered = function() {
	

	pageSession.set("blogCategoryDetailsDetailsFormInfoMessage", "");
	pageSession.set("blogCategoryDetailsDetailsFormErrorMessage", "");

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

Template.BlogCategoryDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("blogCategoryDetailsDetailsFormInfoMessage", "");
		pageSession.set("blogCategoryDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var blogCategoryDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(blogCategoryDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("blogCategoryDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("blogCategoryDetailsDetailsFormErrorMessage", message);
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

		Router.go("setup.website.blog_category", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("setup.website.blog_category", {});
	}

	
});

Template.BlogCategoryDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("blogCategoryDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("blogCategoryDetailsDetailsFormErrorMessage");
	}
	
});
