var pageSession = new ReactiveDict();

Template.StockEntryDetails.rendered = function() {
	
};

Template.StockEntryDetails.events({
	
});

Template.StockEntryDetails.helpers({
	
});

Template.StockEntryDetailsDetailsForm.rendered = function() {
	

	pageSession.set("stockEntryDetailsDetailsFormInfoMessage", "");
	pageSession.set("stockEntryDetailsDetailsFormErrorMessage", "");

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

Template.StockEntryDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("stockEntryDetailsDetailsFormInfoMessage", "");
		pageSession.set("stockEntryDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var stockEntryDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(stockEntryDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("stockEntryDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("stockEntryDetailsDetailsFormErrorMessage", message);
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

		Router.go("stock.documents.stock_entry", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("stock.documents.stock_entry", {});
	}

	
});

Template.StockEntryDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("stockEntryDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("stockEntryDetailsDetailsFormErrorMessage");
	}
	
});
