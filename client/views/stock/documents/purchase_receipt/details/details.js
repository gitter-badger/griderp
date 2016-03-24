var pageSession = new ReactiveDict();

Template.PurchaseReceiptDetails.rendered = function() {
	
};

Template.PurchaseReceiptDetails.events({
	
});

Template.PurchaseReceiptDetails.helpers({
	
});

Template.PurchaseReceiptDetailsDetailsForm.rendered = function() {
	

	pageSession.set("purchaseReceiptDetailsDetailsFormInfoMessage", "");
	pageSession.set("purchaseReceiptDetailsDetailsFormErrorMessage", "");

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

Template.PurchaseReceiptDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("purchaseReceiptDetailsDetailsFormInfoMessage", "");
		pageSession.set("purchaseReceiptDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var purchaseReceiptDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(purchaseReceiptDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("purchaseReceiptDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("purchaseReceiptDetailsDetailsFormErrorMessage", message);
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

		Router.go("stock.documents.purchase_receipt", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("stock.documents.purchase_receipt", {});
	}

	
});

Template.PurchaseReceiptDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("purchaseReceiptDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("purchaseReceiptDetailsDetailsFormErrorMessage");
	}
	
});
