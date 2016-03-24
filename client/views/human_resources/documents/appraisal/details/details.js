var pageSession = new ReactiveDict();

Template.AppraisalDetails.rendered = function() {
	
};

Template.AppraisalDetails.events({
	
});

Template.AppraisalDetails.helpers({
	
});

Template.AppraisalDetailsDetailsForm.rendered = function() {
	

	pageSession.set("appraisalDetailsDetailsFormInfoMessage", "");
	pageSession.set("appraisalDetailsDetailsFormErrorMessage", "");

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

Template.AppraisalDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("appraisalDetailsDetailsFormInfoMessage", "");
		pageSession.set("appraisalDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var appraisalDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(appraisalDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("appraisalDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("appraisalDetailsDetailsFormErrorMessage", message);
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

		Router.go("human_resources.documents.appraisal", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("human_resources.documents.appraisal", {});
	}

	
});

Template.AppraisalDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("appraisalDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("appraisalDetailsDetailsFormErrorMessage");
	}
	
});
