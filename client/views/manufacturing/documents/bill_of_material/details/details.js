var pageSession = new ReactiveDict();

Template.BomDetails.rendered = function() {
	
};

Template.BomDetails.events({
	
});

Template.BomDetails.helpers({
	
});

Template.BomDetailsDetailsForm.rendered = function() {
	

	pageSession.set("bomDetailsDetailsFormInfoMessage", "");
	pageSession.set("bomDetailsDetailsFormErrorMessage", "");

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

Template.BomDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("bomDetailsDetailsFormInfoMessage", "");
		pageSession.set("bomDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var bomDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(bomDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("bomDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("bomDetailsDetailsFormErrorMessage", message);
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

		Router.go("manufacturing.documents.bill_of_material", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("manufacturing.documents.bill_of_material", {});
	}

	
});

Template.BomDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("bomDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("bomDetailsDetailsFormErrorMessage");
	}
	
});
