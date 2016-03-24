var pageSession = new ReactiveDict();

Template.IndustryTypeInsert.rendered = function() {
	
};

Template.IndustryTypeInsert.events({
	
});

Template.IndustryTypeInsert.helpers({
	
});

Template.IndustryTypeInsertInsertForm.rendered = function() {
	

	pageSession.set("industryTypeInsertInsertFormInfoMessage", "");
	pageSession.set("industryTypeInsertInsertFormErrorMessage", "");

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

Template.IndustryTypeInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("industryTypeInsertInsertFormInfoMessage", "");
		pageSession.set("industryTypeInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var industryTypeInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(industryTypeInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("industryTypeInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("setup.selling.industry_type", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("industryTypeInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = IndustryType.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("setup.selling.industry_type", {});
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

Template.IndustryTypeInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("industryTypeInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("industryTypeInsertInsertFormErrorMessage");
	}
	
});
