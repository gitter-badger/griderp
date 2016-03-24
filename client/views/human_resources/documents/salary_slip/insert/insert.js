var pageSession = new ReactiveDict();

Template.SalarySlipInsert.rendered = function() {
	
};

Template.SalarySlipInsert.events({
	
});

Template.SalarySlipInsert.helpers({
	
});

Template.SalarySlipInsertInsertForm.rendered = function() {
	

	pageSession.set("salarySlipInsertInsertFormInfoMessage", "");
	pageSession.set("salarySlipInsertInsertFormErrorMessage", "");

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

Template.SalarySlipInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("salarySlipInsertInsertFormInfoMessage", "");
		pageSession.set("salarySlipInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var salarySlipInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(salarySlipInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("salarySlipInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("human_resources.documents.salary_slip", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("salarySlipInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = SalarySlip.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("human_resources.documents.salary_slip", {});
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

Template.SalarySlipInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("salarySlipInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("salarySlipInsertInsertFormErrorMessage");
	}
	
});
