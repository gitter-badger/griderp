var pageSession = new ReactiveDict();

Template.WorkflowStateDetails.rendered = function() {
	
};

Template.WorkflowStateDetails.events({
	
});

Template.WorkflowStateDetails.helpers({
	
});

Template.WorkflowStateDetailsDetailsForm.rendered = function() {
	

	pageSession.set("workflowStateDetailsDetailsFormInfoMessage", "");
	pageSession.set("workflowStateDetailsDetailsFormErrorMessage", "");

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

Template.WorkflowStateDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("workflowStateDetailsDetailsFormInfoMessage", "");
		pageSession.set("workflowStateDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var workflowStateDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(workflowStateDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("workflowStateDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("workflowStateDetailsDetailsFormErrorMessage", message);
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

		Router.go("setup.workflow.workflow_state", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("setup.workflow.workflow_state", {});
	}

	
});

Template.WorkflowStateDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("workflowStateDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("workflowStateDetailsDetailsFormErrorMessage");
	}
	
});
