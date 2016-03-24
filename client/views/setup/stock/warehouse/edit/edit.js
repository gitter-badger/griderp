var pageSession = new ReactiveDict();

Template.WarehouseEdit.rendered = function() {
	
};

Template.WarehouseEdit.events({
	
});

Template.WarehouseEdit.helpers({
	
});

Template.WarehouseEditEditForm.rendered = function() {
	

	pageSession.set("warehouseEditEditFormInfoMessage", "");
	pageSession.set("warehouseEditEditFormErrorMessage", "");

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

Template.WarehouseEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("warehouseEditEditFormInfoMessage", "");
		pageSession.set("warehouseEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var warehouseEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(warehouseEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("warehouseEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("setup.stock.warehouse", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("warehouseEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Warehouse.update({ _id: t.data.warehouse_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
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

Template.WarehouseEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("warehouseEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("warehouseEditEditFormErrorMessage");
	}
	
});
