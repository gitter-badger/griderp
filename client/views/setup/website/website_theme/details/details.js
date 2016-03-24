var pageSession = new ReactiveDict();

Template.WebsiteThemeDetails.rendered = function() {
	
};

Template.WebsiteThemeDetails.events({
	
});

Template.WebsiteThemeDetails.helpers({
	
});

Template.WebsiteThemeDetailsDetailsForm.rendered = function() {
	

	pageSession.set("websiteThemeDetailsDetailsFormInfoMessage", "");
	pageSession.set("websiteThemeDetailsDetailsFormErrorMessage", "");

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

Template.WebsiteThemeDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("websiteThemeDetailsDetailsFormInfoMessage", "");
		pageSession.set("websiteThemeDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var websiteThemeDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(websiteThemeDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("websiteThemeDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("websiteThemeDetailsDetailsFormErrorMessage", message);
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

		Router.go("setup.website.website_theme", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("setup.website.website_theme", {});
	}

	
});

Template.WebsiteThemeDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("websiteThemeDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("websiteThemeDetailsDetailsFormErrorMessage");
	}
	
});
