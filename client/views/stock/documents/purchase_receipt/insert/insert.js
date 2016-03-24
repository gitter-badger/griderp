var pageSession = new ReactiveDict();

Template.PurchaseReceiptInsert.rendered = function() {
	
};

Template.PurchaseReceiptInsert.events({
	
});

Template.PurchaseReceiptInsert.helpers({
	
});

Template.PurchaseReceiptInsertInsertForm.rendered = function() {
	

	pageSession.set("purchaseReceiptInsertInsertFormInfoMessage", "");
	pageSession.set("purchaseReceiptInsertInsertFormErrorMessage", "");

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

Template.PurchaseReceiptInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("purchaseReceiptInsertInsertFormInfoMessage", "");
		pageSession.set("purchaseReceiptInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var purchaseReceiptInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(purchaseReceiptInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("purchaseReceiptInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("stock.documents.purchase_receipt", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("purchaseReceiptInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = PurchaseReceipt.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("stock.documents.purchase_receipt", {});
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

Template.PurchaseReceiptInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("purchaseReceiptInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("purchaseReceiptInsertInsertFormErrorMessage");
	}
	
});
