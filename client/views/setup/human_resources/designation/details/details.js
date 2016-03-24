var pageSession = new ReactiveDict();

Template.DesignationDetails.rendered = function() {
	
};

Template.DesignationDetails.events({
	
});

Template.DesignationDetails.helpers({
	
});

Template.DesignationDetailsDetailsForm.rendered = function() {
	

	pageSession.set("designationDetailsDetailsFormInfoMessage", "");
	pageSession.set("designationDetailsDetailsFormErrorMessage", "");

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

Template.DesignationDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("designationDetailsDetailsFormInfoMessage", "");
		pageSession.set("designationDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var designationDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(designationDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("designationDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("designationDetailsDetailsFormErrorMessage", message);
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

		Router.go("setup.human_resources.designation", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("setup.human_resources.designation", {});
	}

	
});

Template.DesignationDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("designationDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("designationDetailsDetailsFormErrorMessage");
	}
	
});
