var pageSession = new ReactiveDict();

Template.JournalEntryInsert.rendered = function() {
	
};

Template.JournalEntryInsert.events({
	
});

Template.JournalEntryInsert.helpers({
	
});

Template.JournalEntryInsertInsertForm.rendered = function() {
	

	pageSession.set("journalEntryInsertInsertFormInfoMessage", "");
	pageSession.set("journalEntryInsertInsertFormErrorMessage", "");

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

Template.JournalEntryInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("journalEntryInsertInsertFormInfoMessage", "");
		pageSession.set("journalEntryInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var journalEntryInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(journalEntryInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("journalEntryInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("accounts.documents.journal_entry", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("journalEntryInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = JournalEntry.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
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

Template.JournalEntryInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("journalEntryInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("journalEntryInsertInsertFormErrorMessage");
	}
	
});
