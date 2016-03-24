var pageSession = new ReactiveDict();

Template.WorkflowStateEdit.rendered = function() {
	
};

Template.WorkflowStateEdit.events({
	
});

Template.WorkflowStateEdit.helpers({
	
});

Template.WorkflowStateEditEditForm.rendered = function() {
	

	pageSession.set("workflowStateEditEditFormInfoMessage", "");
	pageSession.set("workflowStateEditEditFormErrorMessage", "");

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

Template.WorkflowStateEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("workflowStateEditEditFormInfoMessage", "");
		pageSession.set("workflowStateEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var workflowStateEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(workflowStateEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("workflowStateEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("setup.workflow.workflow_state", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("workflowStateEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				WorkflowState.update({ _id: t.data.workflow_state_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("setup.workflow.workflow_state", {});
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

Template.WorkflowStateEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("workflowStateEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("workflowStateEditEditFormErrorMessage");
	}
	
});
