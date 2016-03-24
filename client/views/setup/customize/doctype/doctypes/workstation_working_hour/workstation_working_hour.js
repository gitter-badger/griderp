var pageSession = new ReactiveDict();

Template.DoctypesWorkstationWorkingHour.rendered = function() {
	
};

Template.DoctypesWorkstationWorkingHour.events({
	
});

Template.DoctypesWorkstationWorkingHour.helpers({
	
});

Template.DoctypesWorkstationWorkingHourForm.rendered = function() {
	

	pageSession.set("doctypesWorkstationWorkingHourFormInfoMessage", "");
	pageSession.set("doctypesWorkstationWorkingHourFormErrorMessage", "");

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

Template.DoctypesWorkstationWorkingHourForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("doctypesWorkstationWorkingHourFormInfoMessage", "");
		pageSession.set("doctypesWorkstationWorkingHourFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var doctypesWorkstationWorkingHourFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(doctypesWorkstationWorkingHourFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("doctypesWorkstationWorkingHourFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("doctypesWorkstationWorkingHourFormErrorMessage", message);
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

Template.DoctypesWorkstationWorkingHourForm.helpers({
	"infoMessage": function() {
		return pageSession.get("doctypesWorkstationWorkingHourFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("doctypesWorkstationWorkingHourFormErrorMessage");
	}
	
});
