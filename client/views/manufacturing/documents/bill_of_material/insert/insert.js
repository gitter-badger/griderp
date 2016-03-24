var pageSession = new ReactiveDict();

Template.BomInsert.rendered = function() {
	
};

Template.BomInsert.events({
	
});

Template.BomInsert.helpers({
	
});

Template.BomInsertInsertForm.rendered = function() {
	

	pageSession.set("bomInsertInsertFormInfoMessage", "");
	pageSession.set("bomInsertInsertFormErrorMessage", "");

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

Template.BomInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("bomInsertInsertFormInfoMessage", "");
		pageSession.set("bomInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var bomInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(bomInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("bomInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("manufacturing.documents.bill_of_material", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("bomInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = Bom.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("manufacturing.documents.bill_of_material", {});
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

Template.BomInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("bomInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("bomInsertInsertFormErrorMessage");
	}
	
});
