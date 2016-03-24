var pageSession = new ReactiveDict();

Template.HolidayListInsert.rendered = function() {
	
};

Template.HolidayListInsert.events({
	
});

Template.HolidayListInsert.helpers({
	
});

Template.HolidayListInsertInsertForm.rendered = function() {
	

	pageSession.set("holidayListInsertInsertFormInfoMessage", "");
	pageSession.set("holidayListInsertInsertFormErrorMessage", "");

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

Template.HolidayListInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("holidayListInsertInsertFormInfoMessage", "");
		pageSession.set("holidayListInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var holidayListInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(holidayListInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("holidayListInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("setup.human_resources.holiday_list", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("holidayListInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = HolidayList.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
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

Template.HolidayListInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("holidayListInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("holidayListInsertInsertFormErrorMessage");
	}
	
});
