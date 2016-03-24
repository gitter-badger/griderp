var pageSession = new ReactiveDict();

Template.ReportsPurchaseOrderTrends.rendered = function() {
	
};

Template.ReportsPurchaseOrderTrends.events({
	
});

Template.ReportsPurchaseOrderTrends.helpers({
	
});

Template.ReportsPurchaseOrderTrendsForm.rendered = function() {
	

	pageSession.set("reportsPurchaseOrderTrendsFormInfoMessage", "");
	pageSession.set("reportsPurchaseOrderTrendsFormErrorMessage", "");

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

Template.ReportsPurchaseOrderTrendsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("reportsPurchaseOrderTrendsFormInfoMessage", "");
		pageSession.set("reportsPurchaseOrderTrendsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var reportsPurchaseOrderTrendsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(reportsPurchaseOrderTrendsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("reportsPurchaseOrderTrendsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("reportsPurchaseOrderTrendsFormErrorMessage", message);
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

Template.ReportsPurchaseOrderTrendsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("reportsPurchaseOrderTrendsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("reportsPurchaseOrderTrendsFormErrorMessage");
	}
	
});
