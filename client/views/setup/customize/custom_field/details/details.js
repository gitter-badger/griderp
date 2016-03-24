var pageSession = new ReactiveDict();

Template.CustomFieldDetails.rendered = function() {
	
};

Template.CustomFieldDetails.events({
	
});

Template.CustomFieldDetails.helpers({
	
});

Template.CustomFieldDetailsDetailsForm.rendered = function() {
	

	pageSession.set("customFieldDetailsDetailsFormInfoMessage", "");
	pageSession.set("customFieldDetailsDetailsFormErrorMessage", "");

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

Template.CustomFieldDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("customFieldDetailsDetailsFormInfoMessage", "");
		pageSession.set("customFieldDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var customFieldDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(customFieldDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("customFieldlDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("customFieldDetailsDetailsFormErrorMessage", message);
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

		Router.go("setup.customize.custom_field", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("setup.customize.custom_field", {});
	}

	
});

Template.CustomFieldDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("customFieldDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("customFieldDetailsDetailsFormErrorMessage");
	}
	
});
