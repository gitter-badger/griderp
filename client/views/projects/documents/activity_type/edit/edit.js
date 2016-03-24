var pageSession = new ReactiveDict();

Template.ActivityTypeEdit.rendered = function() {
	
};

Template.ActivityTypeEdit.events({
	
});

Template.ActivityTypeEdit.helpers({
	
});

Template.ActivityTypeEditEditForm.rendered = function() {
	

	pageSession.set("activityTypeEditEditFormInfoMessage", "");
	pageSession.set("activityTypeEditEditFormErrorMessage", "");

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

Template.ActivityTypeEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("activityTypeEditEditFormInfoMessage", "");
		pageSession.set("activityTypeEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var activityTypeEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(activityTypeEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("activityTypeEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("projects.documents.activity_type", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("activityTypeEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				ActivityType.update({ _id: t.data.activity_type_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("projects.documents.activity_type", {});
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

Template.ActivityTypeEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("activityTypeEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("activityTypeEditEditFormErrorMessage");
	}
	
});
