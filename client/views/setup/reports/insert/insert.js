var pageSession = new ReactiveDict();

Template.ReportInsert.rendered = function() {
	
};

Template.ReportInsert.events({
	
});

Template.ReportInsert.helpers({
	
});

Template.ReportInsertInsertForm.rendered = function() {
	

	pageSession.set("reportInsertInsertFormInfoMessage", "");
	pageSession.set("reportInsertInsertFormErrorMessage", "");

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

Template.ReportInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("reportInsertInsertFormInfoMessage", "");
		pageSession.set("reportInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var reportInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(reportInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("reportInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("setup.reports", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("reportInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = Report.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("setup.report", {});
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

Template.ReportInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("reportInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("reportInsertInsertFormErrorMessage");
	}
	
});
