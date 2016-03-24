var pageSession = new ReactiveDict();

Template.BlogPostEdit.rendered = function() {
	
};

Template.BlogPostEdit.events({
	
});

Template.BlogPostEdit.helpers({
	
});

Template.BlogPostEditEditForm.rendered = function() {
	

	pageSession.set("blogPostEditEditFormInfoMessage", "");
	pageSession.set("blogPostEditEditFormErrorMessage", "");

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

	$('.summernote').summernote({
		height: 300,
		focus: false,
		codemirror: {
			htmlMode: true,
			lineNumbers: true,
			mode: 'text/html'
		}
	});

};

Template.BlogPostEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("blogPostEditEditFormInfoMessage", "");
		pageSession.set("blogPostEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var blogPostEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(blogPostEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("blogPostEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("website.documents.blog_post", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("blogPostEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				BlogPost.update({ _id: t.data.blog_post_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("website.documents.blog_post", {});
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

Template.BlogPostEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("blogPostEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("blogPostEditEditFormErrorMessage");
	}
	
});
