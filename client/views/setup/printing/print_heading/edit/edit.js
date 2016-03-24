var pageSession = new ReactiveDict();

Template.PrintHeadingEdit.rendered = function() {
	
};

Template.PrintHeadingEdit.events({
	
});

Template.PrintHeadingEdit.helpers({
	
});

Template.PrintHeadingEditEditForm.rendered = function() {
	

	pageSession.set("printHeadingEditEditFormInfoMessage", "");
	pageSession.set("printHeadingEditEditFormErrorMessage", "");

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

Template.PrintHeadingEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("printHeadingEditEditFormInfoMessage", "");
		pageSession.set("printHeadingEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var printHeadingEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(printHeadingEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("printHeadingEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("setup.printing.print_heading", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("printHeadingEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				PrintHeading.update({ _id: t.data.print_heading_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("setup.printing.print_heading", {});
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

Template.PrintHeadingEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("printHeadingEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("printHeadingEditEditFormErrorMessage");
	}
	
});
