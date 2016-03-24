var pageSession = new ReactiveDict();

Template.PurchaseOrderDetails.rendered = function() {
	
};

Template.PurchaseOrderDetails.events({
	
});

Template.PurchaseOrderDetails.helpers({
	
});

Template.PurchaseOrderDetailsDetailsForm.rendered = function() {
	

	pageSession.set("purchaseOrderDetailsDetailsFormInfoMessage", "");
	pageSession.set("purchaseOrderDetailsDetailsFormErrorMessage", "");

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

Template.PurchaseOrderDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("purchaseOrderDetailsDetailsFormInfoMessage", "");
		pageSession.set("purchaseOrderDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var purchaseOrderDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(purchaseOrderDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("purchaseOrderDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("purchaseOrderDetailsDetailsFormErrorMessage", message);
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

		Router.go("purchasing.documents.purchase_order", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("purchasing.documents.purchase_order", {});
	}

	
});

Template.PurchaseOrderDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("purchaseOrderDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("purchaseOrderDetailsDetailsFormErrorMessage");
	}
	
});
