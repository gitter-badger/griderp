var pageSession = new ReactiveDict();

Template.TimeLogEdit.rendered = function() {
	
};

Template.TimeLogEdit.events({
	
});

Template.TimeLogEdit.helpers({
	
});

Template.TimeLogEditEditForm.rendered = function() {
	

	pageSession.set("timeLogEditEditFormInfoMessage", "");
	pageSession.set("timeLogEditEditFormErrorMessage", "");

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

Template.TimeLogEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("timeLogEditEditFormInfoMessage", "");
		pageSession.set("timeLogEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var timeLogEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(timeLogEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("timeLogEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("projects.documents.time_log", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("timeLogEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				TimeLog.update({ _id: t.data.time_log_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
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

Template.TimeLogEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("timeLogEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("timeLogEditEditFormErrorMessage");
	}
	
});
