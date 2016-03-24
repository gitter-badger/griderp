var pageSession = new ReactiveDict();

Template.FiscalYearDetails.rendered = function() {
	
};

Template.FiscalYearDetails.events({
	
});

Template.FiscalYearDetails.helpers({
	
});

Template.FiscalYearDetailsDetailsForm.rendered = function() {
	

	pageSession.set("fiscalYearDetailsDetailsFormInfoMessage", "");
	pageSession.set("fiscalYearDetailsDetailsFormErrorMessage", "");

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

Template.FiscalYearDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("fiscalYearDetailsDetailsFormInfoMessage", "");
		pageSession.set("fiscalYearDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var fiscalYearDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(fiscalYearDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("fiscalYearDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("fiscalYearDetailsDetailsFormErrorMessage", message);
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

		Router.go("setup.accounts.fiscal_year", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("setup.accounts.fiscal_year", {});
	}

	
});

Template.FiscalYearDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("fiscalYearDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("fiscalYearDetailsDetailsFormErrorMessage");
	}
	
});
