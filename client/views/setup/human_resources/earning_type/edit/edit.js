var pageSession = new ReactiveDict();

Template.EarningTypeEdit.rendered = function() {
	
};

Template.EarningTypeEdit.events({
	
});

Template.EarningTypeEdit.helpers({
	
});

Template.EarningTypeEditEditForm.rendered = function() {
	

	pageSession.set("earningTypeEditEditFormInfoMessage", "");
	pageSession.set("earningTypeEditEditFormErrorMessage", "");

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

Template.EarningTypeEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("earningTypeEditEditFormInfoMessage", "");
		pageSession.set("earningTypeEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var earningTypeEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(earningTypeEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("earningTypeEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("setup.human_resources.earning_type", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("earningTypeEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				EarningType.update({ _id: t.data.earning_type_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("setup.human_resources.earning_type", {});
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

Template.EarningTypeEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("earningTypeEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("earningTypeEditEditFormErrorMessage");
	}
	
});
