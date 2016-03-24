var pageSession = new ReactiveDict();

Template.PeriodClosingVoucherEdit.rendered = function() {
	
};

Template.PeriodClosingVoucherEdit.events({
	
});

Template.PeriodClosingVoucherEdit.helpers({
	
});

Template.PeriodClosingVoucherEditEditForm.rendered = function() {
	

	pageSession.set("periodClosingVouherEditEditFormInfoMessage", "");
	pageSession.set("periodClosingVoucherEditEditFormErrorMessage", "");

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

Template.PeriodClosingVoucherEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("periodClosingVoucherEditEditFormInfoMessage", "");
		pageSession.set("periodClosingVoucherEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var periodClosingVoucherEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(periodClosingVoucherEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("periodClosingVoucherEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("accounts.tools.period_closing_voucher", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("periodClosingVoucherEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				PeriodClosingVoucher.update({ _id: t.data.period_closing_voucher_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
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

Template.PeriodClosingVoucherEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("periodClosingVoucherEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("periodClosingVoucherEditEditFormErrorMessage");
	}
	
});
