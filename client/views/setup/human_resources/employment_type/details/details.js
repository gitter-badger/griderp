var pageSession = new ReactiveDict();

Template.EmploymentTypeDetails.rendered = function() {
	
};

Template.EmploymentTypeDetails.events({
	
});

Template.EmploymentTypeDetails.helpers({
	
});

Template.EmploymentTypeDetailsDetailsForm.rendered = function() {
	

	pageSession.set("employmentTypeDetailsDetailsFormInfoMessage", "");
	pageSession.set("employmentTypeDetailsDetailsFormErrorMessage", "");

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

Template.EmploymentTypeDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("employmentTypeDetailsDetailsFormInfoMessage", "");
		pageSession.set("employmentTypeDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var employmentTypeDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(employmentTypeDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("employmentTypeDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("employmentTypeDetailsDetailsFormErrorMessage", message);
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

		Router.go("setup.human_resources.employment_type", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("setup.human_resources.employment_type", {});
	}

	
});

Template.EmploymentTypeDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("employmentTypeDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("employmentTypeDetailsDetailsFormErrorMessage");
	}
	
});
