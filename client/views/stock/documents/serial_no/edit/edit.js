var pageSession = new ReactiveDict();

Template.SerialNoEdit.rendered = function() {
	
};

Template.SerialNoEdit.events({
	
});

Template.SerialNoEdit.helpers({
	
});

Template.SerialNoEditEditForm.rendered = function() {
	

	pageSession.set("serialNoEditEditFormInfoMessage", "");
	pageSession.set("serialNoEditEditFormErrorMessage", "");

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

Template.SerialNoEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("serialNoEditEditFormInfoMessage", "");
		pageSession.set("serialNoEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var serialNoEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(serialNoEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("serialNoEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("stock.documents.serial_no", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("serialNoEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				SerialNo.update({ _id: t.data.serial_no_details._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("stock.documents.serial_no", {});
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

Template.SerialNoEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("serialNoEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("serialNoEditEditFormErrorMessage");
	}
	
});
