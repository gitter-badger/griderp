var pageSession = new ReactiveDict();

Template.FileInsert.rendered = function() {
	
};

Template.FileInsert.events({
	
});

Template.FileInsert.helpers({
	
});

Template.FileInsertInsertForm.rendered = function() {
	

	pageSession.set("fileInsertInsertFormInfoMessage", "");
	pageSession.set("fileInsertInsertFormErrorMessage", "");

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

Template.FileInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("fileInsertInsertFormInfoMessage", "");
		pageSession.set("fileInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var fileInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(fileInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("fileInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("file", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("fileInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = File.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("file", {});
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

Template.FileInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("fileInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("fileInsertInsertFormErrorMessage");
	}
	
});
