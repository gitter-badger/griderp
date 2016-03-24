Meteor.publish("sales_taxes_and_charges_template_list", function(limit) {
	var defaultLimit = limit || 25;
	return SalesTaxesAndChargesTemplate.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("sales_taxes_and_charges_template_empty", function() {
	return SalesTaxesAndChargesTemplate.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("sales_taxes_and_charges_template_details", function(salesTaxesAndChargesTemplateId) {
	return SalesTaxesAndChargesTemplate.find({ _id: salesTaxesAndChargesTemplateId, ownerId: this.userId }, {});
});
