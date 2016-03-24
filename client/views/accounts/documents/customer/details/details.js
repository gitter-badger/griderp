var pageSession = new ReactiveDict();

Template.CustomerDetails.rendered = function() {
	
};

Template.CustomerDetails.events({
	
});

Template.CustomerDetails.helpers({
	
});

Template.CustomerDetailsDetailsForm.rendered = function() {
	

	pageSession.set("customerDetailsDetailsFormInfoMessage", "");
	pageSession.set("customerDetailsDetailsFormErrorMessage", "");

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

Template.CustomerDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("customerDetailsDetailsFormInfoMessage", "");
		pageSession.set("customerDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var customerDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(customerDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("customerDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("customerDetailsDetailsFormErrorMessage", message);
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

		Router.go("accounts.documents.customer", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("accounts.documents.customer", {});
	}

	
});

Template.CustomerDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("customerDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("customerDetailsDetailsFormErrorMessage");
	}
	
});
