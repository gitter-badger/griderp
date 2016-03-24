this.SellingDocumentsSalesOrderController = RouteController.extend({
	template: "SellingDocumentsSalesOrder",
	

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
	
		Deps.autorun(function() { Meteor.subscribe("sales_order_list", Session.get("limit")); });	

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
			sales_order_list: SalesOrder.find({})
		};
		/*DATA_FUNCTION*/
	},

	onAfterAction: function() {

	}
});
