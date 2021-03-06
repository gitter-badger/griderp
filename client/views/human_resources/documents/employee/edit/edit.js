var pageSession = new ReactiveDict();

Template.EmployeeEdit.rendered = function() {
	
};

Template.EmployeeEdit.events({
	
});

Template.EmployeeEdit.helpers({
	
});

Template.EmployeeEditEditForm.rendered = function() {
	

	pageSession.set("employeeEditEditFormInfoMessage", "");
	pageSession.set("employeeEditEditFormErrorMessage", "");

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

	$('.summernote').summernote({
		height: 300,
		focus: false,
		codemirror: {
			htmlMode: true,
			lineNumbers: true,
			mode: 'text/html'
		}
	});

};

Template.EmployeeEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("employeeEditEditFormInfoMessage", "");
		pageSession.set("employeeEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var employeeEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(employeeEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("employeeEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("human_resources.documents.employee", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("employeeEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Employee.update({ _id: t.data.employee_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("human_resources.documents.employee", {});
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

Template.EmployeeEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("employeeEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("employeeEditEditFormErrorMessage");
	}
	
});
