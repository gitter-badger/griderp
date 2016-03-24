var pageSession = new ReactiveDict();

Template.SalaryStructureDetails.rendered = function() {
	
};

Template.SalaryStructureDetails.events({
	
});

Template.SalaryStructureDetails.helpers({
	
});

Template.SalaryStructureDetailsDetailsForm.rendered = function() {
	

	pageSession.set("salaryStructureDetailsDetailsFormInfoMessage", "");
	pageSession.set("salaryStructureDetailsDetailsFormErrorMessage", "");

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

Template.SalaryStructureDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("salaryStructureDetailsDetailsFormInfoMessage", "");
		pageSession.set("salaryStructureDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var salaryStructureDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(salaryStructureDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("salaryStructureDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("salaryStructureDetailsDetailsFormErrorMessage", message);
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

		Router.go("setup.human_resources.salary_structure", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("setup.human_resources.salary_structure", {});
	}

	
});

Template.SalaryStructureDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("salaryStructureDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("salaryStructureDetailsDetailsFormErrorMessage");
	}
	
});
