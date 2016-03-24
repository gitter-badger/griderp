var pageSession = new ReactiveDict();

Template.AsyncTaskEdit.rendered = function() {
	
};

Template.AsyncTaskEdit.events({
	
});

Template.AsyncTaskEdit.helpers({
	
});

Template.AsyncTaskEditEditForm.rendered = function() {
	

	pageSession.set("asyncTaskEditEditFormInfoMessage", "");
	pageSession.set("asyncTaskEditEditFormErrorMessage", "");

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

Template.AsyncTaskEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("asyncTaskEditEditFormInfoMessage", "");
		pageSession.set("asyncTaskEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var asyncTaskEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(asyncTaskEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("asyncTaskEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("core_settings.documents.async_task", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("asyncTaskEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				AsyncTask.update({ _id: t.data.async_task_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
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

Template.AsyncTaskEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("asyncTaskEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("asyncTaskEditEditFormErrorMessage");
	}
	
});
