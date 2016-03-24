var pageSession = new ReactiveDict();

Template.OfferLetterEdit.rendered = function() {
	
};

Template.OfferLetterEdit.events({
	
});

Template.OfferLetterEdit.helpers({
	
});

Template.OfferLetterEditEditForm.rendered = function() {
	

	pageSession.set("offerLetterEditEditFormInfoMessage", "");
	pageSession.set("offerLetterEditEditFormErrorMessage", "");

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

Template.OfferLetterEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("offerLetterEditEditFormInfoMessage", "");
		pageSession.set("offerLetterEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var offerLetterEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(offerLetterEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("offerLetterEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("human_resources.documents.offer_letter", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("offerLetterEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				OfferLetter.update({ _id: t.data.offer_letter_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
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

Template.OfferLetterEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("offerLetterEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("offerLetterEditEditFormErrorMessage");
	}
	
});
