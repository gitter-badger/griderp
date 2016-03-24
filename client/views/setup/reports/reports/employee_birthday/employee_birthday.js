var pageSession = new ReactiveDict();

Template.ReportsEmployeeBirthday.rendered = function() {
	
};

Template.ReportsEmployeeBirthday.events({
	
});

Template.ReportsEmployeeBirthday.helpers({
	
});

Template.ReportsEmployeeBirthdayForm.rendered = function() {
	

	pageSession.set("reportsEmployeeBirthdayFormInfoMessage", "");
	pageSession.set("reportsEmployeeBirthdayFormErrorMessage", "");

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

Template.ReportsEmployeeBirthdayForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("reportsEmployeeBirthdayFormInfoMessage", "");
		pageSession.set("reportsEmployeeBirthdayFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var reportsEmployeeBirthdayFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(reportsEmployeeBirthdayFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("reportsEmployeeBirthdayFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("reportsEmployeeBirthdayFormErrorMessage", message);
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

Template.ReportsEmployeeBirthdayForm.helpers({
	"infoMessage": function() {
		return pageSession.get("reportsEmployeeBirthdayFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("reportsEmployeeBirthdayFormErrorMessage");
	}
	
});
