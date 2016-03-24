PriceListCountry.allow({
	insert: function (userId, doc) {
		return PriceListCountry.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return PriceListCountry.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return PriceListCountry.userCanRemove(userId, doc);
	}
});

PriceListCountry.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

PriceListCountry.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

PriceListCountry.before.remove(function(userId, doc) {
	
});

PriceListCountry.after.insert(function(userId, doc) {
	
});

PriceListCountry.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

PriceListCountry.after.remove(function(userId, doc) {
	
});
