var pageSession = new ReactiveDict();

Template.DoctypesFiscalYear.rendered = function() {
	
};

Template.DoctypesFiscalYear.events({
	
});

Template.DoctypesFiscalYear.helpers({
	
});

Template.DoctypesFiscalYearForm.rendered = function() {
	

	pageSession.set("doctypesFiscalYearFormInfoMessage", "");
	pageSession.set("doctypesFiscalYearFormErrorMessage", "");

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

Template.DoctypesFiscalYearForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("doctypesFiscalYearFormInfoMessage", "");
		pageSession.set("doctypesFiscalYearFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var doctypesFiscalYearFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(doctypesFiscalYearFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("doctypesFiscalYearFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("doctypesFiscalYearFormErrorMessage", message);
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

Template.DoctypesFiscalYearForm.helpers({
	"infoMessage": function() {
		return pageSession.get("doctypesFiscalYearFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("doctypesFiscalYearFormErrorMessage");
	}
	
});
