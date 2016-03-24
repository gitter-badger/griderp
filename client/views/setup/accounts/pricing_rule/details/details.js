var pageSession = new ReactiveDict();

Template.PricingRuleDetails.rendered = function() {
	
};

Template.PricingRuleDetails.events({
	
});

Template.PricingRuleDetails.helpers({
	
});

Template.PricingRuleDetailsDetailsForm.rendered = function() {
	

	pageSession.set("pricingRuleDetailsDetailsFormInfoMessage", "");
	pageSession.set("pricingRuleDetailsDetailsFormErrorMessage", "");

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

Template.PricingRuleDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("pricingRuleDetailsDetailsFormInfoMessage", "");
		pageSession.set("pricingRuleDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var pricingRuleDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(pricingRuleDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("pricingRuleDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("pricingRuleDetailsDetailsFormErrorMessage", message);
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

		Router.go("setup.accounts.pricing_rule", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("setup.accounts.pricing_rule", {});
	}

	
});

Template.PricingRuleDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("pricingRuleDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("pricingRuleDetailsDetailsFormErrorMessage");
	}
	
});
