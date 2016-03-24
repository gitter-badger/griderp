var pageSession = new ReactiveDict();

Template.QualityInspectionDetails.rendered = function() {
	
};

Template.QualityInspectionDetails.events({
	
});

Template.QualityInspectionDetails.helpers({
	
});

Template.QualityInspectionDetailsDetailsForm.rendered = function() {
	

	pageSession.set("qualityInspectionDetailsDetailsFormInfoMessage", "");
	pageSession.set("qualityInspectionDetailsDetailsFormErrorMessage", "");

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

Template.QualityInspectionDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("qualityInspectionDetailsDetailsFormInfoMessage", "");
		pageSession.set("qualityInspectionDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var qualityInspectionDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(qualityInspectionDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("qualityInspectionDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("qualityInspectionDetailsDetailsFormErrorMessage", message);
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

		Router.go("stock.tools.quality_inspection", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("stock.tools.quality_inspection", {});
	}

	
});

Template.QualityInspectionDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("qualityInspectionDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("qualityInspectionDetailsDetailsFormErrorMessage");
	}
	
});
