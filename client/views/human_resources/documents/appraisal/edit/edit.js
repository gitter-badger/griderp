var pageSession = new ReactiveDict();

Template.AppraisalEdit.rendered = function() {
	
};

Template.AppraisalEdit.events({
	
});

Template.AppraisalEdit.helpers({
	
});

Template.AppraisalEditEditForm.rendered = function() {
	

	pageSession.set("appraisalEditEditFormInfoMessage", "");
	pageSession.set("appraisalEditEditFormErrorMessage", "");

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

Template.AppraisalEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("appraisalEditEditFormInfoMessage", "");
		pageSession.set("appraisalEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var appraisalEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(appraisalEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("appraisalEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("human_resources.documents.appraisal", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("appraisalEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Appraisal.update({ _id: t.data.appraisal_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("human_resources.documents.appraisal", {});
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

Template.AppraisalEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("appraisalEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("appraisalEditEditFormErrorMessage");
	}
	
});
