var pageSession = new ReactiveDict();

Template.ProductionOrderInsert.rendered = function() {
	
};

Template.ProductionOrderInsert.events({
	
});

Template.ProductionOrderInsert.helpers({
	
});

Template.ProductionOrderInsertInsertForm.rendered = function() {
	

	pageSession.set("productionOrderInsertInsertFormInfoMessage", "");
	pageSession.set("productionOrderInsertInsertFormErrorMessage", "");

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

Template.ProductionOrderInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("productionOrderInsertInsertFormInfoMessage", "");
		pageSession.set("productionOrderInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var productionOrderInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(productionOrderInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("productionOrderInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("manufacturing.documents.production_order", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("productionOrderInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = ProductionOrder.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("manufacturing.documents.production_order", {});
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

Template.ProductionOrderInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("productionOrderInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("productionOrderInsertInsertFormErrorMessage");
	}
	
});
