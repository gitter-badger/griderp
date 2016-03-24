var pageSession = new ReactiveDict();

Template.OperationEdit.rendered = function() {
	
};

Template.OperationEdit.events({
	
});

Template.OperationEdit.helpers({
	
});

Template.OperationEditEditForm.rendered = function() {
	

	pageSession.set("operationEditEditFormInfoMessage", "");
	pageSession.set("operationEditEditFormErrorMessage", "");

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

Template.OperationEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("operationEditEditFormInfoMessage", "");
		pageSession.set("operationEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var operationEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(operationEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("operationEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("manufacturing.documents.operation", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("operationEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Operation.update({ _id: t.data.operation_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("manufacturing.documents.operation", {});
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

Template.OperationEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("operationEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("operationEditEditFormErrorMessage");
	}
	
});
