var pageSession = new ReactiveDict();

Template.AddressInsert.rendered = function() {
	
};

Template.AddressInsert.events({
	
});

Template.AddressInsert.helpers({
	
});

Template.AddressInsertInsertForm.rendered = function() {
	

	pageSession.set("addressInsertInsertFormInfoMessage", "");
	pageSession.set("addressInsertInsertFormErrorMessage", "");

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

Template.AddressInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("addressInsertInsertFormInfoMessage", "");
		pageSession.set("addressInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var addressInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(addressInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("addressInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("purchasing.documents.address", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("addressInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = Address.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("purchasing.documents.address", {});
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

Template.AddressInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("addressInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("addressInsertInsertFormErrorMessage");
	}
	
});
