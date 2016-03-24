var pageSession = new ReactiveDict();

Template.CommentDetails.rendered = function() {
	
};

Template.CommentDetails.events({
	
});

Template.CommentDetails.helpers({
	
});

Template.CommentDetailsDetailsForm.rendered = function() {
	

	pageSession.set("commentDetailsDetailsFormInfoMessage", "");
	pageSession.set("commentDetailsDetailsFormErrorMessage", "");

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

Template.CommentDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("commentDetailsDetailsFormInfoMessage", "");
		pageSession.set("commentDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var commentDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(commentDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("commentDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("commentDetailsDetailsFormErrorMessage", message);
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

		Router.go("core_settings.setup.comment", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("core_settings.setup.comment", {});
	}

	
});

Template.CommentDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("commentDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("commentDetailsDetailsFormErrorMessage");
	}
	
});
