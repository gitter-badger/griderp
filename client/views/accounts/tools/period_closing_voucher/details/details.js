var pageSession = new ReactiveDict();

Template.PeriodClosingVoucherDetails.rendered = function() {
	
};

Template.PeriodClosingVoucherDetails.events({
	
});

Template.PeriodClosingVoucherDetails.helpers({
	
});

Template.PeriodClosingVoucherDetailsDetailsForm.rendered = function() {
	

	pageSession.set("periodClosingVoucherDetailsDetailsFormInfoMessage", "");
	pageSession.set("periodClosingVoucherDetailsDetailsFormErrorMessage", "");

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

Template.PeriodClosingVoucherDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("periodClosingVoucherDetailsDetailsFormInfoMessage", "");
		pageSession.set("periodClosingVoucherDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var periodClosingVoucherDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(periodClosingVoucherDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("periodClosingVoucherDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("periodClosingVoucherDetailsDetailsFormErrorMessage", message);
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

		Router.go("accounts.tools.period_closing_voucher", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("accounts.tools.period_closing_voucher", {});
	}

	
});

Template.PeriodClosingVoucherDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("periodClosingVoucherDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("periodClosingVoucherDetailsDetailsFormErrorMessage");
	}
	
});
