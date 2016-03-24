AboutUsTeamMember.allow({
	insert: function (userId, doc) {
		return AboutUsTeamMember.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return AboutUsTeamMember.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return AboutUsTeamMember.userCanRemove(userId, doc);
	}
});

AboutUsTeamMember.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

AboutUsTeamMember.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

AboutUsTeamMember.before.remove(function(userId, doc) {
	
});

AboutUsTeamMember.after.insert(function(userId, doc) {
	
});

AboutUsTeamMember.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

AboutUsTeamMember.after.remove(function(userId, doc) {
	
});
