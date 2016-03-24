var pageSession = new ReactiveDict();

Template.TaxRuleInsert.rendered = function() {
	
};

Template.TaxRuleInsert.events({
	
});

Template.TaxRuleInsert.helpers({
	
});

Template.TaxRuleInsertInsertForm.rendered = function() {
	

	pageSession.set("taxRuleInsertInsertFormInfoMessage", "");
	pageSession.set("taxRuleInsertInsertFormErrorMessage", "");

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

Template.TaxRuleInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("taxRuleInsertInsertFormInfoMessage", "");
		pageSession.set("taxRuleInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var taxRuleInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(taxRuleInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("taxRuleInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("setup.accounts.tax_rule", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("taxRuleInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = TaxRule.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("setup.accounts.tax_rule", {});
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

Template.TaxRuleInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("taxRuleInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("taxRuleInsertInsertFormErrorMessage");
	}
	
});
