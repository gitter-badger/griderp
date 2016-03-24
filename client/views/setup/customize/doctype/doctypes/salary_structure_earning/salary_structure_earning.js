var pageSession = new ReactiveDict();

Template.DoctypesSalaryStructureEarning.rendered = function() {
	
};

Template.DoctypesSalaryStructureEarning.events({
	
});

Template.DoctypesSalaryStructureEarning.helpers({
	
});

Template.DoctypesSalaryStructureEarningForm.rendered = function() {
	

	pageSession.set("doctypesSalaryStructureEarningFormInfoMessage", "");
	pageSession.set("doctypesSalaryStructureEarningFormErrorMessage", "");

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

Template.DoctypesSalaryStructureEarningForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("doctypesSalaryStructureEarningFormInfoMessage", "");
		pageSession.set("doctypesSalaryStructureEarningFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var doctypesSalaryStructureEarningFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(doctypesSalaryStructureEarningFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("doctypesSalaryStructureEarningFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("doctypesSalaryStructureEarningFormErrorMessage", message);
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

		Router.go("setup.customize.doctype", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("setup.customize.doctype", {});
	}

	
});

Template.DoctypesSalaryStructureEarningForm.helpers({
	"infoMessage": function() {
		return pageSession.get("doctypesSalaryStructureEarningFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("doctypesSalaryStructureEarningFormErrorMessage");
	}
	
});
