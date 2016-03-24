var pageSession = new ReactiveDict();

Template.PricingRuleEdit.rendered = function() {
	
};

Template.PricingRuleEdit.events({
	
});

Template.PricingRuleEdit.helpers({
	
});

Template.PricingRuleEditEditForm.rendered = function() {
	

	pageSession.set("pricingRuleEditEditFormInfoMessage", "");
	pageSession.set("pricingRuleEditEditFormErrorMessage", "");

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

Template.PricingRuleEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("pricingRuleEditEditFormInfoMessage", "");
		pageSession.set("pricingRuleEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var pricingRuleEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(pricingRuleEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("pricingRuleEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("setup.accounts.pricing_rule", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("pricingRuleEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				PricingRule.update({ _id: t.data.pricing_rule_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("setup.accounts.pricing_rule", {});
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		/*CLOSE_REDIRECT*/
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		/*BACK_REDIRECT*/
	}

	
});

Template.PricingRuleEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("pricingRuleEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("pricingRuleEditEditFormErrorMessage");
	}
	
});
