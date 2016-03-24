var pageSession = new ReactiveDict();

Template.RoleInsert.rendered = function() {
	
};

Template.RoleInsert.events({
	
});

Template.RoleInsert.helpers({
	
});

Template.RoleInsertInsertForm.rendered = function() {
	

	pageSession.set("roleInsertInsertFormInfoMessage", "");
	pageSession.set("roleInsertInsertFormErrorMessage", "");

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

Template.RoleInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("roleInsertInsertFormInfoMessage", "");
		pageSession.set("roleInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var roleInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(roleInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("roleInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("setup.users.role", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("roleInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = Role.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
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

Template.RoleInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("roleInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("roleInsertInsertFormErrorMessage");
	}
	
});
