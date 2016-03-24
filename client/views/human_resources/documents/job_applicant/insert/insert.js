var pageSession = new ReactiveDict();

Template.JobApplicantInsert.rendered = function() {
	
};

Template.JobApplicantInsert.events({
	
});

Template.JobApplicantInsert.helpers({
	
});

Template.JobApplicantInsertInsertForm.rendered = function() {
	

	pageSession.set("jobApplicantInsertInsertFormInfoMessage", "");
	pageSession.set("jobApplicantInsertInsertFormErrorMessage", "");

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

Template.JobApplicantInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("jobApplicantInsertInsertFormInfoMessage", "");
		pageSession.set("jobApplicantInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var jobApplicantInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(jobApplicantInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("jobApplicantInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("human_resources.documents.job_applicant", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("jobApplicantInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = JobApplicant.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("human_resources.documents.job_applicant", {});
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

Template.JobApplicantInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("jobApplicantInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("jobApplicantInsertInsertFormErrorMessage");
	}
	
});
