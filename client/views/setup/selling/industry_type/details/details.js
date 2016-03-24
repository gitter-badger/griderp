var pageSession = new ReactiveDict();

Template.IndustryTypeDetails.rendered = function() {
	
};

Template.IndustryTypeDetails.events({
	
});

Template.IndustryTypeDetails.helpers({
	
});

Template.IndustryTypeDetailsDetailsForm.rendered = function() {
	

	pageSession.set("industryTypeDetailsDetailsFormInfoMessage", "");
	pageSession.set("industryTypeDetailsDetailsFormErrorMessage", "");

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

Template.IndustryTypeDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("industryTypeDetailsDetailsFormInfoMessage", "");
		pageSession.set("industryTypeDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var industryTypeDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(industryTypeDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("industryTypeDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("industryTypeDetailsDetailsFormErrorMessage", message);
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

		Router.go("setup.selling.industry_type", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("setup.selling.industry_type", {});
	}

	
});

Template.IndustryTypeDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("industryTypeDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("industryTypeDetailsDetailsFormErrorMessage");
	}
	
});
