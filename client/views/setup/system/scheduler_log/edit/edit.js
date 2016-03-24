var pageSession = new ReactiveDict();

Template.SchedulerLogEdit.rendered = function() {
	
};

Template.SchedulerLogEdit.events({
	
});

Template.SchedulerLogEdit.helpers({
	
});

Template.SchedulerLogEditEditForm.rendered = function() {
	

	pageSession.set("schedulerLogEditEditFormInfoMessage", "");
	pageSession.set("schedulerLogEditEditFormErrorMessage", "");

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

Template.SchedulerLogEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("schedulerLogEditEditFormInfoMessage", "");
		pageSession.set("schedulerLogEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var schedulerLogEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(schedulerLogEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("schedulerLogEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("setup.system.scheduler_log", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("schedulerLogEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				SchedulerLog.update({ _id: t.data.scheduler_log_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("setup.system.scheduler_log", {});
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		/*CLOSE_REDIRECT*/
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		/*BACK_REDIRECT*/
	}

	
});

Template.SchedulerLogEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("schedulerLogEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("schedulerLogEditEditFormErrorMessage");
	}
	
});
