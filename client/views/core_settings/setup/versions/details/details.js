var pageSession = new ReactiveDict();

Template.VersionsDetails.rendered = function() {
	
};

Template.VersionsDetails.events({
	
});

Template.VersionsDetails.helpers({
	
});

Template.VersionsDetailsDetailsForm.rendered = function() {
	

	pageSession.set("versionsDetailsDetailsFormInfoMessage", "");
	pageSession.set("versionsDetailsDetailsFormErrorMessage", "");

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

Template.VersionsDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("versionsDetailsDetailsFormInfoMessage", "");
		pageSession.set("versionsDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var versionsDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(versionsDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("versionsDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("versionsDetailsDetailsFormErrorMessage", message);
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

		Router.go("core_settings.setup.versions", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("core_settings.setup.versions", {});
	}

	
});

Template.VersionsDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("versionsDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("versionsDetailsDetailsFormErrorMessage");
	}
	
});
