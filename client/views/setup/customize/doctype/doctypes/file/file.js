var pageSession = new ReactiveDict();

Template.DoctypesFile.rendered = function() {
	
};

Template.DoctypesFile.events({
	
});

Template.DoctypesFile.helpers({
	
});

Template.DoctypesFileForm.rendered = function() {
	

	pageSession.set("doctypesFileFormInfoMessage", "");
	pageSession.set("doctypesFileFormErrorMessage", "");

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

Template.DoctypesFileForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("doctypesFileFormInfoMessage", "");
		pageSession.set("doctypesFileFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var doctypesFileFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(doctypesFileFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("doctypesFileFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("doctypesFileFormErrorMessage", message);
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

Template.DoctypesFileForm.helpers({
	"infoMessage": function() {
		return pageSession.get("doctypesFileFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("doctypesFileFormErrorMessage");
	}
	
});
