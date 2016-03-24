PackingSlipItem.allow({
	insert: function (userId, doc) {
		return PackingSlipItem.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return PackingSlipItem.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return PackingSlipItem.userCanRemove(userId, doc);
	}
});

PackingSlipItem.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

PackingSlipItem.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

PackingSlipItem.before.remove(function(userId, doc) {
	
});

PackingSlipItem.after.insert(function(userId, doc) {
	
});

PackingSlipItem.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

PackingSlipItem.after.remove(function(userId, doc) {
	
});
