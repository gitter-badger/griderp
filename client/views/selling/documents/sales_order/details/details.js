var pageSession = new ReactiveDict();

Template.SalesOrderDetails.rendered = function() {
	
};

Template.SalesOrderDetails.events({
	
});

Template.SalesOrderDetails.helpers({
	
});

Template.SalesOrderDetailsDetailsForm.rendered = function() {
	

	pageSession.set("salesOrderDetailsDetailsFormInfoMessage", "");
	pageSession.set("salesOrderDetailsDetailsFormErrorMessage", "");

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

Template.SalesOrderDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("salesOrderDetailsDetailsFormInfoMessage", "");
		pageSession.set("salesOrderDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var salesOrderDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(salesOrderDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("salesOrderDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("salesOrderDetailsDetailsFormErrorMessage", message);
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

		Router.go("selling.documents.sales_order", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("selling.documents.sales_order", {});
	}

	
});

Template.SalesOrderDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("salesOrderDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("salesOrderDetailsDetailsFormErrorMessage");
	}
	
});
