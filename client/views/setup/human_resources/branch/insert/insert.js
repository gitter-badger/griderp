var pageSession = new ReactiveDict();

Template.BranchInsert.rendered = function() {
	
};

Template.BranchInsert.events({
	
});

Template.BranchInsert.helpers({
	
});

Template.BranchInsertInsertForm.rendered = function() {
	

	pageSession.set("branchInsertInsertFormInfoMessage", "");
	pageSession.set("branchInsertInsertFormErrorMessage", "");

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

Template.BranchInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("branchInsertInsertFormInfoMessage", "");
		pageSession.set("branchInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var branchInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(branchInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("branchInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("setup.human_resources.branch", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("branchInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = Branch.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("setup.human_resources.branch", {});
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

Template.BranchInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("branchInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("branchInsertInsertFormErrorMessage");
	}
	
});
