var pageSession = new ReactiveDict();

Template.CurrencyDetails.rendered = function() {
	
};

Template.CurrencyDetails.events({
	
});

Template.CurrencyDetails.helpers({
	
});

Template.CurrencyDetailsDetailsForm.rendered = function() {
	

	pageSession.set("currencyDetailsDetailsFormInfoMessage", "");
	pageSession.set("currencyDetailsDetailsFormErrorMessage", "");

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

Template.CurrencyDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("currencyDetailsDetailsFormInfoMessage", "");
		pageSession.set("currencyDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var currencyDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(currencyDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("currencyDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("currencyDetailsDetailsFormErrorMessage", message);
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

		Router.go("setup.accounts.currency", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("setup.accounts.currency", {});
	}

	
});

Template.CurrencyDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("currencyDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("currencyDetailsDetailsFormErrorMessage");
	}
	
});
