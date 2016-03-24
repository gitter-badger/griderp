var pageSession = new ReactiveDict();

Template.TaskDetails.rendered = function() {
	
};

Template.TaskDetails.events({
	
});

Template.TaskDetails.helpers({
	
});

Template.TaskDetailsDetailsForm.rendered = function() {
	

	pageSession.set("taskDetailsDetailsFormInfoMessage", "");
	pageSession.set("taskDetailsDetailsFormErrorMessage", "");

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

Template.TaskDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("taskDetailsDetailsFormInfoMessage", "");
		pageSession.set("taskDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var taskDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(taskDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("taskDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("taskDetailsDetailsFormErrorMessage", message);
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

		Router.go("projects.documents.task", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("projects.documents.task", {});
	}

	
});

Template.TaskDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("taskDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("taskDetailsDetailsFormErrorMessage");
	}
	
});
