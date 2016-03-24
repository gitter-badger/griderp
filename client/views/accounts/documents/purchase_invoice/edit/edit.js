var pageSession = new ReactiveDict();

Template.PurchaseInvoiceEdit.rendered = function() {
	var paymentStatus = parseInt($("#status").text(), 10);
	if (paymentStatus > 0) {
		$("#status").text("Overdue");
		$("#status").addClass("indicator-red").removeClass("indicator-green");
	} else {
		$("#status").text("Paid");
		$("#status").addClass("indicator-green").removeClass("indicator-red");
	}

};

Template.PurchaseInvoiceEdit.events({
	
});

Template.PurchaseInvoiceEdit.helpers({
	
});

Template.PurchaseInvoiceEditEditForm.rendered = function() {
	

	pageSession.set("purchaseInvoiceEditEditFormInfoMessage", "");
	pageSession.set("purchaseInvoiceEditEditFormErrorMessage", "");

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

Template.PurchaseInvoiceEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("purchaseInvoiceEditEditFormInfoMessage", "");
		pageSession.set("purchaseInvoiceEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var purchaseInvoiceEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(purchaseInvoiceEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("purchaseInvoiceEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("accounts.documents.purchase_invoice", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("purchaseInvoiceEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				PurchaseInvoice.update({ _id: t.data.purchase_invoice_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("accounts.documents.purchase_invoice", {});
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

Template.PurchaseInvoiceEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("purchaseInvoiceEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("purchaseInvoiceEditEditFormErrorMessage");
	}
	
});
