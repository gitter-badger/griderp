Meteor.publish("delivery_note_list", function(limit) {
	var defaultLimit = limit || 25;
	return DeliveryNote.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("delivery_note_empty", function() {
	return DeliveryNote.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("delivery_note_details", function(deliveryNoteId) {
	return DeliveryNote.find({ _id: deliveryNoteId, ownerId: this.userId }, {});
});
