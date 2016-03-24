var pageSession = new ReactiveDict();

Template.WorkflowActionInsert.rendered = function() {
	
};

Template.WorkflowActionInsert.events({
	
});

Template.WorkflowActionInsert.helpers({
	
});

Template.WorkflowActionInsertInsertForm.rendered = function() {
	

	pageSession.set("workflowActionInsertInsertFormInfoMessage", "");
	pageSession.set("workflowActionInsertInsertFormErrorMessage", "");

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

Template.WorkflowActionInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("workflowActionInsertInsertFormInfoMessage", "");
		pageSession.set("workflowActionInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var workflowActionInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(workflowActionInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("workflowActionInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("setup.workflow.workflow_action", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("workflowActionInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = WorkflowAction.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("setup.workflow.workflow_action", {});
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

Template.WorkflowActionInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("workflowActionInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("workflowActionInsertInsertFormErrorMessage");
	}
	
});
