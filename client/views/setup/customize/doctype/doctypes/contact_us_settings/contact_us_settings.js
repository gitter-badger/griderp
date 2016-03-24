var pageSession = new ReactiveDict();

Template.DoctypesContactUsSettings.rendered = function() {
	
};

Template.DoctypesContactUsSettings.events({
	
});

Template.DoctypesContactUsSettings.helpers({
	
});

Template.DoctypesContactUsSettingsForm.rendered = function() {
	

	pageSession.set("doctypesContactUsSettingsFormInfoMessage", "");
	pageSession.set("doctypesContactUsSettingsFormErrorMessage", "");

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

Template.DoctypesContactUsSettingsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("doctypesContactUsSettingsFormInfoMessage", "");
		pageSession.set("doctypesContactUsSettingsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var doctypesContactUsSettingsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(doctypesContactUsSettingsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("doctypesContactUsSettingsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("doctypesContactUsSettingsFormErrorMessage", message);
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

Template.DoctypesContactUsSettingsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("doctypesContactUsSettingsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("doctypesContactUsSettingsFormErrorMessage");
	}
	
});
