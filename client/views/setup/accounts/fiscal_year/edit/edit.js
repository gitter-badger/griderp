var pageSession = new ReactiveDict();

Template.FiscalYearEdit.rendered = function() {
	
};

Template.FiscalYearEdit.events({
	
});

Template.FiscalYearEdit.helpers({
	
});

Template.FiscalYearEditEditForm.rendered = function() {
	

	pageSession.set("fiscalYearEditEditFormInfoMessage", "");
	pageSession.set("fiscalYearEditEditFormErrorMessage", "");

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

Template.FiscalYearEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("fiscalYearEditEditFormInfoMessage", "");
		pageSession.set("fiscalYearEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var fiscalYearEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(fiscalYearEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("fiscalYearEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("setup.accounts.fiscal_year", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("fiscalYearEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				FiscalYear.update({ _id: t.data.fiscal_year_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("setup.accounts.fiscal_year", {});
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

Template.FiscalYearEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("fiscalYearEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("fiscalYearEditEditFormErrorMessage");
	}
	
});
