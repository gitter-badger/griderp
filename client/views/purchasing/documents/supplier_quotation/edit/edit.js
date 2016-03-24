var pageSession = new ReactiveDict();

Template.SupplierQuotationEdit.rendered = function() {
	
};

Template.SupplierQuotationEdit.events({
	
});

Template.SupplierQuotationEdit.helpers({
	
});

Template.SupplierQuotationEditEditForm.rendered = function() {
	

	pageSession.set("supplierQuotationEditEditFormInfoMessage", "");
	pageSession.set("supplierQuotationEditEditFormErrorMessage", "");

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

Template.SupplierQuotationEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("supplierQuotationEditEditFormInfoMessage", "");
		pageSession.set("supplierQuotationEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var supplierQuotationEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(supplierQuotationEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("supplierQuotationEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("purchasing.documents.supplier_quotation", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("supplierQuotationEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				SupplierQuotation.update({ _id: t.data.supplier_quotation_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("purchasing.documents.supplier_quotation", {});
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

Template.SupplierQuotationEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("supplierQuotationEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("supplierQuotationEditEditFormErrorMessage");
	}
	
});
