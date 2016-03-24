Meteor.publish("offer_letter_list", function(limit) {
	var defaultLimit = limit || 25;
	return OfferLetter.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("offer_letter_empty", function() {
	return OfferLetter.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("offer_letter_details", function(offerLetterId) {
	return OfferLetter.find({ _id: offerLetterId, ownerId: this.userId }, {});
});
