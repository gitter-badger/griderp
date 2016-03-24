Meteor.publish("warranty_claim_list", function(limit) {
	var defaultLimit = limit || 25;
	return WarrantyClaim.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("warranty_claim_empty", function() {
	return WarrantyClaim.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("warranty_claim_details", function(warrantyClaimId) {
	return WarrantyClaim.find({ _id: warrantyClaimId, ownerId: this.userId }, {});
});
