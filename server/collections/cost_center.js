CostCenter.allow({
	insert: function (userId, doc) {
		return CostCenter.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return CostCenter.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return CostCenter.userCanRemove(userId, doc);
	}
});

CostCenter.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

CostCenter.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

CostCenter.before.remove(function(userId, doc) {
	
});

CostCenter.after.insert(function(userId, doc) {
	
});

CostCenter.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

CostCenter.after.remove(function(userId, doc) {
	
});
