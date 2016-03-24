var pageSession = new ReactiveDict();

Template.ReportsSalesPartnersCommission.rendered = function() {
	
};

Template.ReportsSalesPartnersCommission.events({
	
});

Template.ReportsSalesPartnersCommission.helpers({
	
});

Template.ReportsSalesPartnersCommissionForm.rendered = function() {
	

	pageSession.set("reportsSalesPartnersCommissionFormInfoMessage", "");
	pageSession.set("reportsSalesPartnersCommissionFormErrorMessage", "");

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

Template.ReportsSalesPartnersCommissionForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("reportsSalesPartnersCommissionFormInfoMessage", "");
		pageSession.set("reportsSalesPartnersCommissionFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var reportsSalesPartnersCommissionFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(reportsSalesPartnersCommissionFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("reportsSalesPartnersCommissionFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("reportsSalesPartnersCommissionFormErrorMessage", message);
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

Template.ReportsSalesPartnersCommissionForm.helpers({
	"infoMessage": function() {
		return pageSession.get("reportsSalesPartnersCommissionFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("reportsSalesPartnersCommissionFormErrorMessage");
	}
	
});
