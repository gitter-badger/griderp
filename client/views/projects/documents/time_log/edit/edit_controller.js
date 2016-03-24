this.TimeLogEditController = RouteController.extend({
	template: "TimeLogEdit",
	

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
			Meteor.subscribe("time_log_details", this.params.timeLogId)
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
			time_log_details: TimeLog.findOne({_id: this.params.timeLogId}, {}),
		};
		/*DATA_FUNCTION*/
	},

	onAfterAction: function() {
		
	}
});
