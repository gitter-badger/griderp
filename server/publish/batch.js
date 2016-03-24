Meteor.publish("batch_list", function(limit) {
	var defaultLimit = limit || 25;
	return Batch.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("batch_empty", function() {
	return Batch.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("batch_details", function(batchId) {
	return Batch.find({ _id: batchId, ownerId: this.userId }, {});
});
