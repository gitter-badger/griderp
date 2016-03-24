var pageSession = new ReactiveDict();

Template.JobOpeningInsert.rendered = function() {
	
};

Template.JobOpeningInsert.events({
	
});

Template.JobOpeningInsert.helpers({
	
});

Template.JobOpeningInsertInsertForm.rendered = function() {
	

	pageSession.set("jobOpeningInsertInsertFormInfoMessage", "");
	pageSession.set("jobOpeningInsertInsertFormErrorMessage", "");

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

	$('.summernote').summernote({
		height: 300,
		focus: false,
		codemirror: {
			htmlMode: true,
			lineNumbers: true,
			mode: 'text/html'
		}
	});

};

Template.JobOpeningInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("jobOpeningInsertInsertFormInfoMessage", "");
		pageSession.set("jobOpeningInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var jobOpeningInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(jobOpeningInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("jobOpeningInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("human_resources.documents.job_opening", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("jobOpeningInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = JobOpening.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("human_resources.documents.job_opening", {});
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

Template.JobOpeningInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("jobOpeningInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("jobOpeningInsertInsertFormErrorMessage");
	}
	
});
