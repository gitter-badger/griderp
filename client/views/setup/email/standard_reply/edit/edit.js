var pageSession = new ReactiveDict();

Template.StandardReplyEdit.rendered = function() {
	
};

Template.StandardReplyEdit.events({
	
});

Template.StandardReplyEdit.helpers({
	
});

Template.StandardReplyEditEditForm.rendered = function() {
	

	pageSession.set("standardReplyEditEditFormInfoMessage", "");
	pageSession.set("standardReplyEditEditFormErrorMessage", "");

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

Template.StandardReplyEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("standardReplyEditEditFormInfoMessage", "");
		pageSession.set("standardReplyEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var standardReplyEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(standardReplyEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("standardReplyEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("setup.email.standard_reply", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("standardReplyEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				StandardReply.update({ _id: t.data.standard_reply_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("setup.email.standard_reply", {});
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

Template.StandardReplyEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("standardReplyEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("standardReplyEditEditFormErrorMessage");
	}
	
});
