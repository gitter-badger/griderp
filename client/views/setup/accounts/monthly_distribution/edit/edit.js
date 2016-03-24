var pageSession = new ReactiveDict();

Template.MonthlyDistributionEdit.rendered = function() {
	
};

Template.MonthlyDistributionEdit.events({
	
});

Template.MonthlyDistributionEdit.helpers({
	
});

Template.MonthlyDistributionEditEditForm.rendered = function() {
	

	pageSession.set("monthlyDistributionEditEditFormInfoMessage", "");
	pageSession.set("monthlyDistributionEditEditFormErrorMessage", "");

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

Template.MonthlyDistributionEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("monthlyDistributionEditEditFormInfoMessage", "");
		pageSession.set("monthlyDistributionEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var monthlyDistributionEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(monthlyDistributionEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("monthlyDistributionEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("setup.accounts.monthly_distribution", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("monthlyDistributionEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				MonthlyDistribution.update({ _id: t.data.monthly_distribution_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("setup.accounts.monthly_distribution", {});
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		/*CLOSE_REDIRECT*/
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		/*BACK_REDIRECT*/
	}

	
});

Template.MonthlyDistributionEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("monthlyDistributionEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("monthlyDistributionEditEditFormErrorMessage");
	}
	
});
