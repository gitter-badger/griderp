var pageSession = new ReactiveDict();

Template.BlogPostInsert.rendered = function() {
	
};

Template.BlogPostInsert.events({
	
});

Template.BlogPostInsert.helpers({
	
});

Template.BlogPostInsertInsertForm.rendered = function() {
	

	pageSession.set("blogPostInsertInsertFormInfoMessage", "");
	pageSession.set("blogPostInsertInsertFormErrorMessage", "");

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

Template.BlogPostInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("blogPostInsertInsertFormInfoMessage", "");
		pageSession.set("blogPostInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var blogPostInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(blogPostInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("blogPostInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("website.documents.blog_post", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("blogPostInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = BlogPost.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
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

Template.BlogPostInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("blogPostInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("blogPostInsertInsertFormErrorMessage");
	}
	
});
