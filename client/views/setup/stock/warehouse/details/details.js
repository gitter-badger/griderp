var pageSession = new ReactiveDict();

Template.WarehouseDetails.rendered = function() {
	
};

Template.WarehouseDetails.events({
	
});

Template.WarehouseDetails.helpers({
	
});

Template.WarehouseDetailsDetailsForm.rendered = function() {
	

	pageSession.set("warehouseDetailsDetailsFormInfoMessage", "");
	pageSession.set("warehouseDetailsDetailsFormErrorMessage", "");

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

Template.WarehouseDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("warehouseDetailsDetailsFormInfoMessage", "");
		pageSession.set("warehouseDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var warehouseDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(warehouseDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("warehouseDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("warehouseDetailsDetailsFormErrorMessage", message);
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

		Router.go("setup.stock.warehouse", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("setup.stock.warehouse", {});
	}

	
});

Template.WarehouseDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("warehouseDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("warehouseDetailsDetailsFormErrorMessage");
	}
	
});
