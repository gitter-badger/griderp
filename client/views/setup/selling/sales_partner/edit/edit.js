var pageSession = new ReactiveDict();

Template.SalesPartnerEdit.rendered = function() {
	
};

Template.SalesPartnerEdit.events({
	
});

Template.SalesPartnerEdit.helpers({
	
});

Template.SalesPartnerEditEditForm.rendered = function() {
	

	pageSession.set("salesPartnerEditEditFormInfoMessage", "");
	pageSession.set("salesPartnerEditEditFormErrorMessage", "");

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

Template.SalesPartnerEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("salesPartnerEditEditFormInfoMessage", "");
		pageSession.set("salesPartnerEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var salesPartnerEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(salesPartnerEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("salesPartnerEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("setup.selling.sales_partner", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("salesPartnerEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				SalesPartner.update({ _id: t.data.sales_partner_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
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

Template.SalesPartnerEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("salesPartnerEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("salesPartnerEditEditFormErrorMessage");
	}
	
});
