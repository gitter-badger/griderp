var pageSession = new ReactiveDict();

Template.DoctypesTargetDetail.rendered = function() {
	
};

Template.DoctypesTargetDetail.events({
	
});

Template.DoctypesTargetDetail.helpers({
	
});

Template.DoctypesTargetDetailForm.rendered = function() {
	

	pageSession.set("doctypesTargetDetailFormInfoMessage", "");
	pageSession.set("doctypesTargetDetailFormErrorMessage", "");

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

Template.DoctypesTargetDetailForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("doctypesTargetDetailFormInfoMessage", "");
		pageSession.set("doctypesTargetDetailFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var doctypesTargetDetailFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(doctypesTargetDetailFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("doctypesTargetDetailFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("doctypesTargetDetailFormErrorMessage", message);
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

Template.DoctypesTargetDetailForm.helpers({
	"infoMessage": function() {
		return pageSession.get("doctypesTargetDetailFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("doctypesTargetDetailFormErrorMessage");
	}
	
});
