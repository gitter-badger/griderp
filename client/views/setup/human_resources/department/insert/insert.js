var pageSession = new ReactiveDict();

Template.DepartmentInsert.rendered = function() {
	
};

Template.DepartmentInsert.events({
	
});

Template.DepartmentInsert.helpers({
	
});

Template.DepartmentInsertInsertForm.rendered = function() {
	

	pageSession.set("departmentInsertInsertFormInfoMessage", "");
	pageSession.set("departmentInsertInsertFormErrorMessage", "");

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

Template.DepartmentInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("departmentInsertInsertFormInfoMessage", "");
		pageSession.set("departmentInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var departmentInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(departmentInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("departmentInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("setup.human_resources.department", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("departmentInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = Department.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("setup.human_resources.department", {});
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

Template.DepartmentInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("departmentInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("departmentInsertInsertFormErrorMessage");
	}
	
});
