var pageSession = new ReactiveDict();

Template.LeadInsert.rendered = function() {
	
};

Template.LeadInsert.events({
	
});

Template.LeadInsert.helpers({
	
});

Template.LeadInsertInsertForm.rendered = function() {
	

	pageSession.set("leadInsertInsertFormInfoMessage", "");
	pageSession.set("leadInsertInsertFormErrorMessage", "");

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

Template.LeadInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("leadInsertInsertFormInfoMessage", "");
		pageSession.set("leadInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var leadInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(leadInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("leadInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("crm.documents.lead", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("leadInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = Lead.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("crm.documents.lead", {});
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

Template.LeadInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("leadInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("leadInsertInsertFormErrorMessage");
	}
	
});
