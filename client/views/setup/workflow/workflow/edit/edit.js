var pageSession = new ReactiveDict();

Template.WorkflowEdit.rendered = function() {
	
};

Template.WorkflowEdit.events({
	
});

Template.WorkflowEdit.helpers({
	
});

Template.WorkflowEditEditForm.rendered = function() {
	

	pageSession.set("workflowEditEditFormInfoMessage", "");
	pageSession.set("workflowEditEditFormErrorMessage", "");

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

Template.WorkflowEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("workflowEditEditFormInfoMessage", "");
		pageSession.set("workflowEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var workflowEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(workflowEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("workflowEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("setup.workflow.workflow", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("workflowEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Workflow.update({ _id: t.data.workflow_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("setup.workflow.workflow", {});
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

Template.WorkflowEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("workflowEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("workflowEditEditFormErrorMessage");
	}
	
});
