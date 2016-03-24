var pageSession = new ReactiveDict();

Template.PackingSlipDetails.rendered = function() {
	
};

Template.PackingSlipDetails.events({
	
});

Template.PackingSlipDetails.helpers({
	
});

Template.PackingSlipDetailsDetailsForm.rendered = function() {
	

	pageSession.set("packingSlipDetailsDetailsFormInfoMessage", "");
	pageSession.set("packingSlipDetailsDetailsFormErrorMessage", "");

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

Template.PackingSlipDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("packingSlipDetailsDetailsFormInfoMessage", "");
		pageSession.set("packingSlipDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var packingSlipDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(packingSlipDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("packingSlipDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("packingSlipDetailsDetailsFormErrorMessage", message);
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

		Router.go("stock.tools.packing_slip", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("stock.tools.packing_slip", {});
	}

	
});

Template.PackingSlipDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("packingSlipDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("packingSlipDetailsDetailsFormErrorMessage");
	}
	
});
