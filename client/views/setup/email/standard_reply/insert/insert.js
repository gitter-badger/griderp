var pageSession = new ReactiveDict();

Template.StandardReplyInsert.rendered = function() {
	
};

Template.StandardReplyInsert.events({
	
});

Template.StandardReplyInsert.helpers({
	
});

Template.StandardReplyInsertInsertForm.rendered = function() {
	

	pageSession.set("standardReplyInsertInsertFormInfoMessage", "");
	pageSession.set("standardReplyInsertInsertFormErrorMessage", "");

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

Template.StandardReplyInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("standardReplyInsertInsertFormInfoMessage", "");
		pageSession.set("standardReplyInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var standardReplyInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(standardReplyInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("standardReplyInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("setup.email.standard_reply", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("standardReplyInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = StandardReply.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
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

Template.StandardReplyInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("standardReplyInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("standardReplyInsertInsertFormErrorMessage");
	}
	
});
