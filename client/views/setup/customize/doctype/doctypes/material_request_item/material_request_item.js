var pageSession = new ReactiveDict();

Template.DoctypesMaterialRequestItem.rendered = function() {
	
};

Template.DoctypesMaterialRequestItem.events({
	
});

Template.DoctypesMaterialRequestItem.helpers({
	
});

Template.DoctypesMaterialRequestItemForm.rendered = function() {
	

	pageSession.set("doctypesMaterialRequestItemFormInfoMessage", "");
	pageSession.set("doctypesMaterialRequestItemFormErrorMessage", "");

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

Template.DoctypesMaterialRequestItemForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("doctypesMaterialRequestItemFormInfoMessage", "");
		pageSession.set("doctypesMaterialRequestItemFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var doctypesMaterialRequestItemFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(doctypesMaterialRequestItemFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("doctypesMaterialRequestItemFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("doctypesMaterialRequestItemFormErrorMessage", message);
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

Template.DoctypesMaterialRequestItemForm.helpers({
	"infoMessage": function() {
		return pageSession.get("doctypesMaterialRequestItemFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("doctypesMaterialRequestItemFormErrorMessage");
	}
	
});
