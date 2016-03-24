var pageSession = new ReactiveDict();

Template.ProductBundleEdit.rendered = function() {
	
};

Template.ProductBundleEdit.events({
	
});

Template.ProductBundleEdit.helpers({
	
});

Template.ProductBundleEditEditForm.rendered = function() {
	

	pageSession.set("productBundleEditEditFormInfoMessage", "");
	pageSession.set("productBundleEditEditFormErrorMessage", "");

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

Template.ProductBundleEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("productBundleEditEditFormInfoMessage", "");
		pageSession.set("productBundleEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var productBundleEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(productBundleEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("productBundleEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("setup.selling.product_bundle", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("productBundleEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				ProductBundle.update({ _id: t.data.product_bundle_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("setup.selling.product_bundle", {});
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

Template.ProductBundleEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("productBundleEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("productBundleEditEditFormErrorMessage");
	}
	
});
