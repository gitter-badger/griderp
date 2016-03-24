var pageSession = new ReactiveDict();

Template.DeliveryNoteEdit.rendered = function() {
	
};

Template.DeliveryNoteEdit.events({
	
});

Template.DeliveryNoteEdit.helpers({
	
});

Template.DeliveryNoteEditEditForm.rendered = function() {
	

	pageSession.set("deliveryNoteEditEditFormInfoMessage", "");
	pageSession.set("deliveryNoteEditEditFormErrorMessage", "");

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

	$('.summernote').summernote({
		height: 300,
		focus: false,
		codemirror: {
			htmlMode: true,
			lineNumbers: true,
			mode: 'text/html'
		}
	});

};

Template.DeliveryNoteEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("deliveryNoteEditEditFormInfoMessage", "");
		pageSession.set("deliveryNoteEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var deliveryNoteEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(deliveryNoteEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("deliveryNoteEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("stock.documents.delivery_note", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("deliveryNoteEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				DeliveryNote.update({ _id: t.data.delivery_note_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("stock.documents.delivery_note", {});
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

Template.DeliveryNoteEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("deliveryNoteEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("deliveryNoteEditEditFormErrorMessage");
	}
	
});
