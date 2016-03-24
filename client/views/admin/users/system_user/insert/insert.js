var pageSession = new ReactiveDict();

Template.SystemUserInsert.rendered = function() {
	
};

Template.SystemUserInsert.events({
	
});

Template.SystemUserInsert.helpers({
	
});

Template.SystemUserInsertInsertForm.rendered = function() {
	

	pageSession.set("systemUserInsertInsertFormInfoMessage", "");
	pageSession.set("systemUserInsertInsertFormErrorMessage", "");

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

Template.SystemUserInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("systemUserInsertInsertFormInfoMessage", "");
		pageSession.set("systemUserInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var systemUserInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(systemUserInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("systemUserInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("admin.users.system_user", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("systemUserInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("createUserAccount", values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("admin.users.system_user", {});
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

Template.SystemUserInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("systemUserInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("systemUserInsertInsertFormErrorMessage");
	}
	
});
