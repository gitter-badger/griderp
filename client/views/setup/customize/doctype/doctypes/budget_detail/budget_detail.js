var pageSession = new ReactiveDict();

Template.DoctypesBudgetDetail.rendered = function() {
	
};

Template.DoctypesBudgetDetail.events({
	
});

Template.DoctypesBudgetDetail.helpers({
	
});

Template.DoctypesBudgetDetailForm.rendered = function() {
	

	pageSession.set("doctypesBudgetDetailFormInfoMessage", "");
	pageSession.set("doctypesBudgetDetailFormErrorMessage", "");

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

Template.DoctypesBudgetDetailForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("doctypesBudgetDetailFormInfoMessage", "");
		pageSession.set("doctypesBudgetDetailFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var doctypesBudgetDetailFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(doctypesBudgetDetailFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("doctypesBudgetDetailFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("doctypesBudgetDetailFormErrorMessage", message);
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

Template.DoctypesBudgetDetailForm.helpers({
	"infoMessage": function() {
		return pageSession.get("doctypesBudgetDetailFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("doctypesBudgetDetailFormErrorMessage");
	}
	
});
