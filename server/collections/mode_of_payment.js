ModeOfPayment.allow({
	insert: function (userId, doc) {
		return ModeOfPayment.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return ModeOfPayment.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return ModeOfPayment.userCanRemove(userId, doc);
	}
});

ModeOfPayment.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

ModeOfPayment.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

ModeOfPayment.before.remove(function(userId, doc) {
	
});

ModeOfPayment.after.insert(function(userId, doc) {
	
});

ModeOfPayment.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

ModeOfPayment.after.remove(function(userId, doc) {
	
});
