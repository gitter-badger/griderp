var pageSession = new ReactiveDict();

Template.DoctypesHubSettings.rendered = function() {
	
};

Template.DoctypesHubSettings.events({
	
});

Template.DoctypesHubSettings.helpers({
	
});

Template.DoctypesHubSettingsForm.rendered = function() {
	

	pageSession.set("doctypesHubSettingsFormInfoMessage", "");
	pageSession.set("doctypesHubSettingsFormErrorMessage", "");

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

Template.DoctypesHubSettingsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("doctypesHubSettingsFormInfoMessage", "");
		pageSession.set("doctypesHubSettingsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var doctypesHubSettingsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(doctypesHubSettingsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("doctypesHubSettingsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("doctypesHubSettingsFormErrorMessage", message);
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

Template.DoctypesHubSettingsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("doctypesHubSettingsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("doctypesHubSettingsFormErrorMessage");
	}
	
});
