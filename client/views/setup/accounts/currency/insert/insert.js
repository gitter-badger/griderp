var pageSession = new ReactiveDict();

Template.CurrencyInsert.rendered = function() {
	
};

Template.CurrencyInsert.events({
	
});

Template.CurrencyInsert.helpers({
	
});

Template.CurrencyInsertInsertForm.rendered = function() {
	

	pageSession.set("currencyInsertInsertFormInfoMessage", "");
	pageSession.set("currencyInsertInsertFormErrorMessage", "");

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

Template.CurrencyInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("currencyInsertInsertFormInfoMessage", "");
		pageSession.set("currencyInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var currencyInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(currencyInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("currencyInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("setup.accounts.currency", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("currencyInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = Currency.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
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

Template.CurrencyInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("currencyInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("currencyInsertInsertFormErrorMessage");
	}
	
});
