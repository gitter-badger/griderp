var pageSession = new ReactiveDict();

Template.SalesPartnerDetails.rendered = function() {
	
};

Template.SalesPartnerDetails.events({
	
});

Template.SalesPartnerDetails.helpers({
	
});

Template.SalesPartnerDetailsDetailsForm.rendered = function() {
	

	pageSession.set("salesPartnerDetailsDetailsFormInfoMessage", "");
	pageSession.set("salesPartnerDetailsDetailsFormErrorMessage", "");

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

Template.SalesPartnerDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("salesPartnerDetailsDetailsFormInfoMessage", "");
		pageSession.set("salesPartnerDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var salesPartnerDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(salesPartnerDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("salesPartnerDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("salesPartnerDetailsDetailsFormErrorMessage", message);
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

		Router.go("setup.selling.sales_partner", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("setup.selling.sales_partner", {});
	}

	
});

Template.SalesPartnerDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("salesPartnerDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("salesPartnerDetailsDetailsFormErrorMessage");
	}
	
});
