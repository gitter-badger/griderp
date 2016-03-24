var pageSession = new ReactiveDict();

Template.MonthlyDistributionDetails.rendered = function() {
	
};

Template.MonthlyDistributionDetails.events({
	
});

Template.MonthlyDistributionDetails.helpers({
	
});

Template.MonthlyDistributionDetailsDetailsForm.rendered = function() {
	

	pageSession.set("monthlyDistributionDetailsDetailsFormInfoMessage", "");
	pageSession.set("monthlyDistributionDetailsDetailsFormErrorMessage", "");

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

Template.MonthlyDistributionDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("monthlyDistributionDetailsDetailsFormInfoMessage", "");
		pageSession.set("monthlyDistributionDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var monthlyDistributionDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(monthlyDistributionDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("monthlyDistributionDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("monthlyDistributionDetailsDetailsFormErrorMessage", message);
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

		Router.go("setup.accounts.monthly_distribution", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("setup.accounts.monthly_distribution", {});
	}

	
});

Template.MonthlyDistributionDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("monthlyDistributionDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("monthlyDistributionDetailsDetailsFormErrorMessage");
	}
	
});
