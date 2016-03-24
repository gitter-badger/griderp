var pageSession = new ReactiveDict();

Template.DoctypesSalesInvoice.rendered = function() {
	
};

Template.DoctypesSalesInvoice.events({
	
});

Template.DoctypesSalesInvoice.helpers({
	
});

Template.DoctypesSalesInvoiceForm.rendered = function() {
	

	pageSession.set("doctypesSalesInvoiceFormInfoMessage", "");
	pageSession.set("doctypesSalesInvoiceFormErrorMessage", "");

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

Template.DoctypesSalesInvoiceForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("doctypesSalesInvoiceFormInfoMessage", "");
		pageSession.set("doctypesSalesInvoiceFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var doctypesSalesInvoiceFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(doctypesSalesInvoiceFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("doctypesSalesInvoiceFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("doctypesSalesInvoiceFormErrorMessage", message);
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

Template.DoctypesSalesInvoiceForm.helpers({
	"infoMessage": function() {
		return pageSession.get("doctypesSalesInvoiceFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("doctypesSalesInvoiceFormErrorMessage");
	}
	
});
