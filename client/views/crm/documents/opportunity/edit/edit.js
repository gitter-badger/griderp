var pageSession = new ReactiveDict();

Template.OpportunityEdit.rendered = function() {
	
};

Template.OpportunityEdit.events({
	
});

Template.OpportunityEdit.helpers({
	
});

Template.OpportunityEditEditForm.rendered = function() {
	

	pageSession.set("opportunityEditEditFormInfoMessage", "");
	pageSession.set("opportunityEditEditFormErrorMessage", "");

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

Template.OpportunityEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("opportunityEditEditFormInfoMessage", "");
		pageSession.set("opportunityEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var opportunityEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(opportunityEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("opportunityEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("crm.documents.opportunity", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("opportunityEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Opportunity.update({ _id: t.data.opportunity_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
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

Template.OpportunityEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("opportunityEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("opportunityEditEditFormErrorMessage");
	}
	
});
