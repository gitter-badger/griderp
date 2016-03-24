var pageSession = new ReactiveDict();

Template.StockEntryEdit.rendered = function() {
	
};

Template.StockEntryEdit.events({
	
});

Template.StockEntryEdit.helpers({
	
});

Template.StockEntryEditEditForm.rendered = function() {
	

	pageSession.set("stockEntryEditEditFormInfoMessage", "");
	pageSession.set("stockEntryEditEditFormErrorMessage", "");

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

Template.StockEntryEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("stockEntryEditEditFormInfoMessage", "");
		pageSession.set("stockEntryEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var stockEntryEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(stockEntryEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("stockEntryEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("stock.documents.stock_entry", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("stockEntryEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				StockEntry.update({ _id: t.data.stock_entry_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("stock.documents.stock_entry", {});
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

Template.StockEntryEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("stockEntryEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("stockEntryEditEditFormErrorMessage");
	}
	
});
