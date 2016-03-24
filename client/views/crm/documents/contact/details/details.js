var pageSession = new ReactiveDict();

Template.ContactDetails.rendered = function() {
	
};

Template.ContactDetails.events({
	
});

Template.ContactDetails.helpers({
	
});

Template.ContactDetailsDetailsForm.rendered = function() {
	

	pageSession.set("contactDetailsDetailsFormInfoMessage", "");
	pageSession.set("contactDetailsDetailsFormErrorMessage", "");

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

Template.ContactDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("contactDetailsDetailsFormInfoMessage", "");
		pageSession.set("contactDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var contactDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(contactDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("contactDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("contactDetailsDetailsFormErrorMessage", message);
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

		Router.go("crm.documents.contact", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("crm.documents.contact", {});
	}

	
});

Template.ContactDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("contactDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("contactDetailsDetailsFormErrorMessage");
	}
	
});
