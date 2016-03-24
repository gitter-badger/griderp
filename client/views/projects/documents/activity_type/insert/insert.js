var pageSession = new ReactiveDict();

Template.ActivityTypeInsert.rendered = function() {
	
};

Template.ActivityTypeInsert.events({
	
});

Template.ActivityTypeInsert.helpers({
	
});

Template.ActivityTypeInsertInsertForm.rendered = function() {
	

	pageSession.set("activityTypeInsertInsertFormInfoMessage", "");
	pageSession.set("activityTypeInsertInsertFormErrorMessage", "");

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

Template.ActivityTypeInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("activityTypeInsertInsertFormInfoMessage", "");
		pageSession.set("activityTypeInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var activityTypeInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(activityTypeInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("activityTypeInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("projects.documents.activity_type", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("activityTypeInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = ActivityType.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
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

Template.ActivityTypeInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("activityTypeInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("activityTypeInsertInsertFormErrorMessage");
	}
	
});
