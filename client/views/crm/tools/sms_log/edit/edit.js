var pageSession = new ReactiveDict();

Template.SmsLogEdit.rendered = function() {
	
};

Template.SmsLogEdit.events({
	
});

Template.SmsLogEdit.helpers({
	
});

Template.SmsLogEditEditForm.rendered = function() {
	

	pageSession.set("smsLogEditEditFormInfoMessage", "");
	pageSession.set("smsLogEditEditFormErrorMessage", "");

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

Template.SmsLogEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("smsLogEditEditFormInfoMessage", "");
		pageSession.set("smsLogEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var smsLogEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(smsLogEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("smsLogEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("crm.tools.sms_log", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("smsLogEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				SmsLog.update({ _id: t.data.sms_log_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
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

Template.SmsLogEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("smsLogEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("smsLogEditEditFormErrorMessage");
	}
	
});
