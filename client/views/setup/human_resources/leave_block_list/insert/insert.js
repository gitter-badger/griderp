var pageSession = new ReactiveDict();

Template.LeaveBlockListInsert.rendered = function() {
	
};

Template.LeaveBlockListInsert.events({
	
});

Template.LeaveBlockListInsert.helpers({
	
});

Template.LeaveBlockListInsertInsertForm.rendered = function() {
	

	pageSession.set("leaveBlockListInsertInsertFormInfoMessage", "");
	pageSession.set("leaveBlockListInsertInsertFormErrorMessage", "");

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

Template.LeaveBlockListInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("leaveBlockListInsertInsertFormInfoMessage", "");
		pageSession.set("leaveBlockListInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var leaveBlockListInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(leaveBlockListInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("leaveBlockListInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("setup.human_resources.leave_block_list", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("leaveBlockListInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = LeaveBlockList.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
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

Template.LeaveBlockListInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("leaveBlockListInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("leaveBlockListInsertInsertFormErrorMessage");
	}
	
});
