var pageSession = new ReactiveDict();

Template.PosProfileInsert.rendered = function() {
	
};

Template.PosProfileInsert.events({
	
});

Template.PosProfileInsert.helpers({
	
});

Template.PosProfileInsertInsertForm.rendered = function() {
	

	pageSession.set("posProfileInsertInsertFormInfoMessage", "");
	pageSession.set("posProfileInsertInsertFormErrorMessage", "");

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

Template.PosProfileInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("posProfileInsertInsertFormInfoMessage", "");
		pageSession.set("posProfileInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var posProfileInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(posProfileInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("posProfileInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("setup.accounts.point_of_sale_profile", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("posProfileInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = PosProfile.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("setup.accounts.point_of_sale_profile", {});
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

Template.PosProfileInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("posProfileInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("posProfileInsertInsertFormErrorMessage");
	}
	
});
