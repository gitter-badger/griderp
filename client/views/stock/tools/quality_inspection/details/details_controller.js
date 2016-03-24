this.QualityInspectionDetailsController = RouteController.extend({
	template: "QualityInspectionDetails",
	

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
			Meteor.subscribe("quality_inspection_details", this.params.qualityInspectionId)
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
			quality_inspection_details: QualityInspection.findOne({ _id: this.params.qualityInspectionId }, {})
		};
		/*DATA_FUNCTION*/
	},

	onAfterAction: function() {
		
	}
});
