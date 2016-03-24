var pageSession = new ReactiveDict();

Template.BatchDetails.rendered = function() {
	
};

Template.BatchDetails.events({
	
});

Template.BatchDetails.helpers({
	
});

Template.BatchDetailsDetailsForm.rendered = function() {
	

	pageSession.set("batchDetailsDetailsFormInfoMessage", "");
	pageSession.set("batchDetailsDetailsFormErrorMessage", "");

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

Template.BatchDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("batchDetailsDetailsFormInfoMessage", "");
		pageSession.set("batchDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var batchDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(batchDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("batchDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("batchDetailsDetailsFormErrorMessage", message);
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

		Router.go("stock.documents.batch", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("stock.documents.batch", {});
	}

	
});

Template.BatchDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("batchDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("batchDetailsDetailsFormErrorMessage");
	}
	
});
