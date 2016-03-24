var pageSession = new ReactiveDict();

Template.StockEntryInsert.rendered = function() {
	
};

Template.StockEntryInsert.events({
	
});

Template.StockEntryInsert.helpers({
	
});

Template.StockEntryInsertInsertForm.rendered = function() {
	

	pageSession.set("stockEntryInsertInsertFormInfoMessage", "");
	pageSession.set("stockEntryInsertInsertFormErrorMessage", "");

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

Template.StockEntryInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("stockEntryInsertInsertFormInfoMessage", "");
		pageSession.set("stockEntryInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var stockEntryInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(stockEntryInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("stockEntryInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("stock.documents.stock_entry", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("stockEntryInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = StockEntry.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
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

Template.StockEntryInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("stockEntryInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("stockEntryInsertInsertFormErrorMessage");
	}
	
});
