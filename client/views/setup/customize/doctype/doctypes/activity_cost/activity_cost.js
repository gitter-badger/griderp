var pageSession = new ReactiveDict();

Template.DoctypesActivityCost.rendered = function() {
	
};

Template.DoctypesActivityCost.events({
	
});

Template.DoctypesActivityCost.helpers({
	
});

Template.DoctypesActivityCostForm.rendered = function() {
	

	pageSession.set("doctypesActivityCostFormInfoMessage", "");
	pageSession.set("doctypesActivityCostFormErrorMessage", "");

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

Template.DoctypesActivityCostForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("doctypesActivityCostFormInfoMessage", "");
		pageSession.set("doctypesActivityCostFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var doctypesActivityCostFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(doctypesActivityCostFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("doctypesActivityCostFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("doctypesActivityCostFormErrorMessage", message);
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

Template.DoctypesActivityCostForm.helpers({
	"infoMessage": function() {
		return pageSession.get("doctypesActivityCostFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("doctypesActivityCostFormErrorMessage");
	}
	
});
