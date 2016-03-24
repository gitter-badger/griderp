var pageSession = new ReactiveDict();

Template.SalarySlipDetails.rendered = function() {
	
};

Template.SalarySlipDetails.events({
	
});

Template.SalarySlipDetails.helpers({
	
});

Template.SalarySlipDetailsDetailsForm.rendered = function() {
	

	pageSession.set("salarySlipDetailsDetailsFormInfoMessage", "");
	pageSession.set("salarySlipDetailsDetailsFormErrorMessage", "");

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

Template.SalarySlipDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("salarySlipDetailsDetailsFormInfoMessage", "");
		pageSession.set("salarySlipDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var salarySlipDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(salarySlipDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("salarySlipDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("salarySlipDetailsDetailsFormErrorMessage", message);
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

		Router.go("human_resources.documents.salary_slip", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("human_resources.documents.salary_slip", {});
	}

	
});

Template.SalarySlipDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("salarySlipDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("salarySlipDetailsDetailsFormErrorMessage");
	}
	
});
