var pageSession = new ReactiveDict();

Template.CampaignEdit.rendered = function() {
	
};

Template.CampaignEdit.events({
	
});

Template.CampaignEdit.helpers({
	
});

Template.CampaignEditEditForm.rendered = function() {
	

	pageSession.set("campaignEditEditFormInfoMessage", "");
	pageSession.set("campaignEditEditFormErrorMessage", "");

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

Template.CampaignEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("campaignEditEditFormInfoMessage", "");
		pageSession.set("campaignEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var campaignEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(campaignEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("campaignEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("crm.setup.campaign", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("campaignEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Campaign.update({ _id: t.data.campaign_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("crm.setup.campaign", {});
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

Template.CampaignEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("campaignEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("campaignEditEditFormErrorMessage");
	}
	
});
