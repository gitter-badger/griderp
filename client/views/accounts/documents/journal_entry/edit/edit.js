var pageSession = new ReactiveDict();

Template.JournalEntryEdit.rendered = function() {
	
};

Template.JournalEntryEdit.events({
	
});

Template.JournalEntryEdit.helpers({
	
});

Template.JournalEntryEditEditForm.rendered = function() {
	

	pageSession.set("journalEntryEditEditFormInfoMessage", "");
	pageSession.set("journalEntryEditEditFormErrorMessage", "");

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

Template.JournalEntryEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("journalEntryEditEditFormInfoMessage", "");
		pageSession.set("journalEntryEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var journalEntryEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(journalEntryEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("journalEntryEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("accounts.documents.journal_entry", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("journalEntryEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				JournalEntry.update({ _id: t.data.journal_entry_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("accounts.documents.journal_entry", {});
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

Template.JournalEntryEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("journalEntryEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("journalEntryEditEditFormErrorMessage");
	}
	
});
