var pageSession = new ReactiveDict();

Template.PackingSlipInsert.rendered = function() {
	
};

Template.PackingSlipInsert.events({
	
});

Template.PackingSlipInsert.helpers({
	
});

Template.PackingSlipInsertInsertForm.rendered = function() {
	

	pageSession.set("packingSlipInsertInsertFormInfoMessage", "");
	pageSession.set("packingSlipInsertInsertFormErrorMessage", "");

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

Template.PackingSlipInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("packingSlipInsertInsertFormInfoMessage", "");
		pageSession.set("packingSlipInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var packingSlipInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(packingSlipInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("packingSlipInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("stock.tools.packing_slip", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("packingSlipInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = PackingSlip.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("stock.tools.packing_slip", {});
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

Template.PackingSlipInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("packingSlipInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("packingSlipInsertInsertFormErrorMessage");
	}
	
});
