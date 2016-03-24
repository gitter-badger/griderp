var pageSession = new ReactiveDict();

Template.CompanyInsert.rendered = function() {
	
};

Template.CompanyInsert.events({
	
});

Template.CompanyInsert.helpers({
	
});

Template.CompanyInsertInsertForm.rendered = function() {
	

	pageSession.set("companyInsertInsertFormInfoMessage", "");
	pageSession.set("companyInsertInsertFormErrorMessage", "");

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

Template.CompanyInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("companyInsertInsertFormInfoMessage", "");
		pageSession.set("companyInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var companyInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(companyInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("companyInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("setup.accounts.company", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("companyInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = Company.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
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

Template.CompanyInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("companyInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("companyInsertInsertFormErrorMessage");
	}
	
});
