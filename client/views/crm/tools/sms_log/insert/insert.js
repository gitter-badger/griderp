var pageSession = new ReactiveDict();

Template.SmsLogInsert.rendered = function() {
	
};

Template.SmsLogInsert.events({
	
});

Template.SmsLogInsert.helpers({
	
});

Template.SmsLogInsertInsertForm.rendered = function() {
	

	pageSession.set("smsLogInsertInsertFormInfoMessage", "");
	pageSession.set("smsLogInsertInsertFormErrorMessage", "");

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

Template.SmsLogInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("smsLogInsertInsertFormInfoMessage", "");
		pageSession.set("smsLogInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var smsLogInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(smsLogInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("smsLogInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("crm.tools.sms_log", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("smsLogInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = SmsLog.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("crm.tools.sms_log", {});
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

Template.SmsLogInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("smsLogInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("smsLogInsertInsertFormErrorMessage");
	}
	
});
