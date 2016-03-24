OfferLetterTerm.allow({
	insert: function (userId, doc) {
		return OfferLetterTerm.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return OfferLetterTerm.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return OfferLetterTerm.userCanRemove(userId, doc);
	}
});

OfferLetterTerm.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

OfferLetterTerm.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

OfferLetterTerm.before.remove(function(userId, doc) {
	
});

OfferLetterTerm.after.insert(function(userId, doc) {
	
});

OfferLetterTerm.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

OfferLetterTerm.after.remove(function(userId, doc) {
	
});
