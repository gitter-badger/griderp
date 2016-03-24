var pageSession = new ReactiveDict();

Template.CustomScriptEdit.rendered = function() {
	
};

Template.CustomScriptEdit.events({
	
});

Template.CustomScriptEdit.helpers({
	
});

Template.CustomScriptEditEditForm.rendered = function() {
	

	pageSession.set("customScriptEditEditFormInfoMessage", "");
	pageSession.set("customScriptEditEditFormErrorMessage", "");

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

Template.CustomScriptEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("customScriptEditEditFormInfoMessage", "");
		pageSession.set("customScriptEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var customScriptEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(customScriptEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("customScriptEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("setup.customize.custom_script", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("customScriptEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				CustomScript.update({ _id: t.data.custom_script_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
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

Template.CustomScriptEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("customScriptEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("customScriptEditEditFormErrorMessage");
	}
	
});
