PeriodClosingVoucher.allow({
	insert: function (userId, doc) {
		return PeriodClosingVoucher.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return PeriodClosingVoucher.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return PeriodClosingVoucher.userCanRemove(userId, doc);
	}
});

PeriodClosingVoucher.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

PeriodClosingVoucher.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

PeriodClosingVoucher.before.remove(function(userId, doc) {
	
});

PeriodClosingVoucher.after.insert(function(userId, doc) {
	
});

PeriodClosingVoucher.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

PeriodClosingVoucher.after.remove(function(userId, doc) {
	
});
