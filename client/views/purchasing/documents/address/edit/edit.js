var pageSession = new ReactiveDict();

Template.AddressEdit.rendered = function() {
	
};

Template.AddressEdit.events({
	
});

Template.AddressEdit.helpers({
	
});

Template.AddressEditEditForm.rendered = function() {
	

	pageSession.set("addressEditEditFormInfoMessage", "");
	pageSession.set("addressEditEditFormErrorMessage", "");

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

Template.AddressEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("addressEditEditFormInfoMessage", "");
		pageSession.set("addressEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var addressEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(addressEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("addressEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("purchasing.documents.address", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("addressEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Address.update({ _id: t.data.address_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("purchasing.documents.address", {});
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

Template.AddressEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("addressEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("addressEditEditFormErrorMessage");
	}
	
});
