var pageSession = new ReactiveDict();

Template.SupplierInsert.rendered = function() {
	
};

Template.SupplierInsert.events({
	
});

Template.SupplierInsert.helpers({
	
});

Template.SupplierInsertInsertForm.rendered = function() {
	

	pageSession.set("supplierInsertInsertFormInfoMessage", "");
	pageSession.set("supplierInsertInsertFormErrorMessage", "");

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

Template.SupplierInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("supplierInsertInsertFormInfoMessage", "");
		pageSession.set("supplierInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var supplierInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(supplierInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("supplierInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("accounts.documents.supplier", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("supplierInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = Supplier.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("accounts.documents.supplier", {});
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

Template.SupplierInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("supplierInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("supplierInsertInsertFormErrorMessage");
	}
	
});
