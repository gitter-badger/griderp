Meteor.publish("purchase_taxes_and_charges_template_list", function(limit) {
	var defaultLimit = limit || 25;
	return PurchaseTaxesAndChargesTemplate.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("purchase_taxes_and_charges_template_empty", function() {
	return PurchaseTaxesAndChargesTemplate.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("purchase_taxes_and_charges_template_details", function(purchaseTaxesAndChargesTemplateId) {
	return PurchaseTaxesAndChargesTemplate.find({ _id: purchaseTaxesAndChargesTemplateId, ownerId: this.userId }, {});
});
