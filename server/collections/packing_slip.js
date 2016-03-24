PackingSlip.allow({
	insert: function (userId, doc) {
		return PackingSlip.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return PackingSlip.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return PackingSlip.userCanRemove(userId, doc);
	}
});

PackingSlip.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

PackingSlip.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

PackingSlip.before.remove(function(userId, doc) {
	
});

PackingSlip.after.insert(function(userId, doc) {
	
});

PackingSlip.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

PackingSlip.after.remove(function(userId, doc) {
	
});
