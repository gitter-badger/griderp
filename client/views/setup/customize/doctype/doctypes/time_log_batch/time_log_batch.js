var pageSession = new ReactiveDict();

Template.DoctypesTimeLogBatch.rendered = function() {
	
};

Template.DoctypesTimeLogBatch.events({
	
});

Template.DoctypesTimeLogBatch.helpers({
	
});

Template.DoctypesTimeLogBatchForm.rendered = function() {
	

	pageSession.set("doctypesTimeLogBatchFormInfoMessage", "");
	pageSession.set("doctypesTimeLogBatchFormErrorMessage", "");

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

Template.DoctypesTimeLogBatchForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("doctypesTimeLogBatchFormInfoMessage", "");
		pageSession.set("doctypesTimeLogBatchFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var doctypesTimeLogBatchFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(doctypesTimeLogBatchFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("doctypesTimeLogBatchFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("doctypesTimeLogBatchFormErrorMessage", message);
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

Template.DoctypesTimeLogBatchForm.helpers({
	"infoMessage": function() {
		return pageSession.get("doctypesTimeLogBatchFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("doctypesTimeLogBatchFormErrorMessage");
	}
	
});
