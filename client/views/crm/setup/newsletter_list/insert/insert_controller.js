this.NewsletterListInsertController = RouteController.extend({
	template: "NewsletterListInsert",
	

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
			Meteor.subscribe("newsletter_list_empty")
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
			newsletter_list_empty: NewsletterList.findOne({ _id: null }, {})
		};
		/*DATA_FUNCTION*/
	},

	onAfterAction: function() {
		
	}
});
