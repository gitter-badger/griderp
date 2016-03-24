var pageSession = new ReactiveDict();

Template.LeadDetails.rendered = function() {
	
};

Template.LeadDetails.events({
	
});

Template.LeadDetails.helpers({
	
});

Template.LeadDetailsDetailsForm.rendered = function() {
	

	pageSession.set("leadDetailsDetailsFormInfoMessage", "");
	pageSession.set("leadDetailsDetailsFormErrorMessage", "");

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

Template.LeadDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("leadDetailsDetailsFormInfoMessage", "");
		pageSession.set("leadDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var leadDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(leadDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("leadDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("leadDetailsDetailsFormErrorMessage", message);
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

		Router.go("crm.documents.lead", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("crm.documents.lead", {});
	}

	
});

Template.LeadDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("leadDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("leadDetailsDetailsFormErrorMessage");
	}
	
});
