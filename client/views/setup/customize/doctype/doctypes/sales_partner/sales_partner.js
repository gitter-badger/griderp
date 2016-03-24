var pageSession = new ReactiveDict();

Template.DoctypesSalesPartner.rendered = function() {
	
};

Template.DoctypesSalesPartner.events({
	
});

Template.DoctypesSalesPartner.helpers({
	
});

Template.DoctypesSalesPartnerForm.rendered = function() {
	

	pageSession.set("doctypesSalesPartnerFormInfoMessage", "");
	pageSession.set("doctypesSalesPartnerFormErrorMessage", "");

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

Template.DoctypesSalesPartnerForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("doctypesSalesPartnerFormInfoMessage", "");
		pageSession.set("doctypesSalesPartnerFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var doctypesSalesPartnerFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(doctypesSalesPartnerFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("doctypesSalesPartnerFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("doctypesSalesPartnerFormErrorMessage", message);
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

		Router.go("setup.customize.doctype", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("setup.customize.doctype", {});
	}

	
});

Template.DoctypesSalesPartnerForm.helpers({
	"infoMessage": function() {
		return pageSession.get("doctypesSalesPartnerFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("doctypesSalesPartnerFormErrorMessage");
	}
	
});
