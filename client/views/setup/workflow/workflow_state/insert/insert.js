var pageSession = new ReactiveDict();

Template.WorkflowStateInsert.rendered = function() {
	
};

Template.WorkflowStateInsert.events({
	
});

Template.WorkflowStateInsert.helpers({
	
});

Template.WorkflowStateInsertInsertForm.rendered = function() {
	

	pageSession.set("workflowStateInsertInsertFormInfoMessage", "");
	pageSession.set("workflowStateInsertInsertFormErrorMessage", "");

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

Template.WorkflowStateInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("workflowStateInsertInsertFormInfoMessage", "");
		pageSession.set("workflowStateInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var workflowStateInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(workflowStateInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("workflowStateInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("setup.workflow.workflow_state", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("workflowStateInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = WorkflowState.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
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

Template.WorkflowStateInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("workflowStateInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("workflowStateInsertInsertFormErrorMessage");
	}
	
});
