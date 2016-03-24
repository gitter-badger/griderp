var pageSession = new ReactiveDict();

Template.ProductionOrderEdit.rendered = function() {
	
};

Template.ProductionOrderEdit.events({
	
});

Template.ProductionOrderEdit.helpers({
	
});

Template.ProductionOrderEditEditForm.rendered = function() {
	

	pageSession.set("productionOrderEditEditFormInfoMessage", "");
	pageSession.set("productionOrderEditEditFormErrorMessage", "");

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

Template.ProductionOrderEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("productionOrderEditEditFormInfoMessage", "");
		pageSession.set("productionOrderEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var productionOrderEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(productionOrderEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("productionOrderEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("manufacturing.documents.production_order", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("productionOrderEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				ProductionOrder.update({ _id: t.data.production_order_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
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

Template.ProductionOrderEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("productionOrderEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("productionOrderEditEditFormErrorMessage");
	}
	
});
