var pageSession = new ReactiveDict();

Template.AuthorizationRuleEdit.rendered = function() {
	
};

Template.AuthorizationRuleEdit.events({
	
});

Template.AuthorizationRuleEdit.helpers({
	
});

Template.AuthorizationRuleEditEditForm.rendered = function() {
	

	pageSession.set("authorizationRuleEditEditFormInfoMessage", "");
	pageSession.set("authorizationRuleEditEditFormErrorMessage", "");

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

Template.AuthorizationRuleEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("authorizationRuleEditEditFormInfoMessage", "");
		pageSession.set("authorizationRuleEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var authorizationRuleEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(authorizationRuleEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("authorizationRuleEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("setup.customize.authorization_rule", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("authorizationRuleEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				AuthorizationRule.update({ _id: t.data.authorization_rule_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("setup.customize.authorization_rule", {});
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

Template.AuthorizationRuleEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("authorizationRuleEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("authorizationRuleEditEditFormErrorMessage");
	}
	
});
