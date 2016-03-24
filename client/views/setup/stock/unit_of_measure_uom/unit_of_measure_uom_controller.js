this.SetupStockUnitOfMeasureUomController = RouteController.extend({
	template: "SetupStockUnitOfMeasureUom",
	

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

		Deps.autorun(function() { Meteor.subscribe("uom_list", Session.get("limit")); });		

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
			uom_list: Uom.find({})
		};
		/*DATA_FUNCTION*/
	},

	onAfterAction: function() {

	}
});
