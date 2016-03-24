var pageSession = new ReactiveDict();

Template.PosProfileDetails.rendered = function() {
	
};

Template.PosProfileDetails.events({
	
});

Template.PosProfileDetails.helpers({
	
});

Template.PosProfileDetailsDetailsForm.rendered = function() {
	

	pageSession.set("posProfileDetailsDetailsFormInfoMessage", "");
	pageSession.set("posProfileDetailsDetailsFormErrorMessage", "");

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

Template.PosProfileDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("posProfileDetailsDetailsFormInfoMessage", "");
		pageSession.set("posProfileDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var posProfileDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(posProfileDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("posProfileDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("posProfileDetailsDetailsFormErrorMessage", message);
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

		Router.go("setup.accounts.point_of_sale_profile", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("setup.accounts.point_of_sale_profile", {});
	}

	
});

Template.PosProfileDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("posProfileDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("posProfileDetailsDetailsFormErrorMessage");
	}
	
});
