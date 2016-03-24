var pageSession = new ReactiveDict();

Template.MaintenanceVisitDetails.rendered = function() {
	
};

Template.MaintenanceVisitDetails.events({
	
});

Template.MaintenanceVisitDetails.helpers({
	
});

Template.MaintenanceVisitDetailsDetailsForm.rendered = function() {
	

	pageSession.set("maintenanceVisitDetailsDetailsFormInfoMessage", "");
	pageSession.set("maintenanceVisitDetailsDetailsFormErrorMessage", "");

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

Template.MaintenanceVisitDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("maintenanceVisitDetailsDetailsFormInfoMessage", "");
		pageSession.set("maintenanceVisitDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var maintenanceVisitDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(maintenanceVisitDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("maintenanceVisitDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("maintenanceVisitDetailsDetailsFormErrorMessage", message);
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

		Router.go("support.documents.maintenance_visit", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("support.documents.maintenance_visit", {});
	}

	
});

Template.MaintenanceVisitDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("maintenanceVisitDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("maintenanceVisitDetailsDetailsFormErrorMessage");
	}
	
});
