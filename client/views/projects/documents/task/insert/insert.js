var pageSession = new ReactiveDict();

Template.TaskInsert.rendered = function() {
	
};

Template.TaskInsert.events({
	
});

Template.TaskInsert.helpers({
	
});

Template.TaskInsertInsertForm.rendered = function() {
	

	pageSession.set("taskInsertInsertFormInfoMessage", "");
	pageSession.set("taskInsertInsertFormErrorMessage", "");

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

Template.TaskInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("taskInsertInsertFormInfoMessage", "");
		pageSession.set("taskInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var taskInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(taskInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("taskInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("projects.documents.task", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("taskInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = Task.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("projects.documents.task", {});
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

Template.TaskInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("taskInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("taskInsertInsertFormErrorMessage");
	}
	
});
