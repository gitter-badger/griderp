var pageSession = new ReactiveDict();

Template.CustomScriptInsert.rendered = function() {
	
};

Template.CustomScriptInsert.events({
	
});

Template.CustomScriptInsert.helpers({
	
});

Template.CustomScriptInsertInsertForm.rendered = function() {
	

	pageSession.set("customScriptInsertInsertFormInfoMessage", "");
	pageSession.set("customScriptInsertInsertFormErrorMessage", "");

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

Template.CustomScriptInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("customScriptInsertInsertFormInfoMessage", "");
		pageSession.set("customScriptInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var customScriptInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(customScriptInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("customScriptInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("setup.customize.custom_script", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("customScriptInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = CustomScript.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("setup.customize.custom_script", {});
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

Template.CustomScriptInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("customScriptInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("customScriptInsertInsertFormErrorMessage");
	}
	
});
