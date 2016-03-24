var pageSession = new ReactiveDict();

Template.AppraisalTemplateDetails.rendered = function() {
	
};

Template.AppraisalTemplateDetails.events({
	
});

Template.AppraisalTemplateDetails.helpers({
	
});

Template.AppraisalTemplateDetailsDetailsForm.rendered = function() {
	

	pageSession.set("appraisalTemplateDetailsDetailsFormInfoMessage", "");
	pageSession.set("appraisalTemplateDetailsDetailsFormErrorMessage", "");

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

Template.AppraisalTemplateDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("appraisalTemplateDetailsDetailsFormInfoMessage", "");
		pageSession.set("appraisalTemplateDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var appraisalTemplateDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(appraisalTemplateDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("appraisalTemplateDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("appraisalTemplateDetailsDetailsFormErrorMessage", message);
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

		Router.go("setup.human_resources.appraisal_template", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("setup.human_resources.appraisal_template", {});
	}

	
});

Template.AppraisalTemplateDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("appraisalTemplateDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("appraisalTemplateDetailsDetailsFormErrorMessage");
	}
	
});
