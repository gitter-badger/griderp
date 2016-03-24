var pageSession = new ReactiveDict();

Template.LeaveTypeEdit.rendered = function() {
	
};

Template.LeaveTypeEdit.events({
	
});

Template.LeaveTypeEdit.helpers({
	
});

Template.LeaveTypeEditEditForm.rendered = function() {
	

	pageSession.set("leaveTypeEditEditFormInfoMessage", "");
	pageSession.set("leaveTypeEditEditFormErrorMessage", "");

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

Template.LeaveTypeEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("leaveTypeEditEditFormInfoMessage", "");
		pageSession.set("leaveTypeEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var leaveTypeEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(leaveTypeEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("leaveTypeEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("setup.human_resources.leave_type", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("leaveTypeEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				LeaveType.update({ _id: t.data.leave_type_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("setup.human_resources.leave_type", {});
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

Template.LeaveTypeEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("leaveTypeEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("leaveTypeEditEditFormErrorMessage");
	}
	
});
