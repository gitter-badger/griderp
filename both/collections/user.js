this.User = new Mongo.Collection("user");

this.User.userCanInsert = function(userId, doc) {
	return true;
}

this.User.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.User.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.User = new SimpleSchema({
	name: {
		label: "Name",
		type: String
	},
	docstatus: {
		label: "Doc Status",
		type: Number,
		optional: true,
		defaultValue: 0
	},
	parent: {
		label: "Parent",
		type: String,
		optional: true
	},
	parentfield: {
		label: "Parent Field",
		type: String,
		optional: true
	},
	parenttype: {
		label: "Parent Type",
		type: String,
		optional: true
	},
	idx: {
		label: "Index",
		type: Number,
		optional: true
	},
	user_image: {
		label: "User Image",
		type: String,
		optional: true
	},
	last_ip: {
		label: "Last IP",
		type: String,
		optional: true
	},
	user_type: {
		label: "User Type",
		type: String,
		optional: true,
		defaultValue: "System User"
	},
	reset_password_key: {
		label: "Reset Password Key",
		type: String,
		optional: true
	},
	last_name: {
		label: "Last Name",
		type: String,
		optional: true
	},
	github_username: {
		label: "GitHub Username",
		type: String,
		optional: true
	},
	last_known_versions: {
		label: "Last Known Versions",
		type: String,
		optional: true
	},
	thread_notify: {
		label: "Thread Notify",
		type: Number,
		defaultValue: 1
	},
	first_name: {
		label: "First Name",
		type: String,
		optional: true
	},
	middle_name: {
		label: "Middle Name",
		type: String,
		optional: true
	},
	new_password: {
		label: "New Password",
		type: String,
		optional: true
	},
	last_login: {
		label: "Last Login",
		type: String,
		optional: true
	},
	unsubscribed: {
		label: "Unsubscribed",
		type: Number,
		defaultValue: 0
	},
	github_userid: {
		label: "GitHub UserId",
		type: String,
		optional: true
	},
	email: {
		label: "Email",
		type: String,
		optional: true
	},
	bio: {
		label: "Bio",
		type: String,
		optional: true
	},
	fb_userid: {
		label: "FB UserId",
		type: String,
		optional: true
	},
	background_style: {
		label: "Background Style",
		type: String,
		optional: true
	},
	location: {
		label: "Location",
		type: String,
		optional: true
	},
	background_image: {
		label: "Background Image",
		type: String,
		optional: true
	},
	send_password_update_notification: {
		label: "Send Password Update Notification",
		type: Number,
		defaultValue: 0
	},
	google_userid: {
		label: "Google UserId",
		type: String,
		optional: true
	},
	login_after: {
		label: "Login After",
		type: Number,
		optional: true
	},
	send_welcome_email: {
		label: "Send Welcome Email",
		type: Number,
		defaultValue: 1
	},
	email_signature: {
		label: "Email Signature",
		type: String,
		optional: true
	},
	language: {
		label: "Language",
		type: String,
		optional: true
	},
	login_before: {
		label: "Login Before",
		type: Number,
		optional: true
	},
	gender: {
		label: "Gender",
		type: String,
		optional: true
	},
	enabled: {
		label: "Enabled",
		type: Number,
		defaultValue: 1
	},
	time_zone: {
		label: "Time Zone",
		type: String,
		optional: true
	},
	fb_username: {
		label: "FB Username",
		type: String,
		optional: true
	},
	birth_date: {
		label: "Birth Date",
		type: Date,
		optional: true
	},
	restrict_ip: {
		label: "Restrict IP",
		type: String,
		optional: true
	}
});

this.User.attachSchema(this.Schemas.User);
