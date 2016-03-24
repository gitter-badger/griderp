var pageSession = new ReactiveDict();

Template.DoctypesBankReconciliation.rendered = function() {
	
};

Template.DoctypesBankReconciliation.events({
	
});

Template.DoctypesBankReconciliation.helpers({
	
});

Template.DoctypesBankReconciliationForm.rendered = function() {
	

	pageSession.set("doctypesBankReconciliationFormInfoMessage", "");
	pageSession.set("doctypesBankReconciliationFormErrorMessage", "");

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

Template.DoctypesBankReconciliationForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("doctypesBankReconciliationFormInfoMessage", "");
		pageSession.set("doctypesBankReconciliationFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var doctypesBankReconciliationFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(doctypesBankReconciliationFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("doctypesBankReconciliationFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("doctypesBankReconciliationFormErrorMessage", message);
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

Template.DoctypesBankReconciliationForm.helpers({
	"infoMessage": function() {
		return pageSession.get("doctypesBankReconciliationFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("doctypesBankReconciliationFormErrorMessage");
	}
	
});
