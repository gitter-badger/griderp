var pageSession = new ReactiveDict();

Template.DepartmentDetails.rendered = function() {
	
};

Template.DepartmentDetails.events({
	
});

Template.DepartmentDetails.helpers({
	
});

Template.DepartmentDetailsDetailsForm.rendered = function() {
	

	pageSession.set("departmentDetailsDetailsFormInfoMessage", "");
	pageSession.set("departmentDetailsDetailsFormErrorMessage", "");

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

Template.DepartmentDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("departmentDetailsDetailsFormInfoMessage", "");
		pageSession.set("departmentDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var departmentDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(departmentDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("departmentDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("departmentDetailsDetailsFormErrorMessage", message);
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

		Router.go("setup.human_resources.department", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("setup.human_resources.department", {});
	}

	
});

Template.DepartmentDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("departmentDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("departmentDetailsDetailsFormErrorMessage");
	}
	
});
