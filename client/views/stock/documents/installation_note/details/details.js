var pageSession = new ReactiveDict();

Template.InstallationNoteDetails.rendered = function() {
	
};

Template.InstallationNoteDetails.events({
	
});

Template.InstallationNoteDetails.helpers({
	
});

Template.InstallationNoteDetailsDetailsForm.rendered = function() {
	

	pageSession.set("installationNoteDetailsDetailsFormInfoMessage", "");
	pageSession.set("installationNoteDetailsDetailsFormErrorMessage", "");

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

Template.InstallationNoteDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("installationNoteDetailsDetailsFormInfoMessage", "");
		pageSession.set("installationNoteDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var installationNoteDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(installationNoteDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("installationNoteDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("installationNoteDetailsDetailsFormErrorMessage", message);
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

		Router.go("stock.documents.installation_note", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("stock.documents.installation_note", {});
	}

	
});

Template.InstallationNoteDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("installationNoteDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("installationNoteDetailsDetailsFormErrorMessage");
	}
	
});
