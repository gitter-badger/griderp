this.SystemUserEditController = RouteController.extend({
	template: "SystemUserEdit",
	

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
			Meteor.subscribe("system_user_details", this.params.systemUserId)
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
			system_user_details: Users.findOne({_id: this.params.systemUserId}, {}),
		};
		/*DATA_FUNCTION*/
	},

	onAfterAction: function() {
		
	}
});
