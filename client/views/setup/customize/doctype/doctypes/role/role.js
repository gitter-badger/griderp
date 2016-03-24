var pageSession = new ReactiveDict();

Template.DoctypesRole.rendered = function() {
	
};

Template.DoctypesRole.events({
	
});

Template.DoctypesRole.helpers({
	
});

Template.DoctypesRoleForm.rendered = function() {
	

	pageSession.set("doctypesRoleFormInfoMessage", "");
	pageSession.set("doctypesRoleFormErrorMessage", "");

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

Template.DoctypesRoleForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("doctypesRoleFormInfoMessage", "");
		pageSession.set("doctypesRoleFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var doctypesRoleFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(doctypesRoleFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("doctypesRoleFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("doctypesRoleFormErrorMessage", message);
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

Template.DoctypesRoleForm.helpers({
	"infoMessage": function() {
		return pageSession.get("doctypesRoleFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("doctypesRoleFormErrorMessage");
	}
	
});
