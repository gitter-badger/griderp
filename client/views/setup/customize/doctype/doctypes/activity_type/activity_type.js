var pageSession = new ReactiveDict();

Template.DoctypesActivityType.rendered = function() {
	
};

Template.DoctypesActivityType.events({
	
});

Template.DoctypesActivityType.helpers({
	
});

Template.DoctypesActivityTypeForm.rendered = function() {
	

	pageSession.set("doctypesActivityTypeFormInfoMessage", "");
	pageSession.set("doctypesActivityTypeFormFormErrorMessage", "");

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

Template.DoctypesActivityTypeForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("doctypesActivityTypeFormInfoMessage", "");
		pageSession.set("doctypesActivityTypeFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var doctypesActivityTypeFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(doctypesActivityTypeFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("doctypesActivityTypeFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("doctypesActivityTypeFormErrorMessage", message);
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

Template.DoctypesActivityTypeForm.helpers({
	"infoMessage": function() {
		return pageSession.get("doctypesActivityTypeFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("doctypesActivityTypeFormErrorMessage");
	}
	
});
