var pageSession = new ReactiveDict();

Template.ModeOfPaymentInsert.rendered = function() {
	
};

Template.ModeOfPaymentInsert.events({
	
});

Template.ModeOfPaymentInsert.helpers({
	
});

Template.ModeOfPaymentInsertInsertForm.rendered = function() {
	

	pageSession.set("modeOfPaymentInsertInsertFormInfoMessage", "");
	pageSession.set("modeOfPaymentInsertInsertFormErrorMessage", "");

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

Template.ModeOfPaymentInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("modeOfPaymentInsertInsertFormInfoMessage", "");
		pageSession.set("modeOfPaymentInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var modeOfPaymentInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(modeOfPaymentInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("modeOfPaymentInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("setup.accounts.mode_of_payment", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("modeOfPaymentInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = ModeOfPayment.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
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

Template.ModeOfPaymentInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("modeOfPaymentInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("modeOfPaymentInsertInsertFormErrorMessage");
	}
	
});
