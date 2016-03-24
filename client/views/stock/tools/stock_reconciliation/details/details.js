var pageSession = new ReactiveDict();

Template.StockReconciliationDetails.rendered = function() {
	
};

Template.StockReconciliationDetails.events({
	
});

Template.StockReconciliationDetails.helpers({
	
});

Template.StockReconciliationDetailsDetailsForm.rendered = function() {
	

	pageSession.set("stockReconciliationDetailsDetailsFormInfoMessage", "");
	pageSession.set("stockReconciliationDetailsDetailsFormErrorMessage", "");

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

Template.StockReconciliationDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("stockReconciliationDetailsDetailsFormInfoMessage", "");
		pageSession.set("stockReconciliationDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var stockReconciliationDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(stockReconciliationDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("stockReconciliationDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("stockReconciliationDetailsDetailsFormErrorMessage", message);
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

		Router.go("stock.tools.stock_reconciliation", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("stock.tools.stock_reconciliation", {});
	}

	
});

Template.StockReconciliationDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("stockReconciliationDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("stockReconciliationDetailsDetailsFormErrorMessage");
	}
	
});
