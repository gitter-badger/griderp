var pageSession = new ReactiveDict();

Template.JobOpeningDetails.rendered = function() {
	
};

Template.JobOpeningDetails.events({
	
});

Template.JobOpeningDetails.helpers({
	
});

Template.JobOpeningDetailsDetailsForm.rendered = function() {
	

	pageSession.set("jobOpeningDetailsDetailsFormInfoMessage", "");
	pageSession.set("jobOpeningDetailsDetailsFormErrorMessage", "");

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

Template.JobOpeningDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("jobOpeningDetailsDetailsFormInfoMessage", "");
		pageSession.set("jobOpeningDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var jobOpeningDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(jobOpeningDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("jobOpeningDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("jobOpeningDetailsDetailsFormErrorMessage", message);
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

		Router.go("human_resources.documents.job_opening", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("human_resources.documents.job_opening", {});
	}

	
});

Template.JobOpeningDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("jobOpeningDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("jobOpeningDetailsDetailsFormErrorMessage");
	}
	
});
