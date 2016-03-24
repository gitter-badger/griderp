var pageSession = new ReactiveDict();

Template.EmploymentTypeInsert.rendered = function() {
	
};

Template.EmploymentTypeInsert.events({
	
});

Template.EmploymentTypeInsert.helpers({
	
});

Template.EmploymentTypeInsertInsertForm.rendered = function() {
	

	pageSession.set("employmentTypeInsertInsertFormInfoMessage", "");
	pageSession.set("employmentTypeInsertInsertFormErrorMessage", "");

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

Template.EmploymentTypeInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("employmentTypeInsertInsertFormInfoMessage", "");
		pageSession.set("employmentTypeInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var employmentTypeInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(employmentTypeInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("employmentTypeInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("setup.human_resources.employment_type", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("employmentTypeInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = EmploymentType.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("setup.human_resources.employment_type", {});
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		/*CLOSE_REDIRECT*/
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		/*BACK_REDIRECT*/
	}

	
});

Template.EmploymentTypeInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("employmentTypeInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("employmentTypeInsertInsertFormErrorMessage");
	}
	
});
