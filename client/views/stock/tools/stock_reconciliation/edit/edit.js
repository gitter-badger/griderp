var pageSession = new ReactiveDict();

Template.StockReconciliationEdit.rendered = function() {
	
};

Template.StockReconciliationEdit.events({
	
});

Template.StockReconciliationEdit.helpers({
	
});

Template.StockReconciliationEditEditForm.rendered = function() {
	

	pageSession.set("stockReconciliationEditEditFormInfoMessage", "");
	pageSession.set("stockReconciliationEditEditFormErrorMessage", "");

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

Template.StockReconciliationEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("stockReconciliationEditEditFormInfoMessage", "");
		pageSession.set("stockReconciliationEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var stockReconciliationEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(stockReconciliationEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("stockReconciliationEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("stock.tools.stock_reconciliation", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("stockReconciliationEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				StockReconciliation.update({ _id: t.data.stock_reconciliation_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
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

Template.StockReconciliationEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("stockReconciliationEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("stockReconciliationEditEditFormErrorMessage");
	}
	
});
