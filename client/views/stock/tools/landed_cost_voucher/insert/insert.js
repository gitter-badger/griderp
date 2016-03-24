var pageSession = new ReactiveDict();

Template.LandedCostVoucherInsert.rendered = function() {
	
};

Template.LandedCostVoucherInsert.events({
	
});

Template.LandedCostVoucherInsert.helpers({
	
});

Template.LandedCostVoucherInsertInsertForm.rendered = function() {
	

	pageSession.set("landedCostVoucherInsertInsertFormInfoMessage", "");
	pageSession.set("landedCostVoucherInsertInsertFormErrorMessage", "");

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

Template.LandedCostVoucherInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("landedCostVoucherInsertInsertFormInfoMessage", "");
		pageSession.set("landedCostVoucherInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var landedCostVoucherInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(landedCostVoucherInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("landedCostVoucherInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("stock.tools.landed_cost_voucher", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("landedCostVoucherInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = LandedCostVoucher.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("stock.tools.landed_cost_voucher", {});
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

Template.LandedCostVoucherInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("landedCostVoucherInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("landedCostVoucherInsertInsertFormErrorMessage");
	}
	
});
