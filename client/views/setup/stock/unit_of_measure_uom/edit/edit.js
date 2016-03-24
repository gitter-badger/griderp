var pageSession = new ReactiveDict();

Template.UomEdit.rendered = function() {
	
};

Template.UomEdit.events({
	
});

Template.UomEdit.helpers({
	
});

Template.UomEditEditForm.rendered = function() {
	

	pageSession.set("uomEditEditFormInfoMessage", "");
	pageSession.set("uomEditEditFormErrorMessage", "");

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

Template.UomEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("uomEditEditFormInfoMessage", "");
		pageSession.set("uomEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var uomEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(uomEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("uomEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("setup.stock.unit_of_measure_uom", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("uomEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Uom.update({ _id: t.data.uom_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("setup.stock.unit_of_measure_uom", {});
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

Template.UomEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("uomEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("uomEditEditFormErrorMessage");
	}
	
});
