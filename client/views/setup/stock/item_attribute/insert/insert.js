var pageSession = new ReactiveDict();

Template.ItemAttributeInsert.rendered = function() {
	
};

Template.ItemAttributeInsert.events({
	
});

Template.ItemAttributeInsert.helpers({
	
});

Template.ItemAttributeInsertInsertForm.rendered = function() {
	

	pageSession.set("itemAttributeInsertInsertFormInfoMessage", "");
	pageSession.set("itemAttributeInsertInsertFormErrorMessage", "");

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

Template.ItemAttributeInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("itemAttributeInsertInsertFormInfoMessage", "");
		pageSession.set("itemAttributeInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var itemAttributeInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(itemAttributeInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("itemAttributeInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("setup.stock.item_attribute", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("itemAttributeInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = ItemAttribute.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("setup.stock.item_attribute", {});
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

Template.ItemAttributeInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("itemAttributeInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("itemAttributeInsertInsertFormErrorMessage");
	}
	
});
