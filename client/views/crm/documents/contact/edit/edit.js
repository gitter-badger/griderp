var pageSession = new ReactiveDict();

Template.ContactEdit.rendered = function() {
	
};

Template.ContactEdit.events({
	
});

Template.ContactEdit.helpers({
	
});

Template.ContactEditEditForm.rendered = function() {
	

	pageSession.set("contactEditEditFormInfoMessage", "");
	pageSession.set("contactEditEditFormErrorMessage", "");

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

Template.ContactEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("contactEditEditFormInfoMessage", "");
		pageSession.set("contactEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var contactEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(contactEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("contactEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("crm.documents.contact", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("contactEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Contact.update({ _id: t.data.contact_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("crm.documents.contact", {});
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

Template.ContactEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("contactEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("contactEditEditFormErrorMessage");
	}
	
});
