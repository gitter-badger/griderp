var pageSession = new ReactiveDict();

Template.RoleEdit.rendered = function() {
	
};

Template.RoleEdit.events({
	
});

Template.RoleEdit.helpers({
	
});

Template.RoleEditEditForm.rendered = function() {
	

	pageSession.set("roleEditEditFormInfoMessage", "");
	pageSession.set("roleEditEditFormErrorMessage", "");

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

Template.RoleEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("roleEditEditFormInfoMessage", "");
		pageSession.set("roleEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var roleEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(roleEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("roleEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("setup.users.role", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("roleEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Role.update({ _id: t.data.role_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("setup.users.role", {});
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		/*CLOSE_REDIRECT*/
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		/*BACK_REDIRECT*/
	}

	
});

Template.RoleEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("roleEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("roleEditEditFormErrorMessage");
	}
	
});
