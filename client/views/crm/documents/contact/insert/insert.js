var pageSession = new ReactiveDict();

Template.ContactInsert.rendered = function() {
	
};

Template.ContactInsert.events({
	
});

Template.ContactInsert.helpers({
	
});

Template.ContactInsertInsertForm.rendered = function() {
	

	pageSession.set("contactInsertInsertFormInfoMessage", "");
	pageSession.set("contactInsertInsertFormErrorMessage", "");

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

Template.ContactInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("contactInsertInsertFormInfoMessage", "");
		pageSession.set("contactInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var contactInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(contactInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("contactInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("crm.documents.contact", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("contactInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = Contact.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
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

Template.ContactInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("contactInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("contactInsertInsertFormErrorMessage");
	}
	
});
