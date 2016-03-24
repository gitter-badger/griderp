var pageSession = new ReactiveDict();

Template.DepartmentEdit.rendered = function() {
	
};

Template.DepartmentEdit.events({
	
});

Template.DepartmentEdit.helpers({
	
});

Template.DepartmentEditEditForm.rendered = function() {
	

	pageSession.set("departmentEditEditFormInfoMessage", "");
	pageSession.set("departmentEditEditFormErrorMessage", "");

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

Template.DepartmentEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("departmentEditEditFormInfoMessage", "");
		pageSession.set("departmentEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var departmentEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(departmentEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("departmentEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("setup.human_resources.department", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("departmentEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Department.update({ _id: t.data.department_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("setup.human_resources.department", {});
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

Template.DepartmentEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("departmentEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("departmentEditEditFormErrorMessage");
	}
	
});
