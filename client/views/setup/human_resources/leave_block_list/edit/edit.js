var pageSession = new ReactiveDict();

Template.LeaveBlockListEdit.rendered = function() {
	
};

Template.LeaveBlockListEdit.events({
	
});

Template.LeaveBlockListEdit.helpers({
	
});

Template.LeaveBlockListEditEditForm.rendered = function() {
	

	pageSession.set("leaveBlockListEditEditFormInfoMessage", "");
	pageSession.set("leaveBlockListEditEditFormErrorMessage", "");

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

Template.LeaveBlockListEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("leaveBlockListEditEditFormInfoMessage", "");
		pageSession.set("leaveBlockListEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var leaveBlockListEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(leaveBlockListEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("leaveBlockListEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("setup.human_resources.leave_block_list", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("leaveBlockListEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				LeaveBlockList.update({ _id: t.data.leave_block_list_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("setup.human_resources.leave_block_list", {});
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

Template.LeaveBlockListEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("leaveBlockListEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("leaveBlockListEditEditFormErrorMessage");
	}
	
});
