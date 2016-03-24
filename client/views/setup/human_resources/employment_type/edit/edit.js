var pageSession = new ReactiveDict();

Template.EmploymentTypeEdit.rendered = function() {
	
};

Template.EmploymentTypeEdit.events({
	
});

Template.EmploymentTypeEdit.helpers({
	
});

Template.EmploymentTypeEditEditForm.rendered = function() {
	

	pageSession.set("employmentTypeEditEditFormInfoMessage", "");
	pageSession.set("employmentTypeEditEditFormErrorMessage", "");

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

Template.EmploymentTypeEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("employmentTypeEditEditFormInfoMessage", "");
		pageSession.set("employmentTypeEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var employmentTypeEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(employmentTypeEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("employmentTypeEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("setup.human_resources.employment_type", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("employmentTypeEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				EmploymentType.update({ _id: t.data.employment_type_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
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

Template.EmploymentTypeEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("employmentTypeEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("employmentTypeEditEditFormErrorMessage");
	}
	
});
