var pageSession = new ReactiveDict();

Template.ModuleDefEdit.rendered = function() {
	
};

Template.ModuleDefEdit.events({
	
});

Template.ModuleDefEdit.helpers({
	
});

Template.ModuleDefEditEditForm.rendered = function() {
	

	pageSession.set("moduleDefEditEditFormInfoMessage", "");
	pageSession.set("moduleDefEditEditFormErrorMessage", "");

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

Template.ModuleDefEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("moduleDefEditEditFormInfoMessage", "");
		pageSession.set("moduleDefEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var moduleDefEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(moduleDefEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("moduleDefEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("core_settings.setup.module_def", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("moduleDefEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				ModuleDef.update({ _id: t.data.module_def_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
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

Template.ModuleDefEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("moduleDefEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("moduleDefEditEditFormErrorMessage");
	}
	
});
