var pageSession = new ReactiveDict();

Template.TaxRuleDetails.rendered = function() {
	
};

Template.TaxRuleDetails.events({
	
});

Template.TaxRuleDetails.helpers({
	
});

Template.TaxRuleDetailsDetailsForm.rendered = function() {
	

	pageSession.set("taxRuleDetailsDetailsFormInfoMessage", "");
	pageSession.set("taxRuleDetailsDetailsFormErrorMessage", "");

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

Template.TaxRuleDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("taxRuleDetailsDetailsFormInfoMessage", "");
		pageSession.set("taxRuleDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var taxRuleDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(taxRuleDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("taxRuleDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("taxRuleDetailsDetailsFormErrorMessage", message);
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

		Router.go("setup.accounts.tax_rule", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("setup.accounts.tax_rule", {});
	}

	
});

Template.TaxRuleDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("taxRuleDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("taxRuleDetailsDetailsFormErrorMessage");
	}
	
});
