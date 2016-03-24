var pageSession = new ReactiveDict();

Template.SalesTaxesAndChargesTemplateDetails.rendered = function() {
	
};

Template.SalesTaxesAndChargesTemplateDetails.events({
	
});

Template.SalesTaxesAndChargesTemplateDetails.helpers({
	
});

Template.SalesTaxesAndChargesTemplateDetailsDetailsForm.rendered = function() {
	

	pageSession.set("salesTaxesAndChargesTemplateDetailsDetailsFormInfoMessage", "");
	pageSession.set("salesTaxesAndChargesTemplateDetailsDetailsFormErrorMessage", "");

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

Template.SalesTaxesAndChargesTemplateDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("salesTaxesAndChargesTemplateDetailsDetailsFormInfoMessage", "");
		pageSession.set("salesTaxesAndChargesTemplateDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var salesTaxesAndChargesTemplateDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(salesTaxesAndChargesTemplateDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("salesTaxesAndChargesTemplateDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("salesTaxesAndChargesTemplateDetailsDetailsFormErrorMessage", message);
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

		Router.go("setup.accounts.sales_taxes_and_charges_template", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("setup.accounts.sales_taxes_and_charges_template", {});
	}

	
});

Template.SalesTaxesAndChargesTemplateDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("salesTaxesAndChargesTemplateDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("salesTaxesAndChargesTemplateDetailsDetailsFormErrorMessage");
	}
	
});
