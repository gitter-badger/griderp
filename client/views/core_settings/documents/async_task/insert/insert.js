var pageSession = new ReactiveDict();

Template.AsyncTaskInsert.rendered = function() {
	
};

Template.AsyncTaskInsert.events({
	
});

Template.AsyncTaskInsert.helpers({
	
});

Template.AsyncTaskInsertInsertForm.rendered = function() {
	

	pageSession.set("asyncTaskInsertInsertFormInfoMessage", "");
	pageSession.set("asyncTaskInsertInsertFormErrorMessage", "");

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

Template.AsyncTaskInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("asyncTaskInsertInsertFormInfoMessage", "");
		pageSession.set("asyncTaskInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var asyncTaskInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(asyncTaskInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("asyncTaskInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("core_settings.documents.async_task", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("asyncTaskInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = AsyncTask.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("core_settings.documents.async_task", {});
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

Template.AsyncTaskInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("asyncTaskInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("asyncTaskInsertInsertFormErrorMessage");
	}
	
});
