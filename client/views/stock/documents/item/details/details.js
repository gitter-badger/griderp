var pageSession = new ReactiveDict();

Template.ItemDetails.rendered = function() {
	
};

Template.ItemDetails.events({
	
});

Template.ItemDetails.helpers({
	
});

Template.ItemDetailsDetailsForm.rendered = function() {
	

	pageSession.set("itemDetailsDetailsFormInfoMessage", "");
	pageSession.set("itemDetailsDetailsFormErrorMessage", "");

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

Template.ItemDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("itemDetailsDetailsFormInfoMessage", "");
		pageSession.set("itemDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var itemDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(itemDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("itemDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("itemDetailsDetailsFormErrorMessage", message);
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

		Router.go("stock.documents.item", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("stock.documents.item", {});
	}

	
});

Template.ItemDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("itemDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("itemDetailsDetailsFormErrorMessage");
	}
	
});
