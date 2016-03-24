var pageSession = new ReactiveDict();

Template.ReportsDeliveryNoteTrends.rendered = function() {
	
};

Template.ReportsDeliveryNoteTrends.events({
	
});

Template.ReportsDeliveryNoteTrends.helpers({
	
});

Template.ReportsDeliveryNoteTrendsForm.rendered = function() {
	

	pageSession.set("reportsDeliveryNoteTrendsFormInfoMessage", "");
	pageSession.set("reportsDeliveryNoteTrendsFormErrorMessage", "");

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

Template.ReportsDeliveryNoteTrendsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("reportsDeliveryNoteTrendsFormInfoMessage", "");
		pageSession.set("reportsDeliveryNoteTrendsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var reportsDeliveryNoteTrendsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(reportsDeliveryNoteTrendsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("reportsDeliveryNoteTrendsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("reportsDeliveryNoteTrendsFormErrorMessage", message);
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

Template.ReportsDeliveryNoteTrendsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("reportsDeliveryNoteTrendsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("reportsDeliveryNoteTrendsFormErrorMessage");
	}
	
});
