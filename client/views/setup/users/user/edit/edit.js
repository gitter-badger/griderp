var pageSession = new ReactiveDict();

Template.UserEdit.rendered = function() {
	
};

Template.UserEdit.events({
	
});

Template.UserEdit.helpers({
	
});

Template.UserEditEditForm.rendered = function() {
	

	pageSession.set("userEditEditFormInfoMessage", "");
	pageSession.set("userEditEditFormErrorMessage", "");

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

Template.UserEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("userEditEditFormInfoMessage", "");
		pageSession.set("userEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var userEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(userEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("userEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("setup.users.user", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("userEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				User.update({ _id: t.data.user_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("setup.users.user", {});
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

Template.UserEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("userEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("userEditEditFormErrorMessage");
	}
	
});
