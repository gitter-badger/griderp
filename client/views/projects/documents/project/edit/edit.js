var pageSession = new ReactiveDict();

Template.ProjectEdit.rendered = function() {
	
};

Template.ProjectEdit.events({
	
});

Template.ProjectEdit.helpers({
	
});

Template.ProjectEditEditForm.rendered = function() {
	

	pageSession.set("projectEditEditFormInfoMessage", "");
	pageSession.set("projectEditEditFormErrorMessage", "");

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

Template.ProjectEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("projectEditEditFormInfoMessage", "");
		pageSession.set("projectEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var projectEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(projectEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("projectEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("projects.documents.project", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("projectEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Project.update({ _id: t.data.project_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("projects.documents.project", {});
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

Template.ProjectEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("projectEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("projectEditEditFormErrorMessage");
	}
	
});
