var pageSession = new ReactiveDict();

Template.WebsiteSlideshowInsert.rendered = function() {
	
};

Template.WebsiteSlideshowInsert.events({
	
});

Template.WebsiteSlideshowInsert.helpers({
	
});

Template.WebsiteSlideshowInsertInsertForm.rendered = function() {
	

	pageSession.set("websiteSlideshowInsertInsertFormInfoMessage", "");
	pageSession.set("websiteSlideshowInsertInsertFormErrorMessage", "");

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

Template.WebsiteSlideshowInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("websiteSlideshowInsertInsertFormInfoMessage", "");
		pageSession.set("websiteSlideshowInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var websiteSlideshowInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(websiteSlideshowInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("websiteSlideshowInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("website.documents.website_slideshow", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("websiteSlideshowInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = WebsiteSlideshow.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("website.documents.website_slideshow", {});
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

Template.WebsiteSlideshowInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("websiteSlideshowInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("websiteSlideshowInsertInsertFormErrorMessage");
	}
	
});
