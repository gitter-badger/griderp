var pageSession = new ReactiveDict();

Template.ReportsEmployeeInformation.rendered = function() {
	
};

Template.ReportsEmployeeInformation.events({
	
});

Template.ReportsEmployeeInformation.helpers({
	
});

Template.ReportsEmployeeInformationForm.rendered = function() {
	

	pageSession.set("reportsEmployeeInformationFormInfoMessage", "");
	pageSession.set("reportsEmployeeInformationFormErrorMessage", "");

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

Template.ReportsEmployeeInformationForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("reportsEmployeeInformationFormInfoMessage", "");
		pageSession.set("reportsEmployeeInformationFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var reportsEmployeeInformationFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(reportsEmployeeInformationFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("reportsEmployeeInformationFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("reportsEmployeeInformationFormErrorMessage", message);
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

Template.ReportsEmployeeInformationForm.helpers({
	"infoMessage": function() {
		return pageSession.get("reportsEmployeeInformationFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("reportsEmployeeInformationFormErrorMessage");
	}
	
});
