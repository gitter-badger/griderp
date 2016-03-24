var pageSession = new ReactiveDict();

Template.DoctypesDeliveryNoteItem.rendered = function() {
	
};

Template.DoctypesDeliveryNoteItem.events({
	
});

Template.DoctypesDeliveryNoteItem.helpers({
	
});

Template.DoctypesDeliveryNoteItemForm.rendered = function() {
	

	pageSession.set("doctypesDeliveryNoteItemFormInfoMessage", "");
	pageSession.set("doctypesDeliveryNoteItemFormErrorMessage", "");

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

Template.DoctypesDeliveryNoteItemForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("doctypesDeliveryNoteItemFormInfoMessage", "");
		pageSession.set("doctypesDeliveryNoteItemFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var doctypesDeliveryNoteItemFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(doctypesDeliveryNoteItemFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("doctypesDeliveryNoteItemFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("doctypesDeliveryNoteItemFormErrorMessage", message);
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

Template.DoctypesDeliveryNoteItemForm.helpers({
	"infoMessage": function() {
		return pageSession.get("doctypesDeliveryNoteItemFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("doctypesDeliveryNoteItemFormErrorMessage");
	}
	
});
