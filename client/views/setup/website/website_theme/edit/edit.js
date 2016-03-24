var pageSession = new ReactiveDict();

Template.WebsiteThemeEdit.rendered = function() {
	
};

Template.WebsiteThemeEdit.events({
	
});

Template.WebsiteThemeEdit.helpers({
	
});

Template.WebsiteThemeEditEditForm.rendered = function() {
	

	pageSession.set("websiteThemeEditEditFormInfoMessage", "");
	pageSession.set("websiteThemeEditEditFormErrorMessage", "");

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

Template.WebsiteThemeEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("websiteThemeEditEditFormInfoMessage", "");
		pageSession.set("websiteThemeEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var websiteThemeEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(websiteThemeEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("websiteThemeEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("setup.website.website_theme", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("websiteThemeEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				WebsiteTheme.update({ _id: t.data.website_theme_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("setup.website.website_theme", {});
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

Template.WebsiteThemeEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("websiteThemeEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("websiteThemeEditEditFormErrorMessage");
	}
	
});
