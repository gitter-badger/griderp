var pageSession = new ReactiveDict();

Template.HolidayListDetails.rendered = function() {
	
};

Template.HolidayListDetails.events({
	
});

Template.HolidayListDetails.helpers({
	
});

Template.HolidayListDetailsDetailsForm.rendered = function() {
	

	pageSession.set("holidayListDetailsDetailsFormInfoMessage", "");
	pageSession.set("holidayListDetailsDetailsFormErrorMessage", "");

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

Template.HolidayListDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("holidayListDetailsDetailsFormInfoMessage", "");
		pageSession.set("holidayListDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var holidayListDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(holidayListDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("holidayListDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("holidayListDetailsDetailsFormErrorMessage", message);
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

		Router.go("setup.human_resources.holiday_list", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("setup.human_resources.holiday_list", {});
	}

	
});

Template.HolidayListDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("holidayListDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("holidayListDetailsDetailsFormErrorMessage");
	}
	
});
