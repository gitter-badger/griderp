var pageSession = new ReactiveDict();

Template.DoctypesLetterHead.rendered = function() {
	
};

Template.DoctypesLetterHead.events({
	
});

Template.DoctypesLetterHead.helpers({
	
});

Template.DoctypesLetterHeadForm.rendered = function() {
	

	pageSession.set("doctypesLetterHeadFormInfoMessage", "");
	pageSession.set("doctypesLetterHeadFormErrorMessage", "");

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

Template.DoctypesLetterHeadForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("doctypesLetterHeadFormInfoMessage", "");
		pageSession.set("doctypesLetterHeadFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var doctypesLetterHeadFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(doctypesLetterHeadFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("doctypesLetterHeadFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("doctypesLetterHeadFormErrorMessage", message);
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

		Router.go("setup.customize.doctype", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("setup.customize.doctype", {});
	}

	
});

Template.DoctypesLetterHeadForm.helpers({
	"infoMessage": function() {
		return pageSession.get("doctypesLetterHeadFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("doctypesLetterHeadFormErrorMessage");
	}
	
});
