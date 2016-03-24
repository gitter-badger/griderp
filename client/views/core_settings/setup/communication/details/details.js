var pageSession = new ReactiveDict();

Template.CommunicationDetails.rendered = function() {
	
};

Template.CommunicationDetails.events({
	
});

Template.CommunicationDetails.helpers({
	
});

Template.CommunicationDetailsDetailsForm.rendered = function() {
	

	pageSession.set("communicationDetailsDetailsFormInfoMessage", "");
	pageSession.set("communicationDetailsDetailsFormErrorMessage", "");

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

Template.CommunicationDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("communicationDetailsDetailsFormInfoMessage", "");
		pageSession.set("communicationDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var communicationDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(communicationDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("communicationDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("communicationDetailsDetailsFormErrorMessage", message);
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

		Router.go("core_settings.setup.communication", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("core_settings.setup.communication", {});
	}

	
});

Template.CommunicationDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("communicationDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("communicationDetailsDetailsFormErrorMessage");
	}
	
});
