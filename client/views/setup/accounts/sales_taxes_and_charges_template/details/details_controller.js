this.SalesTaxesAndChargesTemplateDetailsController = RouteController.extend({
	template: "SalesTaxesAndChargesTemplateDetails",
	

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
			Meteor.subscribe("sales_taxes_and_charges_template_details", this.params.salesTaxesAndChargesTemplateId)
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
			sales_taxes_and_charges_template_details: SalesTaxesAndChargesTemplate.findOne({ _id: this.params.salesTaxesAndChargesTemplateId }, {})
		};
		/*DATA_FUNCTION*/
	},

	onAfterAction: function() {
		
	}
});
