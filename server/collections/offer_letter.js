OfferLetter.allow({
	insert: function (userId, doc) {
		return OfferLetter.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return OfferLetter.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return OfferLetter.userCanRemove(userId, doc);
	}
});

OfferLetter.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

OfferLetter.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

OfferLetter.before.remove(function(userId, doc) {
	
});

OfferLetter.after.insert(function(userId, doc) {
	
});

OfferLetter.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

OfferLetter.after.remove(function(userId, doc) {
	
});
