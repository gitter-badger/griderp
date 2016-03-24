var pageSession = new ReactiveDict();

Template.DoctypesSalesInvoiceItem.rendered = function() {
	
};

Template.DoctypesSalesInvoiceItem.events({
	
});

Template.DoctypesSalesInvoiceItem.helpers({
	
});

Template.DoctypesSalesInvoiceItemForm.rendered = function() {
	

	pageSession.set("doctypesSalesInvoiceItemFormInfoMessage", "");
	pageSession.set("doctypesSalesInvoiceItemFormErrorMessage", "");

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

Template.DoctypesSalesInvoiceItemForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("doctypesSalesInvoiceItemFormInfoMessage", "");
		pageSession.set("doctypesSalesInvoiceItemFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var doctypesSalesInvoiceItemFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(doctypesSalesInvoiceItemFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("doctypesSalesInvoiceItemFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("doctypesSalesInvoiceItemFormErrorMessage", message);
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

Template.DoctypesSalesInvoiceItemForm.helpers({
	"infoMessage": function() {
		return pageSession.get("doctypesSalesInvoiceItemFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("doctypesSalesInvoiceItemFormErrorMessage");
	}
	
});
