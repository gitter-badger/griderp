var pageSession = new ReactiveDict();

Template.PurchaseOrderEdit.rendered = function() {
	
};

Template.PurchaseOrderEdit.events({
	
});

Template.PurchaseOrderEdit.helpers({
	
});

Template.PurchaseOrderEditEditForm.rendered = function() {
	

	pageSession.set("purchaseOrderEditEditFormInfoMessage", "");
	pageSession.set("purchaseOrderEditEditFormErrorMessage", "");

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

Template.PurchaseOrderEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("purchaseOrderEditEditFormInfoMessage", "");
		pageSession.set("purchaseOrderEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var purchaseOrderEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(purchaseOrderEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("purchaseOrderEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("purchasing.documents.purchase_order", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("purchaseOrderEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				PurchaseOrder.update({ _id: t.data.purchase_order_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
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

Template.PurchaseOrderEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("purchaseOrderEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("purchaseOrderEditEditFormErrorMessage");
	}
	
});
