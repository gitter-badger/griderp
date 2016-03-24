var pageSession = new ReactiveDict();

Template.PrintFormatEdit.rendered = function() {
	
};

Template.PrintFormatEdit.events({
	
});

Template.PrintFormatEdit.helpers({
	
});

Template.PrintFormatEditEditForm.rendered = function() {
	

	pageSession.set("printFormatEditEditFormInfoMessage", "");
	pageSession.set("printFormatEditEditFormErrorMessage", "");

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

Template.PrintFormatEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("printFormatEditEditFormInfoMessage", "");
		pageSession.set("printFormatEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var printFormatEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(printFormatEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("printFormatEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("setup.printing.print_format", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("printFormatEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				PrintFormat.update({ _id: t.data.print_format_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("setup.printing.print_format", {});
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

Template.PrintFormatEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("printFormatEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("printFormatEditEditFormErrorMessage");
	}
	
});
