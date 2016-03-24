var pageSession = new ReactiveDict();

Template.ReportsSalesInvoiceTrends.rendered = function() {
	
};

Template.ReportsSalesInvoiceTrends.events({
	
});

Template.ReportsSalesInvoiceTrends.helpers({
	
});

Template.ReportsSalesInvoiceTrendsForm.rendered = function() {
	

	pageSession.set("reportsSalesInvoiceTrendsFormInfoMessage", "");
	pageSession.set("reportsSalesInvoiceTrendsFormErrorMessage", "");

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

Template.ReportsSalesInvoiceTrendsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("reportsSalesInvoiceTrendsFormInfoMessage", "");
		pageSession.set("reportsSalesInvoiceTrendsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var reportsSalesInvoiceTrendsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(reportsSalesInvoiceTrendsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("reportsSalesInvoiceTrendsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("reportsSalesInvoiceTrendsFormErrorMessage", message);
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

Template.ReportsSalesInvoiceTrendsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("reportsSalesInvoiceTrendsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("reportsSalesInvoiceTrendsFormErrorMessage");
	}
	
});
