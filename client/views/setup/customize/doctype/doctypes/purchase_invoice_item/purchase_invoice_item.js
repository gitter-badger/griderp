var pageSession = new ReactiveDict();

Template.DoctypesPurchaseInvoiceItem.rendered = function() {
	
};

Template.DoctypesPurchaseInvoiceItem.events({
	
});

Template.DoctypesPurchaseInvoiceItem.helpers({
	
});

Template.DoctypesPurchaseInvoiceItemForm.rendered = function() {
	

	pageSession.set("doctypesPurchaseInvoiceItemFormInfoMessage", "");
	pageSession.set("doctypesPurchaseInvoiceItemFormErrorMessage", "");

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

Template.DoctypesPurchaseInvoiceItemForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("doctypesPurchaseInvoiceItemFormInfoMessage", "");
		pageSession.set("doctypesPurchaseInvoiceItemFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var doctypesPurchaseInvoiceItemFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(doctypesPurchaseInvoiceItemFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("doctypesPurchaseInvoiceItemFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("doctypesPurchaseInvoiceItemFormErrorMessage", message);
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

Template.DoctypesPurchaseInvoiceItemForm.helpers({
	"infoMessage": function() {
		return pageSession.get("doctypesPurchaseInvoiceItemFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("doctypesPurchaseInvoiceItemFormErrorMessage");
	}
	
});
