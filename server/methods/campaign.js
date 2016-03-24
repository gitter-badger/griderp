Meteor.methods({

	removeCampaign: function(docIds) {
		Campaign.remove({"_id":{"$in":docIds}});
	}

});
