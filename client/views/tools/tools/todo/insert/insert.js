var pageSession = new ReactiveDict();

Template.TodoInsert.rendered = function() {
	
};

Template.TodoInsert.events({
	
});

Template.TodoInsert.helpers({
	
});

Template.TodoInsertInsertForm.rendered = function() {
	

	pageSession.set("todoInsertInsertFormInfoMessage", "");
	pageSession.set("todoInsertInsertFormErrorMessage", "");

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

Template.TodoInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("todoInsertInsertFormInfoMessage", "");
		pageSession.set("todoInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var todoInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(todoInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("todoInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("tools.tools.todo", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("todoInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = Todo.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
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

Template.TodoInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("todoInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("todoInsertInsertFormErrorMessage");
	}
	
});
