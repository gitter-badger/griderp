var pageSession = new ReactiveDict();

Template.DoctypesCFormInvoiceDetail.rendered = function() {
	
};

Template.DoctypesCFormInvoiceDetail.events({
	
});

Template.DoctypesCFormInvoiceDetail.helpers({
	
});

Template.DoctypesCFormInvoiceDetailForm.rendered = function() {
	

	pageSession.set("doctypesCFormInvoiceDetailFormInfoMessage", "");
	pageSession.set("doctypesCFormInvoiceDetailFormErrorMessage", "");

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

Template.DoctypesCFormInvoiceDetailForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("doctypesCFormInvoiceDetailFormInfoMessage", "");
		pageSession.set("doctypesCFormInvoiceDetailFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var doctypesCFormInvoiceDetailFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(doctypesCFormInvoiceDetailFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("doctypesCFormInvoiceDetailFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("doctypesCFormInvoiceDetailFormErrorMessage", message);
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

Template.DoctypesCFormInvoiceDetailForm.helpers({
	"infoMessage": function() {
		return pageSession.get("doctypesCFormInvoiceDetailFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("doctypesCFormInvoiceDetailFormErrorMessage");
	}
	
});
