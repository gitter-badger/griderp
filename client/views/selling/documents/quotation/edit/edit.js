var pageSession = new ReactiveDict();

Template.QuotationEdit.rendered = function() {
	
};

Template.QuotationEdit.events({
	
});

Template.QuotationEdit.helpers({
	
});

Template.QuotationEditEditForm.rendered = function() {
	

	pageSession.set("quotationEditEditFormInfoMessage", "");
	pageSession.set("quotationEditEditFormErrorMessage", "");

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

Template.QuotationEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("quotationEditEditFormInfoMessage", "");
		pageSession.set("quotationEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var quotationEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(quotationEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("quotationEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("selling.documents.quotation", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("quotationEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Quotation.update({ _id: t.data.quotation_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("selling.documents.quotation", {});
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

Template.QuotationEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("quotationEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("quotationEditEditFormErrorMessage");
	}
	
});
