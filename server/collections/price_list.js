PriceList.allow({
	insert: function (userId, doc) {
		return PriceList.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return PriceList.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return PriceList.userCanRemove(userId, doc);
	}
});

PriceList.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

PriceList.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

PriceList.before.remove(function(userId, doc) {
	
});

PriceList.after.insert(function(userId, doc) {
	
});

PriceList.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

PriceList.after.remove(function(userId, doc) {
	
});
