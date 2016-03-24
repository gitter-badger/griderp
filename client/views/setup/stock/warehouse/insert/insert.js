var pageSession = new ReactiveDict();

Template.WarehouseInsert.rendered = function() {
	
};

Template.WarehouseInsert.events({
	
});

Template.WarehouseInsert.helpers({
	
});

Template.WarehouseInsertInsertForm.rendered = function() {
	

	pageSession.set("warehouseInsertInsertFormInfoMessage", "");
	pageSession.set("warehouseInsertInsertFormErrorMessage", "");

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

Template.WarehouseInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("warehouseInsertInsertFormInfoMessage", "");
		pageSession.set("warehouseInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var warehouseInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(warehouseInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("warehouseInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("setup.stock.warehouse", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("warehouseInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = Warehouse.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("setup.stock.warehouse", {});
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

Template.WarehouseInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("warehouseInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("warehouseInsertInsertFormErrorMessage");
	}
	
});
