var pageSession = new ReactiveDict();

Template.CurrencyExchangeDetails.rendered = function() {
	
};

Template.CurrencyExchangeDetails.events({
	
});

Template.CurrencyExchangeDetails.helpers({
	
});

Template.CurrencyExchangeDetailsDetailsForm.rendered = function() {
	

	pageSession.set("currencyExchangeDetailsDetailsFormInfoMessage", "");
	pageSession.set("currencyEchangeDetailsDetailsFormErrorMessage", "");

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

Template.CurrencyExchangeDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("currencyExchangeDetailsDetailsFormInfoMessage", "");
		pageSession.set("currencyExchangeDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var currencyExchangeDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(currencyExchangeDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("currencyExchangeDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("currencyExchangeDetailsDetailsFormErrorMessage", message);
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

		Router.go("setup.accounts.currency_exchange", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("setup.accounts.currency_exchange", {});
	}

	
});

Template.CurrencyExchangeDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("currencyExchangeDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("currencyExchangeDetailsDetailsFormErrorMessage");
	}
	
});
