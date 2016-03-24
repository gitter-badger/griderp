var pageSession = new ReactiveDict();

Template.SalaryStructureInsert.rendered = function() {
	
};

Template.SalaryStructureInsert.events({
	
});

Template.SalaryStructureInsert.helpers({
	
});

Template.SalaryStructureInsertInsertForm.rendered = function() {
	

	pageSession.set("salaryStructureInsertInsertFormInfoMessage", "");
	pageSession.set("salaryStructureInsertInsertFormErrorMessage", "");

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

Template.SalaryStructureInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("salaryStructureInsertInsertFormInfoMessage", "");
		pageSession.set("salaryStructureInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var salaryStructureInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(salaryStructureInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("salaryStructureInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("setup.human_resources.salary_structure", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("salaryStructureInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = SalaryStructure.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
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

Template.SalaryStructureInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("salaryStructureInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("salaryStructureInsertInsertFormErrorMessage");
	}
	
});
