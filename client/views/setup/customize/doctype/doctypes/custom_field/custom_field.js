var pageSession = new ReactiveDict();

Template.DoctypesCustomField.rendered = function() {
	
};

Template.DoctypesCustomField.events({
	
});

Template.DoctypesCustomField.helpers({
	
});

Template.DoctypesCustomFieldForm.rendered = function() {
	

	pageSession.set("doctypesCustomFieldFormInfoMessage", "");
	pageSession.set("doctypesCustomFieldFormErrorMessage", "");

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

Template.DoctypesCustomFieldForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("doctypesCustomFieldFormInfoMessage", "");
		pageSession.set("doctypesCustomFieldFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var doctypesCustomFieldFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(doctypesCustomFieldFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("doctypesCustomFieldFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("doctypesCustomFieldFormErrorMessage", message);
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

Template.DoctypesCustomFieldForm.helpers({
	"infoMessage": function() {
		return pageSession.get("doctypesCustomFieldFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("doctypesCustomFieldFormErrorMessage");
	}
	
});
