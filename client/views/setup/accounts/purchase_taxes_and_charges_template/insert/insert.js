var pageSession = new ReactiveDict();

Template.PurchaseTaxesAndChargesTemplateInsert.rendered = function() {
	
};

Template.PurchaseTaxesAndChargesTemplateInsert.events({
	
});

Template.PurchaseTaxesAndChargesTemplateInsert.helpers({
	
});

Template.PurchaseTaxesAndChargesTemplateInsertInsertForm.rendered = function() {
	

	pageSession.set("purchaseTaxesAndChargesTemplateInsertInsertFormInfoMessage", "");
	pageSession.set("purchaseTaxesAndChargesTemplateInsertInsertFormErrorMessage", "");

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

Template.PurchaseTaxesAndChargesTemplateInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("purchaseTaxesAndChargesTemplateInsertInsertFormInfoMessage", "");
		pageSession.set("purchaseTaxesAndChargesTemplateInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var purchaseTaxesAndChargesTemplateInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(purchaseTaxesAndChargesTemplateInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("purchaseTaxesAndChargesTemplateInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("setup.accounts.purchase_taxes_and_charges_template", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("purchaseTaxesAndChargesTemplateInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = PurchaseTaxesAndChargesTemplate.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("setup.accounts.purchase_taxes_and_charges_template", {});
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

Template.PurchaseTaxesAndChargesTemplateInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("purchaseTaxesAndChargesTemplateInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("purchaseTaxesAndChargesTemplateInsertInsertFormErrorMessage");
	}
	
});
