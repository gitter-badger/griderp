var pageSession = new ReactiveDict();

Template.QuotationDetails.rendered = function() {
	
};

Template.QuotationDetails.events({
	
});

Template.QuotationDetails.helpers({
	
});

Template.QuotationDetailsDetailsForm.rendered = function() {
	

	pageSession.set("quotationDetailsDetailsFormInfoMessage", "");
	pageSession.set("quotationDetailsDetailsFormErrorMessage", "");

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

Template.QuotationDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("quotationDetailsDetailsFormInfoMessage", "");
		pageSession.set("quotationDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var quotationDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(quotationDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("quotationDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("quotationDetailsDetailsFormErrorMessage", message);
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

		Router.go("selling.documents.quotation", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("selling.documents.quotation", {});
	}

	
});

Template.QuotationDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("quotationDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("quotationDetailsDetailsFormErrorMessage");
	}
	
});
