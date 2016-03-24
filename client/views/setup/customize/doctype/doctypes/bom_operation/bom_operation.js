var pageSession = new ReactiveDict();

Template.DoctypesBomOperation.rendered = function() {
	
};

Template.DoctypesBomOperation.events({
	
});

Template.DoctypesBomOperation.helpers({
	
});

Template.DoctypesBomOperationForm.rendered = function() {
	

	pageSession.set("doctypesBomOperationFormInfoMessage", "");
	pageSession.set("doctypesBomOperationFormErrorMessage", "");

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

Template.DoctypesBomOperationForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("doctypesBomOperationFormInfoMessage", "");
		pageSession.set("doctypesBomOperationFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var doctypesBomOperationFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(doctypesBomOperationFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("doctypesBomOperationFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("doctypesBomOperationFormErrorMessage", message);
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

Template.DoctypesBomOperationForm.helpers({
	"infoMessage": function() {
		return pageSession.get("doctypesBomOperationFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("doctypesBomOperationFormErrorMessage");
	}
	
});
