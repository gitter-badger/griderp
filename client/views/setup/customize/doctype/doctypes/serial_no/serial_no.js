var pageSession = new ReactiveDict();

Template.DoctypesSerialNo.rendered = function() {
	
};

Template.DoctypesSerialNo.events({
	
});

Template.DoctypesSerialNo.helpers({
	
});

Template.DoctypesSerialNoForm.rendered = function() {
	

	pageSession.set("doctypesSerialNoFormInfoMessage", "");
	pageSession.set("doctypesSerialNoFormErrorMessage", "");

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

Template.DoctypesSerialNoForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("doctypesSerialNoFormInfoMessage", "");
		pageSession.set("doctypesSerialNoFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var doctypesSerialNoFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(doctypesSerialNoFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("doctypesSerialNoFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("doctypesSerialNoFormErrorMessage", message);
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

Template.DoctypesSerialNoForm.helpers({
	"infoMessage": function() {
		return pageSession.get("doctypesSerialNoFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("doctypesSerialNoFormErrorMessage");
	}
	
});
