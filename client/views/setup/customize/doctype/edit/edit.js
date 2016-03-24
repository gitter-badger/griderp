var pageSession = new ReactiveDict();

Template.DoctypeEdit.rendered = function() {
	
};

Template.DoctypeEdit.events({
	
});

Template.DoctypeEdit.helpers({
	
});

Template.DoctypeEditEditForm.rendered = function() {
	

	pageSession.set("doctypeEditEditFormInfoMessage", "");
	pageSession.set("doctypeEditEditFormErrorMessage", "");

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

Template.DoctypeEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("doctypeEditEditFormInfoMessage", "");
		pageSession.set("doctypeEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var doctypeEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(doctypeEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("doctypeEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("setup.customize.doctype", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("doctypeEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Doctype.update({ _id: t.data.doctype_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();


		Router.go("setup.customize.doctype", {});
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

Template.JournalEntryEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("doctypeEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("doctypeEditEditFormErrorMessage");
	}
	
});
