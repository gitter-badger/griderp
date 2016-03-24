var pageSession = new ReactiveDict();

Template.TimeLogBatchEdit.rendered = function() {
	
};

Template.TimeLogBatchEdit.events({
	
});

Template.TimeLogBatchEdit.helpers({
	
});

Template.TimeLogBatchEditEditForm.rendered = function() {
	

	pageSession.set("timeLogBatchEditEditFormInfoMessage", "");
	pageSession.set("timeLogBatchEditEditFormErrorMessage", "");

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

Template.TimeLogBatchEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("timeLogBatchEditEditFormInfoMessage", "");
		pageSession.set("timeLogBatchEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var timeLogBatchEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(timeLogBatchEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("timeLogBatchEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("projects.documents.time_log_batch", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("timeLogBatchEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				TimeLogBatch.update({ _id: t.data.time_log_batch_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("projects.documents.time_log_batch", {});
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

Template.TimeLogBatchEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("timeLogBatchEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("timeLogBatchEditEditFormErrorMessage");
	}
	
});
