var pageSession = new ReactiveDict();

Template.DoctypesShippingRuleCondition.rendered = function() {
	
};

Template.DoctypesShippingRuleCondition.events({
	
});

Template.DoctypesShippingRuleCondition.helpers({
	
});

Template.DoctypesShippingRuleConditionForm.rendered = function() {
	

	pageSession.set("doctypesShippingRuleConditionFormInfoMessage", "");
	pageSession.set("doctypesShippingRuleConditionFormErrorMessage", "");

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

Template.DoctypesShippingRuleConditionForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("doctypesShippingRuleConditionFormInfoMessage", "");
		pageSession.set("doctypesShippingRuleConditionFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var doctypesShippingRuleConditionFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(doctypesShippingRuleConditionFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("doctypesShippingRuleConditionFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("doctypesShippingRuleConditionFormErrorMessage", message);
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

		Router.go("setup.customize.doctype", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("setup.customize.doctype", {});
	}

	
});

Template.DoctypesShippingRuleConditionForm.helpers({
	"infoMessage": function() {
		return pageSession.get("doctypesShippingRuleConditionFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("doctypesShippingRuleConditionFormErrorMessage");
	}
	
});
