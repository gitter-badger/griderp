var pageSession = new ReactiveDict();

Template.SalesTaxesAndChargesTemplateInsert.rendered = function() {
	
};

Template.SalesTaxesAndChargesTemplateInsert.events({
	
});

Template.SalesTaxesAndChargesTemplateInsert.helpers({
	
});

Template.SalesTaxesAndChargesTemplateInsertInsertForm.rendered = function() {
	

	pageSession.set("salesTaxesAndChargesTemplateInsertInsertFormInfoMessage", "");
	pageSession.set("salesTaxesAndChargesTemplateInsertInsertFormErrorMessage", "");

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

Template.SalesTaxesAndChargesTemplateInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("salesTaxesAndChargesTemplateInsertInsertFormInfoMessage", "");
		pageSession.set("salesTaxesAndChargesTemplateInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var salesTaxesAndChargesTemplateInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(salesTaxesAndChargesTemplateInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("salesTaxesAndChargesTemplateInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("setup.accounts.sales_taxes_and_charges_template", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("salesTaxesAndChargesTemplateInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = SalesTaxesAndChargesTemplate.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("setup.accounts.sales_taxes_and_charges_template", {});
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

Template.SalesTaxesAndChargesTemplateInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("salesTaxesAndChargesTemplateInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("salesTaxesAndChargesTemplateInsertInsertFormErrorMessage");
	}
	
});
