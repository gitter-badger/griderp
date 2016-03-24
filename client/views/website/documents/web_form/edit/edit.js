var pageSession = new ReactiveDict();

Template.WebFormEdit.rendered = function() {
	
};

Template.WebFormEdit.events({
	
});

Template.WebFormEdit.helpers({
	
});

Template.WebFormEditEditForm.rendered = function() {
	

	pageSession.set("webFormEditEditFormInfoMessage", "");
	pageSession.set("webFormEditEditFormErrorMessage", "");

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

Template.WebFormEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("webFormEditEditFormInfoMessage", "");
		pageSession.set("webFormEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var webFormEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(webFormEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("webFormEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("website.documents.web_form", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("webFormEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				WebForm.update({ _id: t.data.web_form_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("website.documents.web_form", {});
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

Template.WebFormEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("webFormEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("webFormEditEditFormErrorMessage");
	}
	
});
