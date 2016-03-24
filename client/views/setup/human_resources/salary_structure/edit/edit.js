var pageSession = new ReactiveDict();

Template.SalaryStructureEdit.rendered = function() {
	
};

Template.SalaryStructureEdit.events({
	
});

Template.SalaryStructureEdit.helpers({
	
});

Template.SalaryStructureEditEditForm.rendered = function() {
	

	pageSession.set("salaryStructureEditEditFormInfoMessage", "");
	pageSession.set("salaryStructureEditEditFormErrorMessage", "");

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

Template.SalaryStructureEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("salaryStructureEditEditFormInfoMessage", "");
		pageSession.set("salaryStructureEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var salaryStructureEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(salaryStructureEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("salaryStructureEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("setup.human_resources.salary_structure", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("salaryStructureEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				SalaryStructure.update({ _id: t.data.salary_structure_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("setup.human_resources.salary_structure", {});
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

Template.SalaryStructureEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("salaryStructureEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("salaryStructureEditEditFormErrorMessage");
	}
	
});
