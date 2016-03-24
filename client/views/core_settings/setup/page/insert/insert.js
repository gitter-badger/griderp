var pageSession = new ReactiveDict();

Template.PageInsert.rendered = function() {
	
};

Template.PageInsert.events({
	
});

Template.PageInsert.helpers({
	
});

Template.PageInsertInsertForm.rendered = function() {
	

	pageSession.set("pageInsertInsertFormInfoMessage", "");
	pageSession.set("pageInsertInsertFormErrorMessage", "");

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

Template.PageInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("pageInsertInsertFormInfoMessage", "");
		pageSession.set("pageInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var pageInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(pageInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("pageInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("core_settings.setup.page", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("pageInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = Page.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("core_settings.setup.page", {});
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

Template.PageInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("pageInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("pageInsertInsertFormErrorMessage");
	}
	
});
