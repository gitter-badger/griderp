var pageSession = new ReactiveDict();

Template.CurrencyExchangeEdit.rendered = function() {
	
};

Template.CurrencyExchangeEdit.events({
	
});

Template.CurrencyExchangeEdit.helpers({
	
});

Template.CurrencyExchangeEditEditForm.rendered = function() {
	

	pageSession.set("currencyExchangeEditEditFormInfoMessage", "");
	pageSession.set("currencyExchangeEditEditFormErrorMessage", "");

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

Template.CurrencyExchangeEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("currencyExchangeEditEditFormInfoMessage", "");
		pageSession.set("currencyExchangeEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var currencyExchangeEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(currencyExchangeEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("currencyExchangeEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("setup.accounts.currency_exchange", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("currencyExchangeEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				CurrencyExchange.update({ _id: t.data.currency_exchange_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("setup.accounts.currency_exchange", {});
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

Template.CurrencyExchangeEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("currencyExchangeEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("currencyExchangeEditEditFormErrorMessage");
	}
	
});
