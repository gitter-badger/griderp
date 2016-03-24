var pageSession = new ReactiveDict();

Template.MonthlyDistributionInsert.rendered = function() {
	
};

Template.MonthlyDistributionInsert.events({
	
});

Template.MonthlyDistributionInsert.helpers({
	
});

Template.MonthlyDistributionInsertInsertForm.rendered = function() {
	

	pageSession.set("monthlyDistributionInsertInsertFormInfoMessage", "");
	pageSession.set("monthlyDistributionInsertInsertFormErrorMessage", "");

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

Template.MonthlyDistributionInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("monthlyDistributionInsertInsertFormInfoMessage", "");
		pageSession.set("monthlyDistributionInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var monthlyDistributionInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(monthlyDitributionInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("monthlyDistributionInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("setup.accounts.monthly_distribution", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("monthlyDistributionInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = MonthlyDistribution.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
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

Template.MonthlyDistributionInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("monthlyDistributionInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("monthlyDistributionInsertInsertFormErrorMessage");
	}
	
});
