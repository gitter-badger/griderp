var pageSession = new ReactiveDict();

Template.OperationInsert.rendered = function() {
	
};

Template.OperationInsert.events({
	
});

Template.OperationInsert.helpers({
	
});

Template.OperationInsertInsertForm.rendered = function() {
	

	pageSession.set("operationInsertInsertFormInfoMessage", "");
	pageSession.set("operationInsertInsertFormErrorMessage", "");

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

Template.OperationInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("operationInsertInsertFormInfoMessage", "");
		pageSession.set("operationInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var operationInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(operationInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("operationInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("manufacturing.documents.operation", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("operationInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = Operation.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
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

Template.OperationInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("operationInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("operationInsertInsertFormErrorMessage");
	}
	
});
