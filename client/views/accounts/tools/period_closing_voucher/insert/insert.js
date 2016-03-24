var pageSession = new ReactiveDict();

Template.PeriodClosingVoucherInsert.rendered = function() {
	
};

Template.PeriodClosingVoucherInsert.events({
	
});

Template.PeriodClosingVoucherInsert.helpers({
	
});

Template.PeriodClosingVoucherInsertInsertForm.rendered = function() {
	

	pageSession.set("periodClosingVoucherInsertInsertFormInfoMessage", "");
	pageSession.set("periodClosingVoucherInsertInsertFormErrorMessage", "");

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

Template.PeriodClosingVoucherInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("periodClosingVoucherInsertInsertFormInfoMessage", "");
		pageSession.set("periodClosingVoucherInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var periodClosingVoucherInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(periodClosingVoucherInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("periodClosingVoucherInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("accounts.tools.period_closing_voucher", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("periodClosingVoucherInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = PeriodClosingVoucher.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("accounts.tools.period_closing_voucher", {});
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

Template.PeriodClosingVoucherInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("periodClosingVoucherInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("periodClosingVoucherInsertInsertFormErrorMessage");
	}
	
});
