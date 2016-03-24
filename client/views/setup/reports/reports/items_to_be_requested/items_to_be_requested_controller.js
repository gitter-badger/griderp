this.ReportsItemsToBeRequestedController = RouteController.extend({
	template: "ReportsItemsToBeRequested",
	

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
			Meteor.subscribe("report_details", this.params.reportId)
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
			report_details: Report.findOne({ _id: this.params.reportId }, {})
		};
		/*DATA_FUNCTION*/
	},

	onAfterAction: function() {

	}
});
