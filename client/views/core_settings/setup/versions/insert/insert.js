var pageSession = new ReactiveDict();

Template.VersionsInsert.rendered = function() {
	
};

Template.VersionsInsert.events({
	
});

Template.VersionsInsert.helpers({
	
});

Template.VersionsInsertInsertForm.rendered = function() {
	

	pageSession.set("versionsInsertInsertFormInfoMessage", "");
	pageSession.set("versionsInsertInsertFormErrorMessage", "");

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

Template.VersionsInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("versionsInsertInsertFormInfoMessage", "");
		pageSession.set("versionsInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var versionsInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(versionsInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("versionsInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("core_settings.setup.versions", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("versionsInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = Versions.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("core_settings.setup.versions", {});
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

Template.VersionsInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("versionsInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("versionsInsertInsertFormErrorMessage");
	}
	
});
