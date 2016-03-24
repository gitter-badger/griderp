var pageSession = new ReactiveDict();

Template.TaskEdit.rendered = function() {
	
};

Template.TaskEdit.events({
	
});

Template.TaskEdit.helpers({
	
});

Template.TaskEditEditForm.rendered = function() {
	

	pageSession.set("taskEditEditFormInfoMessage", "");
	pageSession.set("taskEditEditFormErrorMessage", "");

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

Template.TaskEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("taskEditEditFormInfoMessage", "");
		pageSession.set("taskEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var taskEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(taskEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("taskEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("projects.documents.task", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("taskEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Task.update({ _id: t.data.task_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
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

Template.TaskEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("taskEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("taskEditEditFormErrorMessage");
	}
	
});
