var pageSession = new ReactiveDict();

Template.SalesOrderInsert.rendered = function() {
	
};

Template.SalesOrderInsert.events({
	
});

Template.SalesOrderInsert.helpers({
	
});

Template.SalesOrderInsertInsertForm.rendered = function() {
	

	pageSession.set("salesOrderInsertInsertFormInfoMessage", "");
	pageSession.set("salesOrderInsertInsertFormErrorMessage", "");

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

	$('.summernote').summernote({
		height: 300,
		focus: false,
		codemirror: {
			htmlMode: true,
			lineNumbers: true,
			mode: 'text/html'
		}
	});

};

Template.SalesOrderInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("salesOrderInsertInsertFormInfoMessage", "");
		pageSession.set("salesOrderInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var salesOrderInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(salesOrderInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("salesOrderInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("selling.documents.sales_order", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("salesOrderInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = SalesOrder.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("selling.documents.sales_order", {});
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

Template.SalesOrderInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("salesOrderInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("salesOrderInsertInsertFormErrorMessage");
	}
	
});
