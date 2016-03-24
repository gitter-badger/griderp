var pageSession = new ReactiveDict();

Template.SupplierTypeDetails.rendered = function() {
	
};

Template.SupplierTypeDetails.events({
	
});

Template.SupplierTypeDetails.helpers({
	
});

Template.SupplierTypeDetailsDetailsForm.rendered = function() {
	

	pageSession.set("supplierTypeDetailsDetailsFormInfoMessage", "");
	pageSession.set("supplierTypeDetailsDetailsFormErrorMessage", "");

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

Template.SupplierTypeDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("supplierTypeDetailsDetailsFormInfoMessage", "");
		pageSession.set("supplierTypeDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var supplierTypeDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(supplierTypeDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("supplierTypeDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("supplierTypeDetailsDetailsFormErrorMessage", message);
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

		Router.go("setup.purchasing.supplier_type", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("setup.purchasing.supplier_type", {});
	}

	
});

Template.SupplierTypeDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("supplierTypeDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("supplierTypeDetailsDetailsFormErrorMessage");
	}
	
});
