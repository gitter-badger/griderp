var pageSession = new ReactiveDict();

Template.LetterHeadEdit.rendered = function() {
	
};

Template.LetterHeadEdit.events({
	
});

Template.LetterHeadEdit.helpers({
	
});

Template.LetterHeadEditEditForm.rendered = function() {
	

	pageSession.set("letterHeadEditEditFormInfoMessage", "");
	pageSession.set("letterHeadEditEditFormErrorMessage", "");

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

Template.LetterHeadEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("letterHeadEditEditFormInfoMessage", "");
		pageSession.set("letterHeadEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var letterHeadEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(letterHeadEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("letterHeadEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("setup.printing.letter_head", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("letterHeadEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				LetterHead.update({ _id: t.data.letter_head_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
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

Template.LetterHeadEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("letterHeadEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("letterHeadEditEditFormErrorMessage");
	}
	
});
