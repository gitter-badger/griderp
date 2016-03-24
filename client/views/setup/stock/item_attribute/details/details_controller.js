this.ItemAttributeDetailsController = RouteController.extend({
	template: "ItemAttributeDetails",
	

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
			Meteor.subscribe("item_attribute_details", this.params.itemAttributeId)
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
			item_attribute_details: ItemAttribute.findOne({ _id: this.params.itemAttributeId }, {})
		};
		/*DATA_FUNCTION*/
	},

	onAfterAction: function() {
		
	}
});
