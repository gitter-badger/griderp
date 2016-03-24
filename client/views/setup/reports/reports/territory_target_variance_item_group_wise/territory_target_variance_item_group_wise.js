var pageSession = new ReactiveDict();

Template.ReportsTerritoryTargetVarianceItemGroupWise.rendered = function() {
	
};

Template.ReportsTerritoryTargetVarianceItemGroupWise.events({
	
});

Template.ReportsTerritoryTargetVarianceItemGroupWise.helpers({
	
});

Template.ReportsTerritoryTargetVarianceItemGroupWiseForm.rendered = function() {
	

	pageSession.set("reportsTerritoryTargetVarianceItemGroupWiseFormInfoMessage", "");
	pageSession.set("reportsTerritoryTargetVarianceItemGroupWiseFormErrorMessage", "");

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

Template.ReportsTerritoryTargetVarianceItemGroupWiseForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("reportsTerritoryTargetVarianceItemGroupWiseFormInfoMessage", "");
		pageSession.set("reportsTerritoryTargetVarianceItemGroupWiseFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var reportsTerritoryTargetVarianceItemGroupWiseFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(reportsTerritoryTargetVarianceItemGroupWiseFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("reportsTerritoryTargetVarianceItemGroupWiseFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("reportsTerritoryTargetVarianceItemGroupWiseFormErrorMessage", message);
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

		Router.go("setup.reports.reports", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("setup.reports.reports", {});
	}

	
});

Template.ReportsTerritoryTargetVarianceItemGroupWiseForm.helpers({
	"infoMessage": function() {
		return pageSession.get("reportsTerritoryTargetVarianceItemGroupWiseFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("reportsTerritoryTargetVarianceItemGroupWiseFormErrorMessage");
	}
	
});
