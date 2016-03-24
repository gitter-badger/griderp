var pageSession = new ReactiveDict();

Template.DoctypesLandedCostTaxesAndCharges.rendered = function() {
	
};

Template.DoctypesLandedCostTaxesAndCharges.events({
	
});

Template.DoctypesLandedCostTaxesAndCharges.helpers({
	
});

Template.DoctypesLandedCostTaxesAndChargesForm.rendered = function() {
	

	pageSession.set("doctypesLandedCostTaxesAndChargesFormInfoMessage", "");
	pageSession.set("doctypesLandedCostTaxesAndChargesFormErrorMessage", "");

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

Template.DoctypesLandedCostTaxesAndChargesForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("doctypesLandedCostTaxesAndChargesFormInfoMessage", "");
		pageSession.set("doctypesLandedCostTaxesAndChargesFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var doctypesLandedCostTaxesAndChargesFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(doctypesLandedCostTaxesAndChargesFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("doctypesLandedCostTaxesAndChargesFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("doctypesLandedCostTaxesAndChargesFormErrorMessage", message);
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

Template.DoctypesLandedCostTaxesAndChargesForm.helpers({
	"infoMessage": function() {
		return pageSession.get("doctypesLandedCostTaxesAndChargesFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("doctypesLandedCostTaxesAndChargesFormErrorMessage");
	}
	
});
