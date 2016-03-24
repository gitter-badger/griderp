var pageSession = new ReactiveDict();

Template.DoctypesCostCenter.rendered = function() {
	
};

Template.DoctypesCostCenter.events({
	
});

Template.DoctypesCostCenter.helpers({
	
});

Template.DoctypesCostCenterForm.rendered = function() {
	

	pageSession.set("doctypesCostCenterFormInfoMessage", "");
	pageSession.set("doctypesCostCenterFormErrorMessage", "");

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

Template.DoctypesCostCenterForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("doctypesCostCenterFormInfoMessage", "");
		pageSession.set("doctypesCostCenterFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var doctypesCostCenterFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(doctypesCostCenterFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("doctypesCostCenterFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("doctypesCostCenterFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		/*CANCEL_REDIRECT*/
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		Router.go("setup.customize.doctype", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("setup.customize.doctype", {});
	}

	
});

Template.DoctypesCostCenterForm.helpers({
	"infoMessage": function() {
		return pageSession.get("doctypesCostCenterFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("doctypesCostCenterFormErrorMessage");
	}
	
});
