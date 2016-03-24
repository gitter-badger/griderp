var pageSession = new ReactiveDict();

Template.DoctypesPaymentReconciliationInvoice.rendered = function() {
	
};

Template.DoctypesPaymentReconciliationInvoice.events({
	
});

Template.DoctypesPaymentReconciliationInvoice.helpers({
	
});

Template.DoctypesPaymentReconciliationInvoiceForm.rendered = function() {
	

	pageSession.set("doctypesPaymentReconciliationInvoiceFormInfoMessage", "");
	pageSession.set("doctypesPaymentReconciliationInvoiceFormErrorMessage", "");

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

Template.DoctypesPaymentReconciliationInvoiceForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("doctypesPaymentReconciliationInvoiceFormInfoMessage", "");
		pageSession.set("doctypesPaymentReconciliationInvoiceFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var doctypesPaymentReconciliationInvoiceFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(doctypesPaymentReconciliationInvoiceFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("doctypesPaymentReconciliationInvoiceFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("doctypesPaymentReconciliationInvoiceFormErrorMessage", message);
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

Template.DoctypesPaymentReconciliationInvoiceForm.helpers({
	"infoMessage": function() {
		return pageSession.get("doctypesPaymentReconciliationInvoiceFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("doctypesPaymentReconciliationInvoiceFormErrorMessage");
	}
	
});
