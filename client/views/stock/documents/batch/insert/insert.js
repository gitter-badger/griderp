var pageSession = new ReactiveDict();

Template.BatchInsert.rendered = function() {
	
};

Template.BatchInsert.events({
	
});

Template.BatchInsert.helpers({
	
});

Template.BatchInsertInsertForm.rendered = function() {
	

	pageSession.set("batchInsertInsertFormInfoMessage", "");
	pageSession.set("batchInsertInsertFormErrorMessage", "");

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

Template.BatchInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("batchInsertInsertFormInfoMessage", "");
		pageSession.set("batchInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var batchInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(batchInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("batchInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("stock.documents.batch", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("batchInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = Batch.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("stock.documents.batch", {});
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

Template.BatchInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("batchInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("batchInsertInsertFormErrorMessage");
	}
	
});
