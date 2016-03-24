var pageSession = new ReactiveDict();

Template.TodoEdit.rendered = function() {
	
};

Template.TodoEdit.events({
	
});

Template.TodoEdit.helpers({
	
});

Template.TodoEditEditForm.rendered = function() {
	

	pageSession.set("todoEditEditFormInfoMessage", "");
	pageSession.set("todoEditEditFormErrorMessage", "");

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

Template.TodoEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("todoEditEditFormInfoMessage", "");
		pageSession.set("todoEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var todoEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(todoEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("todoEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("tools.tools.todo", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("todoEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Todo.update({ _id: t.data.todo_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("tools.tools.todo", {});
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

Template.TodoEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("todoEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("todoEditEditFormErrorMessage");
	}
	
});
