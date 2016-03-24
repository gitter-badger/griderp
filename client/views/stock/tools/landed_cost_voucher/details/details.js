var pageSession = new ReactiveDict();

Template.LandedCostVoucherDetails.rendered = function() {
	
};

Template.LandedCostVoucherDetails.events({
	
});

Template.LandedCostVoucherDetails.helpers({
	
});

Template.LandedCostVoucherDetailsDetailsForm.rendered = function() {
	

	pageSession.set("landedCostVoucherDetailsDetailsFormInfoMessage", "");
	pageSession.set("landedCostVoucherDetailsDetailsFormErrorMessage", "");

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

Template.LandedCostVoucherDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("landedCostVoucherDetailsDetailsFormInfoMessage", "");
		pageSession.set("landedCostVoucherDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var landedCostVoucherDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(landedCostVoucherDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("landedCostVoucherDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("landedCostVoucherDetailsDetailsFormErrorMessage", message);
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

		Router.go("stock.tools.landed_cost_voucher", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("stock.tools.landed_cost_voucher", {});
	}

	
});

Template.LandedCostVoucherDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("landedCostVoucherDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("landedCostVoucherDetailsDetailsFormErrorMessage");
	}
	
});
