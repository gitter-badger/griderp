var pageSession = new ReactiveDict();

Template.QualityInspectionEdit.rendered = function() {
	
};

Template.QualityInspectionEdit.events({
	
});

Template.QualityInspectionEdit.helpers({
	
});

Template.QualityInspectionEditEditForm.rendered = function() {
	

	pageSession.set("qualityInspectionEditEditFormInfoMessage", "");
	pageSession.set("qualityInspectionEditEditFormErrorMessage", "");

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

Template.QualityInspectionEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("qualityInspectionEditEditFormInfoMessage", "");
		pageSession.set("qualityInspectionEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var qualityInspectionEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(qualityInspectionEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("qualityInspectionEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("stock.tools.quality_inspection", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("qualityInspectionEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				QualityInspection.update({ _id: t.data.quality_inspection_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("stock.tools.quality_inspection", {});
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

Template.QualityInspectionEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("qualityInspectionEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("qualityInspectionEditEditFormErrorMessage");
	}
	
});
