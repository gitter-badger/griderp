var pageSession = new ReactiveDict();

Template.LeaveAllocationInsert.rendered = function() {
	
};

Template.LeaveAllocationInsert.events({
	
});

Template.LeaveAllocationInsert.helpers({
	
});

Template.LeaveAllocationInsertInsertForm.rendered = function() {
	

	pageSession.set("leaveAllocationInsertInsertFormInfoMessage", "");
	pageSession.set("leaveAllocationInsertInsertFormErrorMessage", "");

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

Template.LeaveAllocationInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("leaveAllocationInsertInsertFormInfoMessage", "");
		pageSession.set("leaveAllocationInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var leaveAllocationInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(leaveAllocationInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("leaveAllocationInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("setup.human_resources.leave_allocation", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("leaveAllocationInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = LeaveAllocation.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("setup.human_resources.leave_allocation", {});
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

Template.LeaveAllocationInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("leaveAllocationInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("leaveAllocationInsertInsertFormErrorMessage");
	}
	
});
