var pageSession = new ReactiveDict();

Template.PrintHeadingInsert.rendered = function() {
	
};

Template.PrintHeadingInsert.events({
	
});

Template.PrintHeadingInsert.helpers({
	
});

Template.PrintHeadingInsertInsertForm.rendered = function() {
	

	pageSession.set("printHeadingInsertInsertFormInfoMessage", "");
	pageSession.set("printHeadingInsertInsertFormErrorMessage", "");

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

Template.PrintHeadingInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("printHeadingInsertInsertFormInfoMessage", "");
		pageSession.set("printHeadingInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var printHeadingInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(printHeadingInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("printHeadingInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("setup.printing.print_heading", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("printHeadingInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = PrintHeading.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
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

Template.PrintHeadingInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("printHeadingInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("printHeadingInsertInsertFormErrorMessage");
	}
	
});
