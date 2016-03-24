var pageSession = new ReactiveDict();

Template.DoctypesBlogSettings.rendered = function() {
	
};

Template.DoctypesBlogSettings.events({
	
});

Template.DoctypesBlogSettings.helpers({
	
});

Template.DoctypesBlogSettingsForm.rendered = function() {
	

	pageSession.set("doctypesBlogSettingsFormInfoMessage", "");
	pageSession.set("doctypesBlogSettingsFormErrorMessage", "");

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

Template.DoctypesBlogSettingsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("doctypesBlogSettingsFormInfoMessage", "");
		pageSession.set("doctypesBlogSettingsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var doctypesBlogSettingsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(doctypesBlogSettingsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("doctypesBlogSettingsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("doctypesBlogSettingsFormErrorMessage", message);
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

		Router.go("setup.customize.doctype", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("setup.customize.doctype", {});
	}

	
});

Template.DoctypesBlogSettingsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("doctypesBlogSettingsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("doctypesBlogSettingsFormErrorMessage");
	}
	
});
