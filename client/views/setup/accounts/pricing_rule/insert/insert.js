var pageSession = new ReactiveDict();

Template.PricingRuleInsert.rendered = function() {
	
};

Template.PricingRuleInsert.events({
	
});

Template.PricingRuleInsert.helpers({
	
});

Template.PricingRuleInsertInsertForm.rendered = function() {
	

	pageSession.set("pricingRuleInsertInsertFormInfoMessage", "");
	pageSession.set("pricingRuleInsertInsertFormErrorMessage", "");

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

Template.PricingRuleInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("pricingRuleInsertInsertFormInfoMessage", "");
		pageSession.set("pricingRuleInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var pricingRuleInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(pricingRuleInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("pricingRuleInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("setup.accounts.pricing_rule", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("pricingRuleInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = PricingRule.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
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

Template.PricingRuleInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("pricingRuleInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("pricingRuleInsertInsertFormErrorMessage");
	}
	
});
