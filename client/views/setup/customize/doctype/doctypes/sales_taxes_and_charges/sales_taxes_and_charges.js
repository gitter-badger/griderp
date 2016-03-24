var pageSession = new ReactiveDict();

Template.DoctypesSalesTaxesAndCharges.rendered = function() {
	
};

Template.DoctypesSalesTaxesAndCharges.events({
	
});

Template.DoctypesSalesTaxesAndCharges.helpers({
	
});

Template.DoctypesSalesTaxesAndChargesForm.rendered = function() {
	

	pageSession.set("doctypesSalesTaxesAndChargesFormInfoMessage", "");
	pageSession.set("doctypesSalesTaxesAndChargesFormErrorMessage", "");

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

Template.DoctypesSalesTaxesAndChargesForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("doctypesSalesTaxesAndChargesFormInfoMessage", "");
		pageSession.set("doctypesSalesTaxesAndChargesFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var doctypesSalesTaxesAndChargesFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(doctypesSalesTaxesAndChargesFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("doctypesSalesTaxesAndChargesFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("doctypesSalesTaxesAndChargesFormErrorMessage", message);
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

		Router.go("setup.customize.doctype", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("setup.customize.doctype", {});
	}

	
});

Template.DoctypesSalesTaxesAndChargesForm.helpers({
	"infoMessage": function() {
		return pageSession.get("doctypesSalesTaxesAndChargesFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("doctypesSalesTaxesAndChargesFormErrorMessage");
	}
	
});
