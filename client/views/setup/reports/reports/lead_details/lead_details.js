var pageSession = new ReactiveDict();

Template.ReportsLeadDetails.rendered = function() {
	
};

Template.ReportsLeadDetails.events({
	
});

Template.ReportsLeadDetails.helpers({
	
});

Template.ReportsLeadDetailsForm.rendered = function() {
	

	pageSession.set("reportsLeadDetailsFormInfoMessage", "");
	pageSession.set("reportsLeadDetailsFormErrorMessage", "");

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

Template.ReportsLeadDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("reportsLeadDetailsFormInfoMessage", "");
		pageSession.set("reportsLeadDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var reportsLeadDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(reportsLeadDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("reportsLeadDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("reportsLeadDetailsFormErrorMessage", message);
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

Template.ReportsLeadDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("reportsLeadDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("reportsLeadDetailsFormErrorMessage");
	}
	
});
