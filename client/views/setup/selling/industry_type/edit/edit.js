var pageSession = new ReactiveDict();

Template.IndustryTypeEdit.rendered = function() {
	
};

Template.IndustryTypeEdit.events({
	
});

Template.IndustryTypeEdit.helpers({
	
});

Template.IndustryTypeEditEditForm.rendered = function() {
	

	pageSession.set("industryTypeEditEditFormInfoMessage", "");
	pageSession.set("industryTypeEditEditFormErrorMessage", "");

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

Template.IndustryTypeEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("industryTypeEditEditFormInfoMessage", "");
		pageSession.set("industryTypeEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var industryTypeEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(industryTypeEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("industryTypeEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("setup.selling.industry_type", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("industryTypeEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				IndustryType.update({ _id: t.data.industry_type_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("setup.selling.industry_type", {});
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

Template.IndustryTypeEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("industryTypeEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("industryTypeEditEditFormErrorMessage");
	}
	
});
