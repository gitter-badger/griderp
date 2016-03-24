var pageSession = new ReactiveDict();

Template.UserDetails.rendered = function() {
	
};

Template.UserDetails.events({
	
});

Template.UserDetails.helpers({
	
});

Template.UserDetailsDetailsForm.rendered = function() {
	

	pageSession.set("userDetailsDetailsFormInfoMessage", "");
	pageSession.set("userDetailsDetailsFormErrorMessage", "");

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

Template.UserDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("userDetailsDetailsFormInfoMessage", "");
		pageSession.set("userDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var userDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(userDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("userDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("userDetailsDetailsFormErrorMessage", message);
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

		Router.go("setup.users.user", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("setup.users.user", {});
	}

	
});

Template.UserDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("userDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("userDetailsDetailsFormErrorMessage");
	}
	
});
