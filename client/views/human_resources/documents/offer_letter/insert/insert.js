var pageSession = new ReactiveDict();

Template.OfferLetterInsert.rendered = function() {
	
};

Template.OfferLetterInsert.events({
	
});

Template.OfferLetterInsert.helpers({
	
});

Template.OfferLetterInsertInsertForm.rendered = function() {
	

	pageSession.set("offerLetterInsertInsertFormInfoMessage", "");
	pageSession.set("offerLetterInsertInsertFormErrorMessage", "");

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

Template.OfferLetterInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("offerLetterInsertInsertFormInfoMessage", "");
		pageSession.set("offerLetterInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var offerLetterInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(offerLetterInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("offerLetterInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("human_resources.documents.offer_letter", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("offerLetterInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = OfferLetter.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("human_resources.documents.offer_letter", {});
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

Template.OfferLetterInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("offerLetterInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("offerLetterInsertInsertFormErrorMessage");
	}
	
});
