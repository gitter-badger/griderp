var pageSession = new ReactiveDict();

Template.ExpenseClaimDetails.rendered = function() {
	
};

Template.ExpenseClaimDetails.events({
	
});

Template.ExpenseClaimDetails.helpers({
	
});

Template.ExpenseClaimDetailsDetailsForm.rendered = function() {
	

	pageSession.set("expenseClaimDetailsDetailsFormInfoMessage", "");
	pageSession.set("expenseClaimDetailsDetailsFormErrorMessage", "");

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

Template.ExpenseClaimDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("expenseClaimDetailsDetailsFormInfoMessage", "");
		pageSession.set("expenseClaimDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var expenseClaimDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(expenseClaimDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("expenseClaimDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("expenseClaimDetailsDetailsFormErrorMessage", message);
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

		Router.go("human_resources.documents.expense_claim", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("human_resources.documents.expense_claim", {});
	}

	
});

Template.ExpenseClaimDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("expenseClaimDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("expenseClaimDetailsDetailsFormErrorMessage");
	}
	
});
