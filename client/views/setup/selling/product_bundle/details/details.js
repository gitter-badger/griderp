var pageSession = new ReactiveDict();

Template.ProductBundleDetails.rendered = function() {
	
};

Template.ProductBundleDetails.events({
	
});

Template.ProductBundleDetails.helpers({
	
});

Template.ProductBundleDetailsDetailsForm.rendered = function() {
	

	pageSession.set("productBundleDetailsDetailsFormInfoMessage", "");
	pageSession.set("productBundleDetailsDetailsFormErrorMessage", "");

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

Template.ProductBundleDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("productBundleDetailsDetailsFormInfoMessage", "");
		pageSession.set("productBundleDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var productBundleDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(productBundleDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("productBundleDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("productBundleDetailsDetailsFormErrorMessage", message);
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

		Router.go("setup.selling.product_bundle", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("setup.selling.product_bundle", {});
	}

	
});

Template.ProductBundleDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("productBundleDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("productBundleDetailsDetailsFormErrorMessage");
	}
	
});
