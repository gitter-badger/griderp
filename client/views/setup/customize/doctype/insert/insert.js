var pageSession = new ReactiveDict();

Template.DoctypeInsert.rendered = function() {
	
};

Template.DoctypeInsert.events({
	
});

Template.DoctypeInsert.helpers({
	
});

Template.DoctypeInsertInsertForm.rendered = function() {
	

	pageSession.set("doctypeInsertInsertFormInfoMessage", "");
	pageSession.set("doctypeInsertInsertFormErrorMessage", "");

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

Template.DoctypeInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("doctypeInsertInsertFormInfoMessage", "");
		pageSession.set("doctypeInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var doctypeInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(doctypeInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("doctypeInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("setup.customize.doctype", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("doctypeInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = Doctype.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("setup.customize.doctype", {});
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

Template.DoctypeInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("doctypeInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("doctypeInsertInsertFormErrorMessage");
	}
	
});
