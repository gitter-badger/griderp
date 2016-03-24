var pageSession = new ReactiveDict();

Template.HolidayListEdit.rendered = function() {
	
};

Template.HolidayListEdit.events({
	
});

Template.HolidayListEdit.helpers({
	
});

Template.HolidayListEditEditForm.rendered = function() {
	

	pageSession.set("holidayListEditEditFormInfoMessage", "");
	pageSession.set("holidayListEditEditFormErrorMessage", "");

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

Template.HolidayListEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("holidayListEditEditFormInfoMessage", "");
		pageSession.set("holidayListEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var holidayListEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(holidayListEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("holidayListEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("setup.human_resources.holiday_list", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("holidayListEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				HolidayList.update({ _id: t.data.holiday_list_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("setup.human_resources.holiday_list", {});
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

Template.HolidayListEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("holidayListEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("holidayListEditEditFormErrorMessage");
	}
	
});
