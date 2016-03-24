LandedCostVoucher.allow({
	insert: function (userId, doc) {
		return LandedCostVoucher.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return LandedCostVoucher.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return LandedCostVoucher.userCanRemove(userId, doc);
	}
});

LandedCostVoucher.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

LandedCostVoucher.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

LandedCostVoucher.before.remove(function(userId, doc) {
	
});

LandedCostVoucher.after.insert(function(userId, doc) {
	
});

LandedCostVoucher.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

LandedCostVoucher.after.remove(function(userId, doc) {
	
});
