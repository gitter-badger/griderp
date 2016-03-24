var pageSession = new ReactiveDict();

Template.CommentEdit.rendered = function() {
	
};

Template.CommentEdit.events({
	
});

Template.CommentEdit.helpers({
	
});

Template.CommentEditEditForm.rendered = function() {
	

	pageSession.set("commentEditEditFormInfoMessage", "");
	pageSession.set("commentEditEditFormErrorMessage", "");

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

Template.CommentEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("commentEditEditFormInfoMessage", "");
		pageSession.set("commentEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var commentEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(commentEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("commentEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("core_settings.setup.comment", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("commentEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Comment.update({ _id: t.data.comment_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
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

Template.CommentEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("commentEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("commentEditEditFormErrorMessage");
	}
	
});
