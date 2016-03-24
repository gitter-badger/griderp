var pageSession = new ReactiveDict();

Template.AuthorizationRuleDetails.rendered = function() {
	
};

Template.AuthorizationRuleDetails.events({
	
});

Template.AuthorizationRuleDetails.helpers({
	
});

Template.AuthorizationRuleDetailsDetailsForm.rendered = function() {
	

	pageSession.set("authorizationRuleDetailsDetailsFormInfoMessage", "");
	pageSession.set("authorizationRuleDetailsDetailsFormErrorMessage", "");

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

Template.AuthorizationRuleDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("authorizationRuleDetailsDetailsFormInfoMessage", "");
		pageSession.set("authorizationRuleDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var authorizationRuleDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(authorizationRuleDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("authorizationRuleDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("authorizationRuleDetailsDetailsFormErrorMessage", message);
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

		Router.go("setup.customize.authorization_rule", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("setup.customize.authorization_rule", {});
	}

	
});

Template.AuthorizationRuleDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("authorizationRuleDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("authorizationRuleDetailsDetailsFormErrorMessage");
	}
	
});
