var pageSession = new ReactiveDict();

Template.LeaveTypeDetails.rendered = function() {
	
};

Template.LeaveTypeDetails.events({
	
});

Template.LeaveTypeDetails.helpers({
	
});

Template.LeaveTypeDetailsDetailsForm.rendered = function() {
	

	pageSession.set("leaveTypeDetailsDetailsFormInfoMessage", "");
	pageSession.set("leaveTypeDetailsDetailsFormErrorMessage", "");

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

Template.LeaveTypeDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("leaveTypeDetailsDetailsFormInfoMessage", "");
		pageSession.set("leaveTypeDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var leaveTypeDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(leaveTypeDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("leaveTypeDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("leaveTypeDetailsDetailsFormErrorMessage", message);
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

		Router.go("setup.human_resources.leave_type", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("setup.human_resources.leave_type", {});
	}

	
});

Template.LeaveTypeDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("leaveTypeDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("leaveTypeDetailsDetailsFormErrorMessage");
	}
	
});
