var pageSession = new ReactiveDict();

Template.PosProfileEdit.rendered = function() {
	
};

Template.PosProfileEdit.events({
	
});

Template.PosProfileEdit.helpers({
	
});

Template.PosProfileEditEditForm.rendered = function() {
	

	pageSession.set("posProfileEditEditFormInfoMessage", "");
	pageSession.set("posProfileEditEditFormErrorMessage", "");

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

Template.PosProfileEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("posProfileEditEditFormInfoMessage", "");
		pageSession.set("posProfileEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var posProfileEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(posProfileEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("posProfileEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("setup.accounts.point_of_sale_profile", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("posProfileEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				PosProfile.update({ _id: t.data.pos_profile_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("setup.accounts.point_of_sale_profile", {});
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

Template.PosProfileEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("posProfileEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("posProfileEditEditFormErrorMessage");
	}
	
});
