var pageSession = new ReactiveDict();

Template.ProductBundleInsert.rendered = function() {
	
};

Template.ProductBundleInsert.events({
	
});

Template.ProductBundleInsert.helpers({
	
});

Template.ProductBundleInsertInsertForm.rendered = function() {
	

	pageSession.set("productBundleInsertInsertFormInfoMessage", "");
	pageSession.set("productBundleInsertInsertFormErrorMessage", "");

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

Template.ProductBundleInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("productBundleInsertInsertFormInfoMessage", "");
		pageSession.set("productBundleInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var productBundleInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(productBundleInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("productBundleInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("setup.selling.product_bundle", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("productBundleInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = ProductBundle.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
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

Template.ProductBundleInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("productBundleInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("productBundleInsertInsertFormErrorMessage");
	}
	
});
