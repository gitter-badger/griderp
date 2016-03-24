var pageSession = new ReactiveDict();

Template.CurrencyExchangeInsert.rendered = function() {
	
};

Template.CurrencyExchangeInsert.events({
	
});

Template.CurrencyExchangeInsert.helpers({
	
});

Template.CurrencyExchangeInsertInsertForm.rendered = function() {
	

	pageSession.set("currencyExchangeInsertInsertFormInfoMessage", "");
	pageSession.set("currencyExchangeInsertInsertFormErrorMessage", "");

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

Template.CurrencyExchangeInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("currencyExchangeInsertInsertFormInfoMessage", "");
		pageSession.set("currencyExchangeInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var currencyExchangeInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(currencyExchangeInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("currencyExchangeInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("setup.accounts.currency_exchange", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("currencyExchangeInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = CurrencyExchange.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
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

Template.CurrencyExchangeInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("currencyExchangeInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("currencyExchangeInsertInsertFormErrorMessage");
	}
	
});
