var pageSession = new ReactiveDict();

Template.BloggerInsert.rendered = function() {
	
};

Template.BloggerInsert.events({
	
});

Template.BloggerInsert.helpers({
	
});

Template.BloggerInsertInsertForm.rendered = function() {
	

	pageSession.set("bloggerInsertInsertFormInfoMessage", "");
	pageSession.set("bloggerInsertInsertFormErrorMessage", "");

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

Template.BloggerInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("bloggerInsertInsertFormInfoMessage", "");
		pageSession.set("bloggerInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var bloggerInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(bloggerInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("bloggerInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("website.documents.blogger", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("bloggerInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = Blogger.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
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

Template.BloggerInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("bloggerInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("bloggerInsertInsertFormErrorMessage");
	}
	
});
