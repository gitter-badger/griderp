var pageSession = new ReactiveDict();

Template.ExpenseClaimTypeInsert.rendered = function() {
	
};

Template.ExpenseClaimTypeInsert.events({
	
});

Template.ExpenseClaimTypeInsert.helpers({
	
});

Template.ExpenseClaimTypeInsertInsertForm.rendered = function() {
	

	pageSession.set("expenseClaimTypeInsertInsertFormInfoMessage", "");
	pageSession.set("expenseClaimTypeInsertInsertFormErrorMessage", "");

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

Template.ExpenseClaimTypeInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("expenseClaimTypeInsertInsertFormInfoMessage", "");
		pageSession.set("expenseClaimTypeInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var expenseClaimTypeInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(expenseClaimTypeInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("expenseClaimTypeInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("setup.human_resources.expense_claim_type", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("expenseClaimTypeInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = ExpenseClaimType.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("setup.human_resources.expense_claim_type", {});
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

Template.ExpenseClaimTypeInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("expenseClaimTypeInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("expenseClaimTypeInsertInsertFormErrorMessage");
	}
	
});
