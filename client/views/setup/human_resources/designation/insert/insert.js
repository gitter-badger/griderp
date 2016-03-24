var pageSession = new ReactiveDict();

Template.DesignationInsert.rendered = function() {
	
};

Template.DesignationInsert.events({
	
});

Template.DesignationInsert.helpers({
	
});

Template.DesignationInsertInsertForm.rendered = function() {
	

	pageSession.set("designationInsertInsertFormInfoMessage", "");
	pageSession.set("designationInsertInsertFormErrorMessage", "");

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

Template.DesignationInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("designationInsertInsertFormInfoMessage", "");
		pageSession.set("designationInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var designationInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(designationInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("designationInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("setup.human_resources.designation", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("designationInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = Designation.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("setup.human_resources.designation", {});
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

Template.DesignationInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("designationInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("designationInsertInsertFormErrorMessage");
	}
	
});
