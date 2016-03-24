var pageSession = new ReactiveDict();

Template.WebsiteSlideshowDetails.rendered = function() {
	
};

Template.WebsiteSlideshowDetails.events({
	
});

Template.WebsiteSlideshowDetails.helpers({
	
});

Template.WebsiteSlideshowDetailsDetailsForm.rendered = function() {
	

	pageSession.set("websiteSlideshowDetailsDetailsFormInfoMessage", "");
	pageSession.set("websiteSlideshowDetailsDetailsFormErrorMessage", "");

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

Template.WebsiteSlideshowDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("websiteSlideshowDetailsDetailsFormInfoMessage", "");
		pageSession.set("websiteSlideshowDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var websiteSlideshowDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(websiteSlideshowDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("websiteSlideshowDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("websiteSlideshowDetailsDetailsFormErrorMessage", message);
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

		Router.go("website.documents.website_slideshow", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("website.documents.website_slideshow", {});
	}

	
});

Template.WebsiteSlideshowDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("websiteSlideshowDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("websiteSlideshowDetailsDetailsFormErrorMessage");
	}
	
});
