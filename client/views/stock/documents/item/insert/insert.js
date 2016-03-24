var pageSession = new ReactiveDict();

Template.ItemInsert.rendered = function() {
	
};

Template.ItemInsert.events({
	
});

Template.ItemInsert.helpers({
	
});

Template.ItemInsertInsertForm.rendered = function() {
	

	pageSession.set("itemInsertInsertFormInfoMessage", "");
	pageSession.set("itemInsertInsertFormErrorMessage", "");

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

Template.ItemInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("itemInsertInsertFormInfoMessage", "");
		pageSession.set("itemInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var itemInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(itemInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("itemInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("stock.documents.item", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("itemInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = Item.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
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

Template.ItemInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("itemInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("itemInsertInsertFormErrorMessage");
	}
	
});
