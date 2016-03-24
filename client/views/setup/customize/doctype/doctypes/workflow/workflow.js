var pageSession = new ReactiveDict();

Template.DoctypesWorkflow.rendered = function() {
	
};

Template.DoctypesWorkflow.events({
	
});

Template.DoctypesWorkflow.helpers({
	
});

Template.DoctypesWorkflowForm.rendered = function() {
	

	pageSession.set("doctypesWorkflowFormInfoMessage", "");
	pageSession.set("doctypesWorkflowFormErrorMessage", "");

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

Template.DoctypesWorkflowForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("doctypesWorkflowFormInfoMessage", "");
		pageSession.set("doctypesWorkflowFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var doctypesWorkflowFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(doctypesWorkflowFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("doctypesWorkflowFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("doctypesWorkflowFormErrorMessage", message);
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

		Router.go("setup.customize.doctype", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("setup.customize.doctype", {});
	}

	
});

Template.DoctypesWorkflowForm.helpers({
	"infoMessage": function() {
		return pageSession.get("doctypesWorkflowFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("doctypesWorkflowFormErrorMessage");
	}
	
});
