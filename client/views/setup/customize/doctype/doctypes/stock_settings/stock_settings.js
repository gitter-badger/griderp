var pageSession = new ReactiveDict();

Template.DoctypesStockSettings.rendered = function() {
	
};

Template.DoctypesStockSettings.events({
	
});

Template.DoctypesStockSettings.helpers({
	
});

Template.DoctypesStockSettingsForm.rendered = function() {
	

	pageSession.set("doctypesStockSettingsFormInfoMessage", "");
	pageSession.set("doctypesStockSettingsFormErrorMessage", "");

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

Template.DoctypesStockSettingsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("doctypesStockSettingsFormInfoMessage", "");
		pageSession.set("doctypesStockSettingsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var doctypesStockSettingsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(doctypesStockSettingsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("doctypesStockSettingsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("doctypesStockSettingsFormErrorMessage", message);
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

Template.DoctypesStockSettingsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("doctypesStockSettingsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("doctypesStockSettingsFormErrorMessage");
	}
	
});
