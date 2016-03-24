var pageSession = new ReactiveDict();

Template.PriceListEdit.rendered = function() {
	
};

Template.PriceListEdit.events({
	
});

Template.PriceListEdit.helpers({
	
});

Template.PriceListEditEditForm.rendered = function() {
	

	pageSession.set("priceListEditEditFormInfoMessage", "");
	pageSession.set("priceListEditEditFormErrorMessage", "");

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

Template.PriceListEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("priceListEditEditFormInfoMessage", "");
		pageSession.set("priceListEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var priceListEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(priceListEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("priceListEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("setup.purchasing.price_list", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("priceListEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				PriceList.update({ _id: t.data.price_list_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("setup.purchasing.price_list", {});
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

Template.PriceListEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("priceListEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("priceListEditEditFormErrorMessage");
	}
	
});
