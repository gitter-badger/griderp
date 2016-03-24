var pageSession = new ReactiveDict();

Template.VersionsEdit.rendered = function() {
	
};

Template.VersionsEdit.events({
	
});

Template.VersionsEdit.helpers({
	
});

Template.VersionsEditEditForm.rendered = function() {
	

	pageSession.set("versionsEditEditFormInfoMessage", "");
	pageSession.set("versionsEditEditFormErrorMessage", "");

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

Template.VersionsEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("versionsEditEditFormInfoMessage", "");
		pageSession.set("versionsEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var versionsEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(versionsEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("versionsEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("core_settings.setup.versions", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("versionsEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Versions.update({ _id: t.data.versions_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("core_settings.setup.versions", {});
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

Template.VersionsEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("versionsEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("versionsEditEditFormErrorMessage");
	}
	
});
