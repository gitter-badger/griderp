var pageSession = new ReactiveDict();

Template.CustomerEdit.rendered = function() {
	
};

Template.CustomerEdit.events({
	
});

Template.CustomerEdit.helpers({
	
});

Template.CustomerEditEditForm.rendered = function() {
	

	pageSession.set("customerEditEditFormInfoMessage", "");
	pageSession.set("customerEditEditFormErrorMessage", "");

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

Template.CustomerEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("customerEditEditFormInfoMessage", "");
		pageSession.set("customerEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var customerEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(customerEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("customerEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("accounts.documents.customer", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("customerEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Customer.update({ _id: t.data.customer_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("accounts.documents.customer", {});
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

Template.CustomerEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("customerEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("customerEditEditFormErrorMessage");
	}
	
});
