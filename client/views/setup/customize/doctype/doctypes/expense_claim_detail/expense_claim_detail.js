var pageSession = new ReactiveDict();

Template.DoctypesExpenseClaimDetail.rendered = function() {
	
};

Template.DoctypesExpenseClaimDetail.events({
	
});

Template.DoctypesExpenseClaimDetail.helpers({
	
});

Template.DoctypesExpenseClaimDetailForm.rendered = function() {
	

	pageSession.set("doctypesExpenseClaimDetailFormInfoMessage", "");
	pageSession.set("doctypesExpenseClaimDetailFormErrorMessage", "");

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

Template.DoctypesExpenseClaimDetailForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("doctypesExpenseClaimDetailFormInfoMessage", "");
		pageSession.set("doctypesExpenseClaimDetailFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var doctypesExpenseClaimDetailFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(doctypesExpenseClaimDetailFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("doctypesExpenseClaimDetailFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("doctypesExpenseClaimDetailFormErrorMessage", message);
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

Template.DoctypesExpenseClaimDetailForm.helpers({
	"infoMessage": function() {
		return pageSession.get("doctypesExpenseClaimDetailFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("doctypesExpenseClaimDetailFormErrorMessage");
	}
	
});
