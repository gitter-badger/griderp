var pageSession = new ReactiveDict();

Template.DoctypesAccountsSettings.rendered = function() {
	
};

Template.DoctypesAccountsSettings.events({
	
});

Template.DoctypesAccountsSettings.helpers({
	
});

Template.DoctypesAccountsSettingsForm.rendered = function() {
	

	pageSession.set("doctypesAccountsSettingsFormInfoMessage", "");
	pageSession.set("doctypesAccountsSettingsFormErrorMessage", "");

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

Template.DoctypesAccountsSettingsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("doctypesAccountsSettingsFormInfoMessage", "");
		pageSession.set("doctypesAccountsSettingsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var doctypesAccountsSettingsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(doctypesAccountsSettingsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("doctypesAccountsSettingsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("doctypesAccountsSettingsFormErrorMessage", message);
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

Template.DoctypesAccountsSettingsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("doctypesAccountsSettingsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("doctypesAccountsSettingsFormErrorMessage");
	}
	
});
