PaymentToolDetail.allow({
	insert: function (userId, doc) {
		return PaymentToolDetail.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return PaymentToolDetail.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return PaymentToolDetail.userCanRemove(userId, doc);
	}
});

PaymentToolDetail.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

PaymentToolDetail.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

PaymentToolDetail.before.remove(function(userId, doc) {
	
});

PaymentToolDetail.after.insert(function(userId, doc) {
	
});

PaymentToolDetail.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

PaymentToolDetail.after.remove(function(userId, doc) {
	
});
