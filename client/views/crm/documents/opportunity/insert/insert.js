var pageSession = new ReactiveDict();

Template.OpportunityInsert.rendered = function() {
	
};

Template.OpportunityInsert.events({
	
});

Template.OpportunityInsert.helpers({
	
});

Template.OpportunityInsertInsertForm.rendered = function() {
	

	pageSession.set("opportunityInsertInsertFormInfoMessage", "");
	pageSession.set("opportunityInsertInsertFormErrorMessage", "");

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

Template.OpportunityInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("opportunityInsertInsertFormInfoMessage", "");
		pageSession.set("opportunityInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var opportunityInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(opportunityInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("opportunityInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("crm.documents.opportunity", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("opportunityInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = Opportunity.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("crm.documents.opportunity", {});
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

Template.OpportunityInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("opportunityInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("opportunityInsertInsertFormErrorMessage");
	}
	
});
