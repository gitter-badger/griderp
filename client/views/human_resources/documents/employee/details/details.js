var pageSession = new ReactiveDict();

Template.EmployeeDetails.rendered = function() {
	
};

Template.EmployeeDetails.events({
	
});

Template.EmployeeDetails.helpers({
	
});

Template.EmployeeDetailsDetailsForm.rendered = function() {
	

	pageSession.set("employeeDetailsDetailsFormInfoMessage", "");
	pageSession.set("employeeDetailsDetailsFormErrorMessage", "");

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

Template.EmployeeDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("employeeDetailsDetailsFormInfoMessage", "");
		pageSession.set("employeeDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var employeeDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(employeeDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("employeeDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("employeeDetailsDetailsFormErrorMessage", message);
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

		Router.go("human_resources.documents.employee", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("human_resources.documents.employee", {});
	}

	
});

Template.EmployeeDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("employeeDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("employeeDetailsDetailsFormErrorMessage");
	}
	
});
