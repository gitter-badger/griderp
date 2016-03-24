var pageSession = new ReactiveDict();

Template.SalesPartnerInsert.rendered = function() {
	
};

Template.SalesPartnerInsert.events({
	
});

Template.SalesPartnerInsert.helpers({
	
});

Template.SalesPartnerInsertInsertForm.rendered = function() {
	

	pageSession.set("salesPartnerInsertInsertFormInfoMessage", "");
	pageSession.set("salesPartnerInsertInsertFormErrorMessage", "");

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

	$('.summernote').summernote({
		height: 300,
		focus: false,
		codemirror: {
			htmlMode: true,
			lineNumbers: true,
			mode: 'text/html'
		}
	});

};

Template.SalesPartnerInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("salesPartnerInsertInsertFormInfoMessage", "");
		pageSession.set("salesPartnerInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var salesPartnerInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(salesPartnerInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("salesPartnerInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("setup.selling.sales_partner", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("salesPartnerInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = SalesPartner.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("setup.selling.sales_partner", {});
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

Template.SalesPartnerInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("salesPartnerInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("salesPartnerInsertInsertFormErrorMessage");
	}
	
});
