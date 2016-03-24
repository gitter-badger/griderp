var pageSession = new ReactiveDict();

Template.AppraisalTemplateInsert.rendered = function() {
	
};

Template.AppraisalTemplateInsert.events({
	
});

Template.AppraisalTemplateInsert.helpers({
	
});

Template.AppraisalTemplateInsertInsertForm.rendered = function() {
	

	pageSession.set("appraisalTemplateInsertInsertFormInfoMessage", "");
	pageSession.set("appraisalTemplateInsertInsertFormErrorMessage", "");

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

Template.AppraisalTemplateInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("appraisalTemplateInsertInsertFormInfoMessage", "");
		pageSession.set("appraisalTemplateInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var appraisalTemplateInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(appraisalTemplateInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("appraisalTemplateInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("setup.human_resources.appraisal_template", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("appraisalTemplateInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = AppraisalTemplate.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("setup.human_resources.appraisal_template", {});
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

Template.AppraisalTemplateInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("appraisalTemplateInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("appraisalTemplateInsertInsertFormErrorMessage");
	}
	
});
