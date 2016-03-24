var pageSession = new ReactiveDict();

Template.UomDetails.rendered = function() {
	
};

Template.UomDetails.events({
	
});

Template.UomDetails.helpers({
	
});

Template.UomDetailsDetailsForm.rendered = function() {
	

	pageSession.set("uomDetailsDetailsFormInfoMessage", "");
	pageSession.set("uomDetailsDetailsFormErrorMessage", "");

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

Template.UomDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("uomDetailsDetailsFormInfoMessage", "");
		pageSession.set("uomDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var uomDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(uomDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("uomDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("uomDetailsDetailsFormErrorMessage", message);
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

		Router.go("setup.stock.unit_of_measure_uom", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("setup.stock.unit_of_measure_uom", {});
	}

	
});

Template.UomDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("uomDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("uomDetailsDetailsFormErrorMessage");
	}
	
});
