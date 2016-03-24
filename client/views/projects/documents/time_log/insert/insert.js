var pageSession = new ReactiveDict();

Template.TimeLogInsert.rendered = function() {
	
};

Template.TimeLogInsert.events({
	
});

Template.TimeLogInsert.helpers({
	
});

Template.TimeLogInsertInsertForm.rendered = function() {
	

	pageSession.set("timeLogInsertInsertFormInfoMessage", "");
	pageSession.set("timeLogInsertInsertFormErrorMessage", "");

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

Template.TimeLogInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("timeLogInsertInsertFormInfoMessage", "");
		pageSession.set("timeLogInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var timeLogInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(timeLogInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("timeLogInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("projects.documents.time_log", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("timeLogInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = TimeLog.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("projects.documents.time_log", {});
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

Template.TimeLogInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("timeLogInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("timeLogInsertInsertFormErrorMessage");
	}
	
});
