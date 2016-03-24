var pageSession = new ReactiveDict();

Template.TimeLogBatchInsert.rendered = function() {
	
};

Template.TimeLogBatchInsert.events({
	
});

Template.TimeLogBatchInsert.helpers({
	
});

Template.TimeLogBatchInsertInsertForm.rendered = function() {
	

	pageSession.set("timeLogBatchInsertInsertFormInfoMessage", "");
	pageSession.set("timeLogBatchInsertInsertFormErrorMessage", "");

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

Template.TimeLogBatchInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("timeLogBatchInsertInsertFormInfoMessage", "");
		pageSession.set("timeLogBatchInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var timeLogBatchInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(timeLogBatchInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("timeLogBatchInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("projects.documents.time_log_batch", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("timeLogBatchInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = TimeLogBatch.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
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

Template.TimeLogBatchInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("timeLogBatchInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("timeLogBatchInsertInsertFormErrorMessage");
	}
	
});
