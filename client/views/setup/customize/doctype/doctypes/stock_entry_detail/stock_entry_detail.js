var pageSession = new ReactiveDict();

Template.DoctypesStockEntryDetail.rendered = function() {
	
};

Template.DoctypesStockEntryDetail.events({
	
});

Template.DoctypesStockEntryDetail.helpers({
	
});

Template.DoctypesStockEntryDetailForm.rendered = function() {
	

	pageSession.set("doctypesStockEntryDetailFormInfoMessage", "");
	pageSession.set("doctypesStockEntryDetailFormErrorMessage", "");

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

Template.DoctypesStockEntryDetailForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("doctypesStockEntryDetailFormInfoMessage", "");
		pageSession.set("doctypesStockEntryDetailFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var doctypesStockEntryDetailFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(doctypesStockEntryDetailFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("doctypesStockEntryDetailFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("doctypesStockEntryDetailFormErrorMessage", message);
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

Template.DoctypesStockEntryDetailForm.helpers({
	"infoMessage": function() {
		return pageSession.get("doctypesStockEntryDetailFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("doctypesStockEntryDetailFormErrorMessage");
	}
	
});
