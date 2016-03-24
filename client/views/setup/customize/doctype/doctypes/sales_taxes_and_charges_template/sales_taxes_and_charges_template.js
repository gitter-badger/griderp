var pageSession = new ReactiveDict();

Template.DoctypesSalesTaxesAndChargesTemplate.rendered = function() {
	
};

Template.DoctypesSalesTaxesAndChargesTemplate.events({
	
});

Template.DoctypesSalesTaxesAndChargesTemplate.helpers({
	
});

Template.DoctypesSalesTaxesAndChargesTemplateForm.rendered = function() {
	

	pageSession.set("doctypesSalesTaxesAndChargesTemplateFormInfoMessage", "");
	pageSession.set("doctypesSalesTaxesAndChargesTemplateFormErrorMessage", "");

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

Template.DoctypesSalesTaxesAndChargesTemplateForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("doctypesSalesTaxesAndChargesTemplateFormInfoMessage", "");
		pageSession.set("doctypesSalesTaxesAndChargesTemplateFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var doctypesSalesTaxesAndChargesTemplateFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(doctypesSalesTaxesAndChargesTemplateFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("doctypesSalesTaxesAndChargesTemplateFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("doctypesSalesTaxesAndChargesTemplateFormErrorMessage", message);
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

		Router.go("setup.customize.doctype", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("setup.customize.doctype", {});
	}

	
});

Template.DoctypesSalesTaxesAndChargesTemplateForm.helpers({
	"infoMessage": function() {
		return pageSession.get("doctypesSalesTaxesAndChargesTemplateFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("doctypesSalesTaxesAndChargesTemplateFormErrorMessage");
	}
	
});
