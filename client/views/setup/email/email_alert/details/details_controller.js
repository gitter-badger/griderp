this.EmailAlertDetailsController = RouteController.extend({
	template: "EmailAlertDetails",
	

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
			Meteor.subscribe("email_alert_details", this.params.emailAlertId)
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
			email_alert_details: EmailAlert.findOne({ _id: this.params.emailAlertId }, {})
		};
		/*DATA_FUNCTION*/
	},

	onAfterAction: function() {
		
	}
});
