var pageSession = new ReactiveDict();

Template.ReportsRequestedItemsToBeTransferred.rendered = function() {
	
};

Template.ReportsRequestedItemsToBeTransferred.events({
	
});

Template.ReportsRequestedItemsToBeTransferred.helpers({
	
});

Template.ReportsRequestedItemsToBeTransferredForm.rendered = function() {
	

	pageSession.set("reportsRequestedItemsToBeTransferredFormInfoMessage", "");
	pageSession.set("reportsRequestedItemsToBeTransferredFormErrorMessage", "");

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

Template.ReportsRequestedItemsToBeTransferredForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("reportsRequestedItemsToBeTransferredFormInfoMessage", "");
		pageSession.set("reportsRequestedItemsToBeTransferredFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var reportsRequestedItemsToBeTransferredFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(reportsRequestedItemsToBeTransferredFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("reportsRequestedItemsToBeTransferredFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("reportsRequestedItemsToBeTransferredFormErrorMessage", message);
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

Template.ReportsRequestedItemsToBeTransferredForm.helpers({
	"infoMessage": function() {
		return pageSession.get("reportsRequestedItemsToBeTransferredFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("reportsRequestedItemsToBeTransferredFormErrorMessage");
	}
	
});
