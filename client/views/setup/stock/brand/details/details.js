var pageSession = new ReactiveDict();

Template.BrandDetails.rendered = function() {
	
};

Template.BrandDetails.events({
	
});

Template.BrandDetails.helpers({
	
});

Template.BrandDetailsDetailsForm.rendered = function() {
	

	pageSession.set("brandDetailsDetailsFormInfoMessage", "");
	pageSession.set("brandDetailsDetailsFormErrorMessage", "");

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

Template.BrandDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("brandDetailsDetailsFormInfoMessage", "");
		pageSession.set("brandDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var brandDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(brandDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("brandDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("brandDetailsDetailsFormErrorMessage", message);
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

		Router.go("setup.stock.brand", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("setup.stock.brand", {});
	}

	
});

Template.BrandDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("brandDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("brandDetailsDetailsFormErrorMessage");
	}
	
});
