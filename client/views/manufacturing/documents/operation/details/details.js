var pageSession = new ReactiveDict();

Template.OperationDetails.rendered = function() {
	
};

Template.OperationDetails.events({
	
});

Template.OperationDetails.helpers({
	
});

Template.OperationDetailsDetailsForm.rendered = function() {
	

	pageSession.set("operationDetailsDetailsFormInfoMessage", "");
	pageSession.set("operationDetailsDetailsFormErrorMessage", "");

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

Template.OperationDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("operationDetailsDetailsFormInfoMessage", "");
		pageSession.set("operationDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var operationDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(operationDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("operationDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("operationDetailsDetailsFormErrorMessage", message);
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

		Router.go("manufacturing.documents.operation", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("manufacturing.documents.operation", {});
	}

	
});

Template.OperationDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("operationDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("operationDetailsDetailsFormErrorMessage");
	}
	
});
