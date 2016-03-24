var pageSession = new ReactiveDict();

Template.LeadEdit.rendered = function() {
	
};

Template.LeadEdit.events({
	
});

Template.LeadEdit.helpers({
	
});

Template.LeadEditEditForm.rendered = function() {
	

	pageSession.set("leadEditEditFormInfoMessage", "");
	pageSession.set("leadEditEditFormErrorMessage", "");

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

Template.LeadEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("leadEditEditFormInfoMessage", "");
		pageSession.set("leadEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var leadEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(leadEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("leadEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("crm.documents.lead", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("leadEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Lead.update({ _id: t.data.lead_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
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

Template.LeadEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("leadEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("leadEditEditFormErrorMessage");
	}
	
});
