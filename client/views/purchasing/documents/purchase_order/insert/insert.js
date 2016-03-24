var pageSession = new ReactiveDict();

Template.PurchaseOrderInsert.rendered = function() {
	
};

Template.PurchaseOrderInsert.events({
	
});

Template.PurchaseOrderInsert.helpers({
	
});

Template.PurchaseOrderInsertInsertForm.rendered = function() {
	

	pageSession.set("purchaseOrderInsertInsertFormInfoMessage", "");
	pageSession.set("purchaseOrderInsertInsertFormErrorMessage", "");

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

Template.PurchaseOrderInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("purchaseOrderInsertInsertFormInfoMessage", "");
		pageSession.set("purchaseOrderInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var purchaseOrderInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(purchaseOrderInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("purchaseOrderInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("purchasing.documents.purchase_order", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("purchaseOrderInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = PurchaseOrder.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("purchasing.documents.purchase_order", {});
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

Template.PurchaseOrderInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("purchaseOrderInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("purchaseOrderInsertInsertFormErrorMessage");
	}
	
});
