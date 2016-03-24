var pageSession = new ReactiveDict();

Template.AddressDetails.rendered = function() {
	
};

Template.AddressDetails.events({
	
});

Template.AddressDetails.helpers({
	
});

Template.AddressDetailsDetailsForm.rendered = function() {
	

	pageSession.set("addressDetailsDetailsFormInfoMessage", "");
	pageSession.set("addressDetailsDetailsFormErrorMessage", "");

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

Template.AddressDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("addressDetailsDetailsFormInfoMessage", "");
		pageSession.set("addressDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var addressDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(addressDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("addressDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("addressDetailsDetailsFormErrorMessage", message);
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

		Router.go("purchasing.documents.address", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("purchasing.documents.address", {});
	}

	
});

Template.AddressDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("addressDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("addressDetailsDetailsFormErrorMessage");
	}
	
});
