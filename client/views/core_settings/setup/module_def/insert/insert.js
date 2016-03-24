var pageSession = new ReactiveDict();

Template.ModuleDefInsert.rendered = function() {
	
};

Template.ModuleDefInsert.events({
	
});

Template.ModuleDefInsert.helpers({
	
});

Template.ModuleDefInsertInsertForm.rendered = function() {
	

	pageSession.set("moduleDefInsertInsertFormInfoMessage", "");
	pageSession.set("moduleDefInsertInsertFormErrorMessage", "");

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

Template.ModuleDefInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("moduleDefInsertInsertFormInfoMessage", "");
		pageSession.set("moduleDefInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var moduleDefInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(moduleDefInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("moduleDefInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("core_settings.setup.module_def", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("moduleDefInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = ModuleDef.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("core_settings.setup.module_def", {});
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

Template.ModuleDefInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("moduleDefInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("moduleDefInsertInsertFormErrorMessage");
	}
	
});
