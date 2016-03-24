var pageSession = new ReactiveDict();

Template.CompanyEdit.rendered = function() {
	
};

Template.CompanyEdit.events({
	
});

Template.CompanyEdit.helpers({
	
});

Template.CompanyEditEditForm.rendered = function() {
	

	pageSession.set("companyEditEditFormInfoMessage", "");
	pageSession.set("companyEditEditFormErrorMessage", "");

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

Template.CompanyEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("companyEditEditFormInfoMessage", "");
		pageSession.set("companyEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var companyEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(companyEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("companyEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("setup.accounts.company", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("companyEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Company.update({ _id: t.data.company_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("setup.accounts.company", {});
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

Template.CompanyEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("companyEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("companyEditEditFormErrorMessage");
	}
	
});
