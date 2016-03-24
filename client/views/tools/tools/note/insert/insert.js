var pageSession = new ReactiveDict();

Template.NoteInsert.rendered = function() {
	
};

Template.NoteInsert.events({
	
});

Template.NoteInsert.helpers({
	
});

Template.NoteInsertInsertForm.rendered = function() {
	

	pageSession.set("noteInsertInsertFormInfoMessage", "");
	pageSession.set("noteInsertInsertFormErrorMessage", "");

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

Template.NoteInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("noteInsertInsertFormInfoMessage", "");
		pageSession.set("noteInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var noteInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(noteInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("noteInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("tools.tools.note", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("noteInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = Note.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("tools.tools.note", {});
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

Template.NoteInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("noteInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("noteInsertInsertFormErrorMessage");
	}
	
});
