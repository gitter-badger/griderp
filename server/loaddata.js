Meteor.startup(function() {

	// Todo: Turn these into one loop
	//	- read files from the private/data directory
	//	- load/parse into MeteorDb

	// Add Account documents
	if (Account.find().count() === 0) {
	    console.log("Importing Account.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/Account.json"));

	    data.forEach(function (item, index, array) {
	        Account.insert(item);
	    })
	}

	// Add ActivityCost documents
	if (ActivityCost.find().count() === 0) {
	    console.log("Importing ActivityCost.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/ActivityCost.json"));

	    data.forEach(function (item, index, array) {
	        ActivityCost.insert(item);
	    })
	}

	// Add ActivityType documents
	if (ActivityType.find().count() === 0) {
	    console.log("Importing ActivityType.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/ActivityType.json"));

	    data.forEach(function (item, index, array) {
	        ActivityType.insert(item);
	    })
	}

	// Add Address documents
	if (Address.find().count() === 0) {
	    console.log("Importing Address.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/Address.json"));

	    data.forEach(function (item, index, array) {
	        Address.insert(item);
	    })
	}

	// Add AddressTemplate documents
	if (AddressTemplate.find().count() === 0) {
	    console.log("Importing AddressTemplate.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/AddressTemplate.json"));

	    data.forEach(function (item, index, array) {
	        AddressTemplate.insert(item);
	    })
	}

	// Add Appraisal documents
	if (Appraisal.find().count() === 0) {
	    console.log("Importing Appraisal.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/Appraisal.json"));

	    data.forEach(function (item, index, array) {
	        Appraisal.insert(item);
	    })
	}

	// Add AppraisalTemplate documents
	if (AppraisalTemplate.find().count() === 0) {
	    console.log("Importing AppraisalTemplate.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/AppraisalTemplate.json"));

	    data.forEach(function (item, index, array) {
	        AppraisalTemplate.insert(item);
	    })
	}

	// Add AsyncTask documents
	if (AsyncTask.find().count() === 0) {
	    console.log("Importing AsyncTask.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/AsyncTask.json"));

	    data.forEach(function (item, index, array) {
	        AsyncTask.insert(item);
	    })
	}

	// Add Attendance documents
	if (Attendance.find().count() === 0) {
	    console.log("Importing Attendance.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/Attendance.json"));

	    data.forEach(function (item, index, array) {
	        Attendance.insert(item);
	    })
	}

	// Add AuthorizationRule documents
	if (AuthorizationRule.find().count() === 0) {
	    console.log("Importing AuthorizationRule.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/AuthorizationRule.json"));

	    data.forEach(function (item, index, array) {
	        AuthorizationRule.insert(item);
	    })
	}

	// Add Batch documents
	if (Batch.find().count() === 0) {
	    console.log("Importing Batch.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/Batch.json"));

	    data.forEach(function (item, index, array) {
	        Batch.insert(item);
	    })
	}

	// Add Bin documents
	if (Bin.find().count() === 0) {
	    console.log("Importing Bin.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/Bin.json"));

	    data.forEach(function (item, index, array) {
	        Bin.insert(item);
	    })
	}

	// Add BlogCategory documents
	if (BlogCategory.find().count() === 0) {
	    console.log("Importing BlogCategory.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/BlogCategory.json"));

	    data.forEach(function (item, index, array) {
	        BlogCategory.insert(item);
	    })
	}

	// Add Blogger documents
	if (Blogger.find().count() === 0) {
	    console.log("Importing Blogger.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/Blogger.json"));

	    data.forEach(function (item, index, array) {
	        Blogger.insert(item);
	    })
	}

	// Add BlogPost documents
	if (BlogPost.find().count() === 0) {
	    console.log("Importing BlogPost.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/BlogPost.json"));

	    data.forEach(function (item, index, array) {
	        BlogPost.insert(item);
	    })
	}

	// Add BomExplosionItem documents
	if (BomExplosionItem.find().count() === 0) {
	    console.log("Importing BomExplosionItem.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/BomExplosionItem.json"));

	    data.forEach(function (item, index, array) {
	        BomExplosionItem.insert(item);
	    })
	}

	// Add BomItem documents
	if (BomItem.find().count() === 0) {
	    console.log("Importing BomItem.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/BomItem.json"));

	    data.forEach(function (item, index, array) {
	        BomItem.insert(item);
	    })
	}

	// Add Bom documents
	if (Bom.find().count() === 0) {
	    console.log("Importing Bom.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/Bom.json"));

	    data.forEach(function (item, index, array) {
	        Bom.insert(item);
	    })
	}

	// Add BomOperation documents
	if (BomOperation.find().count() === 0) {
	    console.log("Importing BomOperation.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/BomOperation.json"));

	    data.forEach(function (item, index, array) {
	        BomOperation.insert(item);
	    })
	}

	// Add Branch documents
	if (Branch.find().count() === 0) {
	    console.log("Importing Branch.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/Branch.json"));

	    data.forEach(function (item, index, array) {
	        Branch.insert(item);
	    })
	}

	// Add Brand documents
	if (Brand.find().count() === 0) {
	    console.log("Importing Brand.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/Brand.json"));

	    data.forEach(function (item, index, array) {
	        Brand.insert(item);
	    })
	}

	// Add Campaign documents
	if (Campaign.find().count() === 0) {
	    console.log("Importing Campaign.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/Campaign.json"));

	    data.forEach(function (item, index, array) {
	        Campaign.insert(item);
	    })
	}

	// Add Comment documents
	if (Comment.find().count() === 0) {
	    console.log("Importing Comment.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/Comment.json"));

	    data.forEach(function (item, index, array) {
	        Comment.insert(item);
	    })
	}

	// Add Communication documents
	if (Communication.find().count() === 0) {
	    console.log("Importing Communication.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/Communication.json"));

	    data.forEach(function (item, index, array) {
	        Communication.insert(item);
	    })
	}

	// Add Company documents
	if (Company.find().count() === 0) {
	    console.log("Importing Company.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/Company.json"));

	    data.forEach(function (item, index, array) {
	        Company.insert(item);
	    })
	}

	// Add Contact documents
	if (Contact.find().count() === 0) {
	    console.log("Importing Contact.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/Contact.json"));

	    data.forEach(function (item, index, array) {
	        Contact.insert(item);
	    })
	}

	// Add CostCenter documents
	if (CostCenter.find().count() === 0) {
	    console.log("Importing CostCenter.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/CostCenter.json"));

	    data.forEach(function (item, index, array) {
	        CostCenter.insert(item);
	    })
	}

	// Add Country documents
	if (Country.find().count() === 0) {
	    console.log("Importing Country.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/Country.json"));

	    data.forEach(function (item, index, array) {
	        Country.insert(item);
	    })
	}

	// Add CurrencyExchange documents
	if (CurrencyExchange.find().count() === 0) {
	    console.log("Importing CurrencyExchange.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/CurrencyExchange.json"));

	    data.forEach(function (item, index, array) {
	        CurrencyExchange.insert(item);
	    })
	}

	// Add Currency documents
	if (Currency.find().count() === 0) {
	    console.log("Importing Currency.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/Currency.json"));

	    data.forEach(function (item, index, array) {
	        Currency.insert(item);
	    })
	}

	// Add CustomField documents
	if (CustomField.find().count() === 0) {
	    console.log("Importing CustomField.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/CustomField.json"));

	    data.forEach(function (item, index, array) {
	        CustomField.insert(item);
	    })
	}

	// Add CustomScript documents
	if (CustomScript.find().count() === 0) {
	    console.log("Importing CustomScript.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/CustomScript.json"));

	    data.forEach(function (item, index, array) {
	        CustomScript.insert(item);
	    })
	}

	// Add CustomerGroup documents
	if (CustomerGroup.find().count() === 0) {
	    console.log("Importing CustomerGroup.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/CustomerGroup.json"));

	    data.forEach(function (item, index, array) {
	        CustomerGroup.insert(item);
	    })
	}

	// Add Customer documents
	if (Customer.find().count() === 0) {
	    console.log("Importing Customer.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/Customer.json"));

	    data.forEach(function (item, index, array) {
	        Customer.insert(item);
	    })
	}

	// Add DeductionType documents
	if (DeductionType.find().count() === 0) {
	    console.log("Importing DeductionType.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/DeductionType.json"));

	    data.forEach(function (item, index, array) {
	        DeductionType.insert(item);
	    })
	}

	// Add Defaultvalue documents
	if (Defaultvalue.find().count() === 0) {
	    console.log("Importing DefaultValue.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/DefaultValue.json"));

	    data.forEach(function (item, index, array) {
	        Defaultvalue.insert(item);
	    })
	}

	// Add DeliveryNoteItem documents
	if (DeliveryNoteItem.find().count() === 0) {
	    console.log("Importing DeliveryNoteItem.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/DeliveryNoteItem.json"));

	    data.forEach(function (item, index, array) {
	        DeliveryNoteItem.insert(item);
	    })
	}

	// Add DeliveryNote documents
	if (DeliveryNote.find().count() === 0) {
	    console.log("Importing DeliveryNote.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/DeliveryNote.json"));

	    data.forEach(function (item, index, array) {
	        DeliveryNote.insert(item);
	    })
	}

	// Add Department documents
	if (Department.find().count() === 0) {
	    console.log("Importing Department.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/Department.json"));

	    data.forEach(function (item, index, array) {
	        Department.insert(item);
	    })
	}

	// Add Designation documents
	if (Designation.find().count() === 0) {
	    console.log("Importing Designation.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/Designation.json"));

	    data.forEach(function (item, index, array) {
	        Designation.insert(item);
	    })
	}

	// Add DocField documents
	if (Docfield.find().count() === 0) {
	    console.log("Importing DocField.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/DocField.json"));

	    data.forEach(function (item, index, array) {
	        Docfield.insert(item);
	    })
	}

	// Add DocPerm documents
	if (Docperm.find().count() === 0) {
	    console.log("Importing DocPerm.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/DocPerm.json"));

	    data.forEach(function (item, index, array) {
	        Docperm.insert(item);
	    })
	}

	// Add DocShare documents
	if (Docshare.find().count() === 0) {
	    console.log("Importing DocShare.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/DocShare.json"));

	    data.forEach(function (item, index, array) {
	        Docshare.insert(item);
	    })
	}

	// Add DocType documents
	if (Doctype.find().count() === 0) {
	    console.log("Importing DocType.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/DocType.json"));

	    data.forEach(function (item, index, array) {
	        Doctype.insert(item);
	    })
	}

	// Add EarningType documents
	if (EarningType.find().count() === 0) {
	    console.log("Importing EarningType.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/EarningType.json"));

	    data.forEach(function (item, index, array) {
	        EarningType.insert(item);
	    })
	}

	// Add EmailAccount documents
	if (EmailAccount.find().count() === 0) {
	    console.log("Importing EmailAccount.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/EmailAccount.json"));

	    data.forEach(function (item, index, array) {
	        EmailAccount.insert(item);
	    })
	}

	// Add EmailAlert documents
	if (EmailAlert.find().count() === 0) {
	    console.log("Importing EmailAlert.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/EmailAlert.json"));

	    data.forEach(function (item, index, array) {
	        EmailAlert.insert(item);
	    })
	}

	// Add EmailDigest documents
	if (EmailDigest.find().count() === 0) {
	    console.log("Importing EmailDigest.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/EmailDigest.json"));

	    data.forEach(function (item, index, array) {
	        EmailDigest.insert(item);
	    })
	}

	// Add Employee documents
	if (Employee.find().count() === 0) {
	    console.log("Importing Employee.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/Employee.json"));

	    data.forEach(function (item, index, array) {
	        Employee.insert(item);
	    })
	}

	// Add EmploymentType documents
	if (EmploymentType.find().count() === 0) {
	    console.log("Importing EmploymentType.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/EmploymentType.json"));

	    data.forEach(function (item, index, array) {
	        EmploymentType.insert(item);
	    })
	}

	// Add ExpenseClaim documents
	if (ExpenseClaim.find().count() === 0) {
	    console.log("Importing ExpenseClaim.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/ExpenseClaim.json"));

	    data.forEach(function (item, index, array) {
	        ExpenseClaim.insert(item);
	    })
	}

	// Add ExpenseClaimType documents
	if (ExpenseClaimType.find().count() === 0) {
	    console.log("Importing ExpenseClaimType.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/ExpenseClaimType.json"));

	    data.forEach(function (item, index, array) {
	        ExpenseClaimType.insert(item);
	    })
	}

	// Add Feed documents
	if (Feed.find().count() === 0) {
	    console.log("Importing Feed.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/Feed.json"));

	    data.forEach(function (item, index, array) {
	        Feed.insert(item);
	    })
	}

	// Add File documents
	if (File.find().count() === 0) {
	    console.log("Importing File.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/File.json"));

	    data.forEach(function (item, index, array) {
	        File.insert(item);
	    })
	}

	// Add FiscalYear documents
	if (FiscalYear.find().count() === 0) {
	    console.log("Importing FiscalYear.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/FiscalYear.json"));

	    data.forEach(function (item, index, array) {
	        FiscalYear.insert(item);
	    })
	}

	// Add GLEntry documents
	if (GlEntry.find().count() === 0) {
	    console.log("Importing GlEntry.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/GLEntry.json"));

	    data.forEach(function (item, index, array) {
	        GlEntry.insert(item);
	    })
	}

	// Add Holiday documents
	if (Holiday.find().count() === 0) {
	    console.log("Importing Holiday.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/Holiday.json"));

	    data.forEach(function (item, index, array) {
	        Holiday.insert(item);
	    })
	}

	// Add HolidayList documents
	if (HolidayList.find().count() === 0) {
	    console.log("Importing HolidayList.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/HolidayList.json"));

	    data.forEach(function (item, index, array) {
	        HolidayList.insert(item);
	    })
	}

	// Add IndustryType documents
	if (IndustryType.find().count() === 0) {
	    console.log("Importing IndustryType.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/IndustryType.json"));

	    data.forEach(function (item, index, array) {
	        IndustryType.insert(item);
	    })
	}

	// Add Issue documents
	if (Issue.find().count() === 0) {
	    console.log("Importing Issue.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/Issue.json"));

	    data.forEach(function (item, index, array) {
	        Issue.insert(item);
	    })
	}

	// Add InstallationNote documents
	if (InstallationNote.find().count() === 0) {
	    console.log("Importing InstallationNote.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/InstallationNote.json"));

	    data.forEach(function (item, index, array) {
	        InstallationNote.insert(item);
	    })
	}

	// Add ItemAttribute documents
	if (ItemAttribute.find().count() === 0) {
	    console.log("Importing ItemAttribute.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/ItemAttribute.json"));

	    data.forEach(function (item, index, array) {
	        ItemAttribute.insert(item);
	    })
	}

	// Add ItemAttributeValue documents
	if (ItemAttributeValue.find().count() === 0) {
	    console.log("Importing ItemAttributeValue.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/ItemAttributeValue.json"));

	    data.forEach(function (item, index, array) {
	        ItemAttributeValue.insert(item);
	    })
	}

	// Add ItemGroup documents
	if (ItemGroup.find().count() === 0) {
	    console.log("Importing ItemGroup.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/ItemGroup.json"));

	    data.forEach(function (item, index, array) {
	        ItemGroup.insert(item);
	    })
	}

	// Add Item documents
	if (Item.find().count() === 0) {
	    console.log("Importing Item.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/Item.json"));

	    data.forEach(function (item, index, array) {
	        Item.insert(item);
	    })
	}

	// Add ItemPrice documents
	if (ItemPrice.find().count() === 0) {
	    console.log("Importing ItemPrice.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/ItemPrice.json"));

	    data.forEach(function (item, index, array) {
	        ItemPrice.insert(item);
	    })
	}

	// Add ItemVariantAttribute documents
	if (ItemVariantAttribute.find().count() === 0) {
	    console.log("Importing ItemVariantAttribute.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/ItemVariantAttribute.json"));

	    data.forEach(function (item, index, array) {
	        ItemVariantAttribute.insert(item);
	    })
	}

	// Add JobApplicant documents
	if (JobApplicant.find().count() === 0) {
	    console.log("Importing JobApplicant.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/JobApplicant.json"));

	    data.forEach(function (item, index, array) {
	        JobApplicant.insert(item);
	    })
	}

	// Add JobOpening documents
	if (JobOpening.find().count() === 0) {
	    console.log("Importing JobOpening.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/JobOpening.json"));

	    data.forEach(function (item, index, array) {
	        JobOpening.insert(item);
	    })
	}

	// Add JournalEntryAccount documents
	if (JournalEntryAccount.find().count() === 0) {
	    console.log("Importing JournalEntryAccount.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/JournalEntryAccount.json"));

	    data.forEach(function (item, index, array) {
	        JournalEntryAccount.insert(item);
	    })
	}

	// Add JournalEntry documents
	if (JournalEntry.find().count() === 0) {
	    console.log("Importing JournalEntry.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/JournalEntry.json"));

	    data.forEach(function (item, index, array) {
	        JournalEntry.insert(item);
	    })
	}

	// Add LandedCostVoucher documents
	if (LandedCostVoucher.find().count() === 0) {
	    console.log("Importing LandedCostVoucher.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/LandedCostVoucher.json"));

	    data.forEach(function (item, index, array) {
	        LandedCostVoucher.insert(item);
	    })
	}

	// Add Lead documents
	if (Lead.find().count() === 0) {
	    console.log("Importing Lead.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/Lead.json"));

	    data.forEach(function (item, index, array) {
	        Lead.insert(item);
	    })
	}

	// Add LeaveAllocation documents
	if (LeaveAllocation.find().count() === 0) {
	    console.log("Importing LeaveAllocation.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/LeaveAllocation.json"));

	    data.forEach(function (item, index, array) {
	        LeaveAllocation.insert(item);
	    })
	}

	// Add LeaveApplication documents
	if (LeaveApplication.find().count() === 0) {
	    console.log("Importing LeaveApplication.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/LeaveApplication.json"));

	    data.forEach(function (item, index, array) {
	        LeaveApplication.insert(item);
	    })
	}

	// Add LeaveBlockList documents
	if (LeaveBlockList.find().count() === 0) {
	    console.log("Importing LeaveBlockList.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/LeaveBlockList.json"));

	    data.forEach(function (item, index, array) {
	        LeaveBlockList.insert(item);
	    })
	}

	// Add LeaveType documents
	if (LeaveType.find().count() === 0) {
	    console.log("Importing LeaveType.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/LeaveType.json"));

	    data.forEach(function (item, index, array) {
	        LeaveType.insert(item);
	    })
	}

	// Add LetterHead documents
	if (LetterHead.find().count() === 0) {
	    console.log("Importing LetterHead.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/LetterHead.json"));

	    data.forEach(function (item, index, array) {
	        LetterHead.insert(item);
	    })
	}

	// Add MaintenanceSchedule documents
	if (MaintenanceSchedule.find().count() === 0) {
	    console.log("Importing MaintenanceSchedule.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/MaintenanceSchedule.json"));

	    data.forEach(function (item, index, array) {
	        MaintenanceSchedule.insert(item);
	    })
	}

	// Add MaintenanceVisit documents
	if (MaintenanceVisit.find().count() === 0) {
	    console.log("Importing MaintenanceVisit.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/MaintenanceVisit.json"));

	    data.forEach(function (item, index, array) {
	        MaintenanceVisit.insert(item);
	    })
	}

	// Add MaterialRequestItem documents
	if (MaterialRequestItem.find().count() === 0) {
	    console.log("Importing MaterialRequestItem.json to meteor db")


	    var data = JSON.parse(Assets.getText("data/MaterialRequestItem.json"));

	    data.forEach(function (item, index, array) {
	        MaterialRequestItem.insert(item);
	    })
	}

	// Add MaterialRequest documents
	if (MaterialRequest.find().count() === 0) {
	    console.log("Importing MaterialRequest.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/MaterialRequest.json"));

	    data.forEach(function (item, index, array) {
	        MaterialRequest.insert(item);
	    })
	}

	// Add ModeOfPayment documents
	if (ModeOfPayment.find().count() === 0) {
	    console.log("Importing ModeOfPayment.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/ModeOfPayment.json"));

	    data.forEach(function (item, index, array) {
	        ModeOfPayment.insert(item);
	    })
	}

	// Add ModuleDef documents
	if (ModuleDef.find().count() === 0) {
	    console.log("Importing ModuleDef.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/ModuleDef.json"));

	    data.forEach(function (item, index, array) {
	        ModuleDef.insert(item);
	    })
	}

	// Add MonthlyDistribution documents
	if (MonthlyDistribution.find().count() === 0) {
	    console.log("Importing MonthlyDistribution.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/MonthlyDistribution.json"));

	    data.forEach(function (item, index, array) {
	        MonthlyDistribution.insert(item);
	    })
	}

	// Add Newsletter documents
	if (Newsletter.find().count() === 0) {
	    console.log("Importing Newsletter.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/Newsletter.json"));

	    data.forEach(function (item, index, array) {
	        Newsletter.insert(item);
	    })
	}

	// Add NewsletterList documents
	if (NewsletterList.find().count() === 0) {
	    console.log("Importing NewsletterList.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/NewsletterList.json"));

	    data.forEach(function (item, index, array) {
	        NewsletterList.insert(item);
	    })
	}

	// Add Note documents
	if (Note.find().count() === 0) {
	    console.log("Importing Note.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/Note.json"));

	    data.forEach(function (item, index, array) {
	        Note.insert(item);
	    })
	}

	// Add OfferLetter documents
	if (OfferLetter.find().count() === 0) {
	    console.log("Importing OfferLetter.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/OfferLetter.json"));

	    data.forEach(function (item, index, array) {
	        OfferLetter.insert(item);
	    })
	}

	// Add OfferTerm documents
	if (OfferTerm.find().count() === 0) {
	    console.log("Importing OfferTerm.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/OfferTerm.json"));

	    data.forEach(function (item, index, array) {
	        OfferTerm.insert(item);
	    })
	}

	// Add Operation documents
	if (Operation.find().count() === 0) {
	    console.log("Importing Operation.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/Operation.json"));

	    data.forEach(function (item, index, array) {
	        Operation.insert(item);
	    })
	}

	// Add OpportunityItem documents
	if (OpportunityItem.find().count() === 0) {
	    console.log("Importing OpportunityItem.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/OpportunityItem.json"));

	    data.forEach(function (item, index, array) {
	        OpportunityItem.insert(item);
	    })
	}

	// Add Opportunity documents
	if (Opportunity.find().count() === 0) {
	    console.log("Importing Opportunity.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/Opportunity.json"));

	    data.forEach(function (item, index, array) {
	        Opportunity.insert(item);
	    })
	}

	// Add PackedItem documents
	if (PackedItem.find().count() === 0) {
	    console.log("Importing PackedItem.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/PackedItem.json"));

	    data.forEach(function (item, index, array) {
	        PackedItem.insert(item);
	    })
	}

	// Add PackingSlip documents
	if (PackingSlip.find().count() === 0) {
	    console.log("Importing PackingSlip.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/PackingSlip.json"));

	    data.forEach(function (item, index, array) {
	        PackingSlip.insert(item);
	    })
	}

	// Add Page documents
	if (Page.find().count() === 0) {
	    console.log("Importing Page.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/Page.json"));

	    data.forEach(function (item, index, array) {
	        Page.insert(item);
	    })
	}

	// Add PageRole documents
	if (PageRole.find().count() === 0) {
	    console.log("Importing PageRole.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/PageRole.json"));

	    data.forEach(function (item, index, array) {
	        PageRole.insert(item);
	    })
	}

	// Add PartyAccount documents
	if (PartyAccount.find().count() === 0) {
	    console.log("Importing PartyAccount.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/PartyAccount.json"));

	    data.forEach(function (item, index, array) {
	        PartyAccount.insert(item);
	    })
	}

	// Add PatchLog documents
	if (PatchLog.find().count() === 0) {
	    console.log("Importing PatchLog.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/PatchLog.json"));

	    data.forEach(function (item, index, array) {
	        PatchLog.insert(item);
	    })
	}

	// Add PeriodClosingVoucher documents
	if (PeriodClosingVoucher.find().count() === 0) {
	    console.log("Importing PeriodClosingVoucher.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/PeriodClosingVoucher.json"));

	    data.forEach(function (item, index, array) {
	        PeriodClosingVoucher.insert(item);
	    })
	}

	// Add PosProfile documents
	if (PosProfile.find().count() === 0) {
	    console.log("Importing PosProfile.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/PosProfile.json"));

	    data.forEach(function (item, index, array) {
	        PosProfile.insert(item);
	    })
	}

	// Add PricingRule documents
	if (PricingRule.find().count() === 0) {
	    console.log("Importing PricingRule.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/PricingRule.json"));

	    data.forEach(function (item, index, array) {
	        PricingRule.insert(item);
	    })
	}

	// Add PriceList documents
	if (PriceList.find().count() === 0) {
	    console.log("Importing PriceList.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/PriceList.json"));

	    data.forEach(function (item, index, array) {
	        PriceList.insert(item);
	    })
	}

	// Add PrintFormat documents
	if (PrintFormat.find().count() === 0) {
	    console.log("Importing PrintFormat.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/PrintFormat.json"));

	    data.forEach(function (item, index, array) {
	        PrintFormat.insert(item);
	    })
	}

	// Add PrintHeading documents
	if (PrintHeading.find().count() === 0) {
	    console.log("Importing PrintHeading.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/PrintHeading.json"));

	    data.forEach(function (item, index, array) {
	        PrintHeading.insert(item);
	    })
	}

	// Add ProductBundleItem documents
	if (ProductBundleItem.find().count() === 0) {
	    console.log("Importing ProductBundleItem.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/ProductBundleItem.json"));

	    data.forEach(function (item, index, array) {
	        ProductBundleItem.insert(item);
	    })
	}

	// Add ProductBundle documents
	if (ProductBundle.find().count() === 0) {
	    console.log("Importing ProductBundle.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/ProductBundle.json"));

	    data.forEach(function (item, index, array) {
	        ProductBundle.insert(item);
	    })
	}

	// Add ProductionOrder documents
	if (ProductionOrder.find().count() === 0) {
	    console.log("Importing ProductionOrder.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/ProductionOrder.json"));

	    data.forEach(function (item, index, array) {
	        ProductionOrder.insert(item);
	    })
	}

	// Add ProductionOrderOperation documents
	if (ProductionOrderOperation.find().count() === 0) {
	    console.log("Importing ProductionOrderOperation.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/ProductionOrderOperation.json"));

	    data.forEach(function (item, index, array) {
	        ProductionOrderOperation.insert(item);
	    })
	}

	// Add Project documents
	if (Project.find().count() === 0) {
	    console.log("Importing Project.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/Project.json"));

	    data.forEach(function (item, index, array) {
	        Project.insert(item);
	    })
	}

	// Add PropertySetter documents
	if (PropertySetter.find().count() === 0) {
	    console.log("Importing PropertySetter.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/PropertySetter.json"));

	    data.forEach(function (item, index, array) {
	        PropertySetter.insert(item);
	    })
	}

	// Add PurchaseInvoiceItem documents
	if (PurchaseInvoiceItem.find().count() === 0) {
	    console.log("Importing PurchaseInvoiceItem.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/PurchaseInvoiceItem.json"));

	    data.forEach(function (item, index, array) {
	        PurchaseInvoiceItem.insert(item);
	    })
	}

	// Add PurchaseInvoice documents
	if (PurchaseInvoice.find().count() === 0) {
	    console.log("Importing PurchaseInvoice.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/PurchaseInvoice.json"));

	    data.forEach(function (item, index, array) {
	        PurchaseInvoice.insert(item);
	    })
	}

	// Add PurchaseOrderItem documents
	if (PurchaseOrderItem.find().count() === 0) {
	    console.log("Importing PurchaseOrderItem.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/PurchaseOrderItem.json"));

	    data.forEach(function (item, index, array) {
	        PurchaseOrderItem.insert(item);
	    })
	}

	// Add PurchaseOrderItemSupplied documents
	if (PurchaseOrderItemSupplied.find().count() === 0) {
	    console.log("Importing PurchaseOrderItemSupplied.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/PurchaseOrderItemSupplied.json"));

	    data.forEach(function (item, index, array) {
	        PurchaseOrderItemSupplied.insert(item);
	    })
	}

	// Add PurchaseOrder documents
	if (PurchaseOrder.find().count() === 0) {
	    console.log("Importing PurchaseOrder.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/PurchaseOrder.json"));

	    data.forEach(function (item, index, array) {
	        PurchaseOrder.insert(item);
	    })
	}

	// Add PurchaseReceiptItem documents
	if (PurchaseReceiptItem.find().count() === 0) {
	    console.log("Importing PurchaseReceiptItem.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/PurchaseReceiptItem.json"));

	    data.forEach(function (item, index, array) {
	        PurchaseReceiptItem.insert(item);
	    })
	}

	// Add PurchaseReceipt documents
	if (PurchaseReceipt.find().count() === 0) {
	    console.log("Importing PurchaseReceipt.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/PurchaseReceipt.json"));

	    data.forEach(function (item, index, array) {
	        PurchaseReceipt.insert(item);
	    })
	}

	// Add PurchaseTaxesAndChargesTemplate documents
	if (PurchaseTaxesAndChargesTemplate.find().count() === 0) {
	    console.log("Importing PurchaseTaxesAndChargesTemplate.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/PurchaseTaxesAndChargesTemplate.json"));

	    data.forEach(function (item, index, array) {
	        PurchaseTaxesAndChargesTemplate.insert(item);
	    })
	}

	// Add QualityInspection documents
	if (QualityInspection.find().count() === 0) {
	    console.log("Importing QualityInspection.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/QualityInspection.json"));

	    data.forEach(function (item, index, array) {
	        QualityInspection.insert(item);
	    })
	}

	// Add QuotationItem documents
	if (QuotationItem.find().count() === 0) {
	    console.log("Importing QuotationItem.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/QuotationItem.json"));

	    data.forEach(function (item, index, array) {
	        QuotationItem.insert(item);
	    })
	}

	// Add Quotation documents
	if (Quotation.find().count() === 0) {
	    console.log("Importing Quotation.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/Quotation.json"));

	    data.forEach(function (item, index, array) {
	        Quotation.insert(item);
	    })
	}

	// Add Report documents
	if (Report.find().count() === 0) {
	    console.log("Importing Report.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/Report.json"));

	    data.forEach(function (item, index, array) {
	        Report.insert(item);
	    })
	}

	// Add Role documents
	if (Role.find().count() === 0) {
	    console.log("Importing Role.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/Role.json"));

	    data.forEach(function (item, index, array) {
	        Role.insert(item);
	    })
	}

	// Add SalarySlipDeduction documents
	if (SalarySlipDeduction.find().count() === 0) {
	    console.log("Importing SalarySlipDeduction.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/SalarySlipDeduction.json"));

	    data.forEach(function (item, index, array) {
	        SalarySlipDeduction.insert(item);
	    })
	}

	// Add SalarySlipEarning documents
	if (SalarySlipEarning.find().count() === 0) {
	    console.log("Importing SalarySlipEarning.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/SalarySlipEarning.json"));

	    data.forEach(function (item, index, array) {
	        SalarySlipEarning.insert(item);
	    })
	}

	// Add SalarySlip documents
	if (SalarySlip.find().count() === 0) {
	    console.log("Importing SalarySlip.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/SalarySlip.json"));

	    data.forEach(function (item, index, array) {
	        SalarySlip.insert(item);
	    })
	}

	// Add SalaryStructureDeduction documents
	if (SalaryStructureDeduction.find().count() === 0) {
	    console.log("Importing SalaryStructureDeduction.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/SalaryStructureDeduction.json"));

	    data.forEach(function (item, index, array) {
	        SalaryStructureDeduction.insert(item);
	    })
	}

	// Add SalaryStructureEarning documents
	if (SalaryStructureEarning.find().count() === 0) {
	    console.log("Importing SalaryStructureEarning.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/SalaryStructureEarning.json"));

	    data.forEach(function (item, index, array) {
	        SalaryStructureEarning.insert(item);
	    })
	}

	// Add SalaryStructure documents
	if (SalaryStructure.find().count() === 0) {
	    console.log("Importing SalaryStructure.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/SalaryStructure.json"));

	    data.forEach(function (item, index, array) {
	        SalaryStructure.insert(item);
	    })
	}

	// Add SalesInvoiceItem documents
	if (SalesInvoiceItem.find().count() === 0) {
	    console.log("Importing SalesInvoiceItem.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/SalesInvoiceItem.json"));

	    data.forEach(function (item, index, array) {
	        SalesInvoiceItem.insert(item);
	    })
	}

	// Add SalesInvoice documents
	if (SalesInvoice.find().count() === 0) {
	    console.log("Importing SalesInvoice.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/SalesInvoice.json"));

	    data.forEach(function (item, index, array) {
	        SalesInvoice.insert(item);
	    })
	}

	// Add SalesOrderItem documents
	if (SalesOrderItem.find().count() === 0) {
	    console.log("Importing SalesOrderItem.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/SalesOrderItem.json"));

	    data.forEach(function (item, index, array) {
	        SalesOrderItem.insert(item);
	    })
	}

	// Add SalesOrder documents
	if (SalesOrder.find().count() === 0) {
	    console.log("Importing SalesOrder.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/SalesOrder.json"));

	    data.forEach(function (item, index, array) {
	        SalesOrder.insert(item);
	    })
	}

	// Add SalesPartner documents
	if (SalesPartner.find().count() === 0) {
	    console.log("Importing SalesPartner.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/SalesPartner.json"));

	    data.forEach(function (item, index, array) {
	        SalesPartner.insert(item);
	    })
	}

	// Add SalesPerson documents
	if (SalesPerson.find().count() === 0) {
	    console.log("Importing SalesPerson.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/SalesPerson.json"));

	    data.forEach(function (item, index, array) {
	        SalesPerson.insert(item);
	    })
	}

	// Add SalesTaxesAndChargesTemplate documents
	if (SalesTaxesAndChargesTemplate.find().count() === 0) {
	    console.log("Importing SalesTaxesAndChargesTemplate.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/SalesTaxesAndChargesTemplate.json"));

	    data.forEach(function (item, index, array) {
	        SalesTaxesAndChargesTemplate.insert(item);
	    })
	}

	// Add SchedulerLog documents
	if (SchedulerLog.find().count() === 0) {
	    console.log("Importing SchedulerLog.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/SchedulerLog.json"));

	    data.forEach(function (item, index, array) {
	        SchedulerLog.insert(item);
	    })
	}

	// Add SerialNo documents
	if (SerialNo.find().count() === 0) {
	    console.log("Importing SerialNo.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/SerialNo.json"));

	    data.forEach(function (item, index, array) {
	        SerialNo.insert(item);
	    })
	}

	// Add Series documents
	if (Series.find().count() === 0) {
	    console.log("Importing Series.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/Series.json"));

	    data.forEach(function (item, index, array) {
	        Series.insert(item);
	    })
	}

	// Add Sessions documents
	if (Sessions.find().count() === 0) {
	    console.log("Importing Sessions.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/Sessions.json"));

	    data.forEach(function (item, index, array) {
	        Sessions.insert(item);
	    })
	}

	// Add ShippingRule documents
	if (ShippingRule.find().count() === 0) {
	    console.log("Importing ShippingRule.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/ShippingRule.json"));

	    data.forEach(function (item, index, array) {
	        ShippingRule.insert(item);
	    })
	}

	// Add Singles documents
	if (Singles.find().count() === 0) {
	    console.log("Importing Singles.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/Singles.json"));

	    data.forEach(function (item, index, array) {
	        Singles.insert(item);
	    })
	}

	// Add SmsLog documents
	if (SmsLog.find().count() === 0) {
	    console.log("Importing SmsLog.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/SmsLog.json"));

	    data.forEach(function (item, index, array) {
	        SmsLog.insert(item);
	    })
	}

	// Add StandardReply documents
	if (StandardReply.find().count() === 0) {
	    console.log("Importing StandardReply.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/StandardReply.json"));

	    data.forEach(function (item, index, array) {
	        StandardReply.insert(item);
	    })
	}

	// Add StockEntryDetail documents
	if (StockEntryDetail.find().count() === 0) {
	    console.log("Importing StockEntryDetail.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/StockEntryDetail.json"));

	    data.forEach(function (item, index, array) {
	        StockEntryDetail.insert(item);
	    })
	}

	// Add StockEntry documents
	if (StockEntry.find().count() === 0) {
	    console.log("Importing StockEntry.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/StockEntry.json"));

	    data.forEach(function (item, index, array) {
	        StockEntry.insert(item);
	    })
	}

	// Add StockLedgerEntry documents
	if (StockLedgerEntry.find().count() === 0) {
	    console.log("Importing StockLedgerEntry.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/StockLedgerEntry.json"));

	    data.forEach(function (item, index, array) {
	        StockLedgerEntry.insert(item);
	    })
	}

	// Add StockReconciliationItem documents
	if (StockReconciliationItem.find().count() === 0) {
	    console.log("Importing StockReconciliationItem.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/StockReconciliationItem.json"));

	    data.forEach(function (item, index, array) {
	        StockReconciliationItem.insert(item);
	    })
	}

	// Add StockReconciliation documents
	if (StockReconciliation.find().count() === 0) {
	    console.log("Importing StockReconciliation.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/StockReconciliation.json"));

	    data.forEach(function (item, index, array) {
	        StockReconciliation.insert(item);
	    })
	}

	// Add Supplier documents
	if (Supplier.find().count() === 0) {
	    console.log("Importing Supplier.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/Supplier.json"));

	    data.forEach(function (item, index, array) {
	        Supplier.insert(item);
	    })
	}

	// Add SupplierQuotationItem documents
	if (SupplierQuotationItem.find().count() === 0) {
	    console.log("Importing SupplierQuotationItem.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/SupplierQuotationItem.json"));

	    data.forEach(function (item, index, array) {
	        SupplierQuotationItem.insert(item);
	    })
	}

	// Add SupplierQuotation documents
	if (SupplierQuotation.find().count() === 0) {
	    console.log("Importing SupplierQuotation.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/SupplierQuotation.json"));

	    data.forEach(function (item, index, array) {
	        SupplierQuotation.insert(item);
	    })
	}

	// Add SupplierType documents
	if (SupplierType.find().count() === 0) {
	    console.log("Importing SupplierType.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/SupplierType.json"));

	    data.forEach(function (item, index, array) {
	        SupplierType.insert(item);
	    })
	}

	// Add Task documents
	if (Task.find().count() === 0) {
	    console.log("Importing Task.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/Task.json"));

	    data.forEach(function (item, index, array) {
	        Task.insert(item);
	    })
	}

	// Add TaxRule documents
	if (TaxRule.find().count() === 0) {
	    console.log("Importing TaxRule.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/TaxRule.json"));

	    data.forEach(function (item, index, array) {
	        TaxRule.insert(item);
	    })
	}

	// Add TermsAndConditions documents
	if (TermsAndConditions.find().count() === 0) {
	    console.log("Importing TermsAndConditions.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/TermsAndConditions.json"));

	    data.forEach(function (item, index, array) {
	        TermsAndConditions.insert(item);
	    })
	}

	// Add Territory documents
	if (Territory.find().count() === 0) {
	    console.log("Importing Territory.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/Territory.json"));

	    data.forEach(function (item, index, array) {
	        Territory.insert(item);
	    })
	}

	// Add TimeLog documents
	if (TimeLog.find().count() === 0) {
	    console.log("Importing TimeLog.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/TimeLog.json"));

	    data.forEach(function (item, index, array) {
	        TimeLog.insert(item);
	    })
	}

	// Add TimeLogBatch documents
	if (TimeLogBatch.find().count() === 0) {
	    console.log("Importing TimeLogBatch.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/TimeLogBatch.json"));

	    data.forEach(function (item, index, array) {
	        TimeLogBatch.insert(item);
	    })
	}

	// Add Todo documents
	if (Todo.find().count() === 0) {
	    console.log("Importing Todo.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/Todo.json"));

	    data.forEach(function (item, index, array) {
	        Todo.insert(item);
	    })
	}

	// Add TopBarItem documents
	if (TopBarItem.find().count() === 0) {
	    console.log("Importing TopBarItem.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/TopBarItem.json"));

	    data.forEach(function (item, index, array) {
	        TopBarItem.insert(item);
	    })
	}

	// Add UomConversionDetail documents
	if (UomConversionDetail.find().count() === 0) {
	    console.log("Importing UomConversionDetail.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/UomConversionDetail.json"));

	    data.forEach(function (item, index, array) {
	        UomConversionDetail.insert(item);
	    })
	}

	// Add Uom documents
	if (Uom.find().count() === 0) {
	    console.log("Importing Uom.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/Uom.json"));

	    data.forEach(function (item, index, array) {
	        Uom.insert(item);
	    })
	}

	// Add User documents
	if (User.find().count() === 0) {
	    console.log("Importing User.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/User.json"));

	    data.forEach(function (item, index, array) {
	        User.insert(item);
	    })
	}

	// Add UserRole documents
	if (Userrole.find().count() === 0) {
	    console.log("Importing UserRole.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/UserRole.json"));

	    data.forEach(function (item, index, array) {
	        Userrole.insert(item);
	    })
	}

	// Add Versions documents
	if (Versions.find().count() === 0) {
	    console.log("Importing Versions.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/Versions.json"));

	    data.forEach(function (item, index, array) {
	        Versions.insert(item);
	    })
	}

	// Add Warehouse documents
	if (Warehouse.find().count() === 0) {
	    console.log("Importing Warehouse.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/Warehouse.json"));

	    data.forEach(function (item, index, array) {
	        Warehouse.insert(item);
	    })
	}

	// Add WarrantyClaim documents
	if (WarrantyClaim.find().count() === 0) {
	    console.log("Importing WarrantyClaim.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/WarrantyClaim.json"));

	    data.forEach(function (item, index, array) {
	        WarrantyClaim.insert(item);
	    })
	}

	// Add WebForm documents
	if (WebForm.find().count() === 0) {
	    console.log("Importing WebForm.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/WebForm.json"));

	    data.forEach(function (item, index, array) {
	        WebForm.insert(item);
	    })
	}

	// Add WebFormField documents
	if (WebFormField.find().count() === 0) {
	    console.log("Importing WebFormField.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/WebFormField.json"));

	    data.forEach(function (item, index, array) {
	        WebFormField.insert(item);
	    })
	}

	// Add WebPage documents
	if (WebPage.find().count() === 0) {
	    console.log("Importing WebPage.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/WebPage.json"));

	    data.forEach(function (item, index, array) {
	        WebPage.insert(item);
	    })
	}

	// Add WebsiteSlideshow documents
	if (WebsiteSlideshow.find().count() === 0) {
	    console.log("Importing WebsiteSlideshow.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/WebsiteSlideshow.json"));

	    data.forEach(function (item, index, array) {
	        WebsiteSlideshow.insert(item);
	    })
	}

	// Add WebsiteTheme documents
	if (WebsiteTheme.find().count() === 0) {
	    console.log("Importing WebsiteTheme.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/WebsiteTheme.json"));

	    data.forEach(function (item, index, array) {
	        WebsiteTheme.insert(item);
	    })
	}

	// Add Workflow documents
	if (Workflow.find().count() === 0) {
	    console.log("Importing Workflow.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/Workflow.json"));

	    data.forEach(function (item, index, array) {
	        Workflow.insert(item);
	    })
	}

	// Add WorkflowAction documents
	if (WorkflowAction.find().count() === 0) {
	    console.log("Importing WorkflowAction.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/WorkflowAction.json"));

	    data.forEach(function (item, index, array) {
	        WorkflowAction.insert(item);
	    })
	}

	// Add WorkflowState documents
	if (WorkflowState.find().count() === 0) {
	    console.log("Importing WorkflowState.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/WorkflowState.json"));

	    data.forEach(function (item, index, array) {
	        WorkflowState.insert(item);
	    })
	}

	// Add Workstation documents
	if (Workstation.find().count() === 0) {
	    console.log("Importing Workstation.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/Workstation.json"));

	    data.forEach(function (item, index, array) {
	        Workstation.insert(item);
	    })
	}

	// Add WorkstationWorkingHour documents
	if (WorkstationWorkingHour.find().count() === 0) {
	    console.log("Importing WorkstationWorkingHour.json to meteor db")

	    var data = JSON.parse(Assets.getText("data/WorkstationWorkingHour.json"));

	    data.forEach(function (item, index, array) {
	        WorkstationWorkingHour.insert(item);
	    })
	}

});
