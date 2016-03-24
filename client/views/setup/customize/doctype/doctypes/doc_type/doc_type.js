var pageSession = new ReactiveDict();

Template.DoctypesDocType.rendered = function() {
	
};

Template.DoctypesDocType.events({
	
});

Template.DoctypesDocType.helpers({
	
});

Template.DoctypesDocTypeForm.rendered = function() {
	

	pageSession.set("doctypesDocTypeFormInfoMessage", "");
	pageSession.set("doctypesDocTypeFormErrorMessage", "");

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

Template.DoctypesDocTypeForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("doctypesDocTypeFormInfoMessage", "");
		pageSession.set("doctypesDocTypeFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var doctypesDocTypeFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(doctypesDocTypeFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("doctypesDocTypeFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("doctypesDocTypeFormErrorMessage", message);
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

Template.DoctypesDocTypeForm.helpers({
	"infoMessage": function() {
		return pageSession.get("doctypesDocTypeFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("doctypesDocTypeFormErrorMessage");
	}
	
});
