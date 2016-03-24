var pageSession = new ReactiveDict();

Template.TermsAndConditionsEdit.rendered = function() {
	
};

Template.TermsAndConditionsEdit.events({
	
});

Template.TermsAndConditionsEdit.helpers({
	
});

Template.TermsAndConditionsEditEditForm.rendered = function() {
	

	pageSession.set("termsAndConditionsEditEditFormInfoMessage", "");
	pageSession.set("termsAndConditionsEditEditFormErrorMessage", "");

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

Template.TermsAndConditionsEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("termsAndConditionsEditEditFormInfoMessage", "");
		pageSession.set("termsAndConditionsEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var termsAndConditionsEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(termsAndConditionsEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("termsAndConditionsEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("setup.printing.terms_and_conditions", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("termsAndConditionsEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				TermsAndConditions.update({ _id: t.data.terms_and_conditions_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("setup.printing.terms_and_conditions", {});
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

Template.TermsAndConditionsEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("termsAndConditionsEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("termsAndConditionsEditEditFormErrorMessage");
	}
	
});
