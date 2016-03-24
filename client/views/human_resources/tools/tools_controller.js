this.HumanResourcesToolsController = RouteController.extend({
	template: "HumanResources",
	

	yieldTemplates: {
		'HumanResourcesTools': { to: 'HumanResourcesSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("HumanResources"); this.render("loading", { to: "HumanResourcesSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		

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
			params: this.params || {}
		};
		/*DATA_FUNCTION*/
	},

	onAfterAction: function() {

	}
});