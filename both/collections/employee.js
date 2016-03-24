this.Employee = new Mongo.Collection("employee");

this.Employee.userCanInsert = function(userId, doc) {
	return true;
}

this.Employee.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Employee.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.Employee = new SimpleSchema({
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
	status: {
		label: "Status",
		type: String,
		optional: true,
		defaultValue: "Active"
	},
	salary_mode: {
		label: "Salary Mode",
		type: String,
		optional: true
	},
	feedback: {
		label: "Feedback",
		type: String,
		optional: true
	},
	permanent_accommodation_type: {
		label: "Permanent Accommodation Type",
		type: String,
		optional: true
	},
	blood_group: {
		label: "Blood Group",
		type: String,
		optional: true
	},
	naming_series: {
		label: "Naming Series",
		type: String,
		optional: true
	},
	image: {
		label: "Image",
		type: String,
		optional: true
	},
	employee_name: {
		label: "Employee Name",
		type: String,
		optional: true
	},
	reports_to: {
		label: "Reports To",
		type: String,
		optional: true
	},
	holiday_list: {
		label: "Holiday List",
		type: String,
		optional: true
	},
	relation: {
		label: "Relation",
		type: String,
		optional: true
	},
	salutation: {
		label: "Salutation",
		type: String,
		optional: true
	},
	held_on: {
		label: "Held On",
		type: Date,
		optional: true
	},
	permanent_address: {
		label: "Permanent Address",
		type: String,
		optional: true
	},
	company_email: {
		label: "Company Email",
		type: String,
		optional: true
	},
	user_id: {
		label: "User Id",
		type: String,
		optional: true
	},
	passport_number: {
		label: "Passport Number",
		type: String,
		optional: true
	},
	resignation_letter_date: {
		label: "Resignation Letter Date",
		type: Date,
		optional: true
	},
	employee_number: {
		label: "Employee Number",
		type: String,
		optional: true
	},
	encashment_date: {
		label: "Encashment Date",
		type: Date,
		optional: true
	},
	employment_type: {
		label: "Employment Type",
		type: String,
		optional: true
	},
	personal_email: {
		label: "Personal Email",
		type: String,
		optional: true
	},
	current_address: {
		label: "Current Address",
		type: String,
		optional: true
	},
	date_of_issue: {
		label: "Date Of Issue",
		type: Date,
		optional: true
	},
	cell_number: {
		label: "Cell Number",
		type: String,
		optional: true
	},
	branch: {
		label: "Branch",
		type: String,
		optional: true
	},
	current_accommodation_type: {
		label: "Current Accommodation Type",
		type: String,
		optional: true
	},
	reason_for_resignation: {
		label: "Reason For Resignation",
		type: String,
		optional: true
	},
	bank_name: {
		label: "Bank Name",
		type: String,
		optional: true
	},
	new_workplace: {
		label: "New Workplace",
		type: String,
		optional: true
	},
	scheduled_confirmation_date: {
		label: "Scheduled Confirmation Date",
		type: Date,
		optional: true
	},
	department: {
		label: "Department",
		type: String,
		optional: true
	},
	company: {
		label: "Company",
		type: String,
		optional: true
	},
	family_background: {
		label: "Family Background",
		type: String,
		optional: true
	},
	leave_encashed: {
		label: "Leave Encashed",
		type: String,
		optional: true
	},
	bank_ac_no: {
		label: "Bank Account Number",
		type: String,
		optional: true
	},
	employee: {
		label: "Employee",
		type: String,
		optional: true
	},
	notice_number_of_days: {
		label: "Notice Number Of Days",
		type: Number,
		optional: true
	},
	person_to_be_contacted: {
		label: "Person To Be Contacted",
		type: String,
		optional: true
	},
	date_of_joining: {
		label: "Date Of Joining",
		type: Date,
		optional: true
	},
	reason_for_leaving: {
		label: "Reason For Leaving",
		type: String,
		optional: true
	},
	final_confirmation_date: {
		label: "Final Confirmation Date",
		type: Date,
		optional: true
	},
	place_of_issue: {
		label: "Place Of Issue",
		type: String,
		optional: true
	},
	bio: {
		label: "Bio",
		type: String,
		optional: true
	},
	designation: {
		label: "Designation",
		type: String,
		optional: true
	},
	valid_upto: {
		label: "Valid Up To",
		type: Date,
		optional: true
	},
	gender: {
		label: "Gender",
		type: String,
		optional: true
	},
	marital_status: {
		label: "Marital Status",
		type: String,
		optional: true
	},
	contract_end_date: {
		label: "Contract End Date",
		type: Date,
		optional: true
	},
	emergency_phone_number: {
		label: "Emergency Phone Number",
		type: String,
		optional: true
	},
	date_of_birth: {
		label: "Date Of Birth",
		type: Date,
		optional: true
	},
	health_details: {
		label: "Health Details",
		type: String,
		optional: true
	},
	unsubscribed: {
		label: "Unsubscribed",
		type: Number,
		defaultValue: 0
	},
	relieving_date: {
		label: "Relieving Date",
		type: Date,
		optional: true
	},
	date_of_retirement: {
		label: "Date Of Retirement",
		type: Date,
		optional: true
	}
});

this.Employee.attachSchema(this.Schemas.Employee);
