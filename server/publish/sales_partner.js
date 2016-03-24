Meteor.publish("sales_partner_list", function(limit) {
	var defaultLimit = limit || 25;
	return SalesPartner.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("sales_partner_empty", function() {
	return SalesPartner.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("sales_partner_details", function(salesPartnerId) {
	return SalesPartner.find({ _id: salesPartnerId, ownerId: this.userId }, {});
});
