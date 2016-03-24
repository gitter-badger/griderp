var pageSession = new ReactiveDict();

Template.ReportsProductionOrdersInProgress.rendered = function() {
	
};

Template.ReportsProductionOrdersInProgress.events({
	
});

Template.ReportsProductionOrdersInProgress.helpers({
	
});

Template.ReportsProductionOrdersInProgressForm.rendered = function() {
	

	pageSession.set("reportsProductionOrdersInProgressFormInfoMessage", "");
	pageSession.set("reportsProductionOrdersInProgressFormErrorMessage", "");

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

Template.ReportsProductionOrdersInProgressForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("reportsProductionOrdersInProgressFormInfoMessage", "");
		pageSession.set("reportsProductionOrdersInProgressFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var reportsProductionOrdersInProgressFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(reportsProductionOrdersInProgressFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("reportsProductionOrdersInProgressFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("reportsProductionOrdersInProgressFormErrorMessage", message);
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

Template.ReportsProductionOrdersInProgressForm.helpers({
	"infoMessage": function() {
		return pageSession.get("reportsProductionOrdersInProgressFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("reportsProductionOrdersInProgressFormErrorMessage");
	}
	
});
