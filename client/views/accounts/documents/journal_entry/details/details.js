var pageSession = new ReactiveDict();

Template.JournalEntryDetails.rendered = function() {
	
};

Template.JournalEntryDetails.events({
	
});

Template.JournalEntryDetails.helpers({
	
});

Template.JournalEntryDetailsDetailsForm.rendered = function() {
	

	pageSession.set("journalEntryDetailsDetailsFormInfoMessage", "");
	pageSession.set("journalEntryDetailsDetailsFormErrorMessage", "");

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

Template.JournalEntryDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("journalEntryDetailsDetailsFormInfoMessage", "");
		pageSession.set("journalEntryDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var journalEntryDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(journalEntryDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("journalEntryDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("journalEntryDetailsDetailsFormErrorMessage", message);
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

		Router.go("accounts.documents.journal_entry", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("accounts.documents.journal_entry", {});
	}

	
});

Template.JournalEntryDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("journalEntryDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("journalEntryDetailsDetailsFormErrorMessage");
	}
	
});
