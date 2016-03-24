var pageSession = new ReactiveDict();

Template.ReportsItemWiseSalesHistory.rendered = function() {
	
};

Template.ReportsItemWiseSalesHistory.events({
	
});

Template.ReportsItemWiseSalesHistory.helpers({
	
});

Template.ReportsItemWiseSalesHistoryForm.rendered = function() {
	

	pageSession.set("reportsItemWiseSalesHistoryFormInfoMessage", "");
	pageSession.set("reportsItemWiseSalesHistoryFormErrorMessage", "");

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

Template.ReportsItemWiseSalesHistoryForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("reportsItemWiseSalesHistoryFormInfoMessage", "");
		pageSession.set("reportsItemWiseSalesHistoryFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var reportsItemWiseSalesHistoryFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(reportsItemWiseSalesHistoryFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("reportsItemWiseSalesHistoryFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("reportsItemWiseSalesHistoryFormErrorMessage", message);
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

		Router.go("setup.reports.reports", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("setup.reports.reports", {});
	}

	
});

Template.ReportsItemWiseSalesHistoryForm.helpers({
	"infoMessage": function() {
		return pageSession.get("reportsItemWiseSalesHistoryFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("reportsItemWiseSalesHistoryFormErrorMessage");
	}
	
});
