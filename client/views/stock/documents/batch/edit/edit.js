var pageSession = new ReactiveDict();

Template.BatchEdit.rendered = function() {
	
};

Template.BatchEdit.events({
	
});

Template.BatchEdit.helpers({
	
});

Template.BatchEditEditForm.rendered = function() {
	

	pageSession.set("batchEditEditFormInfoMessage", "");
	pageSession.set("batchEditEditFormErrorMessage", "");

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

Template.BatchEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("batchEditEditFormInfoMessage", "");
		pageSession.set("batchEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var batchEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(batchEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("batchEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("stock.documents.batch", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("batchEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Batch.update({ _id: t.data.batch_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("stock.documents.batch", {});
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

Template.BatchEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("batchEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("batchEditEditFormErrorMessage");
	}
	
});
