var pageSession = new ReactiveDict();

Template.SupplierEdit.rendered = function() {
	
};

Template.SupplierEdit.events({
	
});

Template.SupplierEdit.helpers({
	
});

Template.SupplierEditEditForm.rendered = function() {
	

	pageSession.set("supplierEditEditFormInfoMessage", "");
	pageSession.set("supplierEditEditFormErrorMessage", "");

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

Template.SupplierEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("supplierEditEditFormInfoMessage", "");
		pageSession.set("supplierEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var supplierEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(supplierEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("supplierEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("accounts.documents.supplier", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("supplierEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Supplier.update({ _id: t.data.supplier_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("accounts.documents.supplier", {});
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

Template.SupplierEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("supplierEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("supplierEditEditFormErrorMessage");
	}
	
});
