var pageSession = new ReactiveDict();

Template.DesignationEdit.rendered = function() {
	
};

Template.DesignationEdit.events({
	
});

Template.DesignationEdit.helpers({
	
});

Template.DesignationEditEditForm.rendered = function() {
	

	pageSession.set("designationEditEditFormInfoMessage", "");
	pageSession.set("designationEditEditFormErrorMessage", "");

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

Template.DesignationEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("designationEditEditFormInfoMessage", "");
		pageSession.set("designationEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var designationEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(designationEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("designationEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("setup.human_resources.designation", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("designationEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Designation.update({ _id: t.data.designation_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
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

Template.DesignationEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("designationEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("designationEditEditFormErrorMessage");
	}
	
});
