var pageSession = new ReactiveDict();

Template.SalesInvoiceInsert.rendered = function() {
	
};

Template.SalesInvoiceInsert.events({
	
});

Template.SalesInvoiceInsert.helpers({
	
});

Template.SalesInvoiceInsertInsertForm.rendered = function() {
	

	pageSession.set("salesInvoiceInsertInsertFormInfoMessage", "");
	pageSession.set("salesInvoiceInsertInsertFormErrorMessage", "");

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

	$('.summernote').summernote({
		height: 300,
		focus: false,
		codemirror: {
			htmlMode: true,
			lineNumbers: true,
			mode: 'text/html'
		}
	});

};

Template.SalesInvoiceInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("salesInvoiceInsertInsertFormInfoMessage", "");
		pageSession.set("salesInvoiceInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var salesInvoiceInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(salesInvoiceInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("salesInvoiceInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("accounts.documents.sales_invoice", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("salesInvoiceInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = SalesInvoice.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("accounts.documents.sales_invoice", {});
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

Template.SalesInvoiceInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("salesInvoiceInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("salesInvoiceInsertInsertFormErrorMessage");
	}
	
});
