var pageSession = new ReactiveDict();

Template.DoctypesItemVariantAttribute.rendered = function() {
	
};

Template.DoctypesItemVariantAttribute.events({
	
});

Template.DoctypesItemVariantAttribute.helpers({
	
});

Template.DoctypesItemVariantAttributeForm.rendered = function() {
	

	pageSession.set("doctypesItemVariantAttributeFormInfoMessage", "");
	pageSession.set("doctypesItemVariantAttributeFormErrorMessage", "");

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

Template.DoctypesItemVariantAttributeForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("doctypesItemVariantAttributeFormInfoMessage", "");
		pageSession.set("doctypesItemVariantAttributeFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var doctypesItemVariantAttributeFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(doctypesItemVariantAttributeFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("doctypesItemVariantAttributeFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("doctypesItemVariantAttributeFormErrorMessage", message);
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

Template.DoctypesItemVariantAttributeForm.helpers({
	"infoMessage": function() {
		return pageSession.get("doctypesItemVariantAttributeFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("doctypesItemVariantAttributeFormErrorMessage");
	}
	
});
