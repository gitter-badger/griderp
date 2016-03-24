LetterHead.allow({
	insert: function (userId, doc) {
		return LetterHead.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return LetterHead.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return LetterHead.userCanRemove(userId, doc);
	}
});

LetterHead.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

LetterHead.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

LetterHead.before.remove(function(userId, doc) {
	
});

LetterHead.after.insert(function(userId, doc) {
	
});

LetterHead.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

LetterHead.after.remove(function(userId, doc) {
	
});
