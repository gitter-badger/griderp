var pageSession = new ReactiveDict();

Template.SchedulerLogDetails.rendered = function() {
	
};

Template.SchedulerLogDetails.events({
	
});

Template.SchedulerLogDetails.helpers({
	
});

Template.SchedulerLogDetailsDetailsForm.rendered = function() {
	

	pageSession.set("schedulerLogDetailsDetailsFormInfoMessage", "");
	pageSession.set("schedulerLogDetailsDetailsFormErrorMessage", "");

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

Template.SchedulerLogDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("schedulerLogDetailsDetailsFormInfoMessage", "");
		pageSession.set("schedulerLogDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var schedulerLogDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(schedulerLogDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("schedulerLogDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("schedulerLogDetailsDetailsFormErrorMessage", message);
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

		Router.go("setup.system.scheduler_log", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("setup.system.scheduler_log", {});
	}

	
});

Template.SchedulerLogDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("schedulerLogDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("schedulerLogDetailsDetailsFormErrorMessage");
	}
	
});
