var pageSession = new ReactiveDict();

Template.DoctypesPurchaseReceiptItemSupplied.rendered = function() {
	
};

Template.DoctypesPurchaseReceiptItemSupplied.events({
	
});

Template.DoctypesPurchaseReceiptItemSupplied.helpers({
	
});

Template.DoctypesPurchaseReceiptItemSuppliedForm.rendered = function() {
	

	pageSession.set("doctypesPurchaseReceiptItemSuppliedFormInfoMessage", "");
	pageSession.set("doctypesPurchaseReceiptItemSuppliedFormErrorMessage", "");

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

Template.DoctypesPurchaseReceiptItemSuppliedForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("doctypesPurchaseReceiptItemSuppliedFormInfoMessage", "");
		pageSession.set("doctypesPurchaseReceiptItemSuppliedFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var doctypesPurchaseReceiptItemSuppliedFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(doctypesPurchaseReceiptItemSuppliedFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("doctypesPurchaseReceiptItemSuppliedFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("doctypesPurchaseReceiptItemSuppliedFormErrorMessage", message);
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

Template.DoctypesPurchaseReceiptItemSuppliedForm.helpers({
	"infoMessage": function() {
		return pageSession.get("doctypesPurchaseReceiptItemSuppliedFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("doctypesPurchaseReceiptItemSuppliedFormErrorMessage");
	}
	
});
