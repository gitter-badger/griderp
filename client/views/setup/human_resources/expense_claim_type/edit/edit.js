var pageSession = new ReactiveDict();

Template.ExpenseClaimTypeEdit.rendered = function() {
	
};

Template.ExpenseClaimTypeEdit.events({
	
});

Template.ExpenseClaimTypeEdit.helpers({
	
});

Template.ExpenseClaimTypeEditEditForm.rendered = function() {
	

	pageSession.set("expenseClaimTypeEditEditFormInfoMessage", "");
	pageSession.set("expenseClaimTypeEditEditFormErrorMessage", "");

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

Template.ExpenseClaimTypeEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("expenseClaimTypeEditEditFormInfoMessage", "");
		pageSession.set("expenseClaimTypeEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var expenseClaimTypeEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(expenseClaimTypeEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("expenseClaimTypeEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("setup.human_resources.expense_claim_type", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("expenseClaimTypeEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				ExpenseClaimType.update({ _id: t.data.expense_claim_type_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
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

Template.ExpenseClaimTypeEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("expenseClaimTypeEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("expenseClaimTypeEditEditFormErrorMessage");
	}
	
});
