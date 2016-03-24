var pageSession = new ReactiveDict();

Template.SalesOrderEdit.rendered = function() {
	
};

Template.SalesOrderEdit.events({
	
});

Template.SalesOrderEdit.helpers({
	
});

Template.SalesOrderEditEditForm.rendered = function() {
	

	pageSession.set("salesOrderEditEditFormInfoMessage", "");
	pageSession.set("salesOrderEditEditFormErrorMessage", "");

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

Template.SalesOrderEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("salesOrderEditEditFormInfoMessage", "");
		pageSession.set("salesOrderEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var salesOrderEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(salesOrderEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("salesOrderEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("selling.documents.sales_order", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("salesOrderEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				SalesOrder.update({ _id: t.data.sales_order_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("selling.documents.sales_order", {});
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

Template.SalesOrderEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("salesOrderEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("salesOrderEditEditFormErrorMessage");
	}
	
});
