var pageSession = new ReactiveDict();

Template.DoctypesEvent.rendered = function() {
	
};

Template.DoctypesEvent.events({
	
});

Template.DoctypesEvent.helpers({
	
});

Template.DoctypesEventForm.rendered = function() {
	

	pageSession.set("doctypesEventFormInfoMessage", "");
	pageSession.set("doctypesEventFormErrorMessage", "");

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

Template.DoctypesEventForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("doctypesEventFormInfoMessage", "");
		pageSession.set("doctypesEventFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var doctypesEventFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(doctypesEventFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("doctypesEventFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("doctypesEventFormErrorMessage", message);
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

Template.DoctypesEventForm.helpers({
	"infoMessage": function() {
		return pageSession.get("doctypesEventFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("doctypesEventFormErrorMessage");
	}
	
});
