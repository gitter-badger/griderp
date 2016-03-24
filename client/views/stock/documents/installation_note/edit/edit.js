var pageSession = new ReactiveDict();

Template.InstallationNoteEdit.rendered = function() {
	
};

Template.InstallationNoteEdit.events({
	
});

Template.InstallationNoteEdit.helpers({
	
});

Template.InstallationNoteEditEditForm.rendered = function() {
	

	pageSession.set("installationNoteEditEditFormInfoMessage", "");
	pageSession.set("installationNoteEditEditFormErrorMessage", "");

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

Template.InstallationNoteEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("installationNoteEditEditFormInfoMessage", "");
		pageSession.set("installationNoteEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var installationNoteEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(installationNoteEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("installationNoteEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("stock.documents.installation_note", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("installationNoteEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				InstallationNote.update({ _id: t.data.installation_note_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("stock.documents.installation_note", {});
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

Template.InstallationNoteEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("installationNoteEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("installationNoteEditEditFormErrorMessage");
	}
	
});
