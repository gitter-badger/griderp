var pageSession = new ReactiveDict();

Template.CommunicationInsert.rendered = function() {
	
};

Template.CommunicationInsert.events({
	
});

Template.CommunicationInsert.helpers({
	
});

Template.CommunicationInsertInsertForm.rendered = function() {
	

	pageSession.set("communicationInsertInsertFormInfoMessage", "");
	pageSession.set("communicationInsertInsertFormErrorMessage", "");

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

Template.CommunicationInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("communicationInsertInsertFormInfoMessage", "");
		pageSession.set("communicationInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var communicationInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(communicationInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("communicationInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("core_settings.setup.communication", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("communicationInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = Communication.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("core_settings.setup.communication", {});
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

Template.CommunicationInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("communicationInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("communicationInsertInsertFormErrorMessage");
	}
	
});
