var pageSession = new ReactiveDict();

Template.ReportsMonthlySalaryRegister.rendered = function() {
	
};

Template.ReportsMonthlySalaryRegister.events({
	
});

Template.ReportsMonthlySalaryRegister.helpers({
	
});

Template.ReportsMonthlySalaryRegisterForm.rendered = function() {
	

	pageSession.set("reportsMonthlySalaryRegisterFormInfoMessage", "");
	pageSession.set("reportsMonthlySalaryRegisterFormErrorMessage", "");

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

Template.ReportsMonthlySalaryRegisterForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("reportsMonthlySalaryRegisterFormInfoMessage", "");
		pageSession.set("reportsMonthlySalaryRegisterFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var reportsMonthlySalaryRegisterFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(reportsMonthlySalaryRegisterFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("reportsMonthlySalaryRegisterFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("reportsMonthlySalaryRegisterFormErrorMessage", message);
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

		Router.go("setup.reports.reports", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("setup.reports.reports", {});
	}

	
});

Template.ReportsMonthlySalaryRegisterForm.helpers({
	"infoMessage": function() {
		return pageSession.get("reportsMonthlySalaryRegisterFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("reportsMonthlySalaryRegisterFormErrorMessage");
	}
	
});
