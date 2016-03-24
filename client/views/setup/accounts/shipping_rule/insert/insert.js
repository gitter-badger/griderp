var pageSession = new ReactiveDict();

Template.ShippingRuleInsert.rendered = function() {
	
};

Template.ShippingRuleInsert.events({
	
});

Template.ShippingRuleInsert.helpers({
	
});

Template.ShippingRuleInsertInsertForm.rendered = function() {
	

	pageSession.set("shippingRuleInsertInsertFormInfoMessage", "");
	pageSession.set("shippingRuleInsertInsertFormErrorMessage", "");

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

Template.ShippingRuleInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("shippingRuleInsertInsertFormInfoMessage", "");
		pageSession.set("shippingRuleInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var shippingRuleInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(shippingRuleInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("shippingRuleInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("setup.accounts.shipping_rule", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("shippingRuleInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = ShippingRule.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
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

Template.ShippingRuleInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("shippingRuleInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("shippingRuleInsertInsertFormErrorMessage");
	}
	
});
