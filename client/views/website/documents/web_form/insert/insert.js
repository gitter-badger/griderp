var pageSession = new ReactiveDict();

Template.WebFormInsert.rendered = function() {
	
};

Template.WebFormInsert.events({
	
});

Template.WebFormInsert.helpers({
	
});

Template.WebFormInsertInsertForm.rendered = function() {
	

	pageSession.set("webFormInsertInsertFormInfoMessage", "");
	pageSession.set("webFormInsertInsertFormErrorMessage", "");

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

Template.WebFormInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("webFormInsertInsertFormInfoMessage", "");
		pageSession.set("webFormInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var webFormInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(webFormInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("webFormInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("website.documents.web_form", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("webFormInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = WebForm.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("website.documents.web_form", {});
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

Template.WebFormInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("webFormInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("webFormInsertInsertFormErrorMessage");
	}
	
});
