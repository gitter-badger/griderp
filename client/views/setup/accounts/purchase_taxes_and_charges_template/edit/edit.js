var pageSession = new ReactiveDict();

Template.PurchaseTaxesAndChargesTemplateEdit.rendered = function() {
	
};

Template.PurchaseTaxesAndChargesTemplateEdit.events({
	
});

Template.PurchaseTaxesAndChargesTemplateEdit.helpers({
	
});

Template.PurchaseTaxesAndChargesTemplateEditEditForm.rendered = function() {
	

	pageSession.set("purchaseTaxesAndChargesTemplateEditEditFormInfoMessage", "");
	pageSession.set("purchaseTaxesAndChargesTemplateEditEditFormErrorMessage", "");

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

Template.PurchaseTaxesAndChargesTemplateEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("purchaseTaxesAndChargesTemplateEditEditFormInfoMessage", "");
		pageSession.set("purchaseTaxesAndChargesTemplateEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var purchaseTaxesAndChargesTemplateEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(purchaseTaxesAndChargesTemplateEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("purchaseTaxesAndChargesTemplateEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("setup.accounts.purchase_taxes_and_charges_template", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("purchaseTaxesAndChargesTemplateEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				PurchaseTaxesAndChargesTemplate.update({ _id: t.data.purchase_taxes_and_charges_template_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
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

Template.PurchaseTaxesAndChargesTemplateEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("purchaseTaxesAndChargesTemplateEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("purchaseTaxesAndChargesTemplateEditEditFormErrorMessage");
	}
	
});
