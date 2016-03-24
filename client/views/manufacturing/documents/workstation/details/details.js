var pageSession = new ReactiveDict();

Template.WorkstationDetails.rendered = function() {
	
};

Template.WorkstationDetails.events({
	
});

Template.WorkstationDetails.helpers({
	
});

Template.WorkstationDetailsDetailsForm.rendered = function() {
	

	pageSession.set("workstationDetailsDetailsFormInfoMessage", "");
	pageSession.set("workstationDetailsDetailsFormErrorMessage", "");

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

Template.WorkstationDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("workstationDetailsDetailsFormInfoMessage", "");
		pageSession.set("workstationDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var workstationDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(workstationDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("workstationDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("workstationDetailsDetailsFormErrorMessage", message);
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

		Router.go("manufacturing.documents.workstation", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("manufacturing.documents.workstation", {});
	}

	
});

Template.WorkstationDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("workstationDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("workstationDetailsDetailsFormErrorMessage");
	}
	
});
