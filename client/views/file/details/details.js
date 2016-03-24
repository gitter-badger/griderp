var pageSession = new ReactiveDict();

Template.FileDetails.rendered = function() {
	
};

Template.FileDetails.events({
	
});

Template.FileDetails.helpers({
	
});

Template.FileDetailsDetailsForm.rendered = function() {
	

	pageSession.set("fileDetailsDetailsFormInfoMessage", "");
	pageSession.set("fileDetailsDetailsFormErrorMessage", "");

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

Template.FileDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("fileDetailsDetailsFormInfoMessage", "");
		pageSession.set("fileDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var fileDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(fileDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("fileDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("fileDetailsDetailsFormErrorMessage", message);
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

		Router.go("file", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("file", {});
	}

	
});

Template.FileDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("fileDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("fileDetailsDetailsFormErrorMessage");
	}
	
});
