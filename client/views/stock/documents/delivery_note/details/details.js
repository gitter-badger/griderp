var pageSession = new ReactiveDict();

Template.DeliveryNoteDetails.rendered = function() {
	
};

Template.DeliveryNoteDetails.events({
	
});

Template.DeliveryNoteDetails.helpers({
	
});

Template.DeliveryNoteDetailsDetailsForm.rendered = function() {
	

	pageSession.set("deliveryNoteDetailsDetailsFormInfoMessage", "");
	pageSession.set("deliveryNoteDetailsDetailsFormErrorMessage", "");

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

Template.DeliveryNoteDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("deliveryNoteDetailsDetailsFormInfoMessage", "");
		pageSession.set("deliveryNoteDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var deliveryNoteDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(deliveryNoteDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("deliveryNoteDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("deliveryNoteDetailsDetailsFormErrorMessage", message);
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

		Router.go("stock.documents.delivery_note", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("stock.documents.delivery_note", {});
	}

	
});

Template.DeliveryNoteDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("deliveryNoteDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("deliveryNoteDetailsDetailsFormErrorMessage");
	}
	
});
