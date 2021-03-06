var pageSession = new ReactiveDict();

Template.AttendanceEdit.rendered = function() {
	
};

Template.AttendanceEdit.events({
	
});

Template.AttendanceEdit.helpers({
	
});

Template.AttendanceEditEditForm.rendered = function() {
	

	pageSession.set("attendanceEditEditFormInfoMessage", "");
	pageSession.set("attendanceEditEditFormErrorMessage", "");

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

Template.AttendanceEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("attendanceEditEditFormInfoMessage", "");
		pageSession.set("attendanceEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var attendanceEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(attendanceEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("attendanceEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("human_resources.documents.attendance", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("attendanceEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Attendance.update({ _id: t.data.attendance_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("human_resources.documents.attendance", {});
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

Template.AttendanceEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("attendanceEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("attendanceEditEditFormErrorMessage");
	}
	
});
