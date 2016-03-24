var pageSession = new ReactiveDict();

Template.DoctypesCompany.rendered = function() {
	
};

Template.DoctypesCompany.events({
	
});

Template.DoctypesCompany.helpers({
	
});

Template.DoctypesCompanyForm.rendered = function() {
	

	pageSession.set("doctypesCompanyFormInfoMessage", "");
	pageSession.set("doctypesCompanyFormErrorMessage", "");

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

Template.DoctypesCompanyForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("doctypesCompanyFormInfoMessage", "");
		pageSession.set("doctypesCompanyFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var doctypesCompanyFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(doctypesCompanyFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("doctypesCompanyFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("doctypesCompanyFormErrorMessage", message);
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

Template.DoctypesCompanyForm.helpers({
	"infoMessage": function() {
		return pageSession.get("doctypesCompanyFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("doctypesCompanyFormErrorMessage");
	}
	
});
