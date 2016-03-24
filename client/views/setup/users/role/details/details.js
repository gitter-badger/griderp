var pageSession = new ReactiveDict();

Template.RoleDetails.rendered = function() {
	
};

Template.RoleDetails.events({
	
});

Template.RoleDetails.helpers({
	
});

Template.RoleDetailsDetailsForm.rendered = function() {
	

	pageSession.set("roleDetailsDetailsFormInfoMessage", "");
	pageSession.set("roleDetailsDetailsFormErrorMessage", "");

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

Template.RoleDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("roleDetailsDetailsFormInfoMessage", "");
		pageSession.set("roleDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var roleDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(roleDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("roleDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("roleDetailsDetailsFormErrorMessage", message);
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

		Router.go("setup.users.role", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("setup.users.role", {});
	}

	
});

Template.RoleDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("roleDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("roleDetailsDetailsFormErrorMessage");
	}
	
});
