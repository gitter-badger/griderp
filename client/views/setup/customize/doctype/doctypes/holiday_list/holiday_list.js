var pageSession = new ReactiveDict();

Template.DoctypesHolidayList.rendered = function() {
	
};

Template.DoctypesHolidayList.events({
	
});

Template.DoctypesHolidayList.helpers({
	
});

Template.DoctypesHolidayListForm.rendered = function() {
	

	pageSession.set("doctypesHolidayListFormInfoMessage", "");
	pageSession.set("doctypesHolidayListFormErrorMessage", "");

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

Template.DoctypesHolidayListForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("doctypesHolidayListFormInfoMessage", "");
		pageSession.set("doctypesHolidayListFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var doctypesHolidayListFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(doctypesHolidayListFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("doctypesHolidayListFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("doctypesHolidayListFormErrorMessage", message);
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

Template.DoctypesHolidayListForm.helpers({
	"infoMessage": function() {
		return pageSession.get("doctypesHolidayListFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("doctypesHolidayListFormErrorMessage");
	}
	
});
