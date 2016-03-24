var pageSession = new ReactiveDict();

Template.CustomFieldInsert.rendered = function() {
	
};

Template.CustomFieldInsert.events({
	
});

Template.CustomFieldInsert.helpers({
	
});

Template.CustomFieldInsertInsertForm.rendered = function() {
	

	pageSession.set("customFieldInsertInsertFormInfoMessage", "");
	pageSession.set("customFieldInsertInsertFormErrorMessage", "");

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

Template.CustomFieldInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("customFieldInsertInsertFormInfoMessage", "");
		pageSession.set("customFieldInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var customFieldInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(customFieldInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("customFieldInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("setup.customize.custom_field", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("customFieldInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = CustomField.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("setup.customize.custom_field", {});
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

Template.CustomFieldInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("customFieldInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("customFieldInsertInsertFormErrorMessage");
	}
	
});
