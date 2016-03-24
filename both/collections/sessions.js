this.Sessions = new Mongo.Collection("sessions");

this.Sessions.userCanInsert = function(userId, doc) {
	return true;
}

this.Sessions.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Sessions.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.Sessions = new SimpleSchema({
	user: {
		label: "User",
		type: String,
		optional: true
	},
	sid: {
		label: "Sid",
		type: String,
		optional: true
	},
	sessiondata: {
		label: "Sessiondata",
		type: String,
		optional: true
	},
	ipaddress: {
		label: "IpAddress",
		type: String,
		optional: true
	},
	lastupdate: {
		label: "Lastupdate",
		type: Date,
		optional: true
	},
	device: {
		label: "Device",
		type: String,
		optional: true,
		defaultValue: "desktop"
	},
	status: {
		label: "Status",
		type: String,
		optional: true
	}
});

this.Sessions.attachSchema(this.Schemas.Sessions);
