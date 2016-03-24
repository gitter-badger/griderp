this.EmailDigest = new Mongo.Collection("email_digest");

this.EmailDigest.userCanInsert = function(userId, doc) {
	return true;
}

this.EmailDigest.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.EmailDigest.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.EmailDigest = new SimpleSchema({
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
	new_sales_orders: {
		label: "New Sales Orders",
		type: Number,
		defaultValue: 0
	},
	new_support_tickets: {
		label: "New Support Tickets",
		type: Number,
		defaultValue: 0
	},
	calendar_events: {
		label: "Calendar Events",
		type: Number,
		defaultValue: 0
	},
	enabled: {
		label: "Enabled",
		type: Number,
		defaultValue: 0
	},
	new_stock_entries: {
		label: "New Stock Entries",
		type: Number,
		defaultValue: 0
	},
	new_purchase_orders: {
		label: "New Purchase Orders",
		type: Number,
		defaultValue: 0
	},
	new_delivery_notes: {
		label: "New Delivery Notes",
		type: Number,
		defaultValue: 0
	},
	new_quotations: {
		label: "New Quotations",
		type: Number,
		defaultValue: 0
	},
	next_send: {
		label: "Next Send",
		type: String,
		optional: true
	},
	collections: {
		label: "Collections",
		type: Number,
		defaultValue: 0
	},
	bank_balance: {
		label: "Bank Balance",
		type: Number,
		defaultValue: 0
	},
	new_communications: {
		label: "New Communications",
		type: Number,
		defaultValue: 0
	},
	new_purchase_receipts: {
		label: "New Purchase Receipts",
		type: Number,
		defaultValue: 0
	},
	scheduler_errors: {
		label: "Scheduler Errors",
		type: Number,
		defaultValue: 0
	},
	recipient_list: {
		label: "Recipient List",
		type: String,
		optional: true
	},
	invoiced_amount: {
		label: "Invoiced Amount",
		type: Number,
		defaultValue: 0
	},
	company: {
		label: "Company",
		type: String,
		optional: true
	},
	income: {
		label: "Income",
		type: Number,
		defaultValue: 0
	},
	new_purchase_requests: {
		label: "New Purchase Requests",
		type: Number,
		defaultValue: 0
	},
	open_tickets: {
		label: "Open Tickets",
		type: Number,
		defaultValue: 0
	},
	new_enquiries: {
		label: "New Enquiries",
		type: Number,
		defaultValue: 0
	},
	new_projects: {
		label: "New Projects",
		type: Number,
		defaultValue: 0
	},
	new_supplier_quotations: {
		label: "New Supplier Quotations",
		type: Number,
		defaultValue: 0
	},
	new_leads: {
		label: "New Leads",
		type: Number,
		defaultValue: 0
	},
	income_year_to_date: {
		label: "Income Year To Date",
		type: Number,
		defaultValue: 0
	},
	expenses_booked: {
		label: "Expenses Booked",
		type: Number,
		defaultValue: 0
	},
	todo_list: {
		label: "Todo List",
		type: Number,
		defaultValue: 0
	},
	frequency: {
		label: "Frequency",
		type: String,
		optional: true
	},
	payments: {
		label: "Payments",
		type: Number,
		defaultValue: 0
	},
	payables: {
		label: "Payables",
		type: Number,
		defaultValue: 0
	}
});

this.EmailDigest.attachSchema(this.Schemas.EmailDigest);
