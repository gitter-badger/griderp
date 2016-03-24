var pageSession = new ReactiveDict();

Template.NoteDetails.rendered = function() {
	
};

Template.NoteDetails.events({
	
});

Template.NoteDetails.helpers({
	
});

Template.NoteDetailsDetailsForm.rendered = function() {
	

	pageSession.set("noteDetailsDetailsFormInfoMessage", "");
	pageSession.set("noteDetailsDetailsFormErrorMessage", "");

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

Template.NoteDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("noteDetailsDetailsFormInfoMessage", "");
		pageSession.set("noteDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var noteDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(noteDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("noteDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("noteDetailsDetailsFormErrorMessage", message);
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

		Router.go("tools.tools.note", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("tools.tools.note", {});
	}

	
});

Template.NoteDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("noteDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("noteDetailsDetailsFormErrorMessage");
	}
	
});
