var pageSession = new ReactiveDict();

Template.LandedCostVoucherEdit.rendered = function() {
	
};

Template.LandedCostVoucherEdit.events({
	
});

Template.LandedCostVoucherEdit.helpers({
	
});

Template.LandedCostVoucherEditEditForm.rendered = function() {
	

	pageSession.set("landedCostVoucherEditEditFormInfoMessage", "");
	pageSession.set("landedCostVoucherEditEditFormErrorMessage", "");

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

Template.LandedCostVoucherEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("landedCostVoucherEditEditFormInfoMessage", "");
		pageSession.set("landedCostVoucherEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var landedCostVoucherEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(landedCostVoucherEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("landedCostVoucherEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("stock.tools.landed_cost_voucher", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("landedCostVoucherEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				LandedCostVoucher.update({ _id: t.data.landed_cost_voucher_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
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

Template.LandedCostVoucherEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("landedCostVoucherEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("landedCostVoucherEditEditFormErrorMessage");
	}
	
});
