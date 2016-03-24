var pageSession = new ReactiveDict();

Template.BomEdit.rendered = function() {
	
};

Template.BomEdit.events({
	
});

Template.BomEdit.helpers({
	
});

Template.BomEditEditForm.rendered = function() {
	

	pageSession.set("bomEditEditFormInfoMessage", "");
	pageSession.set("bomEditEditFormErrorMessage", "");

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

Template.BomEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("bomEditEditFormInfoMessage", "");
		pageSession.set("bomEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var bomEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(bomEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("bomEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("manufacturing.documents.bill_of_material", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("bomEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Bom.update({ _id: t.data.bom_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("manufacturing.documents.bill_of_material", {});
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

Template.BomEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("bomEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("bomEditEditFormErrorMessage");
	}
	
});
