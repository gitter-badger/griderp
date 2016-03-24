var pageSession = new ReactiveDict();

Template.LetterHeadInsert.rendered = function() {
	
};

Template.LetterHeadInsert.events({
	
});

Template.LetterHeadInsert.helpers({
	
});

Template.LetterHeadInsertInsertForm.rendered = function() {
	

	pageSession.set("letterHeadInsertInsertFormInfoMessage", "");
	pageSession.set("letterHeadInsertInsertFormErrorMessage", "");

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

Template.LetterHeadInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("letterHeadInsertInsertFormInfoMessage", "");
		pageSession.set("letterHeadInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var letterHeadInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(letterHeadInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("letterHeadInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("setup.printing.letter_head", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("letterHeadInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = LetterHead.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("setup.printing.letter_head", {});
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

Template.LetterHeadInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("letterHeadInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("letterHeadInsertInsertFormErrorMessage");
	}
	
});
