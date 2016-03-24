var pageSession = new ReactiveDict();

Template.ExpenseClaimTypeDetails.rendered = function() {
	
};

Template.ExpenseClaimTypeDetails.events({
	
});

Template.ExpenseClaimTypeDetails.helpers({
	
});

Template.ExpenseClaimTypeDetailsDetailsForm.rendered = function() {
	

	pageSession.set("expenseClaimTypeDetailsDetailsFormInfoMessage", "");
	pageSession.set("expenseClaimTypeDetailsDetailsFormErrorMessage", "");

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

Template.ExpenseClaimTypeDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("expenseClaimTypeDetailsDetailsFormInfoMessage", "");
		pageSession.set("expenseClaimTypeDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var expenseClaimTypeDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(expenseClaimTypeDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("expenseClaimTypeDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("expenseClaimTypeDetailsDetailsFormErrorMessage", message);
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

		Router.go("setup.human_resources.expense_claim_type", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("setup.human_resources.expense_claim_type", {});
	}

	
});

Template.ExpenseClaimTypeDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("expenseClaimTypeDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("expenseClaimTypeDetailsDetailsFormErrorMessage");
	}
	
});
