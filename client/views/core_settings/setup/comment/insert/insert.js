var pageSession = new ReactiveDict();

Template.CommentInsert.rendered = function() {
	
};

Template.CommentInsert.events({
	
});

Template.CommentInsert.helpers({
	
});

Template.CommentInsertInsertForm.rendered = function() {
	

	pageSession.set("commentInsertInsertFormInfoMessage", "");
	pageSession.set("commentInsertInsertFormErrorMessage", "");

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

Template.CommentInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("commentInsertInsertFormInfoMessage", "");
		pageSession.set("commentInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var commentInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(commentInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("commentInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("core_settings.setup.comment", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("commentInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = Comment.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("core_settings.setup.comment", {});
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

Template.CommentInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("commentInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("commentInsertInsertFormErrorMessage");
	}
	
});
