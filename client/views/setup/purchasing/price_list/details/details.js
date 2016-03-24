var pageSession = new ReactiveDict();

Template.PriceListDetails.rendered = function() {
	
};

Template.PriceListDetails.events({
	
});

Template.PriceListDetails.helpers({
	
});

Template.PriceListDetailsDetailsForm.rendered = function() {
	

	pageSession.set("priceListDetailsDetailsFormInfoMessage", "");
	pageSession.set("priceListDetailsDetailsFormErrorMessage", "");

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

Template.PriceListDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("priceListDetailsDetailsFormInfoMessage", "");
		pageSession.set("priceListDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var priceListDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(priceListDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("priceListDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("priceListDetailsDetailsFormErrorMessage", message);
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

		Router.go("setup.purchasing.price_list", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("setup.purchasing.price_list", {});
	}

	
});

Template.PriceListDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("priceListDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("priceListDetailsDetailsFormErrorMessage");
	}
	
});
