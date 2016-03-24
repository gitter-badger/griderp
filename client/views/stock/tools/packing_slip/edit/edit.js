var pageSession = new ReactiveDict();

Template.PackingSlipEdit.rendered = function() {
	
};

Template.PackingSlipEdit.events({
	
});

Template.PackingSlipEdit.helpers({
	
});

Template.PackingSlipEditEditForm.rendered = function() {
	

	pageSession.set("packingSlipEditEditFormInfoMessage", "");
	pageSession.set("packingSlipEditEditFormErrorMessage", "");

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

Template.PackingSlipEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("packingSlipEditEditFormInfoMessage", "");
		pageSession.set("packingSlipEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var packingSlipEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(packingSlipEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("packingSlipEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("stock.tools.packing_slip", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("packingSlipEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				PackingSlip.update({ _id: t.data.packing_slip_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("stock.tools.packing_slip", {});
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

Template.PackingSlipEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("packingSlipEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("packingSlipEditEditFormErrorMessage");
	}
	
});
