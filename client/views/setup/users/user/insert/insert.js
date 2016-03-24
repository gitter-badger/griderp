var pageSession = new ReactiveDict();

Template.UserInsert.rendered = function() {
	
};

Template.UserInsert.events({
	
});

Template.UserInsert.helpers({
	
});

Template.UserInsertInsertForm.rendered = function() {
	

	pageSession.set("userInsertInsertFormInfoMessage", "");
	pageSession.set("userInsertInsertFormErrorMessage", "");

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

Template.UserInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("userInsertInsertFormInfoMessage", "");
		pageSession.set("userInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var userInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(userInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("userInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("setup.users.user", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("userInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = User.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
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

Template.UserInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("userInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("userInsertInsertFormErrorMessage");
	}
	
});
