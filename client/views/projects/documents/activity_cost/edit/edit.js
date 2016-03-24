var pageSession = new ReactiveDict();

Template.ActivityCostEdit.rendered = function() {
	
};

Template.ActivityCostEdit.events({
	
});

Template.ActivityCostEdit.helpers({
	
});

Template.ActivityCostEditEditForm.rendered = function() {
	

	pageSession.set("activityCostEditEditFormInfoMessage", "");
	pageSession.set("activityCostEditEditFormErrorMessage", "");

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

Template.ActivityCostEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("activityCostEditEditFormInfoMessage", "");
		pageSession.set("activityCostEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var activityCostEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(activityCostEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("activityCostEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("projects.documents.activity_cost", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("activityCostEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				ActivityCost.update({ _id: t.data.activity_cost_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("projects.documents.activity_cost", {});
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

Template.ActivityCostEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("activityCostEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("activityCostEditEditFormErrorMessage");
	}
	
});
