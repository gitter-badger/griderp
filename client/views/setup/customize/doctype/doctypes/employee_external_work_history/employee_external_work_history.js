var pageSession = new ReactiveDict();

Template.DoctypesEmployeeExternalWorkHistory.rendered = function() {
	
};

Template.DoctypesEmployeeExternalWorkHistory.events({
	
});

Template.DoctypesEmployeeExternalWorkHistory.helpers({
	
});

Template.DoctypesEmployeeExternalWorkHistoryForm.rendered = function() {
	

	pageSession.set("doctypesEmployeeExternalWorkHistoryFormInfoMessage", "");
	pageSession.set("doctypesEmployeeExternalWorkHistoryFormErrorMessage", "");

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

Template.DoctypesEmployeeExternalWorkHistoryForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("doctypesEmployeeExternalWorkHistoryFormInfoMessage", "");
		pageSession.set("doctypesEmployeeExternalWorkHistoryFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var doctypesEmployeeExternalWorkHistoryFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(doctypesEmployeeExternalWorkHistoryFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("doctypesEmployeeExternalWorkHistoryFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("doctypesEmployeeExternalWorkHistoryFormErrorMessage", message);
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

Template.DoctypesEmployeeExternalWorkHistoryForm.helpers({
	"infoMessage": function() {
		return pageSession.get("doctypesEmployeeExternalWorkHistoryFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("doctypesEmployeeExternalWorkHistoryFormErrorMessage");
	}
	
});
