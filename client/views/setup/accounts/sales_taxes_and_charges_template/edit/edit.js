var pageSession = new ReactiveDict();

Template.SalesTaxesAndChargesTemplateEdit.rendered = function() {
	
};

Template.SalesTaxesAndChargesTemplateEdit.events({
	
});

Template.SalesTaxesAndChargesTemplateEdit.helpers({
	
});

Template.SalesTaxesAndChargesTemplateEditEditForm.rendered = function() {
	

	pageSession.set("salesTaxesAndChargesTemplateEditEditFormInfoMessage", "");
	pageSession.set("salesTaxesAndChargesTemplateEditEditFormErrorMessage", "");

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

Template.SalesTaxesAndChargesTemplateEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("salesTaxesAndChargesTemplateEditEditFormInfoMessage", "");
		pageSession.set("salesTaxesAndChargesTemplateEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var salesTaxesAndChargesTemplateEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(salesTaxesAndChargesTemplateEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("salesTaxesAndChargesTemplateEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("setup.accounts.sales_taxes_and_charges_template", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("salesTaxesAndChargesTemplateEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				SalesTaxesAndChargesTemplate.update({ _id: t.data.sales_taxes_and_charges_template_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
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

Template.SalesTaxesAndChargesTemplateEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("salesTaxesAndChargesTemplateEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("salesTaxesAndChargesTemplateEditEditFormErrorMessage");
	}
	
});
