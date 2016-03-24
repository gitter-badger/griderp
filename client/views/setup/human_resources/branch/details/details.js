var pageSession = new ReactiveDict();

Template.BranchDetails.rendered = function() {
	
};

Template.BranchDetails.events({
	
});

Template.BranchDetails.helpers({
	
});

Template.BranchDetailsDetailsForm.rendered = function() {
	

	pageSession.set("branchDetailsDetailsFormInfoMessage", "");
	pageSession.set("branchDetailsDetailsFormErrorMessage", "");

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

Template.BranchDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("branchDetailsDetailsFormInfoMessage", "");
		pageSession.set("branchDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var branchDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(branchDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("branchDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("branchDetailsDetailsFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		/*CANCEL_REDIRECT*/
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		Router.go("setup.human_resources.branch", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("setup.human_resources.branch", {});
	}

	
});

Template.BranchDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("branchDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("branchDetailsDetailsFormErrorMessage");
	}
	
});
