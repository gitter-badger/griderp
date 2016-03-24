var pageSession = new ReactiveDict();

Template.DoctypesProductBundleItem.rendered = function() {
	
};

Template.DoctypesProductBundleItem.events({
	
});

Template.DoctypesProductBundleItem.helpers({
	
});

Template.DoctypesProductBundleItemForm.rendered = function() {
	

	pageSession.set("doctypesProductBundleItemFormInfoMessage", "");
	pageSession.set("doctypesProductBundleItemFormErrorMessage", "");

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

Template.DoctypesProductBundleItemForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("doctypesProductBundleItemFormInfoMessage", "");
		pageSession.set("doctypesProductBundleItemFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var doctypesProductBundleItemFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(doctypesProductBundleItemFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("doctypesProductBundleItemFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("doctypesProductBundleItemFormErrorMessage", message);
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

		Router.go("setup.customize.doctype", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("setup.customize.doctype", {});
	}

	
});

Template.DoctypesProductBundleItemForm.helpers({
	"infoMessage": function() {
		return pageSession.get("doctypesProductBundleItemFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("doctypesProductBundleItemFormErrorMessage");
	}
	
});
