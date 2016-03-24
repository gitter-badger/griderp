this.AppraisalTemplateDetailsController = RouteController.extend({
	template: "AppraisalTemplateDetails",
	

	yieldTemplates: {
		/*YIELD_TEMPLATES*/
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("loading"); }
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		

		var subs = [
			Meteor.subscribe("appraisal_template_details", this.params.appraisalTemplateId)
		];
		var ready = true;
		_.each(subs, function(sub) {
			if(!sub.ready())
				ready = false;
		});
		return ready;
	},

	data: function() {
		

		return {
			params: this.params || {},
			appraisal_template_details: AppraisalTemplate.findOne({ _id: this.params.appraisalTemplateId }, {})
		};
		/*DATA_FUNCTION*/
	},

	onAfterAction: function() {
		
	}
});
