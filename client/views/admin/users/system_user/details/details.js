var pageSession = new ReactiveDict();

Template.SystemUserDetails.rendered = function() {
	
};

Template.SystemUserDetails.events({
	
});

Template.SystemUserDetails.helpers({
	
});

Template.SystemUserDetailsDetailsForm.rendered = function() {
	

	pageSession.set("systemUserDetailsDetailsFormInfoMessage", "");
	pageSession.set("systemUserDetailsDetailsFormErrorMessage", "");

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

Template.SystemUserDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("systemUserDetailsDetailsFormInfoMessage", "");
		pageSession.set("systemUserDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var systemUserDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(systemUserDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("systemUserDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("systemUserDetailsDetailsFormErrorMessage", message);
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

		Router.go("admin.users.system_user", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("admin.users.system_user", {});
	}

	
});

Template.SystemUserDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("systemUserDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("systemUserDetailsDetailsFormErrorMessage");
	}
	
});
