var pageSession = new ReactiveDict();

Template.MaterialRequestEdit.rendered = function() {
	
};

Template.MaterialRequestEdit.events({
	
});

Template.MaterialRequestEdit.helpers({
	
});

Template.MaterialRequestEditEditForm.rendered = function() {
	

	pageSession.set("materialRequestEditEditFormInfoMessage", "");
	pageSession.set("materialRequestEditEditFormErrorMessage", "");

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

Template.MaterialRequestEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("materialRequestEditEditFormInfoMessage", "");
		pageSession.set("materialRequestEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var materialRequestEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(materialRequestEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("materialRequestEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("purchasing.documents.material_request", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("materialRequestEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				MaterialRequest.update({ _id: t.data.material_request_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("purchasing.documents.material_request", {});
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

Template.MaterialRequestEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("materialRequestEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("materialRequestEditEditFormErrorMessage");
	}
	
});
