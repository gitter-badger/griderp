var pageSession = new ReactiveDict();

Template.BrandEdit.rendered = function() {
	
};

Template.BrandEdit.events({
	
});

Template.BrandEdit.helpers({
	
});

Template.BrandEditEditForm.rendered = function() {
	

	pageSession.set("brandEditEditFormInfoMessage", "");
	pageSession.set("brandEditEditFormErrorMessage", "");

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

Template.BrandEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("brandEditEditFormInfoMessage", "");
		pageSession.set("brandEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var brandEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(brandEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("brandEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("setup.stock.brand", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("brandEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Brand.update({ _id: t.data.brand_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("setup.stock.brand", {});
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

Template.BrandEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("brandEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("brandEditEditFormErrorMessage");
	}
	
});
