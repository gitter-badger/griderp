var pageSession = new ReactiveDict();

Template.BlogCategoryEdit.rendered = function() {
	
};

Template.BlogCategoryEdit.events({
	
});

Template.BlogCategoryEdit.helpers({
	
});

Template.BlogCategoryEditEditForm.rendered = function() {
	

	pageSession.set("blogCategoryEditEditFormInfoMessage", "");
	pageSession.set("blogCategoryEditEditFormErrorMessage", "");

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

Template.BlogCategoryEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("blogCategoryEditEditFormInfoMessage", "");
		pageSession.set("blogCategoryEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var blogCategoryEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(blogCategoryEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("blogCategoryEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("setup.website.blog_category", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("blogCategoryEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				BlogCategory.update({ _id: t.data.blog_category_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("setup.website.blog_category", {});
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

Template.BlogCategoryEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("blogCategoryEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("blogCategoryEditEditFormErrorMessage");
	}
	
});
