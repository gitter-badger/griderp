var pageSession = new ReactiveDict();

Template.ExpenseClaimInsert.rendered = function() {
	
};

Template.ExpenseClaimInsert.events({
	
});

Template.ExpenseClaimInsert.helpers({
	
});

Template.ExpenseClaimInsertInsertForm.rendered = function() {
	

	pageSession.set("expenseClaimInsertInsertFormInfoMessage", "");
	pageSession.set("expenseClaimInsertInsertFormErrorMessage", "");

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

Template.ExpenseClaimInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("expenseClaimInsertInsertFormInfoMessage", "");
		pageSession.set("expenseClaimInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var expenseClaimInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(expenseClaimInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("expenseClaimInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("human_resources.documents.expense_claim", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("expenseClaimInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = ExpenseClaim.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("human_resources.documents.expense_claim", {});
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

Template.ExpenseClaimInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("expenseClaimInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("expenseClaimInsertInsertFormErrorMessage");
	}
	
});
