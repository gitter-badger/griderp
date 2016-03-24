var pageSession = new ReactiveDict();

Template.ReportsPurchaseRegister.rendered = function() {
	
};

Template.ReportsPurchaseRegister.events({
	
});

Template.ReportsPurchaseRegister.helpers({
	
});

Template.ReportsPurchaseRegisterForm.rendered = function() {
	

	pageSession.set("reportsPurchaseRegisterFormInfoMessage", "");
	pageSession.set("reportsPurchaseRegisterFormErrorMessage", "");

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

Template.ReportsPurchaseRegisterForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("reportsPurchaseRegisterFormInfoMessage", "");
		pageSession.set("reportsPurchaseRegisterFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var reportsPurchaseRegisterFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(reportsPurchaseRegisterFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("reportsPurchaseRegisterFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("reportsPurchaseRegisterFormErrorMessage", message);
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

		Router.go("setup.reports.reports", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("setup.reports.reports", {});
	}

	
});

Template.ReportsPurchaseRegisterForm.helpers({
	"infoMessage": function() {
		return pageSession.get("reportsPurchaseRegisterFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("reportsPurchaseRegisterFormErrorMessage");
	}
	
});
