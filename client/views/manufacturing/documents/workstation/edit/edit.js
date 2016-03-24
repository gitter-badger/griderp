var pageSession = new ReactiveDict();

Template.WorkstationEdit.rendered = function() {
	
};

Template.WorkstationEdit.events({
	
});

Template.WorkstationEdit.helpers({
	
});

Template.WorkstationEditEditForm.rendered = function() {
	

	pageSession.set("workstationEditEditFormInfoMessage", "");
	pageSession.set("workstationEditEditFormErrorMessage", "");

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

Template.WorkstationEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("workstationEditEditFormInfoMessage", "");
		pageSession.set("workstationEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var workstationEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(workstationEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("workstationEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("manufacturing.documents.workstation", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("workstationEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Workstation.update({ _id: t.data.workstation_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("manufacturing.documents.workstation", {});
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

Template.WorkstationEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("workstationEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("workstationEditEditFormErrorMessage");
	}
	
});
