this.PurchasingDocumentsSupplierQuotationController = RouteController.extend({
	template: "PurchasingDocumentsSupplierQuotation",
	

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
	
		Deps.autorun(function() { Meteor.subscribe("supplier_quotation_list", Session.get("limit")); });	

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
			supplier_quotation_list: SupplierQuotation.find({})
		};
		/*DATA_FUNCTION*/
	},

	onAfterAction: function() {

	}
});
