var pageSession = new ReactiveDict();

Template.ModuleDefDetails.rendered = function() {
	
};

Template.ModuleDefDetails.events({
	
});

Template.ModuleDefDetails.helpers({
	
});

Template.ModuleDefDetailsDetailsForm.rendered = function() {
	

	pageSession.set("moduleDefDetailsDetailsFormInfoMessage", "");
	pageSession.set("moduleDefDetailsDetailsFormErrorMessage", "");

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

Template.ModuleDefDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("moduleDefDetailsDetailsFormInfoMessage", "");
		pageSession.set("moduleDefDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var moduleDefDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(moduleDefDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("moduleDefDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("moduleDefDetailsDetailsFormErrorMessage", message);
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

		Router.go("core_settings.setup.module_def", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("core_settings.setup.module_def", {});
	}

	
});

Template.ModuleDefDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("moduleDefDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("moduleDefDetailsDetailsFormErrorMessage");
	}
	
});
