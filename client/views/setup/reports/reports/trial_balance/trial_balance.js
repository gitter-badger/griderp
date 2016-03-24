var pageSession = new ReactiveDict();

Template.ReportsTrialBalance.rendered = function() {
	
};

Template.ReportsTrialBalance.events({
	
});

Template.ReportsTrialBalance.helpers({
	
});

Template.ReportsTrialBalanceForm.rendered = function() {
	

	pageSession.set("reportsTrialBalanceFormInfoMessage", "");
	pageSession.set("reportsTrialBalanceFormErrorMessage", "");

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

Template.ReportsTrialBalanceForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("reportsTrialBalanceFormInfoMessage", "");
		pageSession.set("reportsTrialBalanceFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var reportsTrialBalanceFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(reportsTrialBalanceFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("reportsTrialBalanceFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("reportsTrialBalanceFormErrorMessage", message);
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

Template.ReportsTrialBalanceForm.helpers({
	"infoMessage": function() {
		return pageSession.get("reportsTrialBalanceFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("reportsTrialBalanceFormErrorMessage");
	}
	
});
