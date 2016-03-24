var pageSession = new ReactiveDict();

Template.DoctypesWebFormField.rendered = function() {
	
};

Template.DoctypesWebFormField.events({
	
});

Template.DoctypesWebFormField.helpers({
	
});

Template.DoctypesWebFormFieldForm.rendered = function() {
	

	pageSession.set("doctypesWebFormFieldFormInfoMessage", "");
	pageSession.set("doctypesWebFormFieldFormErrorMessage", "");

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

Template.DoctypesWebFormFieldForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("doctypesWebFormFieldFormInfoMessage", "");
		pageSession.set("doctypesWebFormFieldFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var doctypesWebFormFieldFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(doctypesWebFormFieldFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("doctypesWebFormFieldFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("doctypesWebFormFieldFormErrorMessage", message);
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

Template.DoctypesWebFormFieldForm.helpers({
	"infoMessage": function() {
		return pageSession.get("doctypesWebFormFieldFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("doctypesWebFormFieldFormErrorMessage");
	}
	
});
