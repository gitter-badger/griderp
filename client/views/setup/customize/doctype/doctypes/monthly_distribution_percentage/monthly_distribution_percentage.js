var pageSession = new ReactiveDict();

Template.DoctypesMonthlyDistributionPercentage.rendered = function() {
	
};

Template.DoctypesMonthlyDistributionPercentage.events({
	
});

Template.DoctypesMonthlyDistributionPercentage.helpers({
	
});

Template.DoctypesMonthlyDistributionPercentageForm.rendered = function() {
	

	pageSession.set("doctypesMonthlyDistributionPercentageFormInfoMessage", "");
	pageSession.set("doctypesMonthlyDistributionPercentageFormErrorMessage", "");

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

Template.DoctypesMonthlyDistributionPercentageForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("doctypesMonthlyDistributionPercentageFormInfoMessage", "");
		pageSession.set("doctypesMonthlyDistributionPercentageFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var doctypesMonthlyDistributionPercentageFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(doctypesMonthlyDistributionPercentageFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("doctypesMonthlyDistributionPercentageFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("doctypesMonthlyDistributionPercentageFormErrorMessage", message);
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

Template.DoctypesMonthlyDistributionPercentageForm.helpers({
	"infoMessage": function() {
		return pageSession.get("doctypesMonthlyDistributionPercentageFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("doctypesMonthlyDistributionPercentageFormErrorMessage");
	}
	
});
