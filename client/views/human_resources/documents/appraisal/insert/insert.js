var pageSession = new ReactiveDict();

Template.AppraisalInsert.rendered = function() {
	
};

Template.AppraisalInsert.events({
	
});

Template.AppraisalInsert.helpers({
	
});

Template.AppraisalInsertInsertForm.rendered = function() {
	

	pageSession.set("appraisalInsertInsertFormInfoMessage", "");
	pageSession.set("appraisalInsertInsertFormErrorMessage", "");

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

Template.AppraisalInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("appraisalInsertInsertFormInfoMessage", "");
		pageSession.set("appraisalInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var appraisalInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(appraisalInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("appraisalInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("human_resources.documents.appraisal", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("appraisalInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = Appraisal.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("human_resources.documents.appraisal", {});
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

Template.AppraisalInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("appraisalInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("appraisalInsertInsertFormErrorMessage");
	}
	
});
