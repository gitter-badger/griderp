var pageSession = new ReactiveDict();

Template.BloggerDetails.rendered = function() {
	
};

Template.BloggerDetails.events({
	
});

Template.BloggerDetails.helpers({
	
});

Template.BloggerDetailsDetailsForm.rendered = function() {
	

	pageSession.set("bloggerDetailsDetailsFormInfoMessage", "");
	pageSession.set("bloggerDetailsDetailsFormErrorMessage", "");

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

Template.BloggerDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("bloggerDetailsDetailsFormInfoMessage", "");
		pageSession.set("bloggerDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var bloggerDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(bloggerDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("bloggerDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("bloggerDetailsDetailsFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		/*CANCEL_REDIRECT*/
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		Router.go("website.documents.blogger", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("website.documents.blogger", {});
	}

	
});

Template.BloggerDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("bloggerDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("bloggerDetailsDetailsFormErrorMessage");
	}
	
});
