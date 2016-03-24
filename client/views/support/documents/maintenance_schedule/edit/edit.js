var pageSession = new ReactiveDict();

Template.MaintenanceScheduleEdit.rendered = function() {
	
};

Template.MaintenanceScheduleEdit.events({
	
});

Template.MaintenanceScheduleEdit.helpers({
	
});

Template.MaintenanceScheduleEditEditForm.rendered = function() {
	

	pageSession.set("maintenanceScheduleEditEditFormInfoMessage", "");
	pageSession.set("maintenanceScheduleEditEditFormErrorMessage", "");

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

Template.MaintenanceScheduleEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("maintenanceScheduleEditEditFormInfoMessage", "");
		pageSession.set("maintenanceScheduleEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var maintenanceScheduleEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(maintenanceScheduleEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("maintenanceScheduleEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("support.documents.maintenance_schedule", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("maintenanceScheduleEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				MaintenanceSchedule.update({ _id: t.data.maintenance_schedule_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("support.documents.maintenance_schedule", {});
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

Template.MaintenanceScheduleEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("maintenanceScheduleEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("maintenanceScheduleEditEditFormErrorMessage");
	}
	
});
