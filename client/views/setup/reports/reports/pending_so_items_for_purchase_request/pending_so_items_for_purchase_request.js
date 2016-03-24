var pageSession = new ReactiveDict();

Template.ReportsPendingSoItemsForPurchaseRequest.rendered = function() {
	
};

Template.ReportsPendingSoItemsForPurchaseRequest.events({
	
});

Template.ReportsPendingSoItemsForPurchaseRequest.helpers({
	
});

Template.ReportsPendingSoItemsForPurchaseRequestForm.rendered = function() {
	

	pageSession.set("reportsPendingSoItemsForPurchaseRequestFormInfoMessage", "");
	pageSession.set("reportsPendingSoItemsForPurchaseRequestFormErrorMessage", "");

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

Template.ReportsPendingSoItemsForPurchaseRequestForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("reportsPendingSoItemsForPurchaseRequestFormInfoMessage", "");
		pageSession.set("reportsPendingSoItemsForPurchaseRequestFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var reportsPendingSoItemsForPurchaseRequestFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(reportsPendingSoItemsForPurchaseRequestFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("reportsPendingSoItemsForPurchaseRequestFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("reportsPendingSoItemsForPurchaseRequestFormErrorMessage", message);
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

Template.ReportsPendingSoItemsForPurchaseRequestForm.helpers({
	"infoMessage": function() {
		return pageSession.get("reportsPendingSoItemsForPurchaseRequestFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("reportsPendingSoItemsForPurchaseRequestFormErrorMessage");
	}
	
});
