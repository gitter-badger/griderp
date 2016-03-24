var pageSession = new ReactiveDict();

Template.DoctypesMaintenanceScheduleItem.rendered = function() {
	
};

Template.DoctypesMaintenanceScheduleItem.events({
	
});

Template.DoctypesMaintenanceScheduleItem.helpers({
	
});

Template.DoctypesMaintenanceScheduleItemForm.rendered = function() {
	

	pageSession.set("doctypesMaintenanceScheduleItemFormInfoMessage", "");
	pageSession.set("doctypesMaintenanceScheduleItemFormErrorMessage", "");

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

Template.DoctypesMaintenanceScheduleItemForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("doctypesMaintenanceScheduleItemFormInfoMessage", "");
		pageSession.set("doctypesMaintenanceScheduleItemFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var doctypesMaintenanceScheduleItemFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(doctypesMaintenanceScheduleItemFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("doctypesMaintenanceScheduleItemFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("doctypesMaintenanceScheduleItemFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		/*CANCEL_REDIRECT*/
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		Router.go("setup.customize.doctype", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("setup.customize.doctype", {});
	}

	
});

Template.DoctypesMaintenanceScheduleItemForm.helpers({
	"infoMessage": function() {
		return pageSession.get("doctypesMaintenanceScheduleItemFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("doctypesMaintenanceScheduleItemFormErrorMessage");
	}
	
});
