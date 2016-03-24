var pageSession = new ReactiveDict();

Template.SerialNoInsert.rendered = function() {
	
};

Template.SerialNoInsert.events({
	
});

Template.SerialNoInsert.helpers({
	
});

Template.SerialNoInsertInsertForm.rendered = function() {
	

	pageSession.set("serialNoInsertInsertFormInfoMessage", "");
	pageSession.set("serialNoInsertInsertFormErrorMessage", "");

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

Template.SerialNoInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("serialNoInsertInsertFormInfoMessage", "");
		pageSession.set("serialNoInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var serialNoInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(serialNoInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("serialNoInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("stock.documents.serial_no", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("serialNoInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = SerialNo.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
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

Template.SerialNoInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("serialNoInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("serialNoInsertInsertFormErrorMessage");
	}
	
});
