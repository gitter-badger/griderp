this.PageEditController = RouteController.extend({
	template: "PageEdit",
	

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
			Meteor.subscribe("page_details", this.params.pageId)
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
			page_details: Page.findOne({_id: this.params.pageId}, {}),
		};
		/*DATA_FUNCTION*/
	},

	onAfterAction: function() {
		
	}
});
