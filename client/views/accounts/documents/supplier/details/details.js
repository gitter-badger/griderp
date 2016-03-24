var pageSession = new ReactiveDict();

Template.SupplierDetails.rendered = function() {
	
};

Template.SupplierDetails.events({
	
});

Template.SupplierDetails.helpers({
	
});

Template.SupplierDetailsDetailsForm.rendered = function() {
	

	pageSession.set("supplierDetailsDetailsFormInfoMessage", "");
	pageSession.set("supplierDetailsDetailsFormErrorMessage", "");

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

Template.SupplierDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("supplierDetailsDetailsFormInfoMessage", "");
		pageSession.set("supplierDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var supplierDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(supplierDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("supplierDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("supplierDetailsDetailsFormErrorMessage", message);
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

		Router.go("accounts.documents.supplier", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("accounts.documents.supplier", {});
	}

	
});

Template.SupplierDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("supplierDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("supplierDetailsDetailsFormErrorMessage");
	}
	
});
