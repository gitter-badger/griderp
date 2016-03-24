var pageSession = new ReactiveDict();

Template.BloggerEdit.rendered = function() {
	
};

Template.BloggerEdit.events({
	
});

Template.BloggerEdit.helpers({
	
});

Template.BloggerEditEditForm.rendered = function() {
	

	pageSession.set("bloggerEditEditFormInfoMessage", "");
	pageSession.set("bloggerEditEditFormErrorMessage", "");

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

Template.BloggerEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("bloggerEditEditFormInfoMessage", "");
		pageSession.set("bloggerEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var bloggerEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(bloggerEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("bloggerEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("website.documents.blogger", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("bloggerEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Blogger.update({ _id: t.data.blogger_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("website.documents.blogger", {});
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

Template.BloggerEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("bloggerEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("bloggerEditEditFormErrorMessage");
	}
	
});
