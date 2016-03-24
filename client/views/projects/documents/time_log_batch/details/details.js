var pageSession = new ReactiveDict();

Template.TimeLogBatchDetails.rendered = function() {
	
};

Template.TimeLogBatchDetails.events({
	
});

Template.TimeLogBatchDetails.helpers({
	
});

Template.TimeLogBatchDetailsDetailsForm.rendered = function() {
	

	pageSession.set("timeLogBatchDetailsDetailsFormInfoMessage", "");
	pageSession.set("timeLogBatchDetailsDetailsFormErrorMessage", "");

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

Template.TimeLogBatchDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("timeLogBatchDetailsDetailsFormInfoMessage", "");
		pageSession.set("timeLogBatchDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var timeLogBatchDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(timeLogBatchDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("timeLogBatchDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("timeLogBatchDetailsDetailsFormErrorMessage", message);
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

		Router.go("projects.documents.time_log_batch", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("projects.documents.time_log_batch", {});
	}

	
});

Template.TimeLogBatchDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("timeLogBatchDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("timeLogBatchDetailsDetailsFormErrorMessage");
	}
	
});
