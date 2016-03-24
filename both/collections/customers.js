this.Customers = new Mongo.Collection("customers");

this.Customers.userCanInsert = function(userId, doc) {
	return true;
}

this.Customers.userCanUpdate = function(userId, doc) {
	return true;
}

this.Customers.userCanRemove = function(userId, doc) {
	return true;
}

this.Schemas = this.Schemas || {};

this.Schemas.Customers = new SimpleSchema({
});

this.Customers.attachSchema(this.Schemas.Customers);
