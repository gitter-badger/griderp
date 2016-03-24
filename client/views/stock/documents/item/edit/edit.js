var pageSession = new ReactiveDict();

Template.ItemEdit.rendered = function() {
	
};

Template.ItemEdit.events({
	
});

Template.ItemEdit.helpers({
	
});

Template.ItemEditEditForm.rendered = function() {
	

	pageSession.set("itemEditEditFormInfoMessage", "");
	pageSession.set("itemEditEditFormErrorMessage", "");

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

Template.ItemEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("itemEditEditFormInfoMessage", "");
		pageSession.set("itemEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var itemEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(itemEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("itemEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("stock.documents.item", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("itemEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Item.update({ _id: t.data.item_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("stock.documents.item", {});
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

Template.ItemEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("itemEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("itemEditEditFormErrorMessage");
	}
	
});
