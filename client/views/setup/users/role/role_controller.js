this.SetupUsersRoleController = RouteController.extend({
	template: "SetupUsersRole",
	

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

		Deps.autorun(function() { Meteor.subscribe("role_list", Session.get("limit")); });		

		var subs = [
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
			role_list: Role.find({})
		};
		/*DATA_FUNCTION*/
	},

	onAfterAction: function() {

	}
});
