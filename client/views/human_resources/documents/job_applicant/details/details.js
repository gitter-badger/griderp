var pageSession = new ReactiveDict();

Template.JobApplicantDetails.rendered = function() {
	
};

Template.JobApplicantDetails.events({
	
});

Template.JobApplicantDetails.helpers({
	
});

Template.JobApplicantDetailsDetailsForm.rendered = function() {
	

	pageSession.set("jobApplicantDetailsDetailsFormInfoMessage", "");
	pageSession.set("jobApplicantDetailsDetailsFormErrorMessage", "");

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

Template.JobApplicantDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("jobApplicantDetailsDetailsFormInfoMessage", "");
		pageSession.set("jobApplicantDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var jobApplicantDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(jobApplicantDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("jobApplicantDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("jobApplicantDetailsDetailsFormErrorMessage", message);
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

		Router.go("human_resources.documents.job_applicant", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("human_resources.documents.job_applicant", {});
	}

	
});

Template.JobApplicantDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("jobApplicantDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("jobApplicantDetailsDetailsFormErrorMessage");
	}
	
});
