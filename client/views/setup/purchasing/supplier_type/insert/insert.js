var pageSession = new ReactiveDict();

Template.SupplierTypeInsert.rendered = function() {
	
};

Template.SupplierTypeInsert.events({
	
});

Template.SupplierTypeInsert.helpers({
	
});

Template.SupplierTypeInsertInsertForm.rendered = function() {
	

	pageSession.set("supplierTypeInsertInsertFormInfoMessage", "");
	pageSession.set("supplierTypeInsertInsertFormErrorMessage", "");

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

Template.SupplierTypeInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("supplierTypeInsertInsertFormInfoMessage", "");
		pageSession.set("supplierTypeInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var supplierTypeInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(supplierTypeInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("supplierTypeInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("setup.purchasing.supplier_type", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("supplierTypeInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = SupplierType.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("setup.purchasing.supplier_type", {});
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

Template.SupplierTypeInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("supplierTypeInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("supplierTypeInsertInsertFormErrorMessage");
	}
	
});
