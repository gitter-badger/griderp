var pageSession = new ReactiveDict();

Template.StandardReplyDetails.rendered = function() {
	
};

Template.StandardReplyDetails.events({
	
});

Template.StandardReplyDetails.helpers({
	
});

Template.StandardReplyDetailsDetailsForm.rendered = function() {
	

	pageSession.set("standardReplyDetailsDetailsFormInfoMessage", "");
	pageSession.set("standardReplyDetailsDetailsFormErrorMessage", "");

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

Template.StandardReplyDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("standardReplyDetailsDetailsFormInfoMessage", "");
		pageSession.set("standardReplyDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var standardReplyDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(standardReplyDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("standardReplyDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("standardReplyDetailsDetailsFormErrorMessage", message);
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

		Router.go("setup.email.standard_reply", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("setup.email.standard_reply", {});
	}

	
});

Template.StandardReplyDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("standardReplyDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("standardReplyDetailsDetailsFormErrorMessage");
	}
	
});
