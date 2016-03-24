var pageSession = new ReactiveDict();

Template.WarrantyClaimDetails.rendered = function() {
	
};

Template.WarrantyClaimDetails.events({
	
});

Template.WarrantyClaimDetails.helpers({
	
});

Template.WarrantyClaimDetailsDetailsForm.rendered = function() {
	

	pageSession.set("warrantyClaimDetailsDetailsFormInfoMessage", "");
	pageSession.set("warrantyClaimDetailsDetailsFormErrorMessage", "");

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

Template.WarrantyClaimDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("warrantyClaimDetailsDetailsFormInfoMessage", "");
		pageSession.set("warrantyClaimDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var warrantyClaimDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(warrantyClaimDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("warrantyClaimDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("warrantyClaimDetailsDetailsFormErrorMessage", message);
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

		Router.go("support.documents.warranty_claim", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("support.documents.warranty_claim", {});
	}

	
});

Template.WarrantyClaimDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("warrantyClaimDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("warrantyClaimDetailsDetailsFormErrorMessage");
	}
	
});
