var pageSession = new ReactiveDict();

Template.CommunicationEdit.rendered = function() {
	
};

Template.CommunicationEdit.events({
	
});

Template.CommunicationEdit.helpers({
	
});

Template.CommunicationEditEditForm.rendered = function() {
	

	pageSession.set("communicationEditEditFormInfoMessage", "");
	pageSession.set("communicationEditEditFormErrorMessage", "");

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

Template.CommunicationEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("communicationEditEditFormInfoMessage", "");
		pageSession.set("communicationEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var communicationEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(communicationEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("communicationEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("core_settings.setup.communication", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("communicationEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Communication.update({ _id: t.data.communication_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
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

Template.CommunicationEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("communicationEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("communicationEditEditFormErrorMessage");
	}
	
});
