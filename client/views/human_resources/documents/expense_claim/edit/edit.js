var pageSession = new ReactiveDict();

Template.ExpenseClaimEdit.rendered = function() {
	
};

Template.ExpenseClaimEdit.events({
	
});

Template.ExpenseClaimEdit.helpers({
	
});

Template.ExpenseClaimEditEditForm.rendered = function() {
	

	pageSession.set("expenseClaimEditEditFormInfoMessage", "");
	pageSession.set("expenseClaimEditEditFormErrorMessage", "");

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

Template.ExpenseClaimEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("expenseClaimEditEditFormInfoMessage", "");
		pageSession.set("expenseClaimEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var expenseClaimEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(expenseClaimEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("expenseClaimEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("human_resources.documents.expense_claim", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("expenseClaimEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				ExpenseClaim.update({ _id: t.data.expense_claim_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
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

Template.ExpenseClaimEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("expenseClaimEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("expenseClaimEditEditFormErrorMessage");
	}
	
});
