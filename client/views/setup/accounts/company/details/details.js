var pageSession = new ReactiveDict();

Template.CompanyDetails.rendered = function() {
	
};

Template.CompanyDetails.events({
	
});

Template.CompanyDetails.helpers({
	
});

Template.CompanyDetailsDetailsForm.rendered = function() {
	

	pageSession.set("companyDetailsDetailsFormInfoMessage", "");
	pageSession.set("companyDetailsDetailsFormErrorMessage", "");

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

Template.CompanyDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("companyDetailsDetailsFormInfoMessage", "");
		pageSession.set("companyDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var companyDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(companyDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("companyDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("companyDetailsDetailsFormErrorMessage", message);
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

		Router.go("setup.accounts.company", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("setup.accounts.company", {});
	}

	
});

Template.CompanyDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("companyDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("companyDetailsDetailsFormErrorMessage");
	}
	
});
