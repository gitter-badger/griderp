var pageSession = new ReactiveDict();

Template.SerialNoDetails.rendered = function() {
	
};

Template.SerialNoDetails.events({
	
});

Template.SerialNoDetails.helpers({
	
});

Template.SerialNoDetailsDetailsForm.rendered = function() {
	

	pageSession.set("serialNoDetailsDetailsFormInfoMessage", "");
	pageSession.set("serialNoDetailsDetailsFormErrorMessage", "");

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

Template.SerialNoDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("serialNoDetailsDetailsFormInfoMessage", "");
		pageSession.set("serialNoDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var serialNoDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(serialNoDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("serialNoDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("serialNoDetailsDetailsFormErrorMessage", message);
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

		Router.go("stock.documents.serial_no", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("stock.documents.serial_no", {});
	}

	
});

Template.SerialNoDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("serialNoDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("serialNoDetailsDetailsFormErrorMessage");
	}
	
});
