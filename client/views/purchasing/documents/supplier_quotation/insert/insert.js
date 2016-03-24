var pageSession = new ReactiveDict();

Template.SupplierQuotationInsert.rendered = function() {
	
};

Template.SupplierQuotationInsert.events({
	
});

Template.SupplierQuotationInsert.helpers({
	
});

Template.SupplierQuotationInsertInsertForm.rendered = function() {
	

	pageSession.set("supplierQuotationInsertInsertFormInfoMessage", "");
	pageSession.set("supplierQuotationInsertInsertFormErrorMessage", "");

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

Template.SupplierQuotationInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("supplierQuotationInsertInsertFormInfoMessage", "");
		pageSession.set("supplierQuotationInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var supplierQuotationInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(supplierQuotationInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("supplierQuotationInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("purchasing.documents.supplier_quotation", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("supplierQuotationInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = SupplierQuotation.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("purchasing.documents.supplier_quotation", {});
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

Template.SupplierQuotationInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("supplierQuotationInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("supplierQuotationInsertInsertFormErrorMessage");
	}
	
});
