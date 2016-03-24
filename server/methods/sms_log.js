Meteor.methods({

	removeSmsLog: function(docIds) {
		SmsLog.remove({"_id":{"$in":docIds}});
	}

});
