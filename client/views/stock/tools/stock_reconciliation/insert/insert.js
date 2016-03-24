var pageSession = new ReactiveDict();

Template.StockReconciliationInsert.rendered = function() {
	
};

Template.StockReconciliationInsert.events({
	
});

Template.StockReconciliationInsert.helpers({
	
});

Template.StockReconciliationInsertInsertForm.rendered = function() {
	

	pageSession.set("stockReconciliationInsertInsertFormInfoMessage", "");
	pageSession.set("stockReconciliationInsertInsertFormErrorMessage", "");

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

Template.StockReconciliationInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("stockReconciliationInsertInsertFormInfoMessage", "");
		pageSession.set("stockReconciliationInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var stockReconciliationInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(stockReconciliationInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("stockReconciliationInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("stock.tools.stock_reconciliation", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("stockReconciliationInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = StockReconciliation.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("stock.tools.stock_reconciliation", {});
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

Template.StockReconciliationInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("stockReconciliationInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("stockReconciliationInsertInsertFormErrorMessage");
	}
	
});
