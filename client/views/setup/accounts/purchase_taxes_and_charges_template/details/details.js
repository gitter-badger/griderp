var pageSession = new ReactiveDict();

Template.PurchaseTaxesAndChargesTemplateDetails.rendered = function() {
	
};

Template.PurchaseTaxesAndChargesTemplateDetails.events({
	
});

Template.PurchaseTaxesAndChargesTemplateDetails.helpers({
	
});

Template.PurchaseTaxesAndChargesTemplateDetailsDetailsForm.rendered = function() {
	

	pageSession.set("purchaseTaxesAndChargesTemplateDetailsDetailsFormInfoMessage", "");
	pageSession.set("purchaseTaxesAndChargesTemplateDetailsDetailsFormErrorMessage", "");

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

Template.PurchaseTaxesAndChargesTemplateDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("purchaseTaxesAndChargesTemplateDetailsDetailsFormInfoMessage", "");
		pageSession.set("purchaseTaxesAndChargesTemplateDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var purchaseTaxesAndChargesTemplateDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(purchaseTaxesAndChargesTemplateDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("purchaseTaxesAndChargesTemplateDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("purchaseTaxesAndChargesTemplateDetailsDetailsFormErrorMessage", message);
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

		Router.go("setup.accounts.purchase_taxes_and_charges_template", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("setup.accounts.purchase_taxes_and_charges_template", {});
	}

	
});

Template.PurchaseTaxesAndChargesTemplateDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("purchaseTaxesAndChargesTemplateDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("purchaseTaxesAndChargesTemplateDetailsDetailsFormErrorMessage");
	}
	
});
