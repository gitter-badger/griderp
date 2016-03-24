var pageSession = new ReactiveDict();

Template.PurchaseInvoiceInsert.rendered = function() {
	
};

Template.PurchaseInvoiceInsert.events({
	
});

Template.PurchaseInvoiceInsert.helpers({
	
});

Template.PurchaseInvoiceInsertInsertForm.rendered = function() {
	

	pageSession.set("purchaseInvoiceInsertInsertFormInfoMessage", "");
	pageSession.set("purchaseInvoiceInsertInsertFormErrorMessage", "");

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

	$('.summernote').summernote({
		height: 300,
		focus: false,
		codemirror: {
			htmlMode: true,
			lineNumbers: true,
			mode: 'text/html'
		}
	});

};

Template.PurchaseInvoiceInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("purchaseInvoiceInsertInsertFormInfoMessage", "");
		pageSession.set("purchaseInvoiceInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var purchaseInvoiceInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(purchaseInvoiceInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("purchaseInvoiceInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("accounts.documents.purchase_invoice", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("purchaeInvoiceInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = PurchaseInvoice.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
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

Template.PurchaseInvoiceInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("purchaseInvoiceInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("purchaseInvoiceInsertInsertFormErrorMessage");
	}
	
});
