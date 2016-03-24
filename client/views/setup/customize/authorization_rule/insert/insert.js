var pageSession = new ReactiveDict();

Template.AuthorizationRuleInsert.rendered = function() {
	
};

Template.AuthorizationRuleInsert.events({
	
});

Template.AuthorizationRuleInsert.helpers({
	
});

Template.AuthorizationRuleInsertInsertForm.rendered = function() {
	

	pageSession.set("authorizationRuleInsertInsertFormInfoMessage", "");
	pageSession.set("authorizationRuleInsertInsertFormErrorMessage", "");

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

Template.AuthorizationRuleInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("authorizationRuleInsertInsertFormInfoMessage", "");
		pageSession.set("authorizationRuleInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var authorizationRuleInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(authorizationRuleInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("authorizationRuleInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("setup.customize.authorization_rule", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("authorizationRuleInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = AuthorizationRule.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
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

Template.AuthorizationRuleInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("authorizationRuleInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("authorizationRuleInsertInsertFormErrorMessage");
	}
	
});
