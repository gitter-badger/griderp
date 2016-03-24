var pageSession = new ReactiveDict();

Template.CustomFieldEdit.rendered = function() {
	
};

Template.CustomFieldEdit.events({
	
});

Template.CustomFieldEdit.helpers({
	
});

Template.CustomFieldEditEditForm.rendered = function() {
	

	pageSession.set("customFieldEditEditFormInfoMessage", "");
	pageSession.set("customFieldEditEditFormErrorMessage", "");

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

Template.CustomFieldEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("customFieldEditEditFormInfoMessage", "");
		pageSession.set("customFieldEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var customFieldEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(customFieldEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("customFieldEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("setup.customize.custom_field", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("customFieldEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				CustomField.update({ _id: t.data.custom_field_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("setup.customize.custom_field", {});
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

Template.CustomFieldEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("customFieldEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("customFieldEditEditFormErrorMessage");
	}
	
});
