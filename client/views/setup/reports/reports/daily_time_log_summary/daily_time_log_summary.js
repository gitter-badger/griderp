var pageSession = new ReactiveDict();

Template.ReportsDailyTimeLogSummary.rendered = function() {
	
};

Template.ReportsDailyTimeLogSummary.events({
	
});

Template.ReportsDailyTimeLogSummary.helpers({
	
});

Template.ReportsDailyTimeLogSummaryForm.rendered = function() {
	

	pageSession.set("reportsDailyTimeLogSummaryFormInfoMessage", "");
	pageSession.set("reportsDailyTimeLogSummaryFormErrorMessage", "");

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

Template.ReportsDailyTimeLogSummaryForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("reportsDailyTimeLogSummaryFormInfoMessage", "");
		pageSession.set("reportsDailyTimeLogSummaryFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var reportsDailyTimeLogSummaryFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(reportsDailyTimeLogSummaryFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("reportsDailyTimeLogSummaryFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("reportsDailyTimeLogSummaryFormErrorMessage", message);
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

Template.ReportsDailyTimeLogSummaryForm.helpers({
	"infoMessage": function() {
		return pageSession.get("reportsDailyTimeLogSummaryFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("reportsDailyTimeLogSummaryFormErrorMessage");
	}
	
});
