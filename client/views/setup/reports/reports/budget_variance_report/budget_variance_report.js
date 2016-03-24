var pageSession = new ReactiveDict();

Template.ReportsBudgetVarianceReport.rendered = function() {
	
};

Template.ReportsBudgetVarianceReport.events({
	
});

Template.ReportsBudgetVarianceReport.helpers({
	
});

Template.ReportsBudgetVarianceReportForm.rendered = function() {
	

	pageSession.set("reportsBudgetVarianceReportFormInfoMessage", "");
	pageSession.set("reportsBudgetVarianceReportFormErrorMessage", "");

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

Template.ReportsBudgetVarianceReportForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("reportsBudgetVarianceReportFormInfoMessage", "");
		pageSession.set("reportsBudgetVarianceReportFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var reportsBudgetVarianceReportFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(reportsBudgetVarianceReportFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("reportsBudgetVarianceReportFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("reportsBudgetVarianceReportFormErrorMessage", message);
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

Template.ReportsBudgetVarianceReportForm.helpers({
	"infoMessage": function() {
		return pageSession.get("reportsBudgetVarianceReportFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("reportsBudgetVarianceReportFormErrorMessage");
	}
	
});
