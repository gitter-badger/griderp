var pageSession = new ReactiveDict();

Template.DoctypesPurchaseReceiptItem.rendered = function() {
	
};

Template.DoctypesPurchaseReceiptItem.events({
	
});

Template.DoctypesPurchaseReceiptItem.helpers({
	
});

Template.DoctypesPurchaseReceiptItemForm.rendered = function() {
	

	pageSession.set("doctypesPurchaseReceiptItemFormInfoMessage", "");
	pageSession.set("doctypesPurchaseReceiptItemFormErrorMessage", "");

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

Template.DoctypesPurchaseReceiptItemForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("doctypesPurchaseReceiptItemFormInfoMessage", "");
		pageSession.set("doctypesPurchaseReceiptItemFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var doctypesPurchaseReceiptItemFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(doctypesPurchaseReceiptItemFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("doctypesPurchaseReceiptItemFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("doctypesPurchaseReceiptItemFormErrorMessage", message);
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

Template.DoctypesPurchaseReceiptItemForm.helpers({
	"infoMessage": function() {
		return pageSession.get("doctypesPurchaseReceiptItemFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("doctypesPurchaseReceiptItemFormErrorMessage");
	}
	
});
