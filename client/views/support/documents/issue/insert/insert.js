var pageSession = new ReactiveDict();

Template.IssueInsert.rendered = function() {
	
};

Template.IssueInsert.events({
	
});

Template.IssueInsert.helpers({
	
});

Template.IssueInsertInsertForm.rendered = function() {
	

	pageSession.set("issueInsertInsertFormInfoMessage", "");
	pageSession.set("issueInsertInsertFormErrorMessage", "");

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

Template.IssueInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("insertInsertInsertFormInfoMessage", "");
		pageSession.set("insertInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var issueInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(issueInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("issueInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("support.documents.issue", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("issueInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = Issue.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("support.documents.issue", {});
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

Template.IssueInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("issueInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("issueInsertInsertFormErrorMessage");
	}
	
});
