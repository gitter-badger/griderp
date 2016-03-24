var pageSession = new ReactiveDict();

Template.QualityInspectionInsert.rendered = function() {
	
};

Template.QualityInspectionInsert.events({
	
});

Template.QualityInspectionInsert.helpers({
	
});

Template.QualityInspectionInsertInsertForm.rendered = function() {
	

	pageSession.set("qualityInspectionInsertInsertFormInfoMessage", "");
	pageSession.set("qualityInspectionInsertInsertFormErrorMessage", "");

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

Template.QualityInspectionInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("qualityInspectionInsertInsertFormInfoMessage", "");
		pageSession.set("qualityInspectionInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var qualityInspectionInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(qualityInspectionInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("qualityInspectionInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("stock.tools.quality_inspection", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("qualityInspectionInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = QualityInspection.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("stock.tools.quality_inspection", {});
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

Template.QualityInspectionInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("qualityInspectionInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("qualityInspectionInsertInsertFormErrorMessage");
	}
	
});
