var pageSession = new ReactiveDict();

Template.DoctypesEmailAccount.rendered = function() {
	
};

Template.DoctypesEmailAccount.events({
	
});

Template.DoctypesEmailAccount.helpers({
	
});

Template.DoctypesEmailAccountForm.rendered = function() {
	

	pageSession.set("doctypesEmailAccountFormInfoMessage", "");
	pageSession.set("doctypesEmailAccountFormErrorMessage", "");

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

Template.DoctypesEmailAccountForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("doctypesEmailAccountFormInfoMessage", "");
		pageSession.set("doctypesEmailAccountFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var doctypesEmailAccountFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(doctypesEmailAccountFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("doctypesEmailAccountFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("doctypesEmailAccountFormErrorMessage", message);
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

		Router.go("setup.customize.doctype", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("setup.customize.doctype", {});
	}

	
});

Template.DoctypesEmailAccountForm.helpers({
	"infoMessage": function() {
		return pageSession.get("doctypesEmailAccountFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("doctypesEmailAccountFormErrorMessage");
	}
	
});
