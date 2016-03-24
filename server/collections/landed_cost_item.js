LandedCostItem.allow({
	insert: function (userId, doc) {
		return LandedCostItem.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return LandedCostItem.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return LandedCostItem.userCanRemove(userId, doc);
	}
});

LandedCostItem.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

LandedCostItem.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

LandedCostItem.before.remove(function(userId, doc) {
	
});

LandedCostItem.after.insert(function(userId, doc) {
	
});

LandedCostItem.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

LandedCostItem.after.remove(function(userId, doc) {
	
});
