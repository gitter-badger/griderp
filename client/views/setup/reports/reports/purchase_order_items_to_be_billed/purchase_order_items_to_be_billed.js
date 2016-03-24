var pageSession = new ReactiveDict();

Template.ReportsPurchaseOrderItemsToBeBilled.rendered = function() {
	
};

Template.ReportsPurchaseOrderItemsToBeBilled.events({
	
});

Template.ReportsPurchaseOrderItemsToBeBilled.helpers({
	
});

Template.ReportsPurchaseOrderItemsToBeBilledForm.rendered = function() {
	

	pageSession.set("reportsPurchaseOrderItemsToBeBilledFormInfoMessage", "");
	pageSession.set("reportsPurchaseOrderItemsToBeBilledFormErrorMessage", "");

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

Template.ReportsPurchaseOrderItemsToBeBilledForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("reportsPurchaseOrderItemsToBeBilledFormInfoMessage", "");
		pageSession.set("reportsPurchaseOrderItemsToBeBilledFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var reportsPurchaseOrderItemsToBeBilledFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(reportsPurchaseOrderItemsToBeBilledFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("reportsPurchaseOrderItemsToBeBilledFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("reportsPurchaseOrderItemsToBeBilledFormErrorMessage", message);
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

Template.ReportsPurchaseOrderItemsToBeBilledForm.helpers({
	"infoMessage": function() {
		return pageSession.get("reportsPurchaseOrderItemsToBeBilledFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("reportsPurchaseOrderItemsToBeBilledFormErrorMessage");
	}
	
});
