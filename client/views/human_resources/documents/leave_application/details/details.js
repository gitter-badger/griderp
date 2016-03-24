var pageSession = new ReactiveDict();

Template.LeaveApplicationDetails.rendered = function() {
	
};

Template.LeaveApplicationDetails.events({
	
});

Template.LeaveApplicationDetails.helpers({
	
});

Template.LeaveApplicationDetailsDetailsForm.rendered = function() {
	

	pageSession.set("leaveApplicationDetailsDetailsFormInfoMessage", "");
	pageSession.set("leaveApplicationDetailsDetailsFormErrorMessage", "");

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

Template.LeaveApplicationDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("leaveApplicationDetailsDetailsFormInfoMessage", "");
		pageSession.set("leaveApplicationDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var leaveApplicationDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(leaveApplicationDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("leaveApplicationDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("leaveApplicationDetailsDetailsFormErrorMessage", message);
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

		Router.go("human_resources.documents.leave_application", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("human_resources.documents.leave_application", {});
	}

	
});

Template.LeaveApplicationDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("leaveApplicationDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("leaveApplicationDetailsDetailsFormErrorMessage");
	}
	
});
