var pageSession = new ReactiveDict();

Template.LeaveAllocationDetails.rendered = function() {
	
};

Template.LeaveAllocationDetails.events({
	
});

Template.LeaveAllocationDetails.helpers({
	
});

Template.LeaveAllocationDetailsDetailsForm.rendered = function() {
	

	pageSession.set("leaveAllocationDetailsDetailsFormInfoMessage", "");
	pageSession.set("leaveAllocationDetailsDetailsFormErrorMessage", "");

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

Template.LeaveAllocationDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("leaveAllocationDetailsDetailsFormInfoMessage", "");
		pageSession.set("leaveAllocationDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var leaveAllocationDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(leaveAllocationDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("leaveAllocationDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("leaveAllocationDetailsDetailsFormErrorMessage", message);
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

		Router.go("setup.human_resources.leave_allocation", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("setup.human_resources.leave_allocation", {});
	}

	
});

Template.LeaveAllocationDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("leaveAllocationDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("leaveAllocationDetailsDetailsFormErrorMessage");
	}
	
});
