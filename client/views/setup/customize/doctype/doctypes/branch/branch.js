var pageSession = new ReactiveDict();

Template.DoctypesBranch.rendered = function() {
	
};

Template.DoctypesBranch.events({
	
});

Template.DoctypesBranch.helpers({
	
});

Template.DoctypesBranchForm.rendered = function() {
	

	pageSession.set("doctypesBranchFormInfoMessage", "");
	pageSession.set("doctypesBranchFormErrorMessage", "");

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

Template.DoctypesBranchForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("doctypesBranchFormInfoMessage", "");
		pageSession.set("doctypesBranchFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var doctypesBranchFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(doctypesBranchFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("doctypesBranchFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("doctypesBranchFormErrorMessage", message);
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

		Router.go("setup.customize.doctype", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("setup.customize.doctype", {});
	}

	
});

Template.DoctypesBranchForm.helpers({
	"infoMessage": function() {
		return pageSession.get("doctypesBranchFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("doctypesBranchFormErrorMessage");
	}
	
});
