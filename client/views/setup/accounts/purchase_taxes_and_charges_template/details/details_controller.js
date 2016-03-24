this.PurchaseTaxesAndChargesTemplateDetailsController = RouteController.extend({
	template: "PurchaseTaxesAndChargesTemplateDetails",
	

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
			Meteor.subscribe("purchase_taxes_and_charges_template_details", this.params.purchaseTaxesAndChargesTemplateId)
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
			purchase_taxes_and_charges_template_details: PurchaseTaxesAndChargesTemplate.findOne({ _id: this.params.purchaseTaxesAndChargesTemplateId }, {})
		};
		/*DATA_FUNCTION*/
	},

	onAfterAction: function() {
		
	}
});
