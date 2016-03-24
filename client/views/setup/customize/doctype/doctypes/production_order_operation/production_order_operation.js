var pageSession = new ReactiveDict();

Template.DoctypesProductionOrderOperation.rendered = function() {
	
};

Template.DoctypesProductionOrderOperation.events({
	
});

Template.DoctypesProductionOrderOperation.helpers({
	
});

Template.DoctypesProductionOrderOperationForm.rendered = function() {
	

	pageSession.set("doctypesProductionOrderOperationFormInfoMessage", "");
	pageSession.set("doctypesProductionOrderOperationFormErrorMessage", "");

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

Template.DoctypesProductionOrderOperationForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("doctypesProductionOrderOperationFormInfoMessage", "");
		pageSession.set("doctypesProductionOrderOperationFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var doctypesProductionOrderOperationFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(doctypesProductionOrderOperationFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("doctypesProductionOrderOperationFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("doctypesProductionOrderOperationFormErrorMessage", message);
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

Template.DoctypesProductionOrderOperationForm.helpers({
	"infoMessage": function() {
		return pageSession.get("doctypesProductionOrderOperationFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("doctypesProductionOrderOperationFormErrorMessage");
	}
	
});
