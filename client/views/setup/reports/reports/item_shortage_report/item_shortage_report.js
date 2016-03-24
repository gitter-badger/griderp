var pageSession = new ReactiveDict();

Template.ReportsItemShortageReport.rendered = function() {
	
};

Template.ReportsItemShortageReport.events({
	
});

Template.ReportsItemShortageReport.helpers({
	
});

Template.ReportsItemShortageReportForm.rendered = function() {
	

	pageSession.set("reportsItemShortageReportFormInfoMessage", "");
	pageSession.set("reportsItemShortageReportFormErrorMessage", "");

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

Template.ReportsItemShortageReportForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("reportsItemShortageReportFormInfoMessage", "");
		pageSession.set("reportsItemShortageReportFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var reportsItemShortageReportFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(reportsItemShortageReportFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("reportsItemShortageReportFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("reportsItemShortageReportFormErrorMessage", message);
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

Template.ReportsItemShortageReportForm.helpers({
	"infoMessage": function() {
		return pageSession.get("reportsItemShortageReportFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("reportsItemShortageReportFormErrorMessage");
	}
	
});
