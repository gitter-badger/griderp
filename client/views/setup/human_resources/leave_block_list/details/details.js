var pageSession = new ReactiveDict();

Template.LeaveBlockListDetails.rendered = function() {
	
};

Template.LeaveBlockListDetails.events({
	
});

Template.LeaveBlockListDetails.helpers({
	
});

Template.LeaveBlockListDetailsDetailsForm.rendered = function() {
	

	pageSession.set("leaveBlockListDetailsDetailsFormInfoMessage", "");
	pageSession.set("leaveBlockListDetailsDetailsFormErrorMessage", "");

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

Template.LeaveBlockListDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("leaveBlockListDetailsDetailsFormInfoMessage", "");
		pageSession.set("leaveBlockListDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var leaveBlockListDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(leaveBlockListDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("leaveBlockListDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("leaveBlockListDetailsDetailsFormErrorMessage", message);
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

		Router.go("setup.human_resources.leave_block_list", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("setup.human_resources.leave_block_list", {});
	}

	
});

Template.LeaveBlockListDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("leaveBlockListDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("leaveBlockListDetailsDetailsFormErrorMessage");
	}
	
});
