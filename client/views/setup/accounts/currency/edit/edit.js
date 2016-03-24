var pageSession = new ReactiveDict();

Template.CurrencyEdit.rendered = function() {
	
};

Template.CurrencyEdit.events({
	
});

Template.CurrencyEdit.helpers({
	
});

Template.CurrencyEditEditForm.rendered = function() {
	

	pageSession.set("currencyEditEditFormInfoMessage", "");
	pageSession.set("currencyEditEditFormErrorMessage", "");

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

Template.CurrencyEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("currencyEditEditFormInfoMessage", "");
		pageSession.set("currencyEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var currencyEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(currencyEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("currencyEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("setup.accounts.currency", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("currencyEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Currency.update({ _id: t.data.currency_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("setup.accounts.currency", {});
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

Template.CurrencyEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("currencyEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("currencyEditEditFormErrorMessage");
	}
	
});
