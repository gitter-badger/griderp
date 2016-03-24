var pageSession = new ReactiveDict();

Template.TodoDetails.rendered = function() {
	
};

Template.TodoDetails.events({
	
});

Template.TodoDetails.helpers({
	
});

Template.TodoDetailsDetailsForm.rendered = function() {
	

	pageSession.set("todoDetailsDetailsFormInfoMessage", "");
	pageSession.set("todoDetailsDetailsFormErrorMessage", "");

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

Template.TodoDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("todoDetailsDetailsFormInfoMessage", "");
		pageSession.set("todoDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var todoDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(todoDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("todoDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("todoDetailsDetailsFormErrorMessage", message);
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

		Router.go("tools.tools.todo", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("tools.tools.todo", {});
	}

	
});

Template.TodoDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("todoDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("todoDetailsDetailsFormErrorMessage");
	}
	
});
