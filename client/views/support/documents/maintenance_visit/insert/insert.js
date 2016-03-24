var pageSession = new ReactiveDict();

Template.MaintenanceVisitInsert.rendered = function() {
	
};

Template.MaintenanceVisitInsert.events({
	
});

Template.MaintenanceVisitInsert.helpers({
	
});

Template.MaintenanceVisitInsertInsertForm.rendered = function() {
	

	pageSession.set("maintenanceVisitInsertInsertFormInfoMessage", "");
	pageSession.set("maintenanceVisitInsertInsertFormErrorMessage", "");

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

Template.MaintenanceVisitInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("maintenanceVisitInsertInsertFormInfoMessage", "");
		pageSession.set("maintenanceVisitInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var maintenanceVisitInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(maintenanceVisitInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("maintenanceVisitInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("support.documents.maintenance_visit", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("maintenanceVisitInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = MaintenanceVisit.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("support.documents.maintenance_visit", {});
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

Template.MaintenanceVisitInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("maintenanceVisitInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("maintenanceVisitInsertInsertFormErrorMessage");
	}
	
});
