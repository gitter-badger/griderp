var pageSession = new ReactiveDict();

Template.ItemAttributeDetails.rendered = function() {
	
};

Template.ItemAttributeDetails.events({
	
});

Template.ItemAttributeDetails.helpers({
	
});

Template.ItemAttributeDetailsDetailsForm.rendered = function() {
	

	pageSession.set("itemAttributeDetailsDetailsFormInfoMessage", "");
	pageSession.set("itemAttributeDetailsDetailsFormErrorMessage", "");

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

Template.ItemAttributeDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("itemAttributeDetailsDetailsFormInfoMessage", "");
		pageSession.set("itemAttributeDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var itemAttributeDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(itemAttributeDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("itemAttributeDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("itemAttributeDetailsDetailsFormErrorMessage", message);
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

		Router.go("setup.stock.item_attribute", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("setup.stock.item_attribute", {});
	}

	
});

Template.ItemAttributeDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("itemAttributeDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("itemAttributeDetailsDetailsFormErrorMessage");
	}
	
});
