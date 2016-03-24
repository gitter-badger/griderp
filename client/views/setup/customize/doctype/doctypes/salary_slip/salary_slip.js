var pageSession = new ReactiveDict();

Template.DoctypesSalarySlip.rendered = function() {
	
};

Template.DoctypesSalarySlip.events({
	
});

Template.DoctypesSalarySlip.helpers({
	
});

Template.DoctypesSalarySlipForm.rendered = function() {
	

	pageSession.set("doctypesSalarySlipFormInfoMessage", "");
	pageSession.set("doctypesSalarySlipFormErrorMessage", "");

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

Template.DoctypesSalarySlipForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("doctypesSalarySlipFormInfoMessage", "");
		pageSession.set("doctypesSalarySlipFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var doctypesSalarySlipFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(doctypesSalarySlipFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("doctypesSalarySlipFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("doctypesSalarySlipFormErrorMessage", message);
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

Template.DoctypesSalarySlipForm.helpers({
	"infoMessage": function() {
		return pageSession.get("doctypesSalarySlipFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("doctypesSalarySlipFormErrorMessage");
	}
	
});
