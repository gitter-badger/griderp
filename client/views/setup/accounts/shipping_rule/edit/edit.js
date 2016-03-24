var pageSession = new ReactiveDict();

Template.ShippingRuleEdit.rendered = function() {
	
};

Template.ShippingRuleEdit.events({
	
});

Template.ShippingRuleEdit.helpers({
	
});

Template.ShippingRuleEditEditForm.rendered = function() {
	

	pageSession.set("shippingRuleEditEditFormInfoMessage", "");
	pageSession.set("shippingRuleEditEditFormErrorMessage", "");

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

Template.ShippingRuleEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("shippingRuleEditEditFormInfoMessage", "");
		pageSession.set("shippingRuleEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var shippingRuleEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(shippingRuleEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("shippingRuleEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("setup.accounts.shipping_rule", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("shippingRuleEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				ShippingRule.update({ _id: t.data.shipping_rule_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("setup.accounts.shipping_rule", {});
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

Template.ShippingRuleEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("shippingRuleEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("shippingRuleEditEditFormErrorMessage");
	}
	
});
