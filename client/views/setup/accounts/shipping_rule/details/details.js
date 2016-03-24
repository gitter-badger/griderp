var pageSession = new ReactiveDict();

Template.ShippingRuleDetails.rendered = function() {
	
};

Template.ShippingRuleDetails.events({
	
});

Template.ShippingRuleDetails.helpers({
	
});

Template.ShippingRuleDetailsDetailsForm.rendered = function() {
	

	pageSession.set("shippingRuleDetailsDetailsFormInfoMessage", "");
	pageSession.set("shippingRuleDetailsDetailsFormErrorMessage", "");

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

Template.ShippingRuleDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("shippingRuleDetailsDetailsFormInfoMessage", "");
		pageSession.set("shippingRuleDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var shippingRuleDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(shippingRuleDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("shippingRuleDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("shippingRuleDetailsDetailsFormErrorMessage", message);
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

		Router.go("setup.accounts.shipping_rule", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("setup.accounts.shipping_rule", {});
	}

	
});

Template.ShippingRuleDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("shippingRuleDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("shippingRuleDetailsDetailsFormErrorMessage");
	}
	
});
