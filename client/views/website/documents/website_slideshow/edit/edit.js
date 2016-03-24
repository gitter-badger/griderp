var pageSession = new ReactiveDict();

Template.WebsiteSlideshowEdit.rendered = function() {
	
};

Template.WebsiteSlideshowEdit.events({
	
});

Template.WebsiteSlideshowEdit.helpers({
	
});

Template.WebsiteSlideshowEditEditForm.rendered = function() {
	

	pageSession.set("websiteSlideshowEditEditFormInfoMessage", "");
	pageSession.set("websiteSlideshowEditEditFormErrorMessage", "");

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

Template.WebsiteSlideshowEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("websiteSlideshowEditEditFormInfoMessage", "");
		pageSession.set("websiteSlideshowEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var websiteSlideshowEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(websiteSlideshowEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("websiteSlideshowEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("website.documents.website_slideshow", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("websiteSlideshowEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				WebsiteSlideshow.update({ _id: t.data.website_slideshow_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
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

Template.WebsiteSlideshowEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("websiteSlideshowEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("websiteSlideshowEditEditFormErrorMessage");
	}
	
});
