var pageSession = new ReactiveDict();

Template.ModeOfPaymentEdit.rendered = function() {
	
};

Template.ModeOfPaymentEdit.events({
	
});

Template.ModeOfPaymentEdit.helpers({
	
});

Template.ModeOfPaymentEditEditForm.rendered = function() {
	

	pageSession.set("modeOfPaymentEditEditFormInfoMessage", "");
	pageSession.set("modeOfPaymentEditEditFormErrorMessage", "");

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

Template.ModeOfPaymentEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("modeOfPaymentEditEditFormInfoMessage", "");
		pageSession.set("modeOfPaymentEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var modeOfPaymentEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(modeOfPaymentEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("modeOfPaymentEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("setup.accounts.mode_of_payment", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("modeOfPaymentEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				ModeOfPayment.update({ _id: t.data.mode_of_payment_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("setup.accounts.mode_of_payment", {});
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

Template.ModeOfPaymentEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("modeOfPaymentEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("modeOfPaymentEditEditFormErrorMessage");
	}
	
});
