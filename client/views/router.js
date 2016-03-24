Router.configure({
	templateNameConverter: "upperCamelCase",
	routeControllerNameConverter: "upperCamelCase",
	layoutTemplate: "layout",
	notFoundTemplate: "notFound",
	loadingTemplate: "loading",
  	defaultBreadcrumbLastLink: true
});

var publicRoutes = [
	"home_public",
	"login",
	"register",
	"verify_email",
	"forgot_password",
	"reset_password"
];

var privateRoutes = [
	"home_private",
	"admin",
	"admin.users",
	"admin.users.system_user",
	"admin.users.system_user.details",
	"admin.users.system_user.insert",
	"admin.users.system_user.edit",
	"user_settings",
	"user_settings.profile",
	"user_settings.change_pass",
	"dashboard",
	"logout",
	"accounts",
	"accounts.documents",
	"accounts.documents.customer",
	"accounts.documents.customer.details",
	"accounts.documents.customer.edit",
	"accounts.documents.customer.insert",
	"accounts.documents.journal_entry",
	"accounts.documents.journal_entry.details",
	"accounts.documents.journal_entry.edit",
	"accounts.documents.journal_entry.insert",
	"accounts.documents.purchase_invoice",
	"accounts.documents.purchase_invoice.details",
	"accounts.documents.purchase_invoice.edit",
	"accounts.documents.purchase_invoice.insert",
	"accounts.documents.sales_invoice",
	"accounts.documents.sales_invoice.details",
	"accounts.documents.sales_invoice.edit",
	"accounts.documents.sales_invoice.insert",
	"accounts.documents.supplier",
	"accounts.documents.supplier.details",
	"accounts.documents.supplier.edit",
	"accounts.documents.supplier.insert",
	"accounts.help",
	"accounts.help.chart_of_accounts",
	"accounts.help.opening_accounting_balance",
	"accounts.help.setting_up_taxes",
	"accounts.main_reports",
	"accounts.main_reports.accounts_payable",
	"accounts.main_reports.accounts_receivable",
	"accounts.main_reports.balance_sheet",
	"accounts.main_reports.financial_analytics",
	"accounts.main_reports.general_ledger",
	"accounts.main_reports.gross_profit",
	"accounts.main_reports.profit_and_loss_statement",
	"accounts.main_reports.purchase_register",
	"accounts.main_reports.sales_register",
	"accounts.main_reports.trial_balance",
	"accounts.main_reports.trial_balance_for_party",
	"accounts.setup",
	"accounts.standard_reports",
	"accounts.standard_reports.accounts_payable_summary",
	"accounts.standard_reports.accounts_receivable_summary",
	"accounts.standard_reports.bank_clearance_summary",
	"accounts.standard_reports.bank_reconciliation_statement",
	"accounts.standard_reports.budget_variance_report",
	"accounts.standard_reports.customer_credit_balance",
	"accounts.standard_reports.delivered_items_to_be_billed",
	"accounts.standard_reports.item_wise_purchase_register",
	"accounts.standard_reports.item_wise_sales_register",
	"accounts.standard_reports.ordered_items_to_be_billed",
	"accounts.standard_reports.payment_period_based_on_invoice_date",
	"accounts.standard_reports.purchase_invoice_trends",
	"accounts.standard_reports.purchase_order_items_to_be_billed",
	"accounts.standard_reports.received_items_to_be_billed",
	"accounts.standard_reports.sales_invoice_trends",
	"accounts.standard_reports.sales_partners_commission",
	"accounts.tools",
	"accounts.tools.bank_reconciliation",
	"accounts.tools.payment_reconciliation",
	"accounts.tools.payment_tool",
	"accounts.tools.period_closing_voucher",
	"accounts.tools.period_closing_voucher.details",
	"accounts.tools.period_closing_voucher.edit",
	"accounts.tools.period_closing_voucher.insert",
	"all_applications",
	"core_settings",
	"core_settings.documents",
	"core_settings.documents.async_task",
	"core_settings.documents.async_task.details",
	"core_settings.documents.async_task.edit",
	"core_settings.documents.async_task.insert",
	"core_settings.setup",
	"core_settings.setup.comment",
	"core_settings.setup.comment.details",
	"core_settings.setup.comment.edit",
	"core_settings.setup.comment.insert",
	"core_settings.setup.communication",
	"core_settings.setup.communication.details",
	"core_settings.setup.communication.edit",
	"core_settings.setup.communication.insert",
	"core_settings.setup.module_def",
	"core_settings.setup.module_def.details",
	"core_settings.setup.module_def.edit",
	"core_settings.setup.module_def.insert",
	"core_settings.setup.page",
	"core_settings.setup.page.details",
	"core_settings.setup.page.edit",
	"core_settings.setup.page.insert",
	"core_settings.setup.versions",
	"core_settings.setup.versions.details",
	"core_settings.setup.versions.edit",
	"core_settings.setup.versions.insert",
	"core_settings.standard_reports",
	"core_settings.standard_reports.document_share_report",
	"core_settings.standard_reports.permitted_documents_for_user",
	"core_settings.standard_reports.todo",
	"crm",
	"crm.documents",
	"crm.documents.contact",
	"crm.documents.contact.details",
	"crm.documents.contact.edit",
	"crm.documents.contact.insert",
	"crm.documents.lead",
	"crm.documents.lead.details",
	"crm.documents.lead.edit",
	"crm.documents.lead.insert",
	"crm.documents.newsletter",
	"crm.documents.newsletter.details",
	"crm.documents.newsletter.edit",
	"crm.documents.newsletter.insert",
	"crm.documents.opportunity",
	"crm.documents.opportunity.details",
	"crm.documents.opportunity.edit",
	"crm.documents.opportunity.insert",
	"crm.help",
	"crm.help.lead_to_quotation",
	"crm.main_reports",
	"crm.main_reports.sales_funnel",
	"crm.setup",
	"crm.setup.campaign",
	"crm.setup.campaign.details",
	"crm.setup.campaign.edit",
	"crm.setup.campaign.insert",
	"crm.setup.customer_group",
	"crm.setup.newsletter_list",
	"crm.setup.newsletter_list.details",
	"crm.setup.newsletter_list.edit",
	"crm.setup.newsletter_list.insert",
	"crm.standard_reports",
	"crm.standard_reports.customer_addresses_and_contacts",
	"crm.standard_reports.customers_not_purchasing_for_long_time",
	"crm.standard_reports.lead_details",
	"crm.tools",
	"crm.tools.sms_center",
	"crm.tools.sms_log",
	"crm.tools.sms_log.details",
	"crm.tools.sms_log.edit",
	"crm.tools.sms_log.insert",
	"file",
	"file.details",
	"file.edit",
	"file.insert",
	"human_resources",
	"human_resources.documents",
	"human_resources.documents.appraisal",
	"human_resources.documents.appraisal.details",
	"human_resources.documents.appraisal.edit",
	"human_resources.documents.appraisal.insert",
	"human_resources.documents.attendance",
	"human_resources.documents.attendance.details",
	"human_resources.documents.attendance.edit",
	"human_resources.documents.attendance.insert",
	"human_resources.documents.employee",
	"human_resources.documents.employee.details",
	"human_resources.documents.employee.edit",
	"human_resources.documents.employee.insert",
	"human_resources.documents.expense_claim",
	"human_resources.documents.expense_claim.details",
	"human_resources.documents.expense_claim.edit",
	"human_resources.documents.expense_claim.insert",
	"human_resources.documents.job_applicant",
	"human_resources.documents.job_applicant.details",
	"human_resources.documents.job_applicant.edit",
	"human_resources.documents.job_applicant.insert",
	"human_resources.documents.job_opening",
	"human_resources.documents.job_opening.details",
	"human_resources.documents.job_opening.edit",
	"human_resources.documents.job_opening.insert",
	"human_resources.documents.leave_application",
	"human_resources.documents.leave_application.details",
	"human_resources.documents.leave_application.edit",
	"human_resources.documents.leave_application.insert",
	"human_resources.documents.offer_letter",
	"human_resources.documents.offer_letter.details",
	"human_resources.documents.offer_letter.edit",
	"human_resources.documents.offer_letter.insert",
	"human_resources.documents.salary_slip",
	"human_resources.documents.salary_slip.details",
	"human_resources.documents.salary_slip.edit",
	"human_resources.documents.salary_slip.insert",
	"human_resources.setup",
	"human_resources.standard_reports",
	"human_resources.standard_reports.employee_birthday",
	"human_resources.standard_reports.employee_information",
	"human_resources.standard_reports.employee_leave_balance",
	"human_resources.standard_reports.monthly_attendance_sheet",
	"human_resources.standard_reports.monthly_salary_register",
	"human_resources.tools",
	"human_resources.tools.leave_allocation_tool",
	"human_resources.tools.process_payroll",
	"human_resources.tools.upload_attendance",
	"manufacturing",
	"manufacturing.documents",
	"manufacturing.documents.bill_of_material",
	"manufacturing.documents.bill_of_material.details",
	"manufacturing.documents.bill_of_material.edit",
	"manufacturing.documents.bill_of_material.insert",
	"manufacturing.documents.operation",
	"manufacturing.documents.operation.details",
	"manufacturing.documents.operation.edit",
	"manufacturing.documents.operation.insert",
	"manufacturing.documents.production_order",
	"manufacturing.documents.production_order.details",
	"manufacturing.documents.production_order.edit",
	"manufacturing.documents.production_order.insert",
	"manufacturing.documents.workstation",
	"manufacturing.documents.workstation.details",
	"manufacturing.documents.workstation.edit",
	"manufacturing.documents.workstation.insert",
	"manufacturing.help",
	"manufacturing.help.bill_of_materials",
	"manufacturing.setup",
	"manufacturing.setup.manufacturing_settings",
	"manufacturing.standard_reports",
	"manufacturing.standard_reports.bom_search",
	"manufacturing.standard_reports.completed_production_orders",
	"manufacturing.standard_reports.issued_items_against_production_order",
	"manufacturing.standard_reports.open_production_orders",
	"manufacturing.standard_reports.production_orders_in_progress",
	"manufacturing.tools",
	"manufacturing.tools.bom_browser",
	"manufacturing.tools.bom_replace_tool",
	"manufacturing.tools.production_planning_tool",
	"pos",
	"pos.start",
	"pos.new",
	"projects",
	"projects.documents",
	"projects.documents.activity_cost",
	"projects.documents.activity_cost.details",
	"projects.documents.activity_cost.edit",
	"projects.documents.activity_cost.insert",
	"projects.documents.activity_type",
	"projects.documents.activity_type.details",
	"projects.documents.activity_type.edit",
	"projects.documents.activity_type.insert",
	"projects.documents.project",
	"projects.documents.project.details",
	"projects.documents.project.edit",
	"projects.documents.project.insert",
	"projects.documents.task",
	"projects.documents.task.details",
	"projects.documents.task.edit",
	"projects.documents.task.insert",
	"projects.documents.time_log",
	"projects.documents.time_log.details",
	"projects.documents.time_log.edit",
	"projects.documents.time_log.insert",
	"projects.documents.time_log_batch",
	"projects.documents.time_log_batch.details",
	"projects.documents.time_log_batch.edit",
	"projects.documents.time_log_batch.insert",
	"projects.standard_reports",
	"projects.standard_reports.daily_time_log_summary",
	"projects.standard_reports.project_wise_stock_tracking",
	"projects.tools",
	"projects.tools.gantt_chart",
	"purchasing",
	"purchasing.documents",
	"purchasing.documents.address",
	"purchasing.documents.address.details",
	"purchasing.documents.address.edit",
	"purchasing.documents.address.insert",
	"purchasing.documents.material_request",
	"purchasing.documents.material_request.details",
	"purchasing.documents.material_request.edit",
	"purchasing.documents.material_request.insert",
	"purchasing.documents.purchase_order",
	"purchasing.documents.purchase_order.details",
	"purchasing.documents.purchase_order.edit",
	"purchasing.documents.purchase_order.insert",
	"purchasing.documents.supplier_quotation",
	"purchasing.documents.supplier_quotation.details",
	"purchasing.documents.supplier_quotation.edit",
	"purchasing.documents.supplier_quotation.insert",
	"purchasing.help",
	"purchasing.help.customer_and_supplier",
	"purchasing.main_reports",
	"purchasing.main_reports.purchase_analytics",
	"purchasing.setup",
	"purchasing.standard_reports",
	"purchasing.standard_reports.item_wise_purchase_history",
	"purchasing.standard_reports.items_to_be_requested",
	"purchasing.standard_reports.material_requests_for_which_supplier_quotations_are_not_created",
	"purchasing.standard_reports.purchase_order_trends",
	"purchasing.standard_reports.requested_items_to_be_ordered",
	"purchasing.standard_reports.supplier_addresses_and_contacts",
	"purchasing.standard_reports.supplier_wise_sales_analytics",
	"selling",
	"selling.documents",
	"selling.documents.quotation",
	"selling.documents.quotation.details",
	"selling.documents.quotation.edit",
	"selling.documents.quotation.insert",
	"selling.documents.sales_order",
	"selling.documents.sales_order.details",
	"selling.documents.sales_order.edit",
	"selling.documents.sales_order.insert",
	"selling.help",
	"selling.help.customer_and_supplier",
	"selling.main_reports",
	"selling.main_reports.customer_acquisition_and_loyalty",
	"selling.main_reports.sales_analytics",
	"selling.main_reports.sales_funnel",
	"selling.setup",
	"selling.standard_reports",
	"selling.standard_reports.available_stock_for_packing_items",
	"selling.standard_reports.bom_search",
	"selling.standard_reports.customer_addresses_and_contacts",
	"selling.standard_reports.customer_credit_balance",
	"selling.standard_reports.customers_not_purchasing_for_long_time",
	"selling.standard_reports.item_wise_sales_history",
	"selling.standard_reports.lead_details",
	"selling.standard_reports.ordered_items_to_be_delivered",
	"selling.standard_reports.pending_so_items_for_purchase_request",
	"selling.standard_reports.quotation_trends",
	"selling.standard_reports.sales_order_trends",
	"selling.standard_reports.sales_person_target_variance_item_group_wise",
	"selling.standard_reports.sales_person_wise_transaction_summary",
	"selling.standard_reports.territory_target_variance_item_group_wise",
	"selling.tools",
	"setup",
	"setup.accounts",
	"setup.accounts.accounts_settings",
	"setup.accounts.chart_of_accounts",
	"setup.accounts.chart_of_cost_centers",
	"setup.accounts.company",
	"setup.accounts.company.details",
	"setup.accounts.company.edit",
	"setup.accounts.company.insert",
	"setup.accounts.currency",
	"setup.accounts.currency.details",
	"setup.accounts.currency.edit",
	"setup.accounts.currency.insert",
	"setup.accounts.currency_exchange",
	"setup.accounts.currency_exchange.details",
	"setup.accounts.currency_exchange.edit",
	"setup.accounts.currency_exchange.insert",
	"setup.accounts.fiscal_year",
	"setup.accounts.fiscal_year.details",
	"setup.accounts.fiscal_year.edit",
	"setup.accounts.fiscal_year.insert",
	"setup.accounts.mode_of_payment",
	"setup.accounts.mode_of_payment.details",
	"setup.accounts.mode_of_payment.edit",
	"setup.accounts.mode_of_payment.insert",
	"setup.accounts.monthly_distribution",
	"setup.accounts.monthly_distribution.details",
	"setup.accounts.monthly_distribution.edit",
	"setup.accounts.monthly_distribution.insert",
	"setup.accounts.point_of_sale_profile",
	"setup.accounts.point_of_sale_profile.details",
	"setup.accounts.point_of_sale_profile.edit",
	"setup.accounts.point_of_sale_profile.insert",
	"setup.accounts.pricing_rule",
	"setup.accounts.pricing_rule.details",
	"setup.accounts.pricing_rule.edit",
	"setup.accounts.pricing_rule.insert",
	"setup.accounts.purchase_taxes_and_charges_template",
	"setup.accounts.purchase_taxes_and_charges_template.details",
	"setup.accounts.purchase_taxes_and_charges_template.edit",
	"setup.accounts.purchase_taxes_and_charges_template.insert",
	"setup.accounts.sales_taxes_and_charges_template",
	"setup.accounts.sales_taxes_and_charges_template.details",
	"setup.accounts.sales_taxes_and_charges_template.edit",
	"setup.accounts.sales_taxes_and_charges_template.insert",
	"setup.accounts.shipping_rule",
	"setup.accounts.shipping_rule.details",
	"setup.accounts.shipping_rule.edit",
	"setup.accounts.shipping_rule.insert",
	"setup.accounts.tax_rule",
	"setup.accounts.tax_rule.details",
	"setup.accounts.tax_rule.edit",
	"setup.accounts.tax_rule.insert",
	"setup.customize",
	"setup.customize.authorization_rule",
	"setup.customize.authorization_rule.details",
	"setup.customize.authorization_rule.edit",
	"setup.customize.authorization_rule.insert",
	"setup.customize.custom_field",
	"setup.customize.custom_field.details",
	"setup.customize.custom_field.edit",
	"setup.customize.custom_field.insert",
	"setup.customize.custom_script",
	"setup.customize.custom_script.details",
	"setup.customize.custom_script.edit",
	"setup.customize.custom_script.insert",
	"setup.customize.customize_form",
	"setup.customize.doctype",
	"setup.customize.doctype.details",
	"setup.customize.doctype.edit",
	"setup.customize.doctype.insert",
	"setup.customize.doctype.doctypes.about_us_settings",
	"setup.customize.doctype.doctypes.about_us_team_member",
	"setup.customize.doctype.doctypes.account",
	"setup.customize.doctype.doctypes.accounts_settings",
	"setup.customize.doctype.doctypes.activity_cost",
	"setup.customize.doctype.doctypes.activity_type",
	"setup.customize.doctype.doctypes.address",
	"setup.customize.doctype.doctypes.address_template",
	"setup.customize.doctype.doctypes.appraisal",
	"setup.customize.doctype.doctypes.appraisal_goal",
	"setup.customize.doctype.doctypes.appraisal_template",
	"setup.customize.doctype.doctypes.appraisal_template_goal",
	"setup.customize.doctype.doctypes.async_task",
	"setup.customize.doctype.doctypes.attendance",
	"setup.customize.doctype.doctypes.authorization_control",
	"setup.customize.doctype.doctypes.authorization_rule",
	"setup.customize.doctype.doctypes.bank_reconciliation",
	"setup.customize.doctype.doctypes.bank_reconciliation_detail",
	"setup.customize.doctype.doctypes.batch",
	"setup.customize.doctype.doctypes.bin",
	"setup.customize.doctype.doctypes.block_module",
	"setup.customize.doctype.doctypes.blog_category",
	"setup.customize.doctype.doctypes.blogger",
	"setup.customize.doctype.doctypes.blog_post",
	"setup.customize.doctype.doctypes.blog_settings",
	"setup.customize.doctype.doctypes.bom",
	"setup.customize.doctype.doctypes.bom_explosion_item",
	"setup.customize.doctype.doctypes.bom_item",
	"setup.customize.doctype.doctypes.bom_operation",
	"setup.customize.doctype.doctypes.bom_replace_tool",
	"setup.customize.doctype.doctypes.branch",
	"setup.customize.doctype.doctypes.brand",
	"setup.customize.doctype.doctypes.budget_detail",
	"setup.customize.doctype.doctypes.bulk_email",
	"setup.customize.doctype.doctypes.campaign",
	"setup.customize.doctype.doctypes.c_form",
	"setup.customize.doctype.doctypes.c_form_invoice_detail",
	"setup.customize.doctype.doctypes.comment",
	"setup.customize.doctype.doctypes.communication",
	"setup.customize.doctype.doctypes.company",
	"setup.customize.doctype.doctypes.company_history",
	"setup.customize.doctype.doctypes.contact",
	"setup.customize.doctype.doctypes.contact_us_settings",
	"setup.customize.doctype.doctypes.cost_center",
	"setup.customize.doctype.doctypes.country",
	"setup.customize.doctype.doctypes.currency",
	"setup.customize.doctype.doctypes.currency_exchange",
	"setup.customize.doctype.doctypes.customer",
	"setup.customize.doctype.doctypes.customer_group",
	"setup.customize.doctype.doctypes.custom_field",
	"setup.customize.doctype.doctypes.customize_form",
	"setup.customize.doctype.doctypes.customize_form_field",
	"setup.customize.doctype.doctypes.custom_script",
	"setup.customize.doctype.doctypes.deduction_type",
	"setup.customize.doctype.doctypes.default_value",
	"setup.customize.doctype.doctypes.delivery_note",
	"setup.customize.doctype.doctypes.delivery_note_item",
	"setup.customize.doctype.doctypes.department",
	"setup.customize.doctype.doctypes.dependent_task",
	"setup.customize.doctype.doctypes.designation",
	"setup.customize.doctype.doctypes.doc_field",
	"setup.customize.doctype.doctypes.doc_perm",
	"setup.customize.doctype.doctypes.doc_share",
	"setup.customize.doctype.doctypes.doc_type",
	"setup.customize.doctype.doctypes.dropbox_backup",
	"setup.customize.doctype.doctypes.earning_type",
	"setup.customize.doctype.doctypes.email_account",
	"setup.customize.doctype.doctypes.email_alert",
	"setup.customize.doctype.doctypes.email_alert_recipient",
	"setup.customize.doctype.doctypes.email_digest",
	"setup.customize.doctype.doctypes.email_unsubscribe",
	"setup.customize.doctype.doctypes.employee",
	"setup.customize.doctype.doctypes.employee_education",
	"setup.customize.doctype.doctypes.employee_external_work_history",
	"setup.customize.doctype.doctypes.employee_internal_work_history",
	"setup.customize.doctype.doctypes.employee_leave_approver",
	"setup.customize.doctype.doctypes.employment_type",
	"setup.customize.doctype.doctypes.event",
	"setup.customize.doctype.doctypes.event_role",
	"setup.customize.doctype.doctypes.expense_claim",
	"setup.customize.doctype.doctypes.expense_claim_detail",
	"setup.customize.doctype.doctypes.expense_claim_type",
	"setup.customize.doctype.doctypes.features_setup",
	"setup.customize.doctype.doctypes.feed",
	"setup.customize.doctype.doctypes.file",
	"setup.customize.doctype.doctypes.fiscal_year",
	"setup.customize.doctype.doctypes.fiscal_year_company",
	"setup.customize.doctype.doctypes.gl_entry",
	"setup.customize.doctype.doctypes.global_defaults",
	"setup.customize.doctype.doctypes.holiday",
	"setup.customize.doctype.doctypes.holiday_list",
	"setup.customize.doctype.doctypes.hr_settings",
	"setup.customize.doctype.doctypes.hub_settings",
	"setup.customize.doctype.doctypes.industry_type",
	"setup.customize.doctype.doctypes.installation_note",
	"setup.customize.doctype.doctypes.installation_note_item",
	"setup.customize.doctype.doctypes.issue",
	"setup.customize.doctype.doctypes.item",
	"setup.customize.doctype.doctypes.item_attribute",
	"setup.customize.doctype.doctypes.item_attribute_value",
	"setup.customize.doctype.doctypes.item_customer_detail",
	"setup.customize.doctype.doctypes.item_group",
	"setup.customize.doctype.doctypes.item_price",
	"setup.customize.doctype.doctypes.item_quality_inspection_parameter",
	"setup.customize.doctype.doctypes.item_reorder",
	"setup.customize.doctype.doctypes.item_supplier",
	"setup.customize.doctype.doctypes.item_tax",
	"setup.customize.doctype.doctypes.item_variant",
	"setup.customize.doctype.doctypes.item_variant_attribute",
	"setup.customize.doctype.doctypes.item_website_specification",
	"setup.customize.doctype.doctypes.job_applicant",
	"setup.customize.doctype.doctypes.job_opening",
	"setup.customize.doctype.doctypes.journal_entry",
	"setup.customize.doctype.doctypes.journal_entry_account",
	"setup.customize.doctype.doctypes.landed_cost_item",
	"setup.customize.doctype.doctypes.landed_cost_purchase_receipt",
	"setup.customize.doctype.doctypes.landed_cost_taxes_and_charges",
	"setup.customize.doctype.doctypes.landed_cost_voucher",
	"setup.customize.doctype.doctypes.lead",
	"setup.customize.doctype.doctypes.leave_allocation",
	"setup.customize.doctype.doctypes.leave_application",
	"setup.customize.doctype.doctypes.leave_block_list",
	"setup.customize.doctype.doctypes.leave_block_list_allow",
	"setup.customize.doctype.doctypes.leave_block_list_date",
	"setup.customize.doctype.doctypes.leave_control_panel",
	"setup.customize.doctype.doctypes.leave_type",
	"setup.customize.doctype.doctypes.letter_head",
	"setup.customize.doctype.doctypes.maintenance_schedule",
	"setup.customize.doctype.doctypes.maintenance_schedule_detail",
	"setup.customize.doctype.doctypes.maintenance_schedule_item",
	"setup.customize.doctype.doctypes.maintenance_visit",
	"setup.customize.doctype.doctypes.maintenance_visit_purpose",
	"setup.customize.doctype.doctypes.manufacturing_settings",
	"setup.customize.doctype.doctypes.material_request",
	"setup.customize.doctype.doctypes.material_request_item",
	"setup.customize.doctype.doctypes.mode_of_payment",
	"setup.customize.doctype.doctypes.mode_of_payment_account",
	"setup.customize.doctype.doctypes.module_def",
	"setup.customize.doctype.doctypes.monthly_distribution",
	"setup.customize.doctype.doctypes.monthly_distribution_percentage",
	"setup.customize.doctype.doctypes.naming_series",
	"setup.customize.doctype.doctypes.newsletter",
	"setup.customize.doctype.doctypes.newsletter_list",
	"setup.customize.doctype.doctypes.newsletter_list_subscriber",
	"setup.customize.doctype.doctypes.note",
	"setup.customize.doctype.doctypes.notification_control",
	"setup.customize.doctype.doctypes.offer_letter",
	"setup.customize.doctype.doctypes.offer_letter_term",
	"setup.customize.doctype.doctypes.offer_term",
	"setup.customize.doctype.doctypes.operation",
	"setup.customize.doctype.doctypes.opportunity",
	"setup.customize.doctype.doctypes.opportunity_item",
	"setup.customize.doctype.doctypes.packed_item",
	"setup.customize.doctype.doctypes.packing_slip",
	"setup.customize.doctype.doctypes.packing_slip_item",
	"setup.customize.doctype.doctypes.page",
	"setup.customize.doctype.doctypes.page_role",
	"setup.customize.doctype.doctypes.party_account",
	"setup.customize.doctype.doctypes.patch_log",
	"setup.customize.doctype.doctypes.payment_reconciliation",
	"setup.customize.doctype.doctypes.payment_reconciliation_invoice",
	"setup.customize.doctype.doctypes.payment_reconciliation_payment",
	"setup.customize.doctype.doctypes.payment_tool",
	"setup.customize.doctype.doctypes.payment_tool_detail",
	"setup.customize.doctype.doctypes.period_closing_voucher",
	"setup.customize.doctype.doctypes.pos_profile",
	"setup.customize.doctype.doctypes.price_list",
	"setup.customize.doctype.doctypes.price_list_country",
	"setup.customize.doctype.doctypes.pricing_rule",
	"setup.customize.doctype.doctypes.print_format",
	"setup.customize.doctype.doctypes.print_heading",
	"setup.customize.doctype.doctypes.print_settings",
	"setup.customize.doctype.doctypes.process_payroll",
	"setup.customize.doctype.doctypes.product_bundle",
	"setup.customize.doctype.doctypes.product_bundle_item",
	"setup.customize.doctype.doctypes.production_order",
	"setup.customize.doctype.doctypes.production_order_operation",
	"setup.customize.doctype.doctypes.production_plan_item",
	"setup.customize.doctype.doctypes.production_planning_tool",
	"setup.customize.doctype.doctypes.production_plan_sales_order",
	"setup.customize.doctype.doctypes.project",
	"setup.customize.doctype.doctypes.project_task",
	"setup.customize.doctype.doctypes.property_setter",
	"setup.customize.doctype.doctypes.purchase_common",
	"setup.customize.doctype.doctypes.purchase_invoice",
	"setup.customize.doctype.doctypes.purchase_invoice_advance",
	"setup.customize.doctype.doctypes.purchase_invoice_item",
	"setup.customize.doctype.doctypes.purchase_order",
	"setup.customize.doctype.doctypes.purchase_order_item",
	"setup.customize.doctype.doctypes.purchase_order_item_supplied",
	"setup.customize.doctype.doctypes.purchase_receipt",
	"setup.customize.doctype.doctypes.purchase_receipt_item",
	"setup.customize.doctype.doctypes.purchase_receipt_item_supplied",
	"setup.customize.doctype.doctypes.purchase_taxes_and_charges",
	"setup.customize.doctype.doctypes.purchase_taxes_and_charges_template",
	"setup.customize.doctype.doctypes.purchasing_settings",
	"setup.customize.doctype.doctypes.quality_inspection",
	"setup.customize.doctype.doctypes.quality_inspection_reading",
	"setup.customize.doctype.doctypes.quotation",
	"setup.customize.doctype.doctypes.quotation_item",
	"setup.customize.doctype.doctypes.quotation_lost_reason",
	"setup.customize.doctype.doctypes.rename_tool",
	"setup.customize.doctype.doctypes.report",
	"setup.customize.doctype.doctypes.role",
	"setup.customize.doctype.doctypes.salary_slip",
	"setup.customize.doctype.doctypes.salary_slip_deduction",
	"setup.customize.doctype.doctypes.salary_slip_earning",
	"setup.customize.doctype.doctypes.salary_structure",
	"setup.customize.doctype.doctypes.salary_structure_deduction",
	"setup.customize.doctype.doctypes.salary_structure_earning",
	"setup.customize.doctype.doctypes.sales_invoice",
	"setup.customize.doctype.doctypes.sales_invoice_advance",
	"setup.customize.doctype.doctypes.sales_invoice_item",
	"setup.customize.doctype.doctypes.sales_order",
	"setup.customize.doctype.doctypes.sales_order_item",
	"setup.customize.doctype.doctypes.sales_partner",
	"setup.customize.doctype.doctypes.sales_person",
	"setup.customize.doctype.doctypes.sales_taxes_and_charges",
	"setup.customize.doctype.doctypes.sales_taxes_and_charges_template",
	"setup.customize.doctype.doctypes.sales_team",
	"setup.customize.doctype.doctypes.scheduler_log",
	"setup.customize.doctype.doctypes.selling_settings",
	"setup.customize.doctype.doctypes.serial_no",
	"setup.customize.doctype.doctypes.shipping_rule",
	"setup.customize.doctype.doctypes.shipping_rule_condition",
	"setup.customize.doctype.doctypes.shipping_rule_country",
	"setup.customize.doctype.doctypes.shopping_cart_settings",
	"setup.customize.doctype.doctypes.sms_center",
	"setup.customize.doctype.doctypes.sms_log",
	"setup.customize.doctype.doctypes.sms_parameter",
	"setup.customize.doctype.doctypes.sms_settings",
	"setup.customize.doctype.doctypes.social_login_keys",
	"setup.customize.doctype.doctypes.standard_reply",
	"setup.customize.doctype.doctypes.stock_entry",
	"setup.customize.doctype.doctypes.stock_entry_detail",
	"setup.customize.doctype.doctypes.stock_ledger_entry",
	"setup.customize.doctype.doctypes.stock_reconciliation",
	"setup.customize.doctype.doctypes.stock_reconcilitation_item",
	"setup.customize.doctype.doctypes.stock_settings",
	"setup.customize.doctype.doctypes.stock_uom_replace_utility",
	"setup.customize.doctype.doctypes.supplier",
	"setup.customize.doctype.doctypes.supplier_quotation",
	"setup.customize.doctype.doctypes.supplier_quotation_item",
	"setup.customize.doctype.doctypes.supplier_type",
	"setup.customize.doctype.doctypes.system_settings",
	"setup.customize.doctype.doctypes.target_detail",
	"setup.customize.doctype.doctypes.task",
	"setup.customize.doctype.doctypes.task_depends_on",
	"setup.customize.doctype.doctypes.tax_rule",
	"setup.customize.doctype.doctypes.terms_and_conditions",
	"setup.customize.doctype.doctypes.territory",
	"setup.customize.doctype.doctypes.time_log",
	"setup.customize.doctype.doctypes.time_log_batch",
	"setup.customize.doctype.doctypes.time_log_batch_detail",
	"setup.customize.doctype.doctypes.todo",
	"setup.customize.doctype.doctypes.top_bar_item",
	"setup.customize.doctype.doctypes.uom",
	"setup.customize.doctype.doctypes.uom_conversion_detail",
	"setup.customize.doctype.doctypes.upload_attendance",
	"setup.customize.doctype.doctypes.user",
	"setup.customize.doctype.doctypes.user_role",
	"setup.customize.doctype.doctypes.version",
	"setup.customize.doctype.doctypes.warehouse",
	"setup.customize.doctype.doctypes.warranty_claim",
	"setup.customize.doctype.doctypes.web_form",
	"setup.customize.doctype.doctypes.web_form_field",
	"setup.customize.doctype.doctypes.web_page",
	"setup.customize.doctype.doctypes.website_item_group",
	"setup.customize.doctype.doctypes.website_script",
	"setup.customize.doctype.doctypes.website_settings",
	"setup.customize.doctype.doctypes.website_slideshow",
	"setup.customize.doctype.doctypes.website_slideshow_item",
	"setup.customize.doctype.doctypes.website_theme",
	"setup.customize.doctype.doctypes.workflow",
	"setup.customize.doctype.doctypes.workflow_action",
	"setup.customize.doctype.doctypes.workflow_document_state",
	"setup.customize.doctype.doctypes.workflow_state",
	"setup.customize.doctype.doctypes.workflow_transition",
	"setup.customize.doctype.doctypes.workstation",
	"setup.customize.doctype.doctypes.workstation_working_hour",
	"setup.customize.email_notifications",
	"setup.customize.features_setup",
	"setup.data",
	"setup.data.import_export_data",
	"setup.data.rename_tool",
	"setup.email",
	"setup.email.email_account",
	"setup.email.email_account.details",
	"setup.email.email_account.edit",
	"setup.email.email_account.insert",
	"setup.email.email_alert",
	"setup.email.email_alert.details",
	"setup.email.email_alert.edit",
	"setup.email.email_alert.insert",
	"setup.email.email_digest",
	"setup.email.email_digest.details",
	"setup.email.email_digest.edit",
	"setup.email.email_digest.insert",
	"setup.email.sms_settings",
	"setup.email.standard_reply",
	"setup.email.standard_reply.details",
	"setup.email.standard_reply.edit",
	"setup.email.standard_reply.insert",
	"setup.help",
	"setup.help.data_import_and_export",
	"setup.help.printing_and_branding",
	"setup.help.setting_up_email",
	"setup.help.users_and_permissions",
	"setup.help.workflow",
	"setup.human_resources",
	"setup.human_resources.appraisal_template",
	"setup.human_resources.appraisal_template.details",
	"setup.human_resources.appraisal_template.edit",
	"setup.human_resources.appraisal_template.insert",
	"setup.human_resources.branch",
	"setup.human_resources.branch.details",
	"setup.human_resources.branch.edit",
	"setup.human_resources.branch.insert",
	"setup.human_resources.deduction_type",
	"setup.human_resources.deduction_type.details",
	"setup.human_resources.deduction_type.edit",
	"setup.human_resources.deduction_type.insert",
	"setup.human_resources.department",
	"setup.human_resources.department.details",
	"setup.human_resources.department.edit",
	"setup.human_resources.department.insert",
	"setup.human_resources.designation",
	"setup.human_resources.designation.details",
	"setup.human_resources.designation.edit",
	"setup.human_resources.designation.insert",
	"setup.human_resources.earning_type",
	"setup.human_resources.earning_type.details",
	"setup.human_resources.earning_type.edit",
	"setup.human_resources.earning_type.insert",
	"setup.human_resources.employment_type",
	"setup.human_resources.employment_type.details",
	"setup.human_resources.employment_type.edit",
	"setup.human_resources.employment_type.insert",
	"setup.human_resources.expense_claim_type",
	"setup.human_resources.expense_claim_type.details",
	"setup.human_resources.expense_claim_type.edit",
	"setup.human_resources.expense_claim_type.insert",
	"setup.human_resources.holiday_list",
	"setup.human_resources.holiday_list.details",
	"setup.human_resources.holiday_list.edit",
	"setup.human_resources.holiday_list.insert",
	"setup.human_resources.hr_settings",
	"setup.human_resources.leave_allocation",
	"setup.human_resources.leave_allocation.details",
	"setup.human_resources.leave_allocation.edit",
	"setup.human_resources.leave_allocation.insert",
	"setup.human_resources.leave_block_list",
	"setup.human_resources.leave_block_list.details",
	"setup.human_resources.leave_block_list.edit",
	"setup.human_resources.leave_block_list.insert",
	"setup.human_resources.leave_type",
	"setup.human_resources.leave_type.details",
	"setup.human_resources.leave_type.edit",
	"setup.human_resources.leave_type.insert",
	"setup.human_resources.salary_structure",
	"setup.human_resources.salary_structure.details",
	"setup.human_resources.salary_structure.edit",
	"setup.human_resources.salary_structure.insert",
	"setup.integrations",
	"setup.integrations.dropbox_backup",
	"setup.integrations.social_login_keys",
	"setup.permissions",
	"setup.permissions.document_share_report",
	"setup.permissions.permitted_documents_for_user",
	"setup.permissions.role_permissions_manager",
	"setup.permissions.user_permissions_manager",
	"setup.printing",
	"setup.printing.address_template",
	"setup.printing.address_template.details",
	"setup.printing.address_template.edit",
	"setup.printing.address_template.insert",
	"setup.printing.letter_head",
	"setup.printing.letter_head.details",
	"setup.printing.letter_head.edit",
	"setup.printing.letter_head.insert",
	"setup.printing.print_format",
	"setup.printing.print_format.details",
	"setup.printing.print_format.edit",
	"setup.printing.print_format.insert",
	"setup.printing.print_format_builder",
	"setup.printing.print_heading",
	"setup.printing.print_heading.details",
	"setup.printing.print_heading.edit",
	"setup.printing.print_heading.insert",
	"setup.printing.print_settings",
	"setup.printing.terms_and_conditions",
	"setup.printing.terms_and_conditions.details",
	"setup.printing.terms_and_conditions.edit",
	"setup.printing.terms_and_conditions.insert",
	"setup.purchasing",
	"setup.purchasing.purchasing_settings",
	"setup.purchasing.item_group_tree",
	"setup.purchasing.item_price",
	"setup.purchasing.price_list",
	"setup.purchasing.price_list.details",
	"setup.purchasing.price_list.edit",
	"setup.purchasing.price_list.insert",
	"setup.purchasing.supplier_type",
	"setup.purchasing.supplier_type.details",
	"setup.purchasing.supplier_type.edit",
	"setup.purchasing.supplier_type.insert",
	"setup.reports",
	"setup.reports.insert",
	"setup.reports.reports",
	"setup.reports.reports.accounts_payable",
	"setup.reports.reports.accounts_payable_summary",
	"setup.reports.reports.accounts_receivable",
	"setup.reports.reports.accounts_receivable_summary",
	"setup.reports.reports.available_stock_for_packing_items",
	"setup.reports.reports.balance_sheet",
	"setup.reports.reports.bank_clearance_summary",
	"setup.reports.reports.bank_reconciliation_statement",
	"setup.reports.reports.batch_wise_balance_history",
	"setup.reports.reports.bom_search",
	"setup.reports.reports.budget_variance_report",
	"setup.reports.reports.completed_production_orders",
	"setup.reports.reports.customer_acquisition_and_loyalty",
	"setup.reports.reports.customer_addresses_and_contacts",
	"setup.reports.reports.customer_credit_balance",
	"setup.reports.reports.customers_not_purchasing_for_long_time",
	"setup.reports.reports.daily_time_log_summary",
	"setup.reports.reports.delivered_items_to_be_billed",
	"setup.reports.reports.delivery_note_trends",
	"setup.reports.reports.document_share_report",
	"setup.reports.reports.employee_birthday",
	"setup.reports.reports.employee_information",
	"setup.reports.reports.employee_leave_balance",
	"setup.reports.reports.general_ledger",
	"setup.reports.reports.gross_profit",
	"setup.reports.reports.issued_items_against_production_order",
	"setup.reports.reports.item_prices",
	"setup.reports.reports.item_shortage_report",
	"setup.reports.reports.items_to_be_requested",
	"setup.reports.reports.item_wise_price_list_rate",
	"setup.reports.reports.item_wise_purchase_history",
	"setup.reports.reports.item_wise_purchase_register",
	"setup.reports.reports.item_wise_recommended_reorder_level",
	"setup.reports.reports.item_wise_sales_history",
	"setup.reports.reports.item_wise_sales_register",
	"setup.reports.reports.lead_details",
	"setup.reports.reports.maintenance_schedules",
	"setup.reports.reports.material_requests_for_which_supplier_quotations_are_not_created",
	"setup.reports.reports.monthly_attendance_sheet",
	"setup.reports.reports.monthly_salary_register",
	"setup.reports.reports.open_production_orders",
	"setup.reports.reports.ordered_items_to_be_billed",
	"setup.reports.reports.ordered_items_to_be_delivered",
	"setup.reports.reports.payment_period_based_on_invoice_date",
	"setup.reports.reports.pending_so_items_for_purchase_request",
	"setup.reports.reports.permitted_documents_for_user",
	"setup.reports.reports.production_orders_in_progress",
	"setup.reports.reports.profit_and_loss_statement",
	"setup.reports.reports.project_wise_stock_tracking",
	"setup.reports.reports.purchase_invoice_trends",
	"setup.reports.reports.purchase_order_items_to_be_billed",
	"setup.reports.reports.purchase_order_items_to_be_received",
	"setup.reports.reports.purchase_order_trends",
	"setup.reports.reports.purchase_receipt_trends",
	"setup.reports.reports.purchase_register",
	"setup.reports.reports.quotation_trends",
	"setup.reports.reports.received_items_to_be_billed",
	"setup.reports.reports.requested_items_to_be_ordered",
	"setup.reports.reports.requested_items_to_be_transferred",
	"setup.reports.reports.sales_invoice_trends",
	"setup.reports.reports.sales_order_trends",
	"setup.reports.reports.sales_partners_commission",
	"setup.reports.reports.sales_person_target_variance_item_group_wise",
	"setup.reports.reports.sales_person_wise_transaction_summary",
	"setup.reports.reports.sales_register",
	"setup.reports.reports.serial_no_service_contract_expiry",
	"setup.reports.reports.serial_no_status",
	"setup.reports.reports.serial_no_warranty_expiry",
	"setup.reports.reports.stock_ageing",
	"setup.reports.reports.stock_balance",
	"setup.reports.reports.stock_ledger",
	"setup.reports.reports.stock_projected_qty",
	"setup.reports.reports.supplier_addresses_and_contacts",
	"setup.reports.reports.supplier_wise_sales_analytics",
	"setup.reports.reports.territory_target_variance_item_group_wise",
	"setup.reports.reports.todo",
	"setup.reports.reports.trial_balance",
	"setup.reports.reports.trial_balance_for_party",
	"setup.selling",
	"setup.selling.industry_type",
	"setup.selling.industry_type.details",
	"setup.selling.industry_type.edit",
	"setup.selling.industry_type.insert",
	"setup.selling.product_bundle",
	"setup.selling.product_bundle.details",
	"setup.selling.product_bundle.edit",
	"setup.selling.product_bundle.insert",
	"setup.selling.sales_partner",
	"setup.selling.sales_partner.details",
	"setup.selling.sales_partner.edit",
	"setup.selling.sales_partner.insert",
	"setup.selling.sales_person",
	"setup.selling.selling_settings",
	"setup.selling.territory",
	"setup.settings",
	"setup.settings.global_settings",
	"setup.settings.naming_series",
	"setup.settings.show_hide_modules",
	"setup.settings.system_settings",
	"setup.stock",
	"setup.stock.brand",
	"setup.stock.brand.details",
	"setup.stock.brand.edit",
	"setup.stock.brand.insert",
	"setup.stock.item_attribute",
	"setup.stock.item_attribute.details",
	"setup.stock.item_attribute.edit",
	"setup.stock.item_attribute.insert",
	"setup.stock.stock_settings",
	"setup.stock.unit_of_measure_uom",
	"setup.stock.unit_of_measure_uom.details",
	"setup.stock.unit_of_measure_uom.edit",
	"setup.stock.unit_of_measure_uom.insert",
	"setup.stock.warehouse",
	"setup.stock.warehouse.details",
	"setup.stock.warehouse.edit",
	"setup.stock.warehouse.insert",
	"setup.support",
	"setup.system",
	"setup.system.application_installer",
	"setup.system.scheduler_log",
	"setup.system.scheduler_log.details",
	"setup.system.scheduler_log.edit",
	"setup.system.scheduler_log.insert",
	"setup.system.download_backups",
	"setup.users",
	"setup.users.role",
	"setup.users.role.details",
	"setup.users.role.edit",
	"setup.users.role.insert",
	"setup.users.user",
	"setup.users.user.details",
	"setup.users.user.edit",
	"setup.users.user.insert",
	"setup.website",
	"setup.website.about_us_settings",
	"setup.website.blog_category",
	"setup.website.blog_category.details",
	"setup.website.blog_category.edit",
	"setup.website.blog_category.insert",
	"setup.website.blog_settings",
	"setup.website.contact_us_settings",
	"setup.website.website_script",
	"setup.website.website_settings",
	"setup.website.website_theme",
	"setup.website.website_theme.details",
	"setup.website.website_theme.edit",
	"setup.website.website_theme.insert",
	"setup.workflow",
	"setup.workflow.workflow",
	"setup.workflow.workflow.details",
	"setup.workflow.workflow.edit",
	"setup.workflow.workflow.insert",
	"setup.workflow.workflow_action",
	"setup.workflow.workflow_action.details",
	"setup.workflow.workflow_action.edit",
	"setup.workflow.workflow_action.insert",
	"setup.workflow.workflow_state",
	"setup.workflow.workflow_state.details",
	"setup.workflow.workflow_state.edit",
	"setup.workflow.workflow_state.insert",
	"stock",
	"stock.documents",
	"stock.documents.batch",
	"stock.documents.batch.details",
	"stock.documents.batch.edit",
	"stock.documents.batch.insert",
	"stock.documents.delivery_note",
	"stock.documents.delivery_note.details",
	"stock.documents.delivery_note.edit",
	"stock.documents.delivery_note.insert",
	"stock.documents.installation_note",
	"stock.documents.installation_note.details",
	"stock.documents.installation_note.edit",
	"stock.documents.installation_note.insert",
	"stock.documents.item",
	"stock.documents.item.details",
	"stock.documents.item.edit",
	"stock.documents.item.insert",
	"stock.documents.purchase_receipt",
	"stock.documents.purchase_receipt.details",
	"stock.documents.purchase_receipt.edit",
	"stock.documents.purchase_receipt.insert",
	"stock.documents.serial_no",
	"stock.documents.serial_no.details",
	"stock.documents.serial_no.edit",
	"stock.documents.serial_no.insert",
	"stock.documents.stock_entry",
	"stock.documents.stock_entry.details",
	"stock.documents.stock_entry.edit",
	"stock.documents.stock_entry.insert",
	"stock.help",
	"stock.help.item_variants",
	"stock.help.items_and_pricing",
	"stock.help.opening_stock_balance",
	"stock.main_reports",
	"stock.main_reports.item_wise_price_list_rate",
	"stock.main_reports.stock_ageing",
	"stock.main_reports.stock_analytics",
	"stock.main_reports.stock_balance",
	"stock.main_reports.stock_ledger",
	"stock.main_reports.stock_projected_qty",
	"stock.setup",
	"stock.standard_reports",
	"stock.standard_reports.batch_wise_balance_history",
	"stock.standard_reports.delivery_note_trends",
	"stock.standard_reports.item_prices",
	"stock.standard_reports.item_shortage_report",
	"stock.standard_reports.item_wise_recommended_reorder_level",
	"stock.standard_reports.ordered_items_to_be_delivered",
	"stock.standard_reports.purchase_order_items_to_be_received",
	"stock.standard_reports.purchase_receipt_trends",
	"stock.standard_reports.requested_items_to_be_transferred",
	"stock.standard_reports.serial_no_service_contract_expiry",
	"stock.standard_reports.serial_no_status",
	"stock.standard_reports.serial_no_warranty_expiry",
	"stock.tools",
	"stock.tools.landed_cost_voucher",
	"stock.tools.landed_cost_voucher.details",
	"stock.tools.landed_cost_voucher.edit",
	"stock.tools.landed_cost_voucher.insert",
	"stock.tools.packing_slip",
	"stock.tools.packing_slip.details",
	"stock.tools.packing_slip.edit",
	"stock.tools.packing_slip.insert",
	"stock.tools.quality_inspection",
	"stock.tools.quality_inspection.details",
	"stock.tools.quality_inspection.edit",
	"stock.tools.quality_inspection.insert",
	"stock.tools.stock_reconciliation",
	"stock.tools.stock_reconciliation.details",
	"stock.tools.stock_reconciliation.edit",
	"stock.tools.stock_reconciliation.insert",
	"stock.tools.stock_uom_replace_utility",
	"support",
	"support.documents",
	"support.documents.issue",
	"support.documents.issue.details",
	"support.documents.issue.edit",
	"support.documents.issue.insert",
	"support.documents.maintenance_schedule",
	"support.documents.maintenance_schedule.details",
	"support.documents.maintenance_schedule.edit",
	"support.documents.maintenance_schedule.insert",
	"support.documents.maintenance_visit",
	"support.documents.maintenance_visit.details",
	"support.documents.maintenance_visit.edit",
	"support.documents.maintenance_visit.insert",
	"support.documents.warranty_claim",
	"support.documents.warranty_claim.details",
	"support.documents.warranty_claim.edit",
	"support.documents.warranty_claim.insert",
	"support.setup",
	"support.standard_reports",
	"support.standard_reports.maintenance_schedules",
	"support.standard_reports.support_analytics",
	"tools",
	"tools.todo",
	"tools.todo.details",
	"tools.todo.edit",
	"tools.todo.insert",
	"tools.calendar",
	"tools.messages",
	"tools.note",
	"tools.note.details",
	"tools.note.edit",
	"tools.note.insert",
	"tools.activity",
	"tutorials",
	"tutorials.accounts",
	"tutorials.accounts.chart_of_accounts",
	"tutorials.accounts.opening_accounting_balance",
	"tutorials.accounts.setting_up_taxes",
	"tutorials.purchasing",
	"tutorials.purchasing.customer_and_supplier",
	"tutorials.purchasing.managing_subcontracting",
	"tutorials.purchasing.material_request_to_purchase_order",
	"tutorials.purchasing.purchase_order_to_payment",
	"tutorials.crm",
	"tutorials.crm.lead_to_quotation",
	"tutorials.crm.newsletters",
	"tutorials.general",
	"tutorials.general.customizing_forms",
	"tutorials.general.navigating",
	"tutorials.general.setup_wizard",
	"tutorials.human_resources",
	"tutorials.human_resources.expense_claims",
	"tutorials.human_resources.leave_management",
	"tutorials.human_resources.processing_payroll",
	"tutorials.human_resources.setting_up_employees",
	"tutorials.manufacturing",
	"tutorials.manufacturing.bill_of_materials",
	"tutorials.manufacturing.production_order",
	"tutorials.manufacturing.production_planning_tool",
	"tutorials.projects",
	"tutorials.projects.managing_projects",
	"tutorials.selling",
	"tutorials.selling.customer_and_supplier",
	"tutorials.selling.point_of_sale",
	"tutorials.selling.sales_order_to_payment",
	"tutorials.setup",
	"tutorials.setup.data_import_and_export",
	"tutorials.setup.opening_stock_balance",
	"tutorials.setup.printing_and_branding",
	"tutorials.setup.setting_up_email",
	"tutorials.setup.users_and_permissions",
	"tutorials.setup.workflow",
	"tutorials.stock",
	"tutorials.stock.batch_inventory",
	"tutorials.stock.items_and_pricing",
	"tutorials.stock.making_stock_entries",
	"tutorials.stock.managing_subcontracting",
	"tutorials.stock.opening_stock_balance",
	"tutorials.stock.serialized_inventory",
	"website",
	"website.documents",
	"website.documents.blog_post",
	"website.documents.blog_post.details",
	"website.documents.blog_post.edit",
	"website.documents.blog_post.insert",
	"website.documents.blogger",
	"website.documents.blogger.details",
	"website.documents.blogger.edit",
	"website.documents.blogger.insert",
	"website.documents.web_form",
	"website.documents.web_form.details",
	"website.documents.web_form.edit",
	"website.documents.web_form.insert",
	"website.documents.web_page",
	"website.documents.web_page.details",
	"website.documents.web_page.edit",
	"website.documents.web_page.insert",
	"website.documents.website_slideshow",
	"website.documents.website_slideshow.details",
	"website.documents.website_slideshow.edit",
	"website.documents.website_slideshow.insert",
	"website.setup",
	"website.shopping_cart",
	"website.shopping_cart.shopping_cart_settings"

];

var freeRoutes = [

];

var roleMap = [
	{ route: "admin",	roles: ["admin"] },
	{ route: "admin.users",	roles: ["admin"] },
	{ route: "admin.users.system_user",	roles: ["admin"] },
	{ route: "admin.users.system_user.details",	roles: ["admin"] },
	{ route: "admin.users.system_user.insert",	roles: ["admin"] },
	{ route: "admin.users.system_user.edit",	roles: ["admin"] },
	{ route: "user_settings",	roles: ["user","admin"] },
	{ route: "home_private",	roles: ["user","admin"] },
	{ route: "user_settings.profile",	roles: ["user","admin"] },
	{ route: "user_settings.change_pass",	roles: ["user","admin"] },
	{ route: "dashboard",	roles: ["user","admin"] },
	{ route: "accounts",	roles: ["user","admin"] },
	{ route: "accounts.documents",	roles: ["user","admin"] },
	{ route: "accounts.documents.customer",	roles: ["user","admin"] },
	{ route: "accounts.documents.customer.details",	roles: ["user","admin"] },
	{ route: "accounts.documents.customer.edit",	roles: ["user","admin"] },
	{ route: "accounts.documents.customer.insert",	roles: ["user","admin"] },
	{ route: "accounts.documents.journal_entry",	roles: ["user","admin"] },
	{ route: "accounts.documents.journal_entry.details",	roles: ["user","admin"] },
	{ route: "accounts.documents.journal_entry.edit",	roles: ["user","admin"] },
	{ route: "accounts.documents.journal_entry.insert",	roles: ["user","admin"] },
	{ route: "accounts.documents.purchase_invoice",	roles: ["user","admin"] },
	{ route: "accounts.documents.purchase_invoice.details",	roles: ["user","admin"] },
	{ route: "accounts.documents.purchase_invoice.edit",	roles: ["user","admin"] },
	{ route: "accounts.documents.purchase_invoice.insert",	roles: ["user","admin"] },
	{ route: "accounts.documents.sales_invoice",	roles: ["user","admin"] },
	{ route: "accounts.documents.sales_invoice.details",	roles: ["user","admin"] },
	{ route: "accounts.documents.sales_invoice.edit",	roles: ["user","admin"] },
	{ route: "accounts.documents.sales_invoice.insert",	roles: ["user","admin"] },
	{ route: "accounts.documents.supplier",	roles: ["user","admin"] },
	{ route: "accounts.documents.supplier.details",	roles: ["user","admin"] },
	{ route: "accounts.documents.supplier.edit",	roles: ["user","admin"] },
	{ route: "accounts.documents.supplier.insert",	roles: ["user","admin"] },
	{ route: "accounts.help",	roles: ["user","admin"] },
	{ route: "accounts.help.chart_of_accounts",	roles: ["user","admin"] },
	{ route: "accounts.help.opening_accounting_balance",	roles: ["user","admin"] },
	{ route: "accounts.help.setting_up_taxes",	roles: ["user","admin"] },
	{ route: "accounts.main_reports",	roles: ["user","admin"] },
	{ route: "accounts.main_reports.accounts_payable",	roles: ["user","admin"] },
	{ route: "accounts.main_reports.accounts_receivable",	roles: ["user","admin"] },
	{ route: "accounts.main_reports.balance_sheet",	roles: ["user","admin"] },
	{ route: "accounts.main_reports.financial_analytics",	roles: ["user","admin"] },
	{ route: "accounts.main_reports.general_ledger",	roles: ["user","admin"] },
	{ route: "accounts.main_reports.gross_profit",	roles: ["user","admin"] },
	{ route: "accounts.main_reports.profit_and_loss_statement",	roles: ["user","admin"] },
	{ route: "accounts.main_reports.purchase_register",	roles: ["user","admin"] },
	{ route: "accounts.main_reports.sales_register",	roles: ["user","admin"] },
	{ route: "accounts.main_reports.trial_balance",	roles: ["user","admin"] },
	{ route: "accounts.main_reports.trial_balance_for_party",	roles: ["user","admin"] },
	{ route: "accounts.setup",	roles: ["user","admin"] },
	{ route: "accounts.standard_reports",	roles: ["user","admin"] },
	{ route: "accounts.standard_reports.accounts_payable_summary",	roles: ["user","admin"] },
	{ route: "accounts.standard_reports.accounts_receivable_summary",	roles: ["user","admin"] },
	{ route: "accounts.standard_reports.bank_clearance_summary",	roles: ["user","admin"] },
	{ route: "accounts.standard_reports.bank_reconciliation_statement",	roles: ["user","admin"] },
	{ route: "accounts.standard_reports.budget_variance_report",	roles: ["user","admin"] },
	{ route: "accounts.standard_reports.customer_credit_balance",	roles: ["user","admin"] },
	{ route: "accounts.standard_reports.delivered_items_to_be_billed",	roles: ["user","admin"] },
	{ route: "accounts.standard_reports.item_wise_purchase_register",	roles: ["user","admin"] },
	{ route: "accounts.standard_reports.item_wise_sales_register",	roles: ["user","admin"] },
	{ route: "accounts.standard_reports.ordered_items_to_be_billed",	roles: ["user","admin"] },
	{ route: "accounts.standard_reports.payment_period_based_on_invoice_date",	roles: ["user","admin"] },
	{ route: "accounts.standard_reports.purchase_invoice_trends",	roles: ["user","admin"] },
	{ route: "accounts.standard_reports.purchase_order_items_to_be_billed",	roles: ["user","admin"] },
	{ route: "accounts.standard_reports.received_items_to_be_billed",	roles: ["user","admin"] },
	{ route: "accounts.standard_reports.sales_invoice_trends",	roles: ["user","admin"] },
	{ route: "accounts.standard_reports.sales_partners_commission",	roles: ["user","admin"] },
	{ route: "accounts.tools",	roles: ["user","admin"] },
	{ route: "accounts.tools.bank_reconciliation",	roles: ["user","admin"] },
	{ route: "accounts.tools.payment_reconciliation",	roles: ["user","admin"] },
	{ route: "accounts.tools.payment_tool",	roles: ["user","admin"] },
	{ route: "accounts.tools.period_closing_voucher",	roles: ["user","admin"] },
	{ route: "accounts.tools.period_closing_voucher.details",	roles: ["user","admin"] },
	{ route: "accounts.tools.period_closing_voucher.edit",	roles: ["user","admin"] },
	{ route: "accounts.tools.period_closing_voucher.insert",	roles: ["user","admin"] },
	{ route: "all_applications",	roles: ["user","admin"] },
	{ route: "core_settings",	roles: ["user","admin"] },
	{ route: "core_settings.documents",	roles: ["user","admin"] },
	{ route: "core_settings.documents.async_task",	roles: ["user","admin"] },
	{ route: "core_settings.documents.async_task.details",	roles: ["user","admin"] },
	{ route: "core_settings.documents.async_task.edit",	roles: ["user","admin"] },
	{ route: "core_settings.documents.async_task.insert",	roles: ["user","admin"] },
	{ route: "core_settings.setup",	roles: ["user","admin"] },
	{ route: "core_settings.setup.comment",	roles: ["user","admin"] },
	{ route: "core_settings.setup.comment.details",	roles: ["user","admin"] },
	{ route: "core_settings.setup.comment.edit",	roles: ["user","admin"] },
	{ route: "core_settings.setup.comment.insert",	roles: ["user","admin"] },
	{ route: "core_settings.setup.communication",	roles: ["user","admin"] },
	{ route: "core_settings.setup.communication.details",	roles: ["user","admin"] },
	{ route: "core_settings.setup.communication.edit",	roles: ["user","admin"] },
	{ route: "core_settings.setup.communication.insert",	roles: ["user","admin"] },
	{ route: "core_settings.setup.module_def",	roles: ["user","admin"] },
	{ route: "core_settings.setup.module_def.details",	roles: ["user","admin"] },
	{ route: "core_settings.setup.module_def.edit",	roles: ["user","admin"] },
	{ route: "core_settings.setup.module_def.insert",	roles: ["user","admin"] },
	{ route: "core_settings.setup.page",	roles: ["user","admin"] },
	{ route: "core_settings.setup.page.details",	roles: ["user","admin"] },
	{ route: "core_settings.setup.page.edit",	roles: ["user","admin"] },
	{ route: "core_settings.setup.page.insert",	roles: ["user","admin"] },
	{ route: "core_settings.setup.versions",		roles: ["user","admin"] },
	{ route: "core_settings.setup.versions.details",		roles: ["user","admin"] },
	{ route: "core_settings.setup.versions.edit",		roles: ["user","admin"] },
	{ route: "core_settings.setup.versions.insert",		roles: ["user","admin"] },
	{ route: "core_settings.standard_reports",	roles: ["user","admin"] },
	{ route: "core_settings.standard_reports.document_share_report",	roles: ["user","admin"] },
	{ route: "core_settings.standard_reports.permitted_documents_for_user",	roles: ["user","admin"] },
	{ route: "core_settings.standard_reports.todo",	roles: ["user","admin"] },
	{ route: "crm",	roles: ["user","admin"] },
	{ route: "crm.documents",	roles: ["user","admin"] },
	{ route: "crm.documents.contact",	roles: ["user","admin"] },
	{ route: "crm.documents.contact.details",	roles: ["user","admin"] },
	{ route: "crm.documents.contact.edit",	roles: ["user","admin"] },
	{ route: "crm.documents.contact.insert",	roles: ["user","admin"] },
	{ route: "crm.documents.lead",	roles: ["user","admin"] },
	{ route: "crm.documents.lead.details",	roles: ["user","admin"] },
	{ route: "crm.documents.lead.edit",	roles: ["user","admin"] },
	{ route: "crm.documents.lead.insert",	roles: ["user","admin"] },
	{ route: "crm.documents.newsletter",	roles: ["user","admin"] },
	{ route: "crm.documents.newsletter.details",	roles: ["user","admin"] },
	{ route: "crm.documents.newsletter.edit",	roles: ["user","admin"] },
	{ route: "crm.documents.newsletter.insert",	roles: ["user","admin"] },
	{ route: "crm.documents.opportunity",	roles: ["user","admin"] },
	{ route: "crm.documents.opportunity.details",	roles: ["user","admin"] },
	{ route: "crm.documents.opportunity.edit",	roles: ["user","admin"] },
	{ route: "crm.documents.opportunity.insert",	roles: ["user","admin"] },
	{ route: "crm.help",	roles: ["user","admin"] },
	{ route: "crm.help.lead_to_quotation",	roles: ["user","admin"] },
	{ route: "crm.main_reports",	roles: ["user","admin"] },
	{ route: "crm.main_reports.sales_funnel",	roles: ["user","admin"] },
	{ route: "crm.setup",	roles: ["user","admin"] },
	{ route: "crm.setup.campaign",	roles: ["user","admin"] },
	{ route: "crm.setup.campaign.details",	roles: ["user","admin"] },
	{ route: "crm.setup.campaign.edit",	roles: ["user","admin"] },
	{ route: "crm.setup.campaign.insert",	roles: ["user","admin"] },
	{ route: "crm.setup.customer_group",	roles: ["user","admin"] },
	{ route: "crm.setup.newsletter_list",	roles: ["user","admin"] },
	{ route: "crm.setup.newsletter_list.details",	roles: ["user","admin"] },
	{ route: "crm.setup.newsletter_list.edit",	roles: ["user","admin"] },
	{ route: "crm.setup.newsletter_list.insert",	roles: ["user","admin"] },
	{ route: "crm.standard_reports",	roles: ["user","admin"] },
	{ route: "crm.standard_reports.customer_addresses_and_contacts",	roles: ["user","admin"] },
	{ route: "crm.standard_reports.customers_not_purchasing_for_long_time",	roles: ["user","admin"] },
	{ route: "crm.standard_reports.lead_details",	roles: ["user","admin"] },
	{ route: "crm.tools",	roles: ["user","admin"] },
	{ route: "crm.tools.sms_center",	roles: ["user","admin"] },
	{ route: "crm.tools.sms_log",	roles: ["user","admin"] },
	{ route: "crm.tools.sms_log.details",	roles: ["user","admin"] },
	{ route: "crm.tools.sms_log.edit",	roles: ["user","admin"] },
	{ route: "crm.tools.sms_log.insert",	roles: ["user","admin"] },
	{ route: "file",	roles: ["user","admin"] },
	{ route: "file.details",	roles: ["user","admin"] },
	{ route: "file.edit",	roles: ["user","admin"] },
	{ route: "file.insert",	roles: ["user","admin"] },
	{ route: "human_resources",	roles: ["user","admin"] },
	{ route: "human_resources.documents",	roles: ["user","admin"] },
	{ route: "human_resources.documents.appraisal",	roles: ["user","admin"] },
	{ route: "human_resources.documents.appraisal.details",	roles: ["user","admin"] },
	{ route: "human_resources.documents.appraisal.edit",	roles: ["user","admin"] },
	{ route: "human_resources.documents.appraisal.insert",	roles: ["user","admin"] },
	{ route: "human_resources.documents.attendance",	roles: ["user","admin"] },
	{ route: "human_resources.documents.attendance.details",	roles: ["user","admin"] },
	{ route: "human_resources.documents.attendance.edit",	roles: ["user","admin"] },
	{ route: "human_resources.documents.attendance.insert",	roles: ["user","admin"] },
	{ route: "human_resources.documents.employee",	roles: ["user","admin"] },
	{ route: "human_resources.documents.employee.details",	roles: ["user","admin"] },
	{ route: "human_resources.documents.employee.edit",	roles: ["user","admin"] },
	{ route: "human_resources.documents.employee.insert",	roles: ["user","admin"] },
	{ route: "human_resources.documents.expense_claim",	roles: ["user","admin"] },
	{ route: "human_resources.documents.expense_claim.details",	roles: ["user","admin"] },
	{ route: "human_resources.documents.expense_claim.edit",	roles: ["user","admin"] },
	{ route: "human_resources.documents.expense_claim.insert",	roles: ["user","admin"] },
	{ route: "human_resources.documents.job_applicant",	roles: ["user","admin"] },
	{ route: "human_resources.documents.job_applicant.details",	roles: ["user","admin"] },
	{ route: "human_resources.documents.job_applicant.edit",	roles: ["user","admin"] },
	{ route: "human_resources.documents.job_applicant.insert",	roles: ["user","admin"] },
	{ route: "human_resources.documents.job_opening",	roles: ["user","admin"] },
	{ route: "human_resources.documents.job_opening.details",	roles: ["user","admin"] },
	{ route: "human_resources.documents.job_opening.edit",	roles: ["user","admin"] },
	{ route: "human_resources.documents.job_opening.insert",	roles: ["user","admin"] },
	{ route: "human_resources.documents.leave_application",	roles: ["user","admin"] },
	{ route: "human_resources.documents.leave_application.details",	roles: ["user","admin"] },
	{ route: "human_resources.documents.leave_application.edit",	roles: ["user","admin"] },
	{ route: "human_resources.documents.leave_application.insert",	roles: ["user","admin"] },
	{ route: "human_resources.documents.offer_letter",	roles: ["user","admin"] },
	{ route: "human_resources.documents.offer_letter.details",	roles: ["user","admin"] },
	{ route: "human_resources.documents.offer_letter.edit",	roles: ["user","admin"] },
	{ route: "human_resources.documents.offer_letter.insert",	roles: ["user","admin"] },
	{ route: "human_resources.documents.salary_slip",	roles: ["user","admin"] },
	{ route: "human_resources.documents.salary_slip.details",	roles: ["user","admin"] },
	{ route: "human_resources.documents.salary_slip.edit",	roles: ["user","admin"] },
	{ route: "human_resources.documents.salary_slip.insert",	roles: ["user","admin"] },
	{ route: "human_resources.setup",	roles: ["user","admin"] },
	{ route: "human_resources.standard_reports",	roles: ["user","admin"] },
	{ route: "human_resources.standard_reports.employee_birthday",	roles: ["user","admin"] },
	{ route: "human_resources.standard_reports.employee_information",	roles: ["user","admin"] },
	{ route: "human_resources.standard_reports.employee_leave_balance",	roles: ["user","admin"] },
	{ route: "human_resources.standard_reports.monthly_attendance_sheet",	roles: ["user","admin"] },
	{ route: "human_resources.standard_reports.monthly_salary_register",	roles: ["user","admin"] },
	{ route: "human_resources.tools",	roles: ["user","admin"] },
	{ route: "human_resources.tools.leave_allocation_tool",	roles: ["user","admin"] },
	{ route: "human_resources.tools.process_payroll",	roles: ["user","admin"] },
	{ route: "human_resources.tools.upload_attendance",	roles: ["user","admin"] },
	{ route: "manufacturing",	roles: ["user","admin"] },
	{ route: "manufacturing.documents",	roles: ["user","admin"] },
	{ route: "manufacturing.documents.bill_of_material",	roles: ["user","admin"] },
	{ route: "manufacturing.documents.bill_of_material.details",	roles: ["user","admin"] },
	{ route: "manufacturing.documents.bill_of_material.edit",	roles: ["user","admin"] },
	{ route: "manufacturing.documents.bill_of_material.insert",	roles: ["user","admin"] },
	{ route: "manufacturing.documents.operation",	roles: ["user","admin"] },
	{ route: "manufacturing.documents.operation.details",	roles: ["user","admin"] },
	{ route: "manufacturing.documents.operation.edit",	roles: ["user","admin"] },
	{ route: "manufacturing.documents.operation.insert",	roles: ["user","admin"] },
	{ route: "manufacturing.documents.production_order",	roles: ["user","admin"] },
	{ route: "manufacturing.documents.production_order.details",	roles: ["user","admin"] },
	{ route: "manufacturing.documents.production_order.edit",	roles: ["user","admin"] },
	{ route: "manufacturing.documents.production_order.insert",	roles: ["user","admin"] },
	{ route: "manufacturing.documents.workstation",	roles: ["user","admin"] },
	{ route: "manufacturing.documents.workstation.details",	roles: ["user","admin"] },
	{ route: "manufacturing.documents.workstation.edit",	roles: ["user","admin"] },
	{ route: "manufacturing.documents.workstation.insert",	roles: ["user","admin"] },
	{ route: "manufacturing.help",	roles: ["user","admin"] },
	{ route: "manufacturing.help.bill_of_materials",	roles: ["user","admin"] },
	{ route: "manufacturing.setup",	roles: ["user","admin"] },
	{ route: "manufacturing.setup.manufacturing_settings",	roles: ["user","admin"] },
	{ route: "manufacturing.standard_reports",	roles: ["user","admin"] },
	{ route: "manufacturing.standard_reports.bom_search",	roles: ["user","admin"] },
	{ route: "manufacturing.standard_reports.completed_production_orders",	roles: ["user","admin"] },
	{ route: "manufacturing.standard_reports.issued_items_against_production_order",	roles: ["user","admin"] },
	{ route: "manufacturing.standard_reports.open_production_orders",	roles: ["user","admin"] },
	{ route: "manufacturing.standard_reports.production_orders_in_progress",	roles: ["user","admin"] },
	{ route: "manufacturing.tools",	roles: ["user","admin"] },
	{ route: "manufacturing.tools.bom_browser",	roles: ["user","admin"] },
	{ route: "manufacturing.tools.bom_replace_tool",	roles: ["user","admin"] },
	{ route: "manufacturing.tools.production_planning_tool",	roles: ["user","admin"] },
	{ route: "pos",	roles: ["user","admin"] },
	{ route: "pos.start",	roles: ["user","admin"] },
	{ route: "pos.new",	roles: ["user","admin"] },
	{ route: "projects",	roles: ["user","admin"] },
	{ route: "projects.documents",	roles: ["user","admin"] },
	{ route: "projects.documents.activity_cost",	roles: ["user","admin"] },
	{ route: "projects.documents.activity_cost.details",	roles: ["user","admin"] },
	{ route: "projects.documents.activity_cost.edit",	roles: ["user","admin"] },
	{ route: "projects.documents.activity_cost.insert",	roles: ["user","admin"] },
	{ route: "projects.documents.activity_type",	roles: ["user","admin"] },
	{ route: "projects.documents.activity_type.details",	roles: ["user","admin"] },
	{ route: "projects.documents.activity_type.edit",	roles: ["user","admin"] },
	{ route: "projects.documents.activity_type.insert",	roles: ["user","admin"] },
	{ route: "projects.documents.project",	roles: ["user","admin"] },
	{ route: "projects.documents.project.details",	roles: ["user","admin"] },
	{ route: "projects.documents.project.edit",	roles: ["user","admin"] },
	{ route: "projects.documents.project.insert",	roles: ["user","admin"] },
	{ route: "projects.documents.task",	roles: ["user","admin"] },
	{ route: "projects.documents.task.details",	roles: ["user","admin"] },
	{ route: "projects.documents.task.edit",	roles: ["user","admin"] },
	{ route: "projects.documents.task.insert",	roles: ["user","admin"] },
	{ route: "projects.documents.time_log",	roles: ["user","admin"] },
	{ route: "projects.documents.time_log.details",	roles: ["user","admin"] },
	{ route: "projects.documents.time_log.edit",	roles: ["user","admin"] },
	{ route: "projects.documents.time_log.insert",	roles: ["user","admin"] },
	{ route: "projects.documents.time_log_batch",	roles: ["user","admin"] },
	{ route: "projects.documents.time_log_batch.details",	roles: ["user","admin"] },
	{ route: "projects.documents.time_log_batch.edit",	roles: ["user","admin"] },
	{ route: "projects.documents.time_log_batch.insert",	roles: ["user","admin"] },
	{ route: "projects.standard_reports",	roles: ["user","admin"] },
	{ route: "projects.standard_reports.daily_time_log_summary",	roles: ["user","admin"] },
	{ route: "projects.standard_reports.project_wise_stock_tracking",	roles: ["user","admin"] },
	{ route: "projects.tools",	roles: ["user","admin"] },
	{ route: "projects.tools.gantt_chart",	roles: ["user","admin"] },
	{ route: "purchasing",	roles: ["user","admin"] },
	{ route: "purchasing.documents",	roles: ["user","admin"] },
	{ route: "purchasing.documents.address",	roles: ["user","admin"] },
	{ route: "purchasing.documents.address.details",	roles: ["user","admin"] },
	{ route: "purchasing.documents.address.edit",	roles: ["user","admin"] },
	{ route: "purchasing.documents.address.insert",	roles: ["user","admin"] },
	{ route: "purchasing.documents.material_request",	roles: ["user","admin"] },
	{ route: "purchasing.documents.material_request.details",	roles: ["user","admin"] },
	{ route: "purchasing.documents.material_request.edit",	roles: ["user","admin"] },
	{ route: "purchasing.documents.material_request.insert",	roles: ["user","admin"] },
	{ route: "purchasing.documents.purchase_order",	roles: ["user","admin"] },
	{ route: "purchasing.documents.purchase_order.details",	roles: ["user","admin"] },
	{ route: "purchasing.documents.purchase_order.edit",	roles: ["user","admin"] },
	{ route: "purchasing.documents.purchase_order.insert",	roles: ["user","admin"] },
	{ route: "purchasing.documents.supplier_quotation",	roles: ["user","admin"] },
	{ route: "purchasing.documents.supplier_quotation.details",	roles: ["user","admin"] },
	{ route: "purchasing.documents.supplier_quotation.edit",	roles: ["user","admin"] },
	{ route: "purchasing.documents.supplier_quotation.insert",	roles: ["user","admin"] },
	{ route: "purchasing.help",	roles: ["user","admin"] },
	{ route: "purchasing.help.customer_and_supplier",	roles: ["user","admin"] },
	{ route: "purchasing.main_reports",	roles: ["user","admin"] },
	{ route: "purchasing.main_reports.purchase_analytics",	roles: ["user","admin"] },
	{ route: "purchasing.setup",	roles: ["user","admin"] },
	{ route: "purchasing.standard_reports",	roles: ["user","admin"] },
	{ route: "purchasing.standard_reports.item_wise_purchase_history",	roles: ["user","admin"] },
	{ route: "purchasing.standard_reports.items_to_be_requested",	roles: ["user","admin"] },
	{ route: "purchasing.standard_reports.material_requests_for_which_supplier_quotations_are_not_created",	roles: ["user","admin"] },
	{ route: "purchasing.standard_reports.purchase_order_trends",	roles: ["user","admin"] },
	{ route: "purchasing.standard_reports.requested_items_to_be_ordered",	roles: ["user","admin"] },
	{ route: "purchasing.standard_reports.supplier_addresses_and_contacts",	roles: ["user","admin"] },
	{ route: "purchasing.standard_reports.supplier_wise_sales_analytics",	roles: ["user","admin"] },
	{ route: "selling",	roles: ["user","admin"] },
	{ route: "selling.documents",	roles: ["user","admin"] },
	{ route: "selling.documents.quotation",	roles: ["user","admin"] },
	{ route: "selling.documents.quotation.details",	roles: ["user","admin"] },
	{ route: "selling.documents.quotation.edit",	roles: ["user","admin"] },
	{ route: "selling.documents.quotation.insert",	roles: ["user","admin"] },
	{ route: "selling.documents.sales_order",	roles: ["user","admin"] },
	{ route: "selling.documents.sales_order.details",	roles: ["user","admin"] },
	{ route: "selling.documents.sales_order.edit",	roles: ["user","admin"] },
	{ route: "selling.documents.sales_order.insert",	roles: ["user","admin"] },
	{ route: "selling.help",	roles: ["user","admin"] },
	{ route: "selling.help.customer_and_supplier",	roles: ["user","admin"] },
	{ route: "selling.main_reports",	roles: ["user","admin"] },
	{ route: "selling.main_reports.customer_acquisition_and_loyalty",	roles: ["user","admin"] },
	{ route: "selling.main_reports.sales_analytics",	roles: ["user","admin"] },
	{ route: "selling.main_reports.sales_funnel",	roles: ["user","admin"] },
	{ route: "selling.setup",	roles: ["user","admin"] },
	{ route: "selling.standard_reports",	roles: ["user","admin"] },
	{ route: "selling.standard_reports.available_stock_for_packing_items",	roles: ["user","admin"] },
	{ route: "selling.standard_reports.bom_search",	roles: ["user","admin"] },
	{ route: "selling.standard_reports.customer_addresses_and_contacts",	roles: ["user","admin"] },
	{ route: "selling.standard_reports.customer_credit_balance",	roles: ["user","admin"] },
	{ route: "selling.standard_reports.customers_not_purchasing_for_long_time",	roles: ["user","admin"] },
	{ route: "selling.standard_reports.item_wise_sales_history",	roles: ["user","admin"] },
	{ route: "selling.standard_reports.lead_details",	roles: ["user","admin"] },
	{ route: "selling.standard_reports.ordered_items_to_be_delivered",	roles: ["user","admin"] },
	{ route: "selling.standard_reports.pending_so_items_for_purchase_request",	roles: ["user","admin"] },
	{ route: "selling.standard_reports.quotation_trends",	roles: ["user","admin"] },
	{ route: "selling.standard_reports.sales_order_trends",	roles: ["user","admin"] },
	{ route: "selling.standard_reports.sales_person_target_variance_item_group_wise",	roles: ["user","admin"] },
	{ route: "selling.standard_reports.sales_person_wise_transaction_summary",	roles: ["user","admin"] },
	{ route: "selling.standard_reports.territory_target_variance_item_group_wise",	roles: ["user","admin"] },
	{ route: "selling.tools",	roles: ["user","admin"] },
	{ route: "setup",	roles: ["user","admin"] },
	{ route: "setup.accounts",	roles: ["user","admin"] },
	{ route: "setup.accounts.accounts_settings",	roles: ["user","admin"] },
	{ route: "setup.accounts.chart_of_accounts",	roles: ["user","admin"] },
	{ route: "setup.accounts.chart_of_cost_centers",	roles: ["user","admin"] },
	{ route: "setup.accounts.company",	roles: ["user","admin"] },
	{ route: "setup.accounts.company.details",	roles: ["user","admin"] },
	{ route: "setup.accounts.company.edit",	roles: ["user","admin"] },
	{ route: "setup.accounts.company.insert",	roles: ["user","admin"] },
	{ route: "setup.accounts.currency",	roles: ["user","admin"] },
	{ route: "setup.accounts.currency.details",	roles: ["user","admin"] },
	{ route: "setup.accounts.currency.edit",	roles: ["user","admin"] },
	{ route: "setup.accounts.currency.insert",	roles: ["user","admin"] },
	{ route: "setup.accounts.currency_exchange",	roles: ["user","admin"] },
	{ route: "setup.accounts.currency_exchange.details",	roles: ["user","admin"] },
	{ route: "setup.accounts.currency_exchange.edit",	roles: ["user","admin"] },
	{ route: "setup.accounts.currency_exchange.insert",	roles: ["user","admin"] },
	{ route: "setup.accounts.fiscal_year",	roles: ["user","admin"] },
	{ route: "setup.accounts.fiscal_year.details",	roles: ["user","admin"] },
	{ route: "setup.accounts.fiscal_year.edit",	roles: ["user","admin"] },
	{ route: "setup.accounts.fiscal_year.insert",	roles: ["user","admin"] },
	{ route: "setup.accounts.mode_of_payment",	roles: ["user","admin"] },
	{ route: "setup.accounts.mode_of_payment.details",	roles: ["user","admin"] },
	{ route: "setup.accounts.mode_of_payment.edit",	roles: ["user","admin"] },
	{ route: "setup.accounts.mode_of_payment.insert",	roles: ["user","admin"] },
	{ route: "setup.accounts.monthly_distribution",	roles: ["user","admin"] },
	{ route: "setup.accounts.monthly_distribution.details",	roles: ["user","admin"] },
	{ route: "setup.accounts.monthly_distribution.edit",	roles: ["user","admin"] },
	{ route: "setup.accounts.monthly_distribution.insert",	roles: ["user","admin"] },
	{ route: "setup.accounts.point_of_sale_profile",	roles: ["user","admin"] },
	{ route: "setup.accounts.point_of_sale_profile.details",	roles: ["user","admin"] },
	{ route: "setup.accounts.point_of_sale_profile.edit",	roles: ["user","admin"] },
	{ route: "setup.accounts.point_of_sale_profile.insert",	roles: ["user","admin"] },
	{ route: "setup.accounts.pricing_rule",	roles: ["user","admin"] },
	{ route: "setup.accounts.pricing_rule.details",	roles: ["user","admin"] },
	{ route: "setup.accounts.pricing_rule.edit",	roles: ["user","admin"] },
	{ route: "setup.accounts.pricing_rule.insert",	roles: ["user","admin"] },
	{ route: "setup.accounts.purchase_taxes_and_charges_template",	roles: ["user","admin"] },
	{ route: "setup.accounts.purchase_taxes_and_charges_template.details",	roles: ["user","admin"] },
	{ route: "setup.accounts.purchase_taxes_and_charges_template.edit",	roles: ["user","admin"] },
	{ route: "setup.accounts.purchase_taxes_and_charges_template.insert",	roles: ["user","admin"] },
	{ route: "setup.accounts.sales_taxes_and_charges_template",	roles: ["user","admin"] },
	{ route: "setup.accounts.sales_taxes_and_charges_template.details",	roles: ["user","admin"] },
	{ route: "setup.accounts.sales_taxes_and_charges_template.edit",	roles: ["user","admin"] },
	{ route: "setup.accounts.sales_taxes_and_charges_template.insert",	roles: ["user","admin"] },
	{ route: "setup.accounts.shipping_rule",	roles: ["user","admin"] },
	{ route: "setup.accounts.shipping_rule.details",	roles: ["user","admin"] },
	{ route: "setup.accounts.shipping_rule.edit",	roles: ["user","admin"] },
	{ route: "setup.accounts.shipping_rule.insert",	roles: ["user","admin"] },
	{ route: "setup.accounts.tax_rule",	roles: ["user","admin"] },
	{ route: "setup.accounts.tax_rule.details",	roles: ["user","admin"] },
	{ route: "setup.accounts.tax_rule.edit",	roles: ["user","admin"] },
	{ route: "setup.accounts.tax_rule.insert",	roles: ["user","admin"] },
	{ route: "setup.customize",	roles: ["user","admin"] },
	{ route: "setup.customize.authorization_rule",	roles: ["user","admin"] },
	{ route: "setup.customize.authorization_rule.details",	roles: ["user","admin"] },
	{ route: "setup.customize.authorization_rule.edit",	roles: ["user","admin"] },
	{ route: "setup.customize.authorization_rule.insert",	roles: ["user","admin"] },
	{ route: "setup.customize.custom_field",	roles: ["user","admin"] },
	{ route: "setup.customize.custom_field.details",	roles: ["user","admin"] },
	{ route: "setup.customize.custom_field.edit",	roles: ["user","admin"] },
	{ route: "setup.customize.custom_field.insert",	roles: ["user","admin"] },
	{ route: "setup.customize.custom_script",	roles: ["user","admin"] },
	{ route: "setup.customize.custom_script.details",	roles: ["user","admin"] },
	{ route: "setup.customize.custom_script.edit",	roles: ["user","admin"] },
	{ route: "setup.customize.custom_script.insert",	roles: ["user","admin"] },
	{ route: "setup.customize.customize_form",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.details",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.edit",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.insert",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.about_us_settings",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.about_us_team_member",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.account",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.about_us_settings",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.about_us_team_member",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.account",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.accounts_settings",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.activity_cost",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.activity_type",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.address",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.address_template",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.appraisal",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.appraisal_goal",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.appraisal_template",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.appraisal_template_goal",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.async_task",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.attendance",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.authorization_control",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.authorization_rule",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.bank_reconciliation",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.bank_reconciliation_detail",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.batch",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.bin",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.block_module",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.blog_category",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.blogger",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.blog_post",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.blog_settings",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.bom",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.bom_explosion_item",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.bom_item",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.bom_operation",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.bom_replace_tool",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.branch",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.brand",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.budget_detail",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.bulk_email",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.campaign",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.c_form",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.c_form_invoice_detail",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.comment",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.communication",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.company",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.company_history",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.contact",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.contact_us_settings",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.cost_center",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.country",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.currency",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.currency_exchange",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.customer",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.customer_group",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.custom_field",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.customize_form",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.customize_form_field",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.custom_script",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.deduction_type",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.default_value",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.delivery_note",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.delivery_note_item",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.department",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.dependent_task",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.designation",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.doc_field",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.doc_perm",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.doc_share",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.doc_type",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.dropbox_backup",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.earning_type",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.email_account",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.email_alert",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.email_alert_recipient",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.email_digest",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.email_unsubscribe",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.employee",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.employee_education",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.employee_external_work_history",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.employee_internal_work_history",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.employee_leave_approver",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.employment_type",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.event",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.event_role",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.expense_claim",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.expense_claim_detail",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.expense_claim_type",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.features_setup",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.feed",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.file",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.fiscal_year",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.fiscal_year_company",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.gl_entry",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.global_defaults",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.holiday",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.holiday_list",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.hr_settings",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.hub_settings",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.industry_type",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.installation_note",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.installation_note_item",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.issue",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.item",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.item_attribute",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.item_attribute_value",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.item_customer_detail",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.item_group",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.item_price",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.item_quality_inspection_parameter",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.item_reorder",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.item_supplier",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.item_tax",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.item_variant",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.item_variant_attribute",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.item_website_specification",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.job_applicant",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.job_opening",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.journal_entry",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.journal_entry_account",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.landed_cost_item",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.landed_cost_purchase_receipt",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.landed_cost_taxes_and_charges",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.landed_cost_voucher",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.lead",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.leave_allocation",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.leave_application",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.leave_block_list",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.leave_block_list_allow",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.leave_block_list_date",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.leave_control_panel",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.leave_type",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.letter_head",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.maintenance_schedule",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.maintenance_schedule_detail",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.maintenance_schedule_item",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.maintenance_visit",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.maintenance_visit_purpose",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.manufacturing_settings",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.material_request",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.material_request_item",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.mode_of_payment",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.mode_of_payment_account",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.module_def",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.monthly_distribution",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.monthly_distribution_percentage",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.naming_series",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.newsletter",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.newsletter_list",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.newsletter_list_subscriber",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.note",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.notification_control",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.offer_letter",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.offer_letter_term",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.offer_term",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.operation",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.opportunity",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.opportunity_item",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.packed_item",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.packing_slip",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.packing_slip_item",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.page",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.page_role",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.party_account",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.patch_log",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.payment_reconciliation",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.payment_reconciliation_invoice",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.payment_reconciliation_payment",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.payment_tool",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.payment_tool_detail",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.period_closing_voucher",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.pos_profile",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.price_list",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.price_list_country",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.pricing_rule",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.print_format",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.print_heading",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.print_settings",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.process_payroll",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.product_bundle",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.product_bundle_item",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.production_order",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.production_order_operation",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.production_plan_item",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.production_planning_tool",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.production_plan_sales_order",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.project",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.project_task",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.property_setter",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.purchase_common",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.purchase_invoice",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.purchase_invoice_advance",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.purchase_invoice_item",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.purchase_order",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.purchase_order_item",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.purchase_order_item_supplied",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.purchase_receipt",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.purchase_receipt_item",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.purchase_receipt_item_supplied",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.purchase_taxes_and_charges",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.purchase_taxes_and_charges_template",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.purchasing_settings",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.quality_inspection",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.quality_inspection_reading",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.quotation",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.quotation_item",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.quotation_lost_reason",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.rename_tool",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.report",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.role",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.salary_slip",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.salary_slip_deduction",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.salary_slip_earning",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.salary_structure",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.salary_structure_deduction",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.salary_structure_earning",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.sales_invoice",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.sales_invoice_advance",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.sales_invoice_item",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.sales_order",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.sales_order_item",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.sales_partner",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.sales_person",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.sales_taxes_and_charges",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.sales_taxes_and_charges_template",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.sales_team",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.scheduler_log",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.selling_settings",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.serial_no",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.shipping_rule",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.shipping_rule_condition",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.shipping_rule_country",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.shopping_cart_settings",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.sms_center",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.sms_log",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.sms_parameter",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.sms_settings",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.social_login_keys",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.standard_reply",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.stock_entry",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.stock_entry_detail",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.stock_ledger_entry",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.stock_reconciliation",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.stock_reconcilitation_item",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.stock_settings",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.stock_uom_replace_utility",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.supplier",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.supplier_quotation",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.supplier_quotation_item",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.supplier_type",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.system_settings",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.target_detail",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.task",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.task_depends_on",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.tax_rule",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.terms_and_conditions",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.territory",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.time_log",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.time_log_batch",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.time_log_batch_detail",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.todo",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.top_bar_item",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.uom",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.uom_conversion_detail",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.upload_attendance",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.user",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.user_role",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.version",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.warehouse",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.warranty_claim",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.web_form",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.web_form_field",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.web_page",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.website_item_group",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.website_script",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.website_settings",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.website_slideshow",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.website_slideshow_item",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.website_theme",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.workflow",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.workflow_action",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.workflow_document_state",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.workflow_state",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.workflow_transition",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.workstation",	roles: ["user","admin"] },
	{ route: "setup.customize.doctype.doctypes.workstation_working_hour",	roles: ["user","admin"] },
	{ route: "setup.customize.email_notifications",	roles: ["user","admin"] },
	{ route: "setup.customize.features_setup",	roles: ["user","admin"] },
	{ route: "setup.data",	roles: ["user","admin"] },
	{ route: "setup.data.import_export_data",	roles: ["user","admin"] },
	{ route: "setup.data.rename_tool",	roles: ["user","admin"] },
	{ route: "setup.email",	roles: ["user","admin"] },
	{ route: "setup.email.email_account",	roles: ["user","admin"] },
	{ route: "setup.email.email_account.details",	roles: ["user","admin"] },
	{ route: "setup.email.email_account.edit",	roles: ["user","admin"] },
	{ route: "setup.email.email_account.insert",	roles: ["user","admin"] },
	{ route: "setup.email.email_alert",	roles: ["user","admin"] },
	{ route: "setup.email.email_alert.details",	roles: ["user","admin"] },
	{ route: "setup.email.email_alert.edit",	roles: ["user","admin"] },
	{ route: "setup.email.email_alert.insert",	roles: ["user","admin"] },
	{ route: "setup.email.email_digest",	roles: ["user","admin"] },
	{ route: "setup.email.email_digest.details",	roles: ["user","admin"] },
	{ route: "setup.email.email_digest.edit",	roles: ["user","admin"] },
	{ route: "setup.email.email_digest.insert",	roles: ["user","admin"] },
	{ route: "setup.email.sms_settings",	roles: ["user","admin"] },
	{ route: "setup.email.standard_reply",	roles: ["user","admin"] },
	{ route: "setup.email.standard_reply.details",	roles: ["user","admin"] },
	{ route: "setup.email.standard_reply.edit",	roles: ["user","admin"] },
	{ route: "setup.email.standard_reply.insert",	roles: ["user","admin"] },
	{ route: "setup.help",	roles: ["user","admin"] },
	{ route: "setup.help.data_import_and_export",	roles: ["user","admin"] },
	{ route: "setup.help.printing_and_branding",	roles: ["user","admin"] },
	{ route: "setup.help.setting_up_email",	roles: ["user","admin"] },
	{ route: "setup.help.users_and_permissions",	roles: ["user","admin"] },
	{ route: "setup.help.workflow",	roles: ["user","admin"] },
	{ route: "setup.human_resources",	roles: ["user","admin"] },
	{ route: "setup.human_resources.appraisal_template",	roles: ["user","admin"] },
	{ route: "setup.human_resources.appraisal_template.details",	roles: ["user","admin"] },
	{ route: "setup.human_resources.appraisal_template.edit",	roles: ["user","admin"] },
	{ route: "setup.human_resources.appraisal_template.insert",	roles: ["user","admin"] },
	{ route: "setup.human_resources.branch",	roles: ["user","admin"] },
	{ route: "setup.human_resources.branch.details",	roles: ["user","admin"] },
	{ route: "setup.human_resources.branch.edit",	roles: ["user","admin"] },
	{ route: "setup.human_resources.branch.insert",	roles: ["user","admin"] },
	{ route: "setup.human_resources.deduction_type",	roles: ["user","admin"] },
	{ route: "setup.human_resources.deduction_type.details",	roles: ["user","admin"] },
	{ route: "setup.human_resources.deduction_type.edit",	roles: ["user","admin"] },
	{ route: "setup.human_resources.deduction_type.insert",	roles: ["user","admin"] },
	{ route: "setup.human_resources.department",	roles: ["user","admin"] },
	{ route: "setup.human_resources.department.details",	roles: ["user","admin"] },
	{ route: "setup.human_resources.department.edit",	roles: ["user","admin"] },
	{ route: "setup.human_resources.department.insert",	roles: ["user","admin"] },
	{ route: "setup.human_resources.designation",	roles: ["user","admin"] },
	{ route: "setup.human_resources.designation.details",	roles: ["user","admin"] },
	{ route: "setup.human_resources.designation.edit",	roles: ["user","admin"] },
	{ route: "setup.human_resources.designation.insert",	roles: ["user","admin"] },
	{ route: "setup.human_resources.earning_type",	roles: ["user","admin"] },
	{ route: "setup.human_resources.earning_type.details",	roles: ["user","admin"] },
	{ route: "setup.human_resources.earning_type.edit",	roles: ["user","admin"] },
	{ route: "setup.human_resources.earning_type.insert",	roles: ["user","admin"] },
	{ route: "setup.human_resources.employment_type",	roles: ["user","admin"] },
	{ route: "setup.human_resources.employment_type.details",	roles: ["user","admin"] },
	{ route: "setup.human_resources.employment_type.edit",	roles: ["user","admin"] },
	{ route: "setup.human_resources.employment_type.insert",	roles: ["user","admin"] },
	{ route: "setup.human_resources.expense_claim_type",	roles: ["user","admin"] },
	{ route: "setup.human_resources.expense_claim_type.details",	roles: ["user","admin"] },
	{ route: "setup.human_resources.expense_claim_type.edit",	roles: ["user","admin"] },
	{ route: "setup.human_resources.expense_claim_type.insert",	roles: ["user","admin"] },
	{ route: "setup.human_resources.holiday_list",	roles: ["user","admin"] },
	{ route: "setup.human_resources.holiday_list.details",	roles: ["user","admin"] },
	{ route: "setup.human_resources.holiday_list.edit",	roles: ["user","admin"] },
	{ route: "setup.human_resources.holiday_list.insert",	roles: ["user","admin"] },
	{ route: "setup.human_resources.hr_settings",	roles: ["user","admin"] },
	{ route: "setup.human_resources.leave_allocation",	roles: ["user","admin"] },
	{ route: "setup.human_resources.leave_allocation.details",	roles: ["user","admin"] },
	{ route: "setup.human_resources.leave_allocation.edit",	roles: ["user","admin"] },
	{ route: "setup.human_resources.leave_allocation.insert",	roles: ["user","admin"] },
	{ route: "setup.human_resources.leave_block_list",	roles: ["user","admin"] },
	{ route: "setup.human_resources.leave_block_list.details",	roles: ["user","admin"] },
	{ route: "setup.human_resources.leave_block_list.edit",	roles: ["user","admin"] },
	{ route: "setup.human_resources.leave_block_list.insert",	roles: ["user","admin"] },
	{ route: "setup.human_resources.leave_type",	roles: ["user","admin"] },
	{ route: "setup.human_resources.leave_type.details",	roles: ["user","admin"] },
	{ route: "setup.human_resources.leave_type.edit",	roles: ["user","admin"] },
	{ route: "setup.human_resources.leave_type.insert",	roles: ["user","admin"] },
	{ route: "setup.human_resources.salary_structure",	roles: ["user","admin"] },
	{ route: "setup.human_resources.salary_structure.details",	roles: ["user","admin"] },
	{ route: "setup.human_resources.salary_structure.edit",	roles: ["user","admin"] },
	{ route: "setup.human_resources.salary_structure.insert",	roles: ["user","admin"] },
	{ route: "setup.integrations",	roles: ["user","admin"] },
	{ route: "setup.integrations.dropbox_backup",	roles: ["user","admin"] },
	{ route: "setup.integrations.social_login_keys",	roles: ["user","admin"] },
	{ route: "setup.permissions",	roles: ["user","admin"] },
	{ route: "setup.permissions.document_share_report",	roles: ["user","admin"] },
	{ route: "setup.permissions.permitted_documents_for_user",	roles: ["user","admin"] },
	{ route: "setup.permissions.role_permissions_manager",	roles: ["user","admin"] },
	{ route: "setup.permissions.user_permissions_manager",	roles: ["user","admin"] },
	{ route: "setup.printing",	roles: ["user","admin"] },
	{ route: "setup.printing.address_template",	roles: ["user","admin"] },
	{ route: "setup.printing.address_template.details",	roles: ["user","admin"] },
	{ route: "setup.printing.address_template.edit",	roles: ["user","admin"] },
	{ route: "setup.printing.address_template.insert",	roles: ["user","admin"] },
	{ route: "setup.printing.letter_head",	roles: ["user","admin"] },
	{ route: "setup.printing.letter_head.details",	roles: ["user","admin"] },
	{ route: "setup.printing.letter_head.edit",	roles: ["user","admin"] },
	{ route: "setup.printing.letter_head.insert",	roles: ["user","admin"] },
	{ route: "setup.printing.print_format",	roles: ["user","admin"] },
	{ route: "setup.printing.print_format.details",	roles: ["user","admin"] },
	{ route: "setup.printing.print_format.edit",	roles: ["user","admin"] },
	{ route: "setup.printing.print_format.insert",	roles: ["user","admin"] },
	{ route: "setup.printing.print_format_builder",	roles: ["user","admin"] },
	{ route: "setup.printing.print_heading",	roles: ["user","admin"] },
	{ route: "setup.printing.print_heading.details",	roles: ["user","admin"] },
	{ route: "setup.printing.print_heading.edit",	roles: ["user","admin"] },
	{ route: "setup.printing.print_heading.insert",	roles: ["user","admin"] },
	{ route: "setup.printing.print_settings",	roles: ["user","admin"] },
	{ route: "setup.printing.terms_and_conditions",	roles: ["user","admin"] },
	{ route: "setup.printing.terms_and_conditions.details",	roles: ["user","admin"] },
	{ route: "setup.printing.terms_and_conditions.edit",	roles: ["user","admin"] },
	{ route: "setup.printing.terms_and_conditions.insert",	roles: ["user","admin"] },
	{ route: "setup.purchasing",	roles: ["user","admin"] },
	{ route: "setup.purchasing.purchasing_settings",	roles: ["user","admin"] },
	{ route: "setup.purchasing.item_group_tree",	roles: ["user","admin"] },
	{ route: "setup.purchasing.item_price",	roles: ["user","admin"] },
	{ route: "setup.purchasing.price_list",	roles: ["user","admin"] },
	{ route: "setup.purchasing.price_list.details",	roles: ["user","admin"] },
	{ route: "setup.purchasing.price_list.edit",	roles: ["user","admin"] },
	{ route: "setup.purchasing.price_list.insert",	roles: ["user","admin"] },
	{ route: "setup.purchasing.supplier_type",	roles: ["user","admin"] },
	{ route: "setup.purchasing.supplier_type.details",	roles: ["user","admin"] },
	{ route: "setup.purchasing.supplier_type.edit",	roles: ["user","admin"] },
	{ route: "setup.purchasing.supplier_type.insert",	roles: ["user","admin"] },
	{ route: "setup.reports",	roles: ["user","admin"] },
	{ route: "setup.reports.insert",	roles: ["user","admin"] },
	{ route: "setup.reports.reports",	roles: ["user","admin"] },
	{ route: "setup.reports.reports.accounts_payable",	roles: ["user","admin"] },
	{ route: "setup.reports.reports.accounts_payable_summary",	roles: ["user","admin"] },
	{ route: "setup.reports.reports.accounts_receivable",	roles: ["user","admin"] },
	{ route: "setup.reports.reports.accounts_receivable_summary",	roles: ["user","admin"] },
	{ route: "setup.reports.reports.available_stock_for_packing_items",	roles: ["user","admin"] },
	{ route: "setup.reports.reports.balance_sheet",	roles: ["user","admin"] },
	{ route: "setup.reports.reports.bank_clearance_summary",	roles: ["user","admin"] },
	{ route: "setup.reports.reports.bank_reconciliation_statement",	roles: ["user","admin"] },
	{ route: "setup.reports.reports.batch_wise_balance_history",	roles: ["user","admin"] },
	{ route: "setup.reports.reports.bom_search",	roles: ["user","admin"] },
	{ route: "setup.reports.reports.budget_variance_report",	roles: ["user","admin"] },
	{ route: "setup.reports.reports.completed_production_orders",	roles: ["user","admin"] },
	{ route: "setup.reports.reports.customer_acquisition_and_loyalty",	roles: ["user","admin"] },
	{ route: "setup.reports.reports.customer_addresses_and_contacts",	roles: ["user","admin"] },
	{ route: "setup.reports.reports.customer_credit_balance",	roles: ["user","admin"] },
	{ route: "setup.reports.reports.customers_not_purchasing_for_long_time",	roles: ["user","admin"] },
	{ route: "setup.reports.reports.daily_time_log_summary",	roles: ["user","admin"] },
	{ route: "setup.reports.reports.delivered_items_to_be_billed",	roles: ["user","admin"] },
	{ route: "setup.reports.reports.delivery_note_trends",	roles: ["user","admin"] },
	{ route: "setup.reports.reports.document_share_report",	roles: ["user","admin"] },
	{ route: "setup.reports.reports.employee_birthday",	roles: ["user","admin"] },
	{ route: "setup.reports.reports.employee_information",	roles: ["user","admin"] },
	{ route: "setup.reports.reports.employee_leave_balance",	roles: ["user","admin"] },
	{ route: "setup.reports.reports.general_ledger",	roles: ["user","admin"] },
	{ route: "setup.reports.reports.gross_profit",	roles: ["user","admin"] },
	{ route: "setup.reports.reports.issued_items_against_production_order",	roles: ["user","admin"] },
	{ route: "setup.reports.reports.item_prices",	roles: ["user","admin"] },
	{ route: "setup.reports.reports.item_shortage_report",	roles: ["user","admin"] },
	{ route: "setup.reports.reports.items_to_be_requested",	roles: ["user","admin"] },
	{ route: "setup.reports.reports.item_wise_price_list_rate",	roles: ["user","admin"] },
	{ route: "setup.reports.reports.item_wise_purchase_history",	roles: ["user","admin"] },
	{ route: "setup.reports.reports.item_wise_purchase_register",	roles: ["user","admin"] },
	{ route: "setup.reports.reports.item_wise_recommended_reorder_level",	roles: ["user","admin"] },
	{ route: "setup.reports.reports.item_wise_sales_history",	roles: ["user","admin"] },
	{ route: "setup.reports.reports.item_wise_sales_register",	roles: ["user","admin"] },
	{ route: "setup.reports.reports.lead_details",	roles: ["user","admin"] },
	{ route: "setup.reports.reports.maintenance_schedules",	roles: ["user","admin"] },
	{ route: "setup.reports.reports.material_requests_for_which_supplier_quotations_are_not_created",	roles: ["user","admin"] },
	{ route: "setup.reports.reports.monthly_attendance_sheet",	roles: ["user","admin"] },
	{ route: "setup.reports.reports.monthly_salary_register",	roles: ["user","admin"] },
	{ route: "setup.reports.reports.open_production_orders",	roles: ["user","admin"] },
	{ route: "setup.reports.reports.ordered_items_to_be_billed",	roles: ["user","admin"] },
	{ route: "setup.reports.reports.ordered_items_to_be_delivered",	roles: ["user","admin"] },
	{ route: "setup.reports.reports.payment_period_based_on_invoice_date",	roles: ["user","admin"] },
	{ route: "setup.reports.reports.pending_so_items_for_purchase_request",	roles: ["user","admin"] },
	{ route: "setup.reports.reports.permitted_documents_for_user",	roles: ["user","admin"] },
	{ route: "setup.reports.reports.production_orders_in_progress",	roles: ["user","admin"] },
	{ route: "setup.reports.reports.profit_and_loss_statement",	roles: ["user","admin"] },
	{ route: "setup.reports.reports.project_wise_stock_tracking",	roles: ["user","admin"] },
	{ route: "setup.reports.reports.purchase_invoice_trends",	roles: ["user","admin"] },
	{ route: "setup.reports.reports.purchase_order_items_to_be_billed",	roles: ["user","admin"] },
	{ route: "setup.reports.reports.purchase_order_items_to_be_received",	roles: ["user","admin"] },
	{ route: "setup.reports.reports.purchase_order_trends",	roles: ["user","admin"] },
	{ route: "setup.reports.reports.purchase_receipt_trends",	roles: ["user","admin"] },
	{ route: "setup.reports.reports.purchase_register",	roles: ["user","admin"] },
	{ route: "setup.reports.reports.quotation_trends",	roles: ["user","admin"] },
	{ route: "setup.reports.reports.received_items_to_be_billed",	roles: ["user","admin"] },
	{ route: "setup.reports.reports.requested_items_to_be_ordered",	roles: ["user","admin"] },
	{ route: "setup.reports.reports.requested_items_to_be_transferred",	roles: ["user","admin"] },
	{ route: "setup.reports.reports.sales_invoice_trends",	roles: ["user","admin"] },
	{ route: "setup.reports.reports.sales_order_trends",	roles: ["user","admin"] },
	{ route: "setup.reports.reports.sales_partners_commission",	roles: ["user","admin"] },
	{ route: "setup.reports.reports.sales_person_target_variance_item_group_wise",	roles: ["user","admin"] },
	{ route: "setup.reports.reports.sales_person_wise_transaction_summary",	roles: ["user","admin"] },
	{ route: "setup.reports.reports.sales_register",	roles: ["user","admin"] },
	{ route: "setup.reports.reports.serial_no_service_contract_expiry",	roles: ["user","admin"] },
	{ route: "setup.reports.reports.serial_no_status",	roles: ["user","admin"] },
	{ route: "setup.reports.reports.serial_no_warranty_expiry",	roles: ["user","admin"] },
	{ route: "setup.reports.reports.stock_ageing",	roles: ["user","admin"] },
	{ route: "setup.reports.reports.stock_balance",	roles: ["user","admin"] },
	{ route: "setup.reports.reports.stock_ledger",	roles: ["user","admin"] },
	{ route: "setup.reports.reports.stock_projected_qty",	roles: ["user","admin"] },
	{ route: "setup.reports.reports.supplier_addresses_and_contacts",	roles: ["user","admin"] },
	{ route: "setup.reports.reports.supplier_wise_sales_analytics",	roles: ["user","admin"] },
	{ route: "setup.reports.reports.territory_target_variance_item_group_wise",	roles: ["user","admin"] },
	{ route: "setup.reports.reports.todo",	roles: ["user","admin"] },
	{ route: "setup.reports.reports.trial_balance",	roles: ["user","admin"] },
	{ route: "setup.reports.reports.trial_balance_for_party",	roles: ["user","admin"] },
	{ route: "setup.selling",	roles: ["user","admin"] },
	{ route: "setup.selling.industry_type",	roles: ["user","admin"] },
	{ route: "setup.selling.industry_type.details",	roles: ["user","admin"] },
	{ route: "setup.selling.industry_type.edit",	roles: ["user","admin"] },
	{ route: "setup.selling.industry_type.insert",	roles: ["user","admin"] },
	{ route: "setup.selling.product_bundle",	roles: ["user","admin"] },
	{ route: "setup.selling.product_bundle.details",	roles: ["user","admin"] },
	{ route: "setup.selling.product_bundle.edit",	roles: ["user","admin"] },
	{ route: "setup.selling.product_bundle.insert",	roles: ["user","admin"] },
	{ route: "setup.selling.sales_partner",	roles: ["user","admin"] },
	{ route: "setup.selling.sales_partner.details",	roles: ["user","admin"] },
	{ route: "setup.selling.sales_partner.edit",	roles: ["user","admin"] },
	{ route: "setup.selling.sales_partner.insert",	roles: ["user","admin"] },
	{ route: "setup.selling.sales_person",	roles: ["user","admin"] },
	{ route: "setup.selling.selling_settings",	roles: ["user","admin"] },
	{ route: "setup.selling.territory",	roles: ["user","admin"] },
	{ route: "setup.settings",	roles: ["user","admin"] },
	{ route: "setup.settings.global_settings",	roles: ["user","admin"] },
	{ route: "setup.settings.naming_series",	roles: ["user","admin"] },
	{ route: "setup.settings.show_hide_modules",	roles: ["user","admin"] },
	{ route: "setup.settings.system_settings",	roles: ["user","admin"] },
	{ route: "setup.stock",	roles: ["user","admin"] },
	{ route: "setup.stock.brand",	roles: ["user","admin"] },
	{ route: "setup.stock.brand.details",	roles: ["user","admin"] },
	{ route: "setup.stock.brand.edit",	roles: ["user","admin"] },
	{ route: "setup.stock.brand.insert",	roles: ["user","admin"] },
	{ route: "setup.stock.item_attribute",	roles: ["user","admin"] },
	{ route: "setup.stock.item_attribute.details",	roles: ["user","admin"] },
	{ route: "setup.stock.item_attribute.edit",	roles: ["user","admin"] },
	{ route: "setup.stock.item_attribute.insert",	roles: ["user","admin"] },
	{ route: "setup.stock.stock_settings",	roles: ["user","admin"] },
	{ route: "setup.stock.unit_of_measure_uom",	roles: ["user","admin"] },
	{ route: "setup.stock.unit_of_measure_uom.details",	roles: ["user","admin"] },
	{ route: "setup.stock.unit_of_measure_uom.edit",	roles: ["user","admin"] },
	{ route: "setup.stock.unit_of_measure_uom.insert",	roles: ["user","admin"] },
	{ route: "setup.stock.warehouse",	roles: ["user","admin"] },
	{ route: "setup.stock.warehouse.details",	roles: ["user","admin"] },
	{ route: "setup.stock.warehouse.edit",	roles: ["user","admin"] },
	{ route: "setup.stock.warehouse.insert",	roles: ["user","admin"] },
	{ route: "setup.support",	roles: ["user","admin"] },
	{ route: "setup.system",	roles: ["user","admin"] },
	{ route: "setup.system.application_installer",	roles: ["user","admin"] },
	{ route: "setup.system.scheduler_log",	roles: ["user","admin"] },
	{ route: "setup.system.scheduler_log.details",	roles: ["user","admin"] },
	{ route: "setup.system.scheduler_log.edit",	roles: ["user","admin"] },
	{ route: "setup.system.scheduler_log.insert",	roles: ["user","admin"] },
	{ route: "setup.system.download_backups",	roles: ["user","admin"] },
	{ route: "setup.users",	roles: ["user","admin"] },
	{ route: "setup.users.role",	roles: ["user","admin"] },
	{ route: "setup.users.role.details",	roles: ["user","admin"] },
	{ route: "setup.users.role.edit",	roles: ["user","admin"] },
	{ route: "setup.users.role.insert",	roles: ["user","admin"] },
	{ route: "setup.users.user",	roles: ["user","admin"] },
	{ route: "setup.users.user.details",	roles: ["user","admin"] },
	{ route: "setup.users.user.edit",	roles: ["user","admin"] },
	{ route: "setup.users.user.insert",	roles: ["user","admin"] },
	{ route: "setup.website",	roles: ["user","admin"] },
	{ route: "setup.website.about_us_settings",	roles: ["user","admin"] },
	{ route: "setup.website.blog_category",	roles: ["user","admin"] },
	{ route: "setup.website.blog_category.details",	roles: ["user","admin"] },
	{ route: "setup.website.blog_category.edit",	roles: ["user","admin"] },
	{ route: "setup.website.blog_category.insert",	roles: ["user","admin"] },
	{ route: "setup.website.blog_settings",	roles: ["user","admin"] },
	{ route: "setup.website.contact_us_settings",	roles: ["user","admin"] },
	{ route: "setup.website.website_script",	roles: ["user","admin"] },
	{ route: "setup.website.website_settings",	roles: ["user","admin"] },
	{ route: "setup.website.website_theme",	roles: ["user","admin"] },
	{ route: "setup.website.website_theme.details",	roles: ["user","admin"] },
	{ route: "setup.website.website_theme.edit",	roles: ["user","admin"] },
	{ route: "setup.website.website_theme.insert",	roles: ["user","admin"] },
	{ route: "setup.workflow",	roles: ["user","admin"] },
	{ route: "setup.workflow.workflow",	roles: ["user","admin"] },
	{ route: "setup.workflow.workflow.details",	roles: ["user","admin"] },
	{ route: "setup.workflow.workflow.edit",	roles: ["user","admin"] },
	{ route: "setup.workflow.workflow.insert",	roles: ["user","admin"] },
	{ route: "setup.workflow.workflow_action",	roles: ["user","admin"] },
	{ route: "setup.workflow.workflow_action.details",	roles: ["user","admin"] },
	{ route: "setup.workflow.workflow_action.edit",	roles: ["user","admin"] },
	{ route: "setup.workflow.workflow_action.insert",	roles: ["user","admin"] },
	{ route: "setup.workflow.workflow_state",	roles: ["user","admin"] },
	{ route: "setup.workflow.workflow_state.details",	roles: ["user","admin"] },
	{ route: "setup.workflow.workflow_state.edit",	roles: ["user","admin"] },
	{ route: "setup.workflow.workflow_state.insert",	roles: ["user","admin"] },
	{ route: "stock",	roles: ["user","admin"] },
	{ route: "stock.documents",	roles: ["user","admin"] },
	{ route: "stock.documents.batch",	roles: ["user","admin"] },
	{ route: "stock.documents.batch.details",	roles: ["user","admin"] },
	{ route: "stock.documents.batch.edit",	roles: ["user","admin"] },
	{ route: "stock.documents.batch.insert",	roles: ["user","admin"] },
	{ route: "stock.documents.delivery_note",	roles: ["user","admin"] },
	{ route: "stock.documents.delivery_note.details",	roles: ["user","admin"] },
	{ route: "stock.documents.delivery_note.edit",	roles: ["user","admin"] },
	{ route: "stock.documents.delivery_note.insert",	roles: ["user","admin"] },
	{ route: "stock.documents.installation_note",	roles: ["user","admin"] },
	{ route: "stock.documents.installation_note.details",	roles: ["user","admin"] },
	{ route: "stock.documents.installation_note.edit",	roles: ["user","admin"] },
	{ route: "stock.documents.installation_note.insert",	roles: ["user","admin"] },
	{ route: "stock.documents.item",	roles: ["user","admin"] },
	{ route: "stock.documents.item.details",	roles: ["user","admin"] },
	{ route: "stock.documents.item.edit",	roles: ["user","admin"] },
	{ route: "stock.documents.item.insert",	roles: ["user","admin"] },
	{ route: "stock.documents.purchase_receipt",	roles: ["user","admin"] },
	{ route: "stock.documents.purchase_receipt.details",	roles: ["user","admin"] },
	{ route: "stock.documents.purchase_receipt.edit",	roles: ["user","admin"] },
	{ route: "stock.documents.purchase_receipt.insert",	roles: ["user","admin"] },
	{ route: "stock.documents.serial_no",	roles: ["user","admin"] },
	{ route: "stock.documents.serial_no.details",	roles: ["user","admin"] },
	{ route: "stock.documents.serial_no.edit",	roles: ["user","admin"] },
	{ route: "stock.documents.serial_no.insert",	roles: ["user","admin"] },
	{ route: "stock.documents.stock_entry",	roles: ["user","admin"] },
	{ route: "stock.documents.stock_entry.details",	roles: ["user","admin"] },
	{ route: "stock.documents.stock_entry.edit",	roles: ["user","admin"] },
	{ route: "stock.documents.stock_entry.insert",	roles: ["user","admin"] },
	{ route: "stock.help",	roles: ["user","admin"] },
	{ route: "stock.help.item_variants",	roles: ["user","admin"] },
	{ route: "stock.help.items_and_pricing",	roles: ["user","admin"] },
	{ route: "stock.help.opening_stock_balance",	roles: ["user","admin"] },
	{ route: "stock.main_reports",	roles: ["user","admin"] },
	{ route: "stock.main_reports.item_wise_price_list_rate",	roles: ["user","admin"] },
	{ route: "stock.main_reports.stock_ageing",	roles: ["user","admin"] },
	{ route: "stock.main_reports.stock_analytics",	roles: ["user","admin"] },
	{ route: "stock.main_reports.stock_balance",	roles: ["user","admin"] },
	{ route: "stock.main_reports.stock_ledger",	roles: ["user","admin"] },
	{ route: "stock.main_reports.stock_projected_qty",	roles: ["user","admin"] },
	{ route: "stock.setup",	roles: ["user","admin"] },
	{ route: "stock.standard_reports",	roles: ["user","admin"] },
	{ route: "stock.standard_reports.batch_wise_balance_history",	roles: ["user","admin"] },
	{ route: "stock.standard_reports.delivery_note_trends",	roles: ["user","admin"] },
	{ route: "stock.standard_reports.item_prices",	roles: ["user","admin"] },
	{ route: "stock.standard_reports.item_shortage_report",	roles: ["user","admin"] },
	{ route: "stock.standard_reports.item_wise_recommended_reorder_level",	roles: ["user","admin"] },
	{ route: "stock.standard_reports.ordered_items_to_be_delivered",	roles: ["user","admin"] },
	{ route: "stock.standard_reports.purchase_order_items_to_be_received",	roles: ["user","admin"] },
	{ route: "stock.standard_reports.purchase_receipt_trends",	roles: ["user","admin"] },
	{ route: "stock.standard_reports.requested_items_to_be_transferred",	roles: ["user","admin"] },
	{ route: "stock.standard_reports.serial_no_service_contract_expiry",	roles: ["user","admin"] },
	{ route: "stock.standard_reports.serial_no_status",	roles: ["user","admin"] },
	{ route: "stock.standard_reports.serial_no_warranty_expiry",	roles: ["user","admin"] },
	{ route: "stock.tools",	roles: ["user","admin"] },
	{ route: "stock.tools.landed_cost_voucher",	roles: ["user","admin"] },
	{ route: "stock.tools.landed_cost_voucher.details",	roles: ["user","admin"] },
	{ route: "stock.tools.landed_cost_voucher.edit",	roles: ["user","admin"] },
	{ route: "stock.tools.landed_cost_voucher.insert",	roles: ["user","admin"] },
	{ route: "stock.tools.packing_slip",	roles: ["user","admin"] },
	{ route: "stock.tools.packing_slip.details",	roles: ["user","admin"] },
	{ route: "stock.tools.packing_slip.edit",	roles: ["user","admin"] },
	{ route: "stock.tools.packing_slip.insert",	roles: ["user","admin"] },
	{ route: "stock.tools.quality_inspection",	roles: ["user","admin"] },
	{ route: "stock.tools.quality_inspection.details",	roles: ["user","admin"] },
	{ route: "stock.tools.quality_inspection.edit",	roles: ["user","admin"] },
	{ route: "stock.tools.quality_inspection.insert",	roles: ["user","admin"] },
	{ route: "stock.tools.stock_reconciliation",	roles: ["user","admin"] },
	{ route: "stock.tools.stock_reconciliation.details",	roles: ["user","admin"] },
	{ route: "stock.tools.stock_reconciliation.edit",	roles: ["user","admin"] },
	{ route: "stock.tools.stock_reconciliation.insert",	roles: ["user","admin"] },
	{ route: "stock.tools.stock_uom_replace_utility",	roles: ["user","admin"] },
	{ route: "support",	roles: ["user","admin"] },
	{ route: "support.documents",	roles: ["user","admin"] },
	{ route: "support.documents.issue",	roles: ["user","admin"] },
	{ route: "support.documents.issue.details",	roles: ["user","admin"] },
	{ route: "support.documents.issue.edit",	roles: ["user","admin"] },
	{ route: "support.documents.issue.insert",	roles: ["user","admin"] },
	{ route: "support.documents.maintenance_schedule",	roles: ["user","admin"] },
	{ route: "support.documents.maintenance_schedule.details",	roles: ["user","admin"] },
	{ route: "support.documents.maintenance_schedule.edit",	roles: ["user","admin"] },
	{ route: "support.documents.maintenance_schedule.insert",	roles: ["user","admin"] },
	{ route: "support.documents.maintenance_visit",	roles: ["user","admin"] },
	{ route: "support.documents.maintenance_visit.details",	roles: ["user","admin"] },
	{ route: "support.documents.maintenance_visit.edit",	roles: ["user","admin"] },
	{ route: "support.documents.maintenance_visit.insert",	roles: ["user","admin"] },
	{ route: "support.documents.warranty_claim",	roles: ["user","admin"] },
	{ route: "support.documents.warranty_claim.details",	roles: ["user","admin"] },
	{ route: "support.documents.warranty_claim.edit",	roles: ["user","admin"] },
	{ route: "support.documents.warranty_claim.insert",	roles: ["user","admin"] },
	{ route: "support.setup",	roles: ["user","admin"] },
	{ route: "support.standard_reports",	roles: ["user","admin"] },
	{ route: "support.standard_reports.maintenance_schedules",	roles: ["user","admin"] },
	{ route: "support.standard_reports.support_analytics",	roles: ["user","admin"] },
	{ route: "tools",	roles: ["user","admin"] },
	{ route: "tools.todo",	roles: ["user","admin"] },
	{ route: "tools.todo.details",	roles: ["user","admin"] },
	{ route: "tools.todo.edit",	roles: ["user","admin"] },
	{ route: "tools.todo.insert",	roles: ["user","admin"] },
	{ route: "tools.calendar",	roles: ["user","admin"] },
	{ route: "tools.messages",	roles: ["user","admin"] },
	{ route: "tools.note",	roles: ["user","admin"] },
	{ route: "tools.note.details",	roles: ["user","admin"] },
	{ route: "tools.note.edit",	roles: ["user","admin"] },
	{ route: "tools.note.insert",	roles: ["user","admin"] },
	{ route: "tools.activity",	roles: ["user","admin"] },
	{ route: "tutorials",	roles: ["user","admin"] },
	{ route: "tutorials.accounts",	roles: ["user","admin"] },
	{ route: "tutorials.accounts.chart_of_accounts",	roles: ["user","admin"] },
	{ route: "tutorials.accounts.opening_accounting_balance",	roles: ["user","admin"] },
	{ route: "tutorials.accounts.setting_up_taxes",	roles: ["user","admin"] },
	{ route: "tutorials.purchasing",	roles: ["user","admin"] },
	{ route: "tutorials.purchasing.customer_and_supplier",	roles: ["user","admin"] },
	{ route: "tutorials.purchasing.managing_subcontracting",	roles: ["user","admin"] },
	{ route: "tutorials.purchasing.material_request_to_purchase_order",	roles: ["user","admin"] },
	{ route: "tutorials.purchasing.purchase_order_to_payment",	roles: ["user","admin"] },
	{ route: "tutorials.crm",	roles: ["user","admin"] },
	{ route: "tutorials.crm.lead_to_quotation",	roles: ["user","admin"] },
	{ route: "tutorials.crm.newsletters",	roles: ["user","admin"] },
	{ route: "tutorials.general",	roles: ["user","admin"] },
	{ route: "tutorials.general.customizing_forms",	roles: ["user","admin"] },
	{ route: "tutorials.general.navigating",	roles: ["user","admin"] },
	{ route: "tutorials.general.setup_wizard",	roles: ["user","admin"] },
	{ route: "tutorials.human_resources",	roles: ["user","admin"] },
	{ route: "tutorials.human_resources.expense_claims",	roles: ["user","admin"] },
	{ route: "tutorials.human_resources.leave_management",	roles: ["user","admin"] },
	{ route: "tutorials.human_resources.processing_payroll",	roles: ["user","admin"] },
	{ route: "tutorials.human_resources.setting_up_employees",	roles: ["user","admin"] },
	{ route: "tutorials.manufacturing",	roles: ["user","admin"] },
	{ route: "tutorials.manufacturing.bill_of_materials",	roles: ["user","admin"] },
	{ route: "tutorials.manufacturing.production_order",	roles: ["user","admin"] },
	{ route: "tutorials.manufacturing.production_planning_tool",	roles: ["user","admin"] },
	{ route: "tutorials.projects",	roles: ["user","admin"] },
	{ route: "tutorials.projects.managing_projects",	roles: ["user","admin"] },
	{ route: "tutorials.selling",	roles: ["user","admin"] },
	{ route: "tutorials.selling.customer_and_supplier",	roles: ["user","admin"] },
	{ route: "tutorials.selling.point_of_sale",	roles: ["user","admin"] },
	{ route: "tutorials.selling.sales_order_to_payment",	roles: ["user","admin"] },
	{ route: "tutorials.setup",	roles: ["user","admin"] },
	{ route: "tutorials.setup.data_import_and_export",	roles: ["user","admin"] },
	{ route: "tutorials.setup.opening_stock_balance",	roles: ["user","admin"] },
	{ route: "tutorials.setup.printing_and_branding",	roles: ["user","admin"] },
	{ route: "tutorials.setup.setting_up_email",	roles: ["user","admin"] },
	{ route: "tutorials.setup.users_and_permissions",	roles: ["user","admin"] },
	{ route: "tutorials.setup.workflow",	roles: ["user","admin"] },
	{ route: "tutorials.stock",	roles: ["user","admin"] },
	{ route: "tutorials.stock.batch_inventory",	roles: ["user","admin"] },
	{ route: "tutorials.stock.items_and_pricing",	roles: ["user","admin"] },
	{ route: "tutorials.stock.making_stock_entries",	roles: ["user","admin"] },
	{ route: "tutorials.stock.managing_subcontracting",	roles: ["user","admin"] },
	{ route: "tutorials.stock.opening_stock_balance",	roles: ["user","admin"] },
	{ route: "tutorials.stock.serialized_inventory",	roles: ["user","admin"] },
	{ route: "website",	roles: ["user","admin"] },
	{ route: "website.documents",	roles: ["user","admin"] },
	{ route: "website.documents.blog_post",	roles: ["user","admin"] },
	{ route: "website.documents.blog_post.details",	roles: ["user","admin"] },
	{ route: "website.documents.blog_post.edit",	roles: ["user","admin"] },
	{ route: "website.documents.blog_post.insert",	roles: ["user","admin"] },
	{ route: "website.documents.blogger",	roles: ["user","admin"] },
	{ route: "website.documents.blogger.details",	roles: ["user","admin"] },
	{ route: "website.documents.blogger.edit",	roles: ["user","admin"] },
	{ route: "website.documents.blogger.insert",	roles: ["user","admin"] },
	{ route: "website.documents.web_form",	roles: ["user","admin"] },
	{ route: "website.documents.web_form.details",	roles: ["user","admin"] },
	{ route: "website.documents.web_form.edit",	roles: ["user","admin"] },
	{ route: "website.documents.web_form.insert",	roles: ["user","admin"] },
	{ route: "website.documents.web_page",	roles: ["user","admin"] },
	{ route: "website.documents.web_page.details",	roles: ["user","admin"] },
	{ route: "website.documents.web_page.edit",	roles: ["user","admin"] },
	{ route: "website.documents.web_page.insert",	roles: ["user","admin"] },
	{ route: "website.documents.website_slideshow",	roles: ["user","admin"] },
	{ route: "website.documents.website_slideshow.details",	roles: ["user","admin"] },
	{ route: "website.documents.website_slideshow.edit",	roles: ["user","admin"] },
	{ route: "website.documents.website_slideshow.insert",	roles: ["user","admin"] },
	{ route: "website.setup",	roles: ["user","admin"] },
	{ route: "website.shopping_cart",	roles: ["user","admin"] },
	{ route: "website.shopping_cart.shopping_cart_settings",	roles: ["user","admin"] }
];

this.firstGrantedRoute = function(preferredRoute) {
	if(preferredRoute && routeGranted(preferredRoute)) return preferredRoute;

	var grantedRoute = "";

	_.every(privateRoutes, function(route) {
		if(routeGranted(route)) {
			grantedRoute = route;
			return false;
		}
		return true;
	});
	if(grantedRoute) return grantedRoute;

	_.every(publicRoutes, function(route) {
		if(routeGranted(route)) {
			grantedRoute = route;
			return false;
		}
		return true;
	});
	if(grantedRoute) return grantedRoute;

	_.every(freeRoutes, function(route) {
		if(routeGranted(route)) {
			grantedRoute = route;
			return false;
		}
		return true;
	});
	if(grantedRoute) return grantedRoute;

	if(!grantedRoute) {
		// what to do?
		console.log("All routes are restricted for current user.");
	}

	return "";
}

// this function returns true if user is in role allowed to access given route
this.routeGranted = function(routeName) {
	if(!routeName) {
		// route without name - enable access (?)
		return true;
	}

	if(!roleMap || roleMap.length === 0) {
		// this app don't have role map - enable access
		return true;
	}

	var roleMapItem = _.find(roleMap, function(roleItem) { return roleItem.route == routeName; });
	if(!roleMapItem) {
		// page is not restricted
		return true;
	}

	if(!Meteor.user() || !Meteor.user().roles) {
		// user is not logged in
		return false;
	}

	// this page is restricted to some role(s), check if user is in one of allowedRoles
	var allowedRoles = roleMapItem.roles;
	var granted = _.intersection(allowedRoles, Meteor.user().roles);
	if(!granted || granted.length === 0) {
		return false;
	}

	return true;
};

Router.ensureLogged = function() {
	if(Meteor.userId() && (!Meteor.user() || !Meteor.user().roles)) {
		return;
	}

	if(!Meteor.userId()) {
		// user is not logged in - redirect to public home
		var redirectRoute = firstGrantedRoute("home_public");
		this.redirect(redirectRoute);
	} else {
		// user is logged in - check role
		if(!routeGranted(this.route.getName())) {
			// user is not in allowedRoles - redirect to first granted route
			var redirectRoute = firstGrantedRoute("home_private");
			this.redirect(redirectRoute);
		} else {
			this.next();
		}
	}
};

Router.ensureNotLogged = function() {
	if(Meteor.userId() && (!Meteor.user() || !Meteor.user().roles)) {
		return;
	}

	if(Meteor.userId()) {
		var redirectRoute = firstGrantedRoute("home_private");
		this.redirect(redirectRoute);
	}
	else {
		this.next();
	}
};

// called for pages in free zone - some of pages can be restricted
Router.ensureGranted = function() {
	if(Meteor.userId() && (!Meteor.user() || !Meteor.user().roles)) {
		return;
	}

	if(!routeGranted(this.route.getName())) {
		// user is not in allowedRoles - redirect to first granted route
		var redirectRoute = firstGrantedRoute("");
		this.redirect(redirectRoute);
	} else {
		this.next();
	}
};

Router.waitOn(function() { 
	Meteor.subscribe("current_user_data");
});

Router.onBeforeAction(function() {
	// loading indicator here
	if(!this.ready()) {
		$("body").addClass("wait");
	} else {
		$("body").removeClass("wait");
		this.next();
	}
});

Router.onBeforeAction(Router.ensureNotLogged, {only: publicRoutes});
Router.onBeforeAction(Router.ensureLogged, {only: privateRoutes});
Router.onBeforeAction(Router.ensureGranted, {only: freeRoutes}); // yes, route from free zone can be restricted to specific set of user roles

Router.map(function () {
	
	this.route("home_public", {path: "/", controller: "HomePublicController"});
	this.route("login", {path: "/login", controller: "LoginController"});
	this.route("register", {path: "/register", controller: "RegisterController"});
	this.route("verify_email", {path: "/verify_email/:verifyEmailToken", controller: "VerifyEmailController"});
	this.route("forgot_password", {path: "/forgot_password", controller: "ForgotPasswordController"});
	this.route("reset_password", {path: "/reset_password/:resetPasswordToken", controller: "ResetPasswordController"});
	this.route("home_private", {path: "/home_private", title: "Home", controller: "HomePrivateController"});
	this.route("admin", {path: "/admin", title: "Admin", parent: "dashboard", showLink: false, controller: "AdminController"});
	this.route("admin.users", {path: "/admin/users", title: "Users", parent: "admin", controller: "AdminUsersController"});
	this.route("admin.users.system_user", {path: "/admin/users/system_user", title: "System User", parent: "admin.users", controller: "AdminUsersSystemUserController"});
	this.route("admin.users.system_user.details", {path: "/admin/users/system_user/details/:systemUserId", title: "Details", parent: "admin.users.system_user", controller: "SystemUserDetailsController"});
	this.route("admin.users.system_user.insert", {path: "/admin/users/system_user/insert", title: "Insert", parent: "admin.users.system_user", controller: "SystemUserInsertController"});
	this.route("admin.users.system_user.edit", {path: "/admin/users/system_user/edit/:systemUserId", title: "Edit", parent: "admin.users.system_user", controller: "SystemUserEditController"});
	this.route("user_settings", {path: "/user_settings", title: "User Settings", parent: "dashboard", showLink: false, controller: "UserSettingsController"});
	this.route("user_settings.profile", {path: "/user_settings/profile", title: "My Profile", parent: "user_settings", controller: "UserSettingsProfileController"});
	this.route("user_settings.change_pass", {path: "/user_settings/change_pass", title: "Change Password", parent: "user_settings", controller: "UserSettingsChangePassController"});
	this.route("dashboard", {path: "/dashboard", title: "Dashboard", controller: "DashboardController"});
	this.route("logout", {path: "/logout", controller: "LogoutController"});
	this.route("accounts", {path: "/accounts", controller: "AccountsController"});
	this.route("accounts.documents", {path: "/accounts/documents", title: "Documents", parent: "dashboard", controller: "AccountsDocumentsController"});
	this.route("accounts.documents.customer", {path: "/accounts/documents/customer", title: "Customer", parent: "accounts.documents", controller: "AccountsDocumentsCustomerController"});
	this.route("accounts.documents.customer.details", {path: "/accounts/documents/customer/details/:customerId", title: "Details", parent: "accounts.documents.customer", controller: "CustomerDetailsController"});
	this.route("accounts.documents.customer.edit", {path: "/accounts/documents/customer/edit/:customerId", title: "Edit", parent: "accounts.documents.customer", controller: "CustomerEditController"});
	this.route("accounts.documents.customer.insert", {path: "/accounts/documents/customer/insert", title: "New", parent: "accounts.documents.customer", controller: "CustomerInsertController"});
	this.route("accounts.documents.journal_entry", {path: "/accounts/documents/journal_entry", template: "AccountsDocumentsJournalEntry", title: function() {return "Journal Entry";}, parent: "accounts.documents", controller: "AccountsDocumentsJournalEntryController"});
	this.route("accounts.documents.journal_entry.details", {path: "/accounts/documents/journal_entry/details/:journalEntryId", title: "Details", parent: "accounts.documents.journal_entry", controller: "JournalEntryDetailsController"});
	this.route("accounts.documents.journal_entry.edit", {path: "/accounts/documents/journal_entry/edit/:journalEntryId", title: "Edit", parent: "accounts.documents.journal_entry", controller: "JournalEntryEditController"});
	this.route("accounts.documents.journal_entry.insert", {path: "/accounts/documents/journal_entry/insert", title: "New", parent: "accounts.documents.journal_entry", controller: "JournalEntryInsertController"});
	this.route("accounts.documents.purchase_invoice", {path: "/accounts/documents/purchase_invoice", title: "Purchase Invoice", parent: "accounts.documents", controller: "AccountsDocumentsPurchaseInvoiceController"});
	this.route("accounts.documents.purchase_invoice.details", {path: "/accounts/documents/purchase_invoice/details/:purchaseInvoiceId", title: "Details", parent: "accounts.documents.purchase_invoice", controller: "PurchaseInvoiceDetailsController"});
	this.route("accounts.documents.purchase_invoice.edit", {path: "/accounts/documents/purchase_invoice/edit/:purchaseInvoiceId", title: "Edit", parent: "accounts.documents.purchase_invoice", controller: "PurchaseInvoiceEditController"});
	this.route("accounts.documents.purchase_invoice.insert", {path: "/accounts/documents/purchase_invoice/insert", title: "New", parent: "accounts.documents.purchase_invoice", controller: "PurchaseInvoiceInsertController"});
	this.route("accounts.documents.sales_invoice", {path: "/accounts/documents/sales_invoice", title: "Sales Invoice", parent: "accounts.documents", controller: "AccountsDocumentsSalesInvoiceController"});
	this.route("accounts.documents.sales_invoice.details", {path: "/accounts/documents/sales_invoice/details/:salesInvoiceId", title: "Details", parent: "accounts.documents.sales_invoice", controller: "SalesInvoiceDetailsController"});
	this.route("accounts.documents.sales_invoice.edit", {path: "/accounts/documents/sales_invoice/edit/:salesInvoiceId", title: "Edit", parent: "accounts.documents.sales_invoice", controller: "SalesInvoiceEditController"});
	this.route("accounts.documents.sales_invoice.insert", {path: "/accounts/documents/sales_invoice/insert", title: "New", parent: "accounts.documents.sales_invoice", controller: "SalesInvoiceInsertController"});
	this.route("accounts.documents.supplier", {path: "/accounts/documents/supplier", title: "Supplier", parent: "accounts.documents", controller: "AccountsDocumentsSupplierController"});
	this.route("accounts.documents.supplier.details", {path: "/accounts/documents/supplier/details/:supplierId", title: "Details", parent: "accounts.documents.supplier", controller: "SupplierDetailsController"});
	this.route("accounts.documents.supplier.edit", {path: "/accounts/documents/supplier/edit/:supplierId", title: "Edit", parent: "accounts.documents.supplier", controller: "SupplierEditController"});
	this.route("accounts.documents.supplier.insert", {path: "/accounts/documents/supplier/insert", title: "New", parent: "accounts.documents.supplier", controller: "SupplierInsertController"});
	this.route("accounts.help", {path: "/accounts/help", title: "Help", parent: "dashboard", controller: "AccountsHelpController"});
	this.route("accounts.help.chart_of_accounts", {path: "/accounts/help/chart_of_accounts", title: "Chart of Accounts", parent: "accounts.help", controller: "AccountsHelpChartOfAccountsController"});
	this.route("accounts.help.opening_accounting_balance", {path: "/accounts/help/opening_accounting_balance", title: "Opening Accounting Balance", parent: "accounts.help", controller: "AccountsHelpOpeningAccountingBalanceController"});
	this.route("accounts.help.setting_up_taxes", {path: "/accounts/help/setting_up_taxes", title: "Setting Up Taxes", parent: "accounts.help", controller: "AccountsHelpSettingUpTaxesController"});
	this.route("accounts.main_reports", {path: "/accounts/main_reports", title: "Main Reports", parent: "dashboard", controller: "AccountsMainReportsController"});
	this.route("accounts.main_reports.accounts_payable", {path: "/accounts/main_reports/accounts_payable", title: "Accounts Payable", parent: "accounts.main_reports", controller: "AccountsMainReportsAccountsPayableController"});
	this.route("accounts.main_reports.accounts_receivable", {path: "/accounts/main_reports/accounts_receivable", title: "Accounts Receivable", parent: "accounts.main_reports", controller: "AccountsMainReportsAccountsReceivableController"});
	this.route("accounts.main_reports.balance_sheet", {path: "/accounts/main_reports/balance_sheet", title: "Balance Sheet", parent: "accounts.main_reports", controller: "AccountsMainReportsBalanceSheetController"});
	this.route("accounts.main_reports.financial_analytics", {path: "/accounts/main_reports/financial_analytics", title: "Financial Analytics", parent: "accounts.main_reports", controller: "AccountsMainReportsFinancialAnalyticsController"});
	this.route("accounts.main_reports.general_ledger", {path: "/accounts/main_reports/general_ledger", title: "General Ledger", parent: "accounts.main_reports", controller: "AccountsMainReportsGeneralLedgerController"});
	this.route("accounts.main_reports.gross_profit", {path: "/accounts/main_reports/gross_profit", title: "Gross Profit", parent: "accounts.main_reports", controller: "AccountsMainReportsGrossProfitController"});
	this.route("accounts.main_reports.profit_and_loss_statement", {path: "/accounts/main_reports/profit_and_loss_statement", title: "Profit and Loss Statement", parent: "accounts.main_reports", controller: "AccountsMainReportsProfitAndLossStatementController"});
	this.route("accounts.main_reports.purchase_register", {path: "/accounts/main_reports/purchase_register", title: "Purchase Register", parent: "accounts.main_reports", controller: "AccountsMainReportsPurchaseRegisterController"});
	this.route("accounts.main_reports.sales_register", {path: "/accounts/main_reports/sales_register", title: "Sales Register", parent: "accounts.main_reports", controller: "AccountsMainRportsSalesRegisterController"});
	this.route("accounts.main_reports.trial_balance", {path: "/accounts/main_reports/trial_balance", title: "Trial Balance", parent: "accounts.main_reports", controller: "AccountsMainReportsTrialBalanceController"});
	this.route("accounts.main_reports.trial_balance_for_party", {path: "/accounts/main_reports/trial_balance_for_party", title: "Trial Balance for Party", parent: "accounts.main_reports", controller: "AccountsMainReportsTrialBalanceForPartyController"});
	this.route("accounts.setup", {path: "/accounts/setup", title: "Setup", parent: "dashboard", controller: "AccountsSetupController"});
	this.route("accounts.standard_reports", {path: "/accounts/standard_reports", title: "Standard Reports", parent: "dashboard", controller: "AccountsStandardReportsController"});
	this.route("accounts.standard_reports.accounts_payable_summary", {path: "/accounts/standard_reports/accounts_payable_summary", title: "Accounts Payable", parent: "accounts.standard_reports", controller: "AccountsStandardReportsAccountsPayableSummaryController"});
	this.route("accounts.standard_reports.accounts_receivable_summary", {path: "/accounts/standard_reports/accounts_receivable_summary", title: "Accounts Receivable Summary", parent: "accounts.standard_reports", controller: "AccountsStandardReportsAccountsReceivableSummaryController"});
	this.route("accounts.standard_reports.bank_clearance_summary", {path: "/accounts/standard_reports/bank_clearance_summary", title: "Bank Clearance Summary", parent: "accounts.standard_reports", controller: "AccountsStandardReportsBankClearanceSummaryController"});
	this.route("accounts.standard_reports.bank_reconciliation_statement", {path: "/accounts/standard_reports/bank_reconciliation_statement", title: "Bank Reconciliation Statement", parent: "accounts.standard_reports", controller: "AccountsStandardReportsBankReconciliationStatementController"});
	this.route("accounts.standard_reports.budget_variance_report", {path: "/accounts/standard_reports/budget_variance_report", title: "Budget Variance Report", parent: "accounts.standard_reports", controller: "AccountsStandardReportsBudgetVarianceReportController"});
	this.route("accounts.standard_reports.customer_credit_balance", {path: "/accounts/standard_reports/customer_credit_balance", title: "Customer Credit Balance", parent: "accounts.standard_reports", controller: "AccountsStandardReportsCustomerCreditBalanceController"});
	this.route("accounts.standard_reports.delivered_items_to_be_billed", {path: "/accounts/standard_reports/delivered_items_to_be_billed", title: "Delivered Items to be Billed", parent: "accounts.standard_reports", controller: "AccountsStandardReportsDeliveredItemsToBeBilledController"});
	this.route("accounts.standard_reports.item_wise_purchase_register", {path: "/accounts/standard_reports/item_wise_purchase_register", title: "Item-wise Purchase Register", parent: "accounts.standard_reports", controller: "AccountsStandardReportsItemWisePurchaseRegisterController"});
	this.route("accounts.standard_reports.item_wise_sales_register", {path: "/accounts/standard_reports/item_wise_sales_register", title: "Item-wise Sales Register", parent: "accounts.standard_reports", controller: "AccountsStandardReportsItemWiseSalesRegisterController"});
	this.route("accounts.standard_reports.ordered_items_to_be_billed", {path: "/accounts/standard_reports/ordered_items_to_be_billed", title: "Ordered Items to be Billed", parent: "accounts.standard_reports", controller: "AccountsStandardReportsOrderedItemsToBeBilledController"});
	this.route("accounts.standard_reports.payment_period_based_on_invoice_date", {path: "/accounts/standard_reports/payment_period_based_on_invoice_date", title: "Payment Period Based on Invoice Date", parent: "accounts.standard_reports", controller: "AccountsStandardReportsPaymentPeriodBasedOnInvoiceDateController"});
	this.route("accounts.standard_reports.purchase_invoice_trends", {path: "/accounts/standard_reports/purchase_invoice_trends", title: "Purchase Invoice Trends", parent: "accounts.standard_reports", controller: "AccountsStandardReportsPurchaseInvoiceTrendsController"});
	this.route("accounts.standard_reports.purchase_order_items_to_be_billed", {path: "/accounts/standard_reports/purchase_order_items_to_be_billed", title: "Purchase Order Items to be Billed", parent: "accounts.standard_reports", controller: "AccountsStandardReportsPurchaseOrderItemsToBeBilledController"});
	this.route("accounts.standard_reports.received_items_to_be_billed", {path: "/accounts/standard_reports/received_items_to_be_billed", title: "Received Items to be Billed", parent: "accounts.standard_reports", controller: "AccountsStandardReportsReceivedItemsToBeBilledController"});
	this.route("accounts.standard_reports.sales_invoice_trends", {path: "/accounts/standard_reports/sales_invoice_trends", title: "Sales Invoice Trends", parent: "accounts.standard_reports", controller: "AccountsStandardReportsSalesInvoiceTrendsController"});
	this.route("accounts.standard_reports.sales_partners_commission", {path: "/accounts/standard_reports/sales_partners_commission", title: "Sales Partners Commission", parent: "accounts.standard_reports", controller: "AccountsStandardReportsSalesPartnersCommissionController"});
	this.route("accounts.tools", {path: "/accounts/tools", title: "Tools", parent: "dashboard", controller: "AccountsToolsController"});
	this.route("accounts.tools.bank_reconciliation", {path: "/accounts/tools/bank_reconciliation", title: "Bank Reconciliation", parent: "accounts.tools", controller: "AccountsToolsBankReconciliationController"});
	this.route("accounts.tools.payment_reconciliation", {path: "/accounts/tools/payment_reconciliation", title: "Payment Reconciliation", parent: "accounts.tools", controller: "AccountsToolsPaymentReconciliationController"});
	this.route("accounts.tools.payment_tool", {path: "/accounts/tools/payment_tool", title: "Payment Tool", parent: "accounts.tools", controller: "AccountsToolsPaymentToolController"});
	this.route("accounts.tools.period_closing_voucher", {path: "/accounts/tools/period_closing_voucher", title: "Period Closing Voucher", parent: "accounts.tools", controller: "AccountsToolsPeriodClosingVoucherController"});
	this.route("accounts.tools.period_closing_voucher.details", {path: "/accounts/tools/period_closing_voucher/details/:periodClosingVoucherId", title: "Details", parent: "accounts.tools.period_closing_voucher", controller: "PeriodClosingVoucherDetailsController"});
	this.route("accounts.tools.period_closing_voucher.edit", {path: "/accounts/tools/period_closing_voucher/edit/:periodClosingVoucherId", title: "Edit", parent: "accounts.tools.period_closing_voucher", controller: "PeriodClosingVoucherEditController"});
	this.route("accounts.tools.period_closing_voucher.insert", {path: "/accounts/tools/period_closing_voucher/insert", title: "New", parent: "accounts.tools.period_closing_voucher", controller: "PeriodClosingVoucherInsertController"});
	this.route("all_applications", {path: "/all_applications", title: "All Applications", parent: "dashboard", controller: "AllApplicationsController"});
	this.route("core_settings", {path: "/core_settings", controller: "CoreSettingsController"});
	this.route("core_settings.documents", {path: "/core_settings/documents", title: "Documents", parent: "dashboard", controller: "CoreSettingsDocumentsController"});
	this.route("core_settings.documents.async_task", {path: "/core_settings/documents/async_task", title: "Async Task", parent: "core_settings.documents", controller: "CoreSettingsDocumentsAsyncTaskController"});
	this.route("core_settings.documents.async_task.details", {path: "/core_settings/documents/async_task/details/:asyncTaskId", title: "Details", parent: "core_settings.documents.async_task", controller: "AsyncTaskDetailsController"});
	this.route("core_settings.documents.async_task.edit", {path: "/core_settings/documents/async_task/edit/:asyncTaskId", title: "Edit", parent: "core_settings.documents.async_task", controller: "AsyncTaskEditController"});
	this.route("core_settings.documents.async_task.insert", {path: "/core_settings/documents/async_task/insert", title: "New", parent: "core_settings.documents.async_task", controller: "AsyncTaskInsertController"});
	this.route("core_settings.setup", {path: "/core_settings/setup", title: "Setup", parent: "dashboard", controller: "CoreSettingsSetupController"});
	this.route("core_settings.setup.comment", {path: "/core_settings/setup/comment", title: "Comment", parent: "core_settings.setup", controller: "CoreSettingsSetupCommentController"});
	this.route("core_settings.setup.comment.details", {path: "/core_settings/setup/comment/details/:commentId", title: "Details", parent: "core_settings.setup.comment", controller: "CommentController"});
	this.route("core_settings.setup.comment.edit", {path: "/core_settings/setup/comment/edit/:commentId", title: "Edit", parent: "core_settings.setup.comment", controller: "CommentEditController"});
	this.route("core_settings.setup.comment.insert", {path: "/core_settings/setup/comment/insert", title: "New", parent: "core_settings.setup.comment", controller: "CommentInsertController"});
	this.route("core_settings.setup.communication", {path: "/core_settings/setup/communication", title: "Communication", parent: "core_settings.setup", controller: "CoreSettingsSetupCommunicationController"});
	this.route("core_settings.setup.communication.details", {path: "/core_settings/setup/communication/details/:communicationId", title: "Details", parent: "core_settings.setup.communication", controller: "CommunicationDetailsController"});
	this.route("core_settings.setup.communication.edit", {path: "/core_settings/setup/communication/edit/:communicationId", title: "Edit", parent: "core_settings.setup.communication", controller: "CommunicationEditController"});
	this.route("core_settings.setup.communication.insert", {path: "/core_settings/setup/communication/insert", title: "New", parent: "core_settings.setup.communication", controller: "CommunicationInsertController"});
	this.route("core_settings.setup.module_def", {path: "/core_settings/setup/module_def", title: "Module Definition", parent: "core_settings.setup", controller: "CoreSettingsSetupModuleDefController"});
	this.route("core_settings.setup.module_def.details", {path: "/core_settings/setup/module_def/details/:moduleDefId", title: "Details", parent: "core_settings.setup.module_def", controller: "ModuleDefDetailsController"});
	this.route("core_settings.setup.module_def.edit", {path: "/core_settings/setup/module_def/edit/:moduleDefId", title: "Edit", parent: "core_settings.setup.module_def", controller: "ModuleDefEditController"});
	this.route("core_settings.setup.module_def.insert", {path: "/core_settings/setup/module_def/insert", title: "New", parent: "core_settings.setup.module_def", controller: "ModuleDefInsertController"});
	this.route("core_settings.setup.page", {path: "/core_settings/setup/page", title: "Page", parent: "core_settings.setup", controller: "CoreSettingsSetupPageController"});
	this.route("core_settings.setup.page.details", {path: "/core_settings/setup/page/details/:pageId", title: "Details", parent: "core_settings.setup.page", controller: "PageDetailsController"});
	this.route("core_settings.setup.page.edit", {path: "/core_settings/setup/page/edit/:pageId", title: "Edit", parent: "core_settings.setup.page", controller: "PageEditController"});
	this.route("core_settings.setup.page.insert", {path: "/core_settings/setup/page/insert", title: "New", parent: "core_settings.setup.page", controller: "PageInsertController"});
	this.route("core_settings.setup.versions", {path: "/core_settings/setup/versions", title: "Versions", parent: "core_settings.setup", controller: "CoreSettingsSetupVersionsController"});
	this.route("core_settings.setup.versions.details", {path: "/core_settings/setup/versions/details/:versionsId", title: "Details", parent: "core_settings.setup.versions", controller: "VersionsDetailsController"});
	this.route("core_settings.setup.versions.edit", {path: "/core_settings/setup/versions/edit/:versionsId", title: "Edit", parent: "core_settings.setup.versions", controller: "VersionsEditController"});
	this.route("core_settings.setup.versions.insert", {path: "/core_settings/setup/versions/insert", title: "New", parent: "core_settings.setup.versions", controller: "VersionsInsertController"});
	this.route("core_settings.standard_reports", {path: "/core_settings/standard_reports", title: "Standard Reports", parent: "dashboard", controller: "CoreSettingsStandardReportsController"});
	this.route("core_settings.standard_reports.document_share_report", {path: "/core_settings/standard_reports/document_share_report", title: "Report: DocShare - Document Share Report", parent: "core_settings.standard_reports", controller: "CoreSettingsStandardReportsDocumentShareReportController"});
	this.route("core_settings.standard_reports.permitted_documents_for_user", {path: "/core_settings/standard_reports/permitted_documents_for_user", title: "Permitted Documents for User", parent: "core_settings.standard_reports", controller: "CoreSettingsStandardReportsPermittedDocumentsForUserController"});
	this.route("core_settings.standard_reports.todo", {path: "/core_settings/standard_reports/todo", title: "ToDo", parent: "core_settings.standard_reports", controller: "CoreSettingsStandardReportsTodoController"});
	this.route("crm", {path: "/crm", controller: "CrmController"});
	this.route("crm.documents", {path: "/crm/documents", title: "Documents", parent: "dashboard", controller: "CrmDocumentsController"});
	this.route("crm.documents.contact", {path: "/crm/documents/contact", title: "Contact", parent: "crm.documents", controller: "CrmDocumentsContactController"});
	this.route("crm.documents.contact.details", {path: "/crm/documents/contact/details/:contactId", title: "Details", parent: "crm.documents.contact", controller: "ContactDetailsController"});
	this.route("crm.documents.contact.edit", {path: "/crm/documents/contact/edit/:contactId", title: "Edit", parent: "crm.documents.contact", controller: "ContactEditController"});
	this.route("crm.documents.contact.insert", {path: "/crm/documents/contact/insert", title: "New", parent: "crm.documents.contact", controller: "ContactInsertController"});
	this.route("crm.documents.lead", {path: "/crm/documents/lead", title: "Lead", parent: "crm.documents", controller: "CrmDocumentsLeadController"});
	this.route("crm.documents.lead.details", {path: "/crm/documents/lead/details/:leadId", title: "Details", parent: "crm.documents.lead", controller: "LeadDetailsController"});
	this.route("crm.documents.lead.edit", {path: "/crm/documents/lead/edit/:leadId", title: "Edit", parent: "crm.documents.lead", controller: "LeadEditController"});
	this.route("crm.documents.lead.insert", {path: "/crm/documents/lead/insert", title: "New", parent: "crm.documents.lead", controller: "LeadInsertController"});
	this.route("crm.documents.newsletter", {path: "/crm/documents/newsletter", title: "Newsletter", parent: "crm.documents", controller: "CrmDocumentsNewsletterController"});
	this.route("crm.documents.newsletter.details", {path: "/crm/documents/newsletter/details/:newsletterId", title: "Details", parent: "crm.documents.newsletter", controller: "NewsletterDetailsController"});
	this.route("crm.documents.newsletter.edit", {path: "/crm/documents/newsletter/edit/:newsletterId", title: "Edit", parent: "crm.documents.newsletter", controller: "NewsletterEditController"});
	this.route("crm.documents.newsletter.insert", {path: "/crm/documents/newsletter/insert", title: "New", parent: "crm.documents.newsletter", controller: "NewsletterInsertController"});
	this.route("crm.documents.opportunity", {path: "/crm/documents/opportunity", title: "Opportunity", parent: "crm.documents", controller: "CrmDocumentsOpportunityController"});
	this.route("crm.documents.opportunity.details", {path: "/crm/documents/opportunity/details/:opportunityId", title: "Details", parent: "crm.documents.opportunity", controller: "OpportunityDetailsController"});
	this.route("crm.documents.opportunity.edit", {path: "/crm/documents/opportunity/edit/:opportunityId", title: "Edit", parent: "crm.documents.opportunity", controller: "OpportunityEditController"});
	this.route("crm.documents.opportunity.insert", {path: "/crm/documents/opportunity/insert", title: "New", parent: "crm.documents.opportunity", controller: "OpportunityInsertController"});
	this.route("crm.help", {path: "/crm/help", title: "Help", parent: "dashboard", controller: "CrmHelpController"});
	this.route("crm.help.lead_to_quotation", {path: "/crm/help/lead_to_quotation", title: "Lead to Quotation", parent: "crm.help", controller: "CrmHelpLeadToQuotationController"});
	this.route("crm.main_reports", {path: "/crm/main_reports", title: "Main Reports", parent: "dashboard", controller: "CrmMainReportsController"});
	this.route("crm.main_reports.sales_funnel", {path: "/crm/main_reports/sales_funnel", title: "Sales Funnel", parent: "crm.main_reports", controller: "CrmMainReportsSalesFunnelController"});
	this.route("crm.setup", {path: "/crm/setup", title: "Setup", parent: "dashboard", controller: "CrmSetupController"});
	this.route("crm.setup.campaign", {path: "/crm/setup/campaign", title: "Campaign", parent: "crm.setup", controller: "CrmSetupCampaignController"});
	this.route("crm.setup.campaign.details", {path: "/crm/setup/campaign/details/:campaignId", title: "Details", parent: "crm.setup.campaign", controller: "CampaignDetailsController"});
	this.route("crm.setup.campaign.edit", {path: "/crm/setup/campaign/edit/:campaignId", title: "Edit", parent: "crm.setup.campaign", controller: "CampaignEditController"});
	this.route("crm.setup.campaign.insert", {path: "/crm/setup/campaign/insert", title: "New", parent: "crm.setup.campaign", controller: "CampaignInsertController"});
	this.route("crm.setup.customer_group", {path: "/crm/setup/customer_group", title: "Customer Group Tree", parent: "crm.setup", controller: "CrmSetupCustomerGroupController"});
	this.route("crm.setup.newsletter_list", {path: "/crm/setup/newsletter_list", title: "Newsletter List", parent: "crm.setup", controller: "CrmSetupNewsletterListController"});
	this.route("crm.setup.newsletter_list.details", {path: "/crm/setup/newsletter_list/details/:newsletterListId", title: "Details", parent: "crm.setup.newsletter_list", controller: "NewsletterListDetailsController"});
	this.route("crm.setup.newsletter_list.edit", {path: "/crm/setup/newsletter_list/edit/:newsletterListId", title: "Edit", parent: "crm.setup.newsletter_list", controller: "NewsletterListEditController"});
	this.route("crm.setup.newsletter_list.insert", {path: "/crm/setup/newsletter_list/insert", title: "New", parent: "crm.setup.newsletter_list", controller: "NewsletterListInsertController"});
	this.route("crm.standard_reports", {path: "/crm/standard_reports", title: "Standard Reports", parent: "dashboard", controller: "CrmStandardReportsController"});
	this.route("crm.standard_reports.customer_addresses_and_contacts", {path: "/crm/standard_reports/customer_addresses_and_contacts", title: "Customer Addresses and Contacts", parent: "crm.standard_reports", controller: "CrmStandardReportsCustomerAddressesAndContactsController"});
	this.route("crm.standard_reports.customers_not_buying_for_long_time", {path: "/crm/standard_reports/customers_not_buying_for_long_time", title: "Customers Not Buying", parent: "crm.standard_reports", controller: "CrmStandardReportsCustomersNotBuyingForLongTimeController"});
	this.route("crm.standard_reports.lead_details", {path: "/crm/standard_reports/lead_details", title: "Lead Details", parent: "crm.standard_reports", controller: "CrmStandardReportsLeadDetailsController"});
	this.route("crm.tools", {path: "/crm/tools", title: "Tools", parent: "dashboard", controller: "CrmToolsController"});
	this.route("crm.tools.sms_center", {path: "/crm/tools/sms_center", title: "SMS Center", parent: "crm.tools", controller: "CrmToolsSmsCenterController"});
	this.route("crm.tools.sms_log", {path: "/crm/tools/sms_log", title: "SMS Log", parent: "crm.tools", controller: "CrmToolsSmsLogController"});
	this.route("crm.tools.sms_log.details", {path: "/crm/tools/sms_log/details/:smsLogId", title: "Details", parent: "crm.tools.sms_log", controller: "SmsLogDetailsController"});
	this.route("crm.tools.sms_log.edit", {path: "/crm/tools/sms_log/edit/:smsLogId", title: "Edit", parent: "crm.tools.sms_log", controller: "SmsLogEditController"});
	this.route("crm.tools.sms_log.insert", {path: "/crm/tools/sms_log/insert", title: "New", parent: "crm.tools.sms_log", controller: "SmsLogInsertController"});
	this.route("file", {path: "/file", title: "File Manager", controller: "FileController"});
	this.route("file.details", {path: "/file/details", title: "Details", parent: "file", controller: "FileDetailsController"});
	this.route("file.edit", {path: "/file/edit", title: "Edit", parent: "file", controller: "FileEditController"});
	this.route("file.insert", {path: "/file/insert", title: "New", parent: "file", controller: "FileInsertController"});
	this.route("human_resources", {path: "/human_resources", controller: "HumanResourcesController"});
	this.route("human_resources.documents", {path: "/human_resources/documents", title: "Documents", parent: "dashboard", controller: "HumanResourcesDocumentsController"});
	this.route("human_resources.documents.appraisal", {path: "/human_resources/documents/appraisal", title: "Appraisal", parent: "human_resources.documents", controller: "HumanResourcesDocumentsAppraisalController"});
	this.route("human_resources.documents.appraisal.details", {path: "/human_resources/documents/appraisal/details/:appraisalId", title: "Details", parent: "human_resources.documents.appraisal", controller: "AppraisalDetailsController"});
	this.route("human_resources.documents.appraisal.edit", {path: "/human_resources/documents/appraisal/edit/:appraisalId", title: "Edit", parent: "human_resources.documents.appraisal", controller: "AppraisalEditController"});
	this.route("human_resources.documents.appraisal.insert", {path: "/human_resources/documents/appraisal/insert", title: "New", parent: "human_resources.documents.appraisal", controller: "AppraisalInsertController"});
	this.route("human_resources.documents.attendance", {path: "/human_resources/documents/attendance", title: "Attendance", parent: "human_resources.documents", controller: "HumanResourcesDocumentsAttendanceController"});
	this.route("human_resources.documents.attendance.details", {path: "/human_resources/documents/attendance/details/:attendanceId", title: "Details", parent: "human_resources.documents.attendance", controller: "AttendanceDetailsController"});
	this.route("human_resources.documents.attendance.edit", {path: "/human_resources/documents/attendance/edit/:attendanceId", title: "Edit", parent: "human_resources.documents.attendance", controller: "AttendanceEditController"});
	this.route("human_resources.documents.attendance.insert", {path: "/human_resources/documents/attendance/insert", title: "New", parent: "human_resources.documents.attendance", controller: "AttendanceInsertController"});
	this.route("human_resources.documents.employee", {path: "/human_resources/documents/employee", title: "Employee", parent: "human_resources.documents", controller: "HumanResourcesDocumentsEmployeeController"});
	this.route("human_resources.documents.employee.details", {path: "/human_resources/documents/employee/details/:employeeId", title: "Details", parent: "human_resources.documents.employee", controller: "EmployeeDetailsController"});
	this.route("human_resources.documents.employee.edit", {path: "/human_resources/documents/employee/edit/:employeeId", title: "Edit", parent: "human_resources.documents.employee", controller: "EmployeeEditController"});
	this.route("human_resources.documents.employee.insert", {path: "/human_resources/documents/employee/insert", title: "New", parent: "human_resources.documents.employee", controller: "EmployeeInsertController"});
	this.route("human_resources.documents.expense_claim", {path: "/human_resources/documents/expense_claim", title: "Expense Claim", parent: "human_resources.documents", controller: "HumanResourcesDocumentsExpenseClaimController"});
	this.route("human_resources.documents.expense_claim.details", {path: "/human_resources/documents/expense_claim/details/:expenseClaimId", title: "Details", parent: "human_resources.documents.expense_claim", controller: "ExpenseClaimDetailsController"});
	this.route("human_resources.documents.expense_claim.edit", {path: "/human_resources/documents/expense_claim/edit/:expenseClaimId", title: "Edit", parent: "human_resources.documents.expense_claim", controller: "ExpenseClaimEditController"});
	this.route("human_resources.documents.expense_claim.insert", {path: "/human_resources/documents/expense_claim/insert", title: "New", parent: "human_resources.documents.expense_claim", controller: "ExpenseClaimInsertController"});
	this.route("human_resources.documents.job_applicant", {path: "/human_resources/documents/job_applicant", title: "Job Applicant", parent: "human_resources.documents", controller: "HumanResourcesDocumentsJobApplicantController"});
	this.route("human_resources.documents.job_applicant.details", {path: "/human_resources/documents/job_applicant/details/:jobApplicantId", title: "Details", parent: "human_resources.documents.job_applicant", controller: "JobApplicantDetailsController"});
	this.route("human_resources.documents.job_applicant.edit", {path: "/human_resources/documents/job_applicant/edit/:jobApplicantId", title: "Edit", parent: "human_resources.documents.job_applicant", controller: "JobApplicantEditController"});
	this.route("human_resources.documents.job_applicant.insert", {path: "/human_resources/documents/job_applicant/insert", title: "New", parent: "human_resources.documents.job_applicant", controller: "JobApplicantInsertController"});
	this.route("human_resources.documents.job_opening", {path: "/human_resources/documents/job_opening", title: "Job Opening", parent: "human_resources.documents", controller: "HumanResourcesDocumentsJobOpeningController"});
	this.route("human_resources.documents.job_opening.details", {path: "/human_resources/documents/job_opening/details/:jobOpeningId", title: "Details", parent: "human_resources.documents.job_opening", controller: "JobOpeningDetailsController"});
	this.route("human_resources.documents.job_opening.edit", {path: "/human_resources/documents/job_opening/edit/:jobOpeningId", title: "Edit", parent: "human_resources.documents.job_opening", controller: "JobOpeningEditController"});
	this.route("human_resources.documents.job_opening.insert", {path: "/human_resources/documents/job_opening/insert", title: "New", parent: "human_resources.documents.job_opening", controller: "JobOpeningInsertController"});
	this.route("human_resources.documents.leave_application", {path: "/human_resources/documents/leave_application", title: "Leave Application", parent: "human_resources.documents", controller: "HumanResourcesDocumentsLeaveApplicationController"});
	this.route("human_resources.documents.leave_application.details", {path: "/human_resources/documents/leave_application/details/:leaveApplicationId", title: "Details", parent: "human_resources.documents.leave_application", controller: "LeaveApplicationDetailsController"});
	this.route("human_resources.documents.leave_application.edit", {path: "/human_resources/documents/leave_application/edit/:leaveApplicationId", title: "Edit", parent: "human_resources.documents.leave_application", controller: "LeaveApplicationEditController"});
	this.route("human_resources.documents.leave_application.insert", {path: "/human_resources/documents/leave_application/insert", title: "New", parent: "human_resources.documents.leave_application", controller: "LeaveApplicationInsertController"});
	this.route("human_resources.documents.offer_letter", {path: "/human_resources/documents/offer_letter", title: "Offer Letter", parent: "human_resources.documents", controller: "HumanResourcesDocumentsOfferLetterController"});
	this.route("human_resources.documents.offer_letter.details", {path: "/human_resources/documents/offer_letter/details/:offerLetterId", title: "Details", parent: "human_resources.documents.offer_letter", controller: "OfferLetterDetailsController"});
	this.route("human_resources.documents.offer_letter.edit", {path: "/human_resources/documents/offer_letter/edit/:offerLetterId", title: "Edit", parent: "human_resources.documents.offer_letter", controller: "OfferLetterEditController"});
	this.route("human_resources.documents.offer_letter.insert", {path: "/human_resources/documents/offer_letter/insert", title: "New", parent: "human_resources.documents.offer_letter", controller: "OfferLetterInsertController"});
	this.route("human_resources.documents.salary_slip", {path: "/human_resources/documents/salary_slip", title: "Salary Slip", parent: "human_resources.documents", controller: "HumanResourcesDocumentsSalarySlipController"});
	this.route("human_resources.documents.salary_slip.details", {path: "/human_resources/documents/salary_slip/details/:salarySlipId", title: "Details", parent: "human_resources.documents.salary_slip", controller: "SalarySlipDetailsController"});
	this.route("human_resources.documents.salary_slip.edit", {path: "/human_resources/documents/salary_slip/edit/:salarySlipId", title: "Edit", parent: "human_resources.documents.salary_slip", controller: "SalarySlipEditController"});
	this.route("human_resources.documents.salary_slip.insert", {path: "/human_resources/documents/salary_slip/insert", title: "New", parent: "human_resources.documents.salary_slip", controller: "SalarySlipInsertController"});
	this.route("human_resources.setup", {path: "/human_resources/setup", title: "Setup", parent: "dashboard", controller: "HumanResourcesSetupController"});
	this.route("human_resources.standard_reports", {path: "/human_resources/standard_reports", title: "Standard Reports", parent: "dashboard", controller: "HumanResourcesStandardReportsController"});
	this.route("human_resources.standard_reports.employee_birthday", {path: "/human_resources/standard_reports/employee_birthday", title: "Employee Birthday", parent: "human_resources.standard_reports", controller: "HumanResourcesStandardReportsEmployeeBirthdayController"});
	this.route("human_resources.standard_reports.employee_information", {path: "/human_resources/standard_reports/employee_information", title: "Employee Information", parent: "human_resources.standard_reports", controller: "HumanResourcesStandardReportsEmployeeInformationController"});
	this.route("human_resources.standard_reports.employee_leave_balance", {path: "/human_resources/standard_reports/employee_leave_balance", title: "Employee Leave Balance", parent: "human_resources.standard_reports", controller: "HumanResourcesStandardReportsEmployeeLeaveBalanceController"});
	this.route("human_resources.standard_reports.monthly_attendance_sheet", {path: "/human_resources/standard_reports/monthly_attendance_sheet", title: "Monthly Attendance Sheet", parent: "human_resources.standard_reports", controller: "HumanResourcesStandardReportsMonthlyAttendanceSheetController"});
	this.route("human_resources.standard_reports.monthly_salary_register", {path: "/human_resources/standard_reports/monthly_salary_register", title: "Monthly Salary Register", parent: "human_resources.standard_reports", controller: "HumanResourcesStandardReportsMonthlySalaryRegisterController"});
	this.route("human_resources.tools", {path: "/human_resources/tools", title: "Tools", parent: "dashboard", controller: "HumanResourcesToolsController"});
	this.route("human_resources.tools.leave_allocation_tool", {path: "/human_resources/tools/leave_allocation_tool", title: "Leave Control Panel", parent: "human_resources.tools", controller: "HumanResourcesToolsLeaveAllocationToolController"});
	this.route("human_resources.tools.process_payroll", {path: "/human_resources/tools/process_payroll", title: "Process Payroll", parent: "human_resources.tools", controller: "HumanResourcesToolsProcessPayrollController"});
	this.route("human_resources.tools.upload_attendance", {path: "/human_resources/tools/upload_attendance", title: "Upload Attendance", parent: "human_resources.tools", controller: "HumanResourcesToolsUploadAttendanceController"});
	this.route("manufacturing", {path: "/manufacturing", controller: "ManufacturingController"});
	this.route("manufacturing.documents", {path: "/manufacturing/documents", title: "Documents", parent: "dashboard", controller: "ManufacturingDocumentsController"});
	this.route("manufacturing.documents.bill_of_material", {path: "/manufacturing/documents/bill_of_material", title: "Bill of Material", parent: "manufacturing.documents", controller: "ManufacturingDocumentsBillOfMaterialController"});
	this.route("manufacturing.documents.bill_of_material.details", {path: "/manufacturing/documents/bill_of_material/details/:bomId", title: "Details", parent: "manufacturing.documents.bill_of_material", controller: "BomDetailsController"});
	this.route("manufacturing.documents.bill_of_material.edit", {path: "/manufacturing/documents/bill_of_material/edit/:bomId", title: "Edit", parent: "manufacturing.documents.bill_of_material", controller: "BomEditController"});
	this.route("manufacturing.documents.bill_of_material.insert", {path: "/manufacturing/documents/bill_of_material/insert", title: "New", parent: "manufacturing.documents.bill_of_material", controller: "BomInsertController"});
	this.route("manufacturing.documents.operation", {path: "/manufacturing/documents/operation", title: "Operation", parent: "manufacturing.documents", controller: "ManufacturingDocumentsOperationController"});
	this.route("manufacturing.documents.operation.details", {path: "/manufacturing/documents/operation/details/:operationId", title: "Details", parent: "manufacturing.documents.operation", controller: "OperationDetailsController"});
	this.route("manufacturing.documents.operation.edit", {path: "/manufacturing/documents/operation/edit/:operationId", title: "Edit", parent: "manufacturing.documents.operation", controller: "OperationEditController"});
	this.route("manufacturing.documents.operation.insert", {path: "/manufacturing/documents/operation/insert", title: "New", parent: "manufacturing.documents.operation", controller: "OperationInsertController"});
	this.route("manufacturing.documents.production_order", {path: "/manufacturing/documents/production_order", title: "Production Order", parent: "manufacturing.documents", controller: "ManufacturingDocumentsProductionOrderController"});
	this.route("manufacturing.documents.production_order.details", {path: "/manufacturing/documents/production_order/details/:productionOrderId", title: "Details", parent: "manufacturing.documents.production_order", controller: "ProductionOrderDetailsController"});
	this.route("manufacturing.documents.production_order.edit", {path: "/manufacturing/documents/production_order/edit/:productionOrderId", title: "Edit", parent: "manufacturing.documents.production_order", controller: "ProductionOrderEditController"});
	this.route("manufacturing.documents.production_order.insert", {path: "/manufacturing/documents/production_order/insert", title: "New", parent: "manufacturing.documents.production_order", controller: "ProductionOrderInsertController"});
	this.route("manufacturing.documents.workstation", {path: "/manufacturing/documents/workstation", title: "Workstation", parent: "manufacturing.documents", controller: "ManufacturingDocumentsWorkstationController"});
	this.route("manufacturing.documents.workstation.details", {path: "/manufacturing/documents/workstation/details/:workstationId", title: "Details", parent: "manufacturing.documents.workstation", controller: "WorkstationDetailsController"});
	this.route("manufacturing.documents.workstation.edit", {path: "/manufacturing/documents/workstation/edit/:workstationId", title: "Edit", parent: "manufacturing.documents.workstation", controller: "WorkstationEditController"});
	this.route("manufacturing.documents.workstation.insert", {path: "/manufacturing/documents/workstation/insert", title: "New", parent: "manufacturing.documents.workstation", controller: "WorkstationInsertController"});
	this.route("manufacturing.help", {path: "/manufacturing/help", title: "Help", parent: "dashboard", controller: "ManufacturingHelpController"});
	this.route("manufacturing.help.bill_of_materials", {path: "/manufacturing/help/bill_of_materials", title: "Bill of Materials", parent: "manufacturing.help", controller: "ManufacturingHelpBillOfMaterialsController"});
	this.route("manufacturing.setup", {path: "/manufacturing/setup", title: "Setup", parent: "dashboard", controller: "ManufacturingSetupController"});
	this.route("manufacturing.setup.manufacturing_settings", {path: "/manufacturing/setup/manufacturing_settings", title: "Manufacturing Settings", parent: "manufacturing.setup", controller: "ManufacturingSetupManufacturingSettingsController"});
	this.route("manufacturing.standard_reports", {path: "/manufacturing/standard_reports", title: "Standard Reports", parent: "dashboard", controller: "ManufacturingStandardReportsController"});
	this.route("manufacturing.standard_reports.bom_search", {path: "/manufacturing/standard_reports/bom_search", title: "BOM Search", parent: "manufacturing.standard_reports", controller: "ManufacturingStandardReportsBomSearchController"});
	this.route("manufacturing.standard_reports.completed_production_orders", {path: "/manufacturing/standard_reports/completed_production_orders", title: "Completed Production Orders", parent: "manufacturing.standard_reports", controller: "ManufacturingStandardReportsCompletedProductionOrdersController"});
	this.route("manufacturing.standard_reports.issued_items_against_production_order", {path: "/manufacturing/standard_reports/issued_items_against_production_order", title: "Issued Items Against Production Order", parent: "manufacturing.standard_reports", controller: "ManufacturingStandardReportsIssuedItemsAgainstProductionOrderController"});
	this.route("manufacturing.standard_reports.open_production_orders", {path: "/manufacturing/standard_reports/open_production_orders", title: "Open Production Orders", parent: "manufacturing.standard_reports", controller: "ManufacturingStandardReportsOpenProductionOrdersController"});
	this.route("manufacturing.standard_reports.production_orders_in_progress", {path: "/manufacturing/standard_reports/production_orders_in_progress", title: "Production Orders in Progress", parent: "manufacturing.standard_reports", controller: "ManufacturingStandardReportsProductionOrdersInProgressController"});
	this.route("manufacturing.tools", {path: "/manufacturing/tools", title: "Tools", parent: "dashboard", controller: "ManufacturingToolsController"});
	this.route("manufacturing.tools.bom_browser", {path: "/manufacturing/tools/bom_browser", title: "BOM Browser", parent: "manufacturing.tools", controller: "ManufacturingToolsBomBrowserController"});
	this.route("manufacturing.tools.bom_replace_tool", {path: "/manufacturing/tools/bom_replace_tool", title: "BOM Replace Tool", parent: "manufacturing.tools", controller: "ManufacturingToolsBomReplaceToolController"});
	this.route("manufacturing.tools.production_planning_tool", {path: "/manufacturing/tools/production_planning_tool", title: "Production Planning Tool", parent: "manufacturing.tools", controller: "ManufacturingToolsProductionPlanningToolController"});
	this.route("pos", {path: "/pos", title: "Point of Sale", parent: "dashboard", controller: "PosController"});
	this.route("pos.start", {path: "/pos/start", title: "Start", parent: "pos", controller: "PosStartController"});
	this.route("pos.new", {path: "/pos/new", title: "New", parent: "pos", controller: "PosNewController"});
	this.route("projects", {path: "/projects", controller: "ProjectsController"});
	this.route("projects.documents", {path: "/projects/documents", title: "Documents", parent: "dashboard", controller: "ProjectsDocumentsController"});
	this.route("projects.documents.activity_cost", {path: "/projects/documents/activity_cost", title: "Activity Cost", parent: "projects.documents", controller: "ProjectsDocumentsActivityCostController"});
	this.route("projects.documents.activity_cost.details", {path: "/projects/documents/activity_cost/details/:activityCostId", title: "Details", parent: "projects.documents.activity_cost", controller: "ActivityCostDetailsController"});
	this.route("projects.documents.activity_cost.edit", {path: "/projects/documents/activity_cost/edit/:activityCostId", title: "Edit", parent: "projects.documents.activity_cost", controller: "ActivityCostEditController"});
	this.route("projects.documents.activity_cost.insert", {path: "/projects/documents/activity_cost/insert", title: "New", parent: "projects.documents.activity_cost", controller: "ActivityCostInsertController"});
	this.route("projects.documents.activity_type", {path: "/projects/documents/activity_type", title: "Activity Type", parent: "projects.documents", controller: "ProjectsDocumentsActivityTypeController"});
	this.route("projects.documents.activity_type.details", {path: "/projects/documents/activity_type/details/:activityTypeId", title: "Details", parent: "projects.documents.activity_type", controller: "ActivityTypeDetailsController"});
	this.route("projects.documents.activity_type.edit", {path: "/projects/documents/activity_type/edit/:activityTypeId", title: "Edit", parent: "projects.documents.activity_type", controller: "ActivityTypeEditController"});
	this.route("projects.documents.activity_type.insert", {path: "/projects/documents/activity_type/insert", title: "New", parent: "projects.documents.activity_type", controller: "ActivityTypeInsertController"});
	this.route("projects.documents.project", {path: "/projects/documents/project", title: "Project", parent: "projects.documents", controller: "ProjectsDocumentsProjectController"});
	this.route("projects.documents.project.details", {path: "/projects/documents/project/details/:projectId", title: "Details", parent: "projects.documents.project", controller: "ProjectDetailsController"});
	this.route("projects.documents.project.edit", {path: "/projects/documents/project/edit/:projectId", title: "Edit", parent: "projects.documents.project", controller: "ProjectEditController"});
	this.route("projects.documents.project.insert", {path: "/projects/documents/project/insert", title: "New", parent: "projects.documents.project", controller: "ProjectInsertController"});
	this.route("projects.documents.task", {path: "/projects/documents/task", title: "Task", parent: "projects.documents", controller: "ProjectsDocumentsTaskController"});
	this.route("projects.documents.task.details", {path: "/projects/documents/task/details/:taskId", title: "Details", parent: "projects.documents.task", controller: "TaskDetailsController"});
	this.route("projects.documents.task.edit", {path: "/projects/documents/task/edit/:taskId", title: "Edit", parent: "projects.documents.task", controller: "TaskEditController"});
	this.route("projects.documents.task.insert", {path: "/projects/documents/task/insert", title: "Insert", parent: "projects.documents.task", controller: "TaskInsertController"});
	this.route("projects.documents.time_log", {path: "/projects/documents/time_log", title: "Time Log", parent: "projects.documents", controller: "ProjectsDocumentsTimeLogController"});
	this.route("projects.documents.time_log.details", {path: "/projects/documents/time_log/details/:timeLogId", title: "Details", parent: "projects.documents.time_log", controller: "TimeLogDetailsController"});
	this.route("projects.documents.time_log.edit", {path: "/projects/documents/time_log/edit/:timeLogId", title: "Edit", parent: "projects.documents.time_log", controller: "TimeLogEditController"});
	this.route("projects.documents.time_log.insert", {path: "/projects/documents/time_log/insert", title: "New", parent: "projects.documents.time_log", controller: "TimeLogInsertController"});
	this.route("projects.documents.time_log_batch", {path: "/projects/documents/time_log_batch", title: "Time Log Batch", parent: "projects.documents", controller: "ProjectsDocumentsTimeLogBatchController"});
	this.route("projects.documents.time_log_batch.details", {path: "/projects/documents/time_log_batch/details/:timeLogBatchId", title: "Details", parent: "projects.documents.time_log_batch", controller: "TimeLogBatchDetailsController"});
	this.route("projects.documents.time_log_batch.edit", {path: "/projects/documents/time_log_batch/edit/:timeLogBatchId", title: "Edit", parent: "projects.documents.time_log_batch", controller: "TimeLogBatchEditController"});
	this.route("projects.documents.time_log_batch.insert", {path: "/projects/documents/time_log_batch/insert", title: "New", parent: "projects.documents.time_log_batch", controller: "TimeLogBatchInsertController"});
	this.route("projects.standard_reports", {path: "/projects/standard_reports", title: "Standard Reports", parent: "dashboard", controller: "ProjectsStandardReportsController"});
	this.route("projects.standard_reports.daily_time_log_summary", {path: "/projects/standard_reports/daily_time_log_summary", title: "Daily Time Log Summary", parent: "projects.standard_reports", controller: "ProjectsStandardReportsDailyTimeLogSummaryController"});
	this.route("projects.standard_reports.project_wise_stock_tracking", {path: "/projects/standard_reports/project_wise_stock_tracking", title: "Project-wise Stock Tracking", parent: "projects.standard_reports", controller: "ProjectsStandardReportsProjectWiseStockTrackingController"});
	this.route("projects.tools", {path: "/projects/tools", title: "Tools", parent: "dashboard", controller: "ProjectsToolsController"});
	this.route("projects.tools.gantt_chart", {path: "/projects/tools/gantt_chart", title: "Gantt Chart", parent: "projects.tools", controller: "ProjectsToolsGanttChartController"});
	this.route("purchasing", {path: "/purchasing", controller: "PurchasingController"});
	this.route("purchasing.documents", {path: "/purchasing/documents", title: "Documents", parent: "dashboard", controller: "PurchasingDocumentsController"});
	this.route("purchasing.documents.address", {path: "/purchasing/documents/address", title: "Address", parent: "purchasing.documents", controller: "PurchasingDocumentsAddressController"});
	this.route("purchasing.documents.address.details", {path: "/purchasing/documents/address/details/:addressId", title: "Details", parent: "purchasing.documents.address", controller: "AddressDetailsController"});
	this.route("purchasing.documents.address.edit", {path: "/purchasing/documents/address/edit/:addressId", title: "Edit", parent: "purchasing.documents.address", controller: "AddressEditController"});
	this.route("purchasing.documents.address.insert", {path: "/purchasing/documents/address/insert", title: "New", parent: "purchasing.documents.address", controller: "AddressInsertController"});
	this.route("purchasing.documents.material_request", {path: "/purchasing/documents/material_request", title: "Material Request", parent: "purchasing.documents", controller: "PurchasingDocumentsMaterialRequestController"});
	this.route("purchasing.documents.material_request.details", {path: "/purchasing/documents/material_request/details/:materialRequestId", title: "Details", parent: "purchasing.documents.material_request", controller: "MaterialRequestDetailsController"});
	this.route("purchasing.documents.material_request.edit", {path: "/purchasing/documents/material_request/edit/:materialRequestId", title: "Edit", parent: "purchasing.documents.material_request", controller: "MaterialRequestEditController"});
	this.route("purchasing.documents.material_request.insert", {path: "/purchasing/documents/material_request/insert", title: "New", parent: "purchasing.documents.material_request", controller: "MaterialRequestInsertController"});
	this.route("purchasing.documents.purchase_order", {path: "/purchasing/documents/purchase_order", title: "Purchase Order", parent: "purchasing.documents", controller: "PurchasingDocumentsPurchaseOrderController"});
	this.route("purchasing.documents.purchase_order.details", {path: "/purchasing/documents/purchase_order/details/:purchaseOrderId", title: "Details", parent: "purchasing.documents.purchase_order", controller: "PurchaseOrderDetailsController"});
	this.route("purchasing.documents.purchase_order.edit", {path: "/purchasing/documents/purchase_order/edit/:purchaseOrderId", title: "Edit", parent: "purchasing.documents.purchase_order", controller: "PurchaseOrderEditController"});
	this.route("purchasing.documents.purchase_order.insert", {path: "/purchasing/documents/purchase_order/insert", title: "New", parent: "purchasing.documents.purchase_order", controller: "PurchaseOrderInsertController"});
	this.route("purchasing.documents.supplier_quotation", {path: "/purchasing/documents/supplier_quotation", title: "Supplier Quotation", parent: "purchasing.documents", controller: "PurchasingDocumentsSupplierQuotationController"});
	this.route("purchasing.documents.supplier_quotation.details", {path: "/purchasing/documents/supplier_quotation/details/:supplierQuotationId", title: "Details", parent: "purchasing.documents.supplier_quotation", controller: "SupplierQuotationDetailsController"});
	this.route("purchasing.documents.supplier_quotation.edit", {path: "/purchasing/documents/supplier_quotation/edit/:supplierQuotationId", title: "Edit", parent: "purchasing.documents.supplier_quotation", controller: "SupplierQuotationEditController"});
	this.route("purchasing.documents.supplier_quotation.insert", {path: "/purchasing/documents/supplier_quotation/insert", title: "New", parent: "purchasing.documents.supplier_quotation", controller: "SupplierQuotationInsertController"});
	this.route("purchasing.help", {path: "/purchasing/help", title: "Help", parent: "dashboard", controller: "PurchasingHelpController"});
	this.route("purchasing.help.customer_and_supplier", {path: "/purchasing/help/customer_and_supplier", title: "Customer and Supplier", parent: "purchasing.help", controller: "PurchasingHelpCustomerAndSupplierController"});
	this.route("purchasing.main_reports", {path: "/purchasing/main_reports", title: "Main Reports", parent: "dashboard", controller: "PurchasingMainReportsController"});
	this.route("purchasing.main_reports.purchase_analytics", {path: "/purchasing/main_reports/purchase_analytics", title: "Purchase Analytics", parent: "purchasing.main_reports", controller: "PurchasingMainReportsPurchaseAnalyticsController"});
	this.route("purchasing.setup", {path: "/purchasing/setup", title: "Setup", parent: "dashboard", controller: "PurchasingSetupController"});
	this.route("purchasing.standard_reports", {path: "/purchasing/standard_reports", title: "Standard Reports", parent: "dashboard", controller: "PurchasingStandardReportsController"});
	this.route("purchasing.standard_reports.item_wise_purchase_history", {path: "/purchasing/standard_reports/item_wise_purchase_history", title: "Item-wise Purchase History", parent: "purchasing.standard_reports", controller: "PurchasingStandardReportsItemWisePurchaseHistoryController"});
	this.route("purchasing.standard_reports.items_to_be_requested", {path: "/purchasing/standard_reports/items_to_be_requested", title: "Items to be Requested", parent: "purchasing.standard_reports", controller: "PurchasingStandardReportsItemsToBeRequestedController"});
	this.route("purchasing.standard_reports.material_requests_for_which_supplier_quotations_are_not_created", {path: "/purchasing/standard_reports/material_requests_for_which_supplier_quotations_are_not_created", title: "Material Requests where Supplier Quotations not Created", parent: "purchasing.standard_reports", controller: "PurchasingStandardReportsMaterialRequestsForWhichSupplierQuotationsAreNotCreatedController"});
	this.route("purchasing.standard_reports.purchase_order_trends", {path: "/purchasing/standard_reports/purchase_order_trends", title: "Purchase Order Trends", parent: "purchasing.standard_reports", controller: "PurchasingStandardReportsPurchaseOrderTrendsController"});
	this.route("purchasing.standard_reports.requested_items_to_be_ordered", {path: "/purchasing/standard_reports/requested_items_to_be_ordered", title: "Requested Items to be Ordered", parent: "purchasing.standard_reports", controller: "PurchasingStandardReportsRequestedItemsToBeOrderedController"});
	this.route("purchasing.standard_reports.supplier_addresses_and_contacts", {path: "/purchasing/standard_reports/supplier_addresses_and_contacts", title: "Supplier Addresses and Contacts", parent: "purchasing.standard_reports", controller: "PurchasingStandardReportsSupplierAddressesAndContactsController"});
	this.route("purchasing.standard_reports.supplier_wise_sales_analytics", {path: "/purchasing/standard_reports/supplier_wise_sales_analytics", title: "Supplier-wise Sales Analytics", parent: "purchasing.standard_reports", controller: "PurchasingStandardReportsSupplierWiseSalesAnalyticsController"});
	this.route("selling", {path: "/selling", controller: "SellingController"});
	this.route("selling.documents", {path: "/selling/documents", title: "Documents", parent: "dashboard", controller: "SellingDocumentsController"});
	this.route("selling.documents.quotation", {path: "/selling/documents/quotation", title: "Quotation", parent: "selling.documents", controller: "SellingDocumentsQuotationController"});
	this.route("selling.documents.quotation.details", {path: "/selling/documents/quotation/details/:quotationId", title: "Details", parent: "selling.documents.quotation", controller: "QuotationDetailsController"});
	this.route("selling.documents.quotation.edit", 	{path: "/selling/documents/quotation/edit/:quotationId", title: "Edit", parent: "selling.documents.quotation", controller: "QuotationEditController"});
	this.route("selling.documents.quotation.insert", {path: "/selling/documents/quotation/insert", title: "New", parent: "selling.documents.quotation", controller: "QuotationInsertController"});
	this.route("selling.documents.sales_order", {path: "/selling/documents/sales_order", title: "Sales Order", parent: "selling.documents", controller: "SellingDocumentsSalesOrderController"});
	this.route("selling.documents.sales_order.details", {path: "/selling/documents/sales_order/details/:salesOrderId", title: "Details", parent: "selling.documents.sales_order", controller: "SalesOrderDetailsController"});
	this.route("selling.documents.sales_order.edit", {path: "/selling/documents/sales_order/edit/:salesOrderId", title: "Edit", parent: "selling.documents.sales_order", controller: "SalesOrderEditController"});
	this.route("selling.documents.sales_order.insert", {path: "/selling/documents/sales_order/insert", title: "New", parent: "selling.documents.sales_order", controller: "SalesOrderInsertController"});
	this.route("selling.help", {path: "/selling/help", title: "Help", parent: "dashboard", controller: "SellingHelpController"});
	this.route("selling.help.customer_and_supplier", {path: "/selling/help/customer_and_supplier", title: "Customer and Supplier", parent: "selling.help", controller: "SellingHelpCustomerAndSupplierController"});
	this.route("selling.main_reports", {path: "/selling/main_reports", title: "Main Reports", parent: "dashboard", controller: "SellingMainReportsController"});
	this.route("selling.main_reports.customer_acquisition_and_loyalty", {path: "/selling/main_reports/customer_acquisition_and_loyalty", title: "Customer Acquisition and Loyalty", parent: "selling.main_reports", controller: "SellingMainReportsCustomerAcquisitionAndLoyaltyController"});
	this.route("selling.main_reports.sales_analytics", {path: "/selling/main_reports/sales_analytics", title: "Sales Analytics", parent: "selling.main_reports", controller: "SellingMainReportsSalesAnalyticsController"});
	this.route("selling.main_reports.sales_funnel", {path: "/selling/main_reports/sales_funnel", title: "Sales Funnel", parent: "selling.main_reports", controller: "SellingMainReportsSalesFunnelController"});
	this.route("selling.setup", {path: "/selling/setup", title: "Setup", parent: "dashboard", controller: "SellingSetupController"});
	this.route("selling.standard_reports", {path: "/selling/standard_reports", title: "Standard Reports", parent: "dashboard", controller: "SellingStandardReportsController"});
	this.route("selling.standard_reports.available_stock_for_packing_items", {path: "/selling/standard_reports/available_stock_for_packing_items", title: "Available Stock for Packing Items", parent: "selling.standard_reports", controller: "SellingStandardReportsAvailableStockForPackingItemsController"});
	this.route("selling.standard_reports.bom_search", {path: "/selling/standard_reports/bom_search", title: "BOM Search", parent: "selling.standard_reports", controller: "SellingStandardReportsBomSearchController"});
	this.route("selling.standard_reports.customer_addresses_and_contacts", {path: "/selling/standard_reports/customer_addresses_and_contacts", title: "Customer Addresses and Contacts", parent: "selling.standard_reports", controller: "SellingStandardReportsCustomerAddressesAndContactsController"});
	this.route("selling.standard_reports.customer_credit_balance", {path: "/selling/standard_reports/customer_credit_balance", title: "Customer Credit Balance", parent: "selling.standard_reports", controller: "SellingStandardReportsCustomerCreditBalanceController"});
	this.route("selling.standard_reports.customers_not_buying_for_long_time", {path: "/selling/standard_reports/customers_not_buying_for_long_time", title: "Customers Not Buying", parent: "selling.standard_reports", controller: "SellingStandardReportsCustomersNotBuyingForLongTimeController"});
	this.route("selling.standard_reports.item_wise_sales_history", {path: "/selling/standard_reports/item_wise_sales_history", title: "Item-wise Sales History", parent: "selling.standard_reports", controller: "SellingStandardReportsItemWiseSalesHistoryController"});
	this.route("selling.standard_reports.lead_details", {path: "/selling/standard_reports/lead_details", title: "Lead Details", parent: "selling.standard_reports", controller: "SellingStandardReportsLeadDetailsController"});
	this.route("selling.standard_reports.ordered_items_to_be_delivered", {path: "/selling/standard_reports/ordered_items_to_be_delivered", title: "Ordered Items to be Delivered", parent: "selling.standard_reports", controller: "SellingStandardReportsOrderedItemsToBeDeliveredController"});
	this.route("selling.standard_reports.pending_so_items_for_purchase_request", {path: "/selling/standard_reports/pending_so_items_for_purchase_request", title: "Pending SO Items for Purchase Request", parent: "selling.standard_reports", controller: "SellingStandardReportsPendingSoItemsForPurchaseRequestController"});
	this.route("selling.standard_reports.quotation_trends", {path: "/selling/standard_reports/quotation_trends", title: "Quotation Trends", parent: "selling.standard_reports", controller: "SellingStandardReportsQuotationTrendsController"});
	this.route("selling.standard_reports.sales_order_trends", {path: "/selling/standard_reports/sales_order_trends", title: "Sales Order Trends", parent: "selling.standard_reports", controller: "SellingStandardReportsSalesOrderTrendsController"});
	this.route("selling.standard_reports.sales_person_target_variance_item_group_wise", {path: "/selling/standard_reports/sales_person_target_variance_item_group_wise", title: "Sales Person Target Variance Item Group-wise", parent: "selling.standard_reports", controller: "SellingStandardReportsSalesPersonTargetVarianceItemGroupWiseController"});
	this.route("selling.standard_reports.sales_person_wise_transaction_summary", {path: "/selling/standard_reports/sales_person_wise_transaction_summary", title: "Sales Person-wise Transaction Summary", parent: "selling.standard_reports", controller: "SellingStandardReportsSalesPersonWiseTransactionSummaryController"});
	this.route("selling.standard_reports.territory_target_variance_item_group_wise", {path: "/selling/standard_reports/territory_target_variance_item_group_wise", title: "Territory Target Variance Item Group-wise", parent: "selling.standard_reports", controller: "SellingStandardReportsTerritoryTargetVarianceItemGroupWiseController"});
	this.route("selling.tools", {path: "/selling/tools", title: "Tools", parent: "dashboard", controller: "SellingToolsController"});
	this.route("setup", {path: "/setup", controller: "SetupController"});
	this.route("setup.accounts", {path: "/setup/accounts", title: "Accounting", parent: "dashboard", controller: "SetupAccountsController"});
	this.route("setup.accounts.accounts_settings", {path: "/setup/accounts/accounts_settings",  title: "Accounts Settings", parent: "setup.accounts",controller: "SetupAccountsAccountsSettingsController"});
	this.route("setup.accounts.chart_of_accounts", {path: "/setup/accounts/chart_of_accounts", title: "Chart of Accounts", parent: "setup.accounts", controller: "SetupAccountsChartOfAccountsController"});
	this.route("setup.accounts.chart_of_cost_centers", {path: "/setup/accounts/chart_of_cost_centers", title: "Chart of Cost Centers", parent: "setup.accounts", controller: "SetupAccountsChartOfCostCentersController"});
	this.route("setup.accounts.company", {path: "/setup/accounts/company", title: "Company", parent: "setup.accounts", controller: "SetupAccountsCompanyController"});
	this.route("setup.accounts.company.details", {path: "/setup/accounts/company/details/:companyId", title: "Details", parent: "setup.accounts.company", controller: "CompanyDetailsController"});
	this.route("setup.accounts.company.edit", {path: "/setup/accounts/company/edit/:companyId", title: "Edit", parent: "setup.accounts.company", controller: "CompanyEditController"});
	this.route("setup.accounts.company.insert", {path: "/setup/accounts/company/insert", title: "New", parent: "setup.accounts.company", controller: "CompanyInsertController"});
	this.route("setup.accounts.currency", {path: "/setup/accounts/currency", title: "Currency", parent: "setup.accounts", controller: "SetupAccountsCurrencyController"});
	this.route("setup.accounts.currency.details", {path: "/setup/accounts/currency/details/:currencyId", title: "Details", parent: "setup.accounts.currency", controller: "CurrencyDetailsController"});
	this.route("setup.accounts.currency.edit", {path: "/setup/accounts/currency/edit/:currencyId", title: "Edit", parent: "setup.accounts.currency", controller: "CurrencyEditController"});
	this.route("setup.accounts.currency.insert", {path: "/setup/accounts/currency/insert", title: "New", parent: "setup.accounts.currency", controller: "CurrencyInsertController"});
	this.route("setup.accounts.currency_exchange", {path: "/setup/accounts/currency_exchange", title: "Currency Exchange", parent: "setup.accounts", controller: "SetupAccountsCurrencyExchangeController"});
	this.route("setup.accounts.currency_exchange.details", {path: "/setup/accounts/currency_exchange/details/:currencyExchangeId", title: "Details", parent: "setup.accounts.currency_exchange", controller: "CurrencyExchangeDetailsController"});
	this.route("setup.accounts.currency_exchange.edit", {path: "/setup/accounts/currency_exchange/edit/:currencyExchangeId", title: "Edit", parent: "setup.accounts.currency_exchange", controller: "CurrencyExchangeEditController"});
	this.route("setup.accounts.currency_exchange.insert", {path: "/setup/accounts/currency_exchange/insert", title: "New", parent: "setup.accounts.currency_exchange", controller: "CurrencyExchangeInsertController"});
	this.route("setup.accounts.fiscal_year", {path: "/setup/accounts/fiscal_year", title: "Fiscal Year", parent: "setup.accounts", controller: "SetupAccountsFiscalYearController"});
	this.route("setup.accounts.fiscal_year.details", {path: "/setup/accounts/fiscal_year/details/:fiscalYearId", title: "Details", parent: "setup.accounts.fiscal_year", controller: "FiscalYearDetailsController"});
	this.route("setup.accounts.fiscal_year.edit", {path: "/setup/accounts/fiscal_year/edit/:fiscalYearId", title: "Edit", parent: "setup.accounts.fiscal_year", controller: "FiscalYearEditController"});
	this.route("setup.accounts.fiscal_year.insert", {path: "/setup/accounts/fiscal_year/insert", title: "New", parent: "setup.accounts.fiscal_year", controller: "FiscalYearInsertController"});
	this.route("setup.accounts.mode_of_payment", {path: "/setup/accounts/mode_of_payment", title: "Mode of Payment", parent: "setup.accounts", controller: "SetupAccountsModeOfPaymentController"});
	this.route("setup.accounts.mode_of_payment.details", {path: "/setup/accounts/mode_of_payment/details/:modeOfPaymentId", title: "Details", parent: "setup.accounts.mode_of_payment", controller: "ModeOfPaymentDetailsController"});
	this.route("setup.accounts.mode_of_payment.edit", {path: "/setup/accounts/mode_of_payment/edit/:modeOfPaymentId", title: "Edit", parent: "setup.accounts.mode_of_payment", controller: "ModeOfPaymentEditController"});
	this.route("setup.accounts.mode_of_payment.insert", {path: "/setup/accounts/mode_of_payment/insert", title: "New", parent: "setup.accounts.mode_of_payment", controller: "ModeOfPaymentInsertController"});
	this.route("setup.accounts.monthly_distribution", {path: "/setup/accounts/monthly_distribution", title: "Monthly Distribution", parent: "setup.accounts", controller: "SetupAccountsMonthlyDistributionController"});
	this.route("setup.accounts.monthly_distribution.details", {path: "/setup/accounts/monthly_distribution/details/:monthlyDistributionId", title: "Details", parent: "setup.accounts.monthly_distribution", controller: "MonthlyDistributionDetailsController"});
	this.route("setup.accounts.monthly_distribution.edit", {path: "/setup/accounts/monthly_distribution/edit/:monthlyDistributionId", title: "Edit", parent: "setup.accounts.monthly_distribution", controller: "MonthlyDistributionEditController"});
	this.route("setup.accounts.monthly_distribution.insert", {path: "/setup/accounts/monthly_distribution/insert", title: "New", parent: "setup.accounts.monthly_distribution", controller: "MonthlyDistributionInsertController"});
	this.route("setup.accounts.point_of_sale_profile", {path: "/setup/accounts/point_of_sale_profile", title: "POS Profile", parent: "setup.accounts", controller: "SetupAccountsPointOfSaleProfileController"});
	this.route("setup.accounts.point_of_sale_profile.details", {path: "/setup/accounts/point_of_sale_profile/details/:posProfileId", title: "Details", parent: "setup.accounts.point_of_sale_profile", controller: "PosProfileDetailsController"});
	this.route("setup.accounts.point_of_sale_profile.edit", {path: "/setup/accounts/point_of_sale_profile/edit/:posProfileId", title: "Edit", parent: "setup.accounts.point_of_sale_profile", controller: "PosProfileEditController"});
	this.route("setup.accounts.point_of_sale_profile.insert", {path: "/setup/accounts/point_of_sale_profile/insert", title: "New", parent: "setup.accounts.point_of_sale_profile", controller: "PosProfileInsertController"});
	this.route("setup.accounts.pricing_rule", {path: "/setup/accounts/pricing_rule", title: "Pricing Rule", parent: "setup.accounts", controller: "SetupAccountsPricingRuleController"});
	this.route("setup.accounts.pricing_rule.details", {path: "/setup/accounts/pricing_rule/details/:pricingRuleId", title: "Details", parent: "setup.accounts.pricing_rule", controller: "PricingRuleDetailsController"});
	this.route("setup.accounts.pricing_rule.edit", {path: "/setup/accounts/pricing_rule/edit/:pricingRuleId", title: "Edit", parent: "setup.accounts.pricing_rule", controller: "PricingRuleEditController"});
	this.route("setup.accounts.pricing_rule.insert", {path: "/setup/accounts/pricing_rule/insert", title: "New", parent: "setup.accounts.pricing_rule", controller: "PricingRuleInsertController"});
	this.route("setup.accounts.purchase_taxes_and_charges_template", {path: "/setup/accounts/purchase_taxes_and_charges_template", title: "Purchase Taxes and Charges Template", parent: "setup.accounts", controller: "SetupAccountsPurchaseTaxesAndChargesTemplateController"});
	this.route("setup.accounts.purchase_taxes_and_charges_template.details", {path: "/setup/accounts/purchase_taxes_and_charges_template/details/:purchaseTaxesAndChargesTemplateId", title: "Details", parent: "setup.accounts.purchase_taxes_and_charges_template", controller: "PurchaseTaxesAndChargesTemplateDetailsController"});
	this.route("setup.accounts.purchase_taxes_and_charges_template.edit", {path: "/setup/accounts/purchase_taxes_and_charges_template/edit/:purchaseTaxesAndChargesTemplateId", title: "Edit", parent: "setup.accounts.purchase_taxes_and_charges_template", controller: "PurchaseTaxesAndChargesTemplateEditController"});
	this.route("setup.accounts.purchase_taxes_and_charges_template.insert", {path: "/setup/accounts/purchase_taxes_and_charges_template/insert", title: "New", parent: "setup.accounts.purchase_taxes_and_charges_template", controller: "PurchaseTaxesAndChargesTemplateInsertController"});
	this.route("setup.accounts.sales_taxes_and_charges_template", {path: "/setup/accounts/sales_taxes_and_charges_template", title: "Sales Taxes and Charges Template", parent: "setup.accounts", controller: "SetupAccountsSalesTaxesAndChargesTemplateController"});
	this.route("setup.accounts.sales_taxes_and_charges_template.details", {path: "/setup/accounts/sales_taxes_and_charges_template/details/:salesTaxesAndChargesTemplateId", title: "Details", parent: "setup.accounts.sales_taxes_and_charges_template", controller: "SalesTaxesAndChargesTemplateDetailsController"});
	this.route("setup.accounts.sales_taxes_and_charges_template.edit", {path: "/setup/accounts/sales_taxes_and_charges_template/edit/:salesTaxesAndChargesTemplateId", title: "Edit", parent: "setup.accounts.sales_taxes_and_charges_template", controller: "SalesTaxesAndChargesTemplateEditController"});
	this.route("setup.accounts.sales_taxes_and_charges_template.insert", {path: "/setup/accounts/sales_taxes_and_charges_template/insert", title: "New", parent: "setup.accounts.sales_taxes_and_charges_template", controller: "SalesTaxesAndChargesTemplateInsertController"});
	this.route("setup.accounts.shipping_rule", {path: "/setup/accounts/shipping_rule", title: "Shipping Rule", parent: "setup.accounts", controller: "SetupAccountsShippingRuleController"});
	this.route("setup.accounts.shipping_rule.details", {path: "/setup/accounts/shipping_rule/details/:shippingRuleId", title: "Details", parent: "setup.accounts.shipping_rule", controller: "ShippingRuleDetailsController"});
	this.route("setup.accounts.shipping_rule.edit", {path: "/setup/accounts/shipping_rule/edit/:shippingRuleId", title: "Edit", parent: "setup.accounts.shipping_rule", controller: "ShippingRuleEditController"});
	this.route("setup.accounts.shipping_rule.insert", {path: "/setup/accounts/shipping_rule/insert", title: "New", parent: "setup.accounts.shipping_rule", controller: "ShippingRuleInsertController"});
	this.route("setup.accounts.tax_rule", {path: "/setup/accounts/tax_rule", title: "Tax Rule", parent: "setup.accounts", controller: "SetupAccountsTaxRuleController"});
	this.route("setup.accounts.tax_rule.details", {path: "/setup/accounts/tax_rule/details/:taxRuleId", title: "Details", parent: "setup.accounts.tax_rule", controller: "TaxRuleDetailsController"});
	this.route("setup.accounts.tax_rule.edit", {path: "/setup/accounts/tax_rule/edit/:taxRuleId", title: "Edit", parent: "setup.accounts.tax_rule", controller: "TaxRuleEditController"});
	this.route("setup.accounts.tax_rule.insert", {path: "/setup/accounts/tax_rule/insert", title: "New", parent: "setup.accounts.tax_rule", controller: "TaxRuleInsertController"});
	this.route("setup.customize", {path: "/setup/customize", title: "Customize", parent: "dashboard", controller: "SetupCustomizeController"});
	this.route("setup.customize.authorization_rule", {path: "/setup/customize/authorization_rule", title: "Authorization Rule", parent: "setup.customize", controller: "SetupCustomizeAuthorizationRuleController"});
	this.route("setup.customize.authorization_rule.details", {path: "/setup/customize/authorization_rule/details/:authorizationRuleId", title: "Details", parent: "setup.customize.authorization_rule", controller: "AuthorizationRuleDetailsController"});
	this.route("setup.customize.authorization_rule.edit", {path: "/setup/customize/authorization_rule/edit/:authorizationRuleId", title: "Edit", parent: "setup.customize.authorization_rule", controller: "AuthorizationRuleEditController"});
	this.route("setup.customize.authorization_rule.insert", {path: "/setup/customize/authorization_rule/insert", title: "New", parent: "setup.customize.authorization_rule", controller: "AuthorizationRuleInsertController"});
	this.route("setup.customize.custom_field", {path: "/setup/customize/custom_field", title: "Custom Field", parent: "setup.customize", controller: "SetupCustomizeCustomFieldController"});
	this.route("setup.customize.custom_field.details", {path: "/setup/customize/custom_field/details/:customFieldId", title: "Details", parent: "setup.customize.custom_field", controller: "CustomFieldDetailsController"});
	this.route("setup.customize.custom_field.edit", {path: "/setup/customize/custom_field/edit/:customFieldId", title: "Edit", parent: "setup.customize.custom_field", controller: "CustomFieldEditController"});
	this.route("setup.customize.custom_field.insert", {path: "/setup/customize/custom_field/insert", title: "New", parent: "setup.customize.custom_field", controller: "CustomFieldInsertController"});
	this.route("setup.customize.custom_script", {path: "/setup/customize/custom_script", title: "Custom Script", parent: "setup.customize", controller: "SetupCustomizeCustomScriptController"});
	this.route("setup.customize.custom_script.details", {path: "/setup/customize/custom_script/details/:customScriptId", title: "Details", parent: "setup.customize.custom_script", controller: "CustomScriptDetailsController"});
	this.route("setup.customize.custom_script.edit", {path: "/setup/customize/custom_script/edit/:customScriptId", title: "Edit", parent: "setup.customize.custom_script", controller: "CustomScriptEditController"});
	this.route("setup.customize.custom_script.insert", {path: "/setup/customize/custom_script/insert", title: "New", parent: "setup.customize.custom_script", controller: "CustomScriptInsertController"});
	this.route("setup.customize.customize_form", {path: "/setup/customize/customize_form", title: "Customize Form", parent: "setup.customize", controller: "SetupCustomizeCustomizeFormController"});
	this.route("setup.customize.doctype", {path: "/setup/customize/doctype", title: "Doctype", parent: "setup.customize", controller: "SetupCustomizeDoctypeController"});
	this.route("setup.customize.doctype.details", {path: "/setup/customize/doctype/details/:doctypeId", title: "Details", parent: "setup.customize.doctype", controller: "DoctypeDetailsController"});
	this.route("setup.customize.doctype.edit", {path: "/setup/customize/doctype/edit/:doctypeId", title: "Edit", parent: "setup.customize.doctype", controller: "DoctypeEditController"});
	this.route("setup.customize.doctype.insert", {path: "/setup/customize/doctype/insert", title: "New", parent: "setup.customize.doctype", controller: "DoctypeInsertController"});
	this.route("setup.customize.doctype.doctypes.about_us_settings", {path: "/setup/customize/doctype/doctypes/about_us_settings/:doctypeId", title: "About Us Settings", parent: "setup.customize.doctype", controller: "DoctypesAboutUsSettingsController"});
	this.route("setup.customize.doctype.doctypes.about_us_team_member", {path: "/setup/customize/doctype/doctypes/about_us_team_member/:doctypeId", title: "About Us Team Member", parent: "setup.customize.doctype", controller: "DoctypesAboutUsTeamMemberController"});
	this.route("setup.customize.doctype.doctypes.account", {path: "/setup/customize/doctype/doctypes/account/:doctypeId", title: "Account", parent: "setup.customize.doctype", controller: "DoctypesAccountController"});
	this.route("setup.customize.doctype.doctypes.accounts_settings", {path: "/setup/customize/doctype/doctypes/accounts_settings/:doctypeId", title: "Accounts Settings", parent: "setup.customize.doctype", controller: "DoctypesAccountsSettingsController"});
	this.route("setup.customize.doctype.doctypes.activity_cost", {path: "/setup/customize/doctype/doctypes/activity_cost/:doctypeId", title: "Activity Cost", parent: "setup.customize.doctype", controller: "DoctypesActivityCostController"});
	this.route("setup.customize.doctype.doctypes.activity_type", {path: "/setup/customize/doctype/doctypes/activity_type/:doctypeId", title: "Activity Type", parent: "setup.customize.doctype", controller: "DoctypesActivityTypeController"});
	this.route("setup.customize.doctype.doctypes.address", {path: "/setup/customize/doctype/doctypes/address/:doctypeId", title: "Address", parent: "setup.customize.doctype", controller: "DoctypesAddressController"});
	this.route("setup.customize.doctype.doctypes.address_template", {path: "/setup/customize/doctype/doctypes/address_template/:doctypeId", title: "Address Template", parent: "setup.customize.doctype", controller: "DoctypesAddressTemplateController"});
	this.route("setup.customize.doctype.doctypes.appraisal", {path: "/setup/customize/doctype/doctypes/appraisal/:doctypeId", title: "Appraisal", parent: "setup.customize.doctype", controller: "DoctypesAppraisalController"});
	this.route("setup.customize.doctype.doctypes.appraisal_goal", {path: "/setup/customize/doctype/doctypes/appraisal_goal/:doctypeId", title: "Appraisal Goal", parent: "setup.customize.doctype", controller: "DoctypesAppraisalGoalController"});
	this.route("setup.customize.doctype.doctypes.appraisal_template", {path: "/setup/customize/doctype/doctypes/appraisal_template/:doctypeId", title: "Appraisal Template", parent: "setup.customize.doctype", controller: "DoctypesAppraisalTemplateController"});
	this.route("setup.customize.doctype.doctypes.appraisal_template_goal", {path: "/setup/customize/doctype/doctypes/appraisal_template_goal/:doctypeId", title: "Appraisal Template Goal", parent: "setup.customize.doctype", controller: "DoctypesAppraisalTemplateGoalController"});
	this.route("setup.customize.doctype.doctypes.async_task", {path: "/setup/customize/doctype/doctypes/async_task/:doctypeId", title: "Async Task", parent: "setup.customize.doctype", controller: "DoctypesAsyncTaskController"});
	this.route("setup.customize.doctype.doctypes.attendance", {path: "/setup/customize/doctype/doctypes/attendance/:doctypeId", title: "Attendance", parent: "setup.customize.doctype", controller: "DoctypesAttendanceController"});
	this.route("setup.customize.doctype.doctypes.authorization_control", {path: "/setup/customize/doctype/doctypes/authorization_control/:doctypeId", title: "Authorization Control", parent: "setup.customize.doctype", controller: "DoctypesAuthorizationControlController"});
	this.route("setup.customize.doctype.doctypes.authorization_rule", {path: "/setup/customize/doctype/doctypes/authorization_rule/:doctypeId", title: "Authorization Rule", parent: "setup.customize.doctype", controller: "DoctypesAuthorizationRuleController"});
	this.route("setup.customize.doctype.doctypes.bank_reconciliation", {path: "/setup/customize/doctype/doctypes/bank_reconciliation/:doctypeId", title: "Bank Reconciliation", parent: "setup.customize.doctype", controller: "DoctypesBankReconciliationController"});
	this.route("setup.customize.doctype.doctypes.bank_reconciliation_detail", {path: "/setup/customize/doctype/doctypes/bank_reconciliation_detail/:doctypeId", title: "Bank Reconciliation Detail", parent: "setup.customize.doctype", controller: "DoctypesBankReconciliationDetailController"});
	this.route("setup.customize.doctype.doctypes.batch", {path: "/setup/customize/doctype/doctypes/batch/:doctypeId", title: "Batch", parent: "setup.customize.doctype", controller: "DoctypesBatchController"});
	this.route("setup.customize.doctype.doctypes.bin", {path: "/setup/customize/doctype/doctypes/bin/:doctypeId", title: "Bin", parent: "setup.customize.doctype", controller: "DoctypesBinController"});
	this.route("setup.customize.doctype.doctypes.block_module", {path: "/setup/customize/doctype/doctypes/block_module/:doctypeId", title: "Block Module", parent: "setup.customize.doctype", controller: "DoctypesBlockModuleController"});
	this.route("setup.customize.doctype.doctypes.blog_category", {path: "/setup/customize/doctype/doctypes/blog_category/:doctypeId", title: "Blog Category", parent: "setup.customize.doctype", controller: "DoctypesBlogCategoryController"});
	this.route("setup.customize.doctype.doctypes.blogger", {path: "/setup/customize/doctype/doctypes/blogger/:doctypeId", title: "Blogger", parent: "setup.customize.doctype", controller: "DoctypesBloggerController"});
	this.route("setup.customize.doctype.doctypes.blog_post", {path: "/setup/customize/doctype/doctypes/blog_post/:doctypeId", title: "Blog Post", parent: "setup.customize.doctype", controller: "DoctypesBlogPostController"});
	this.route("setup.customize.doctype.doctypes.blog_settings", {path: "/setup/customize/doctype/doctypes/blog_settings/:doctypeId", title: "Blog Settings", parent: "setup.customize.doctype", controller: "DoctypesBlogSettingsController"});
	this.route("setup.customize.doctype.doctypes.bom", {path: "/setup/customize/doctype/doctypes/bom/:doctypeId", title: "BOM", parent: "setup.customize.doctype", controller: "DoctypesBomController"});
	this.route("setup.customize.doctype.doctypes.bom_explosion_item", {path: "/setup/customize/doctype/doctypes/bom_explosion_item/:doctypeId", title: "BOM Explosion Item", parent: "setup.customize.doctype", controller: "DoctypesBomExplosionItemController"});
	this.route("setup.customize.doctype.doctypes.bom_item", {path: "/setup/customize/doctype/doctypes/bom_item/:doctypeId", title: "BOM Item", parent: "setup.customize.doctype", controller: "DoctypesBomItemController"});
	this.route("setup.customize.doctype.doctypes.bom_operation", {path: "/setup/customize/doctype/doctypes/bom_operation/:doctypeId", title: "BOM Operation", parent: "setup.customize.doctype", controller: "DoctypesBomOperationController"});
	this.route("setup.customize.doctype.doctypes.bom_replace_tool", {path: "/setup/customize/doctype/doctypes/bom_replace_tool/:doctypeId", title: "BOM Replace Tool", parent: "setup.customize.doctype", controller: "DoctypesBomReplaceToolController"});
	this.route("setup.customize.doctype.doctypes.branch", {path: "/setup/customize/doctype/doctypes/branch/:doctypeId", title: "Branch", parent: "setup.customize.doctype", controller: "DoctypesBranchController"});
	this.route("setup.customize.doctype.doctypes.brand", {path: "/setup/customize/doctype/doctypes/brand/:doctypeId", title: "Brand", parent: "setup.customize.doctype", controller: "DoctypesBrandController"});
	this.route("setup.customize.doctype.doctypes.budget_detail", {path: "/setup/customize/doctype/doctypes/budget_detail/:doctypeId", title: "Budget Detail", parent: "setup.customize.doctype", controller: "DoctypesBudgetDetailController"});
	this.route("setup.customize.doctype.doctypes.bulk_email", {path: "/setup/customize/doctype/doctypes/bulk_email/:doctypeId", title: "Bulk Email", parent: "setup.customize.doctype", controller: "DoctypesBulkEmailController"});
	this.route("setup.customize.doctype.doctypes.campaign", {path: "/setup/customize/doctype/doctypes/campaign/:doctypeId", title: "Campaign", parent: "setup.customize.doctype", controller: "DoctypesCampaignController"});
	this.route("setup.customize.doctype.doctypes.c_form", {path: "/setup/customize/doctype/doctypes/c_form/:doctypeId", title: "C-Form", parent: "setup.customize.doctype", controller: "DoctypesCFormController"});
	this.route("setup.customize.doctype.doctypes.c_form_invoice_detail", {path: "/setup/customize/doctype/doctypes/c_form_invoice_detail/:doctypeId", title: "C-Form Invoice Detail", parent: "setup.customize.doctype", controller: "DoctypesCFormInvoiceDetailController"});
	this.route("setup.customize.doctype.doctypes.comment", {path: "/setup/customize/doctype/doctypes/comment/:doctypeId", title: "Comment", parent: "setup.customize.doctype", controller: "DoctypesCommentController"});
	this.route("setup.customize.doctype.doctypes.communication", {path: "/setup/customize/doctype/doctypes/communication/:doctypeId", title: "Communication", parent: "setup.customize.doctype", controller: "DoctypesCommunicationController"});
	this.route("setup.customize.doctype.doctypes.company", {path: "/setup/customize/doctype/doctypes/company/:doctypeId", title: "Company", parent: "setup.customize.doctype", controller: "DoctypesCompanyController"});
	this.route("setup.customize.doctype.doctypes.company_history", {path: "/setup/customize/doctype/doctypes/company_history/:doctypeId", title: "Company History", parent: "setup.customize.doctype", controller: "DoctypesCompanyHistoryController"});
	this.route("setup.customize.doctype.doctypes.contact", {path: "/setup/customize/doctype/doctypes/contact/:doctypeId", title: "Contact", parent: "setup.customize.doctype", controller: "DoctypesContactController"});
	this.route("setup.customize.doctype.doctypes.contact_us_settings", {path: "/setup/customize/doctype/doctypes/contact_us_settings/:doctypeId", title: "Contact Us Settings", parent: "setup.customize.doctype", controller: "DoctypesContactUsSettingsController"});
	this.route("setup.customize.doctype.doctypes.cost_center", {path: "/setup/customize/doctype/doctypes/cost_center/:doctypeId", title: "Cost Center", parent: "setup.customize.doctype", controller: "DoctypesCostCenterController"});
	this.route("setup.customize.doctype.doctypes.country", {path: "/setup/customize/doctype/doctypes/country/:doctypeId", title: "Country", parent: "setup.customize.doctype", controller: "DoctypesCountryController"});
	this.route("setup.customize.doctype.doctypes.currency", {path: "/setup/customize/doctype/doctypes/currency/:doctypeId", title: "Currency", parent: "setup.customize.doctype", controller: "DoctypesCurrencyController"});
	this.route("setup.customize.doctype.doctypes.currency_exchange", {path: "/setup/customize/doctype/doctypes/currency_exchange/:doctypeId", title: "Currency Exchange", parent: "setup.customize.doctype", controller: "DoctypesCurrencyExchangeController"});
	this.route("setup.customize.doctype.doctypes.customer", {path: "/setup/customize/doctype/doctypes/customer/:doctypeId", title: "Customer", parent: "setup.customize.doctype", controller: "DoctypesCustomerController"});
	this.route("setup.customize.doctype.doctypes.customer_group", {path: "/setup/customize/doctype/doctypes/customer_group/:doctypeId", title: "Customer Group", parent: "setup.customize.doctype", controller: "DoctypesCustomerGroupController"});
	this.route("setup.customize.doctype.doctypes.custom_field", {path: "/setup/customize/doctype/doctypes/custom_field/:doctypeId", title: "Custom Field", parent: "setup.customize.doctype", controller: "DoctypesCustomFieldController"});
	this.route("setup.customize.doctype.doctypes.customize_form", {path: "/setup/customize/doctype/doctypes/customize_form/:doctypeId", title: "Customize Form", parent: "setup.customize.doctype", controller: "DoctypesCustomizeFormController"});
	this.route("setup.customize.doctype.doctypes.customize_form_field", {path: "/setup/customize/doctype/doctypes/customize_form_field/:doctypeId", title: "Customize Form Field", parent: "setup.customize.doctype", controller: "DoctypesCustomizeFormFieldController"});
	this.route("setup.customize.doctype.doctypes.custom_script", {path: "/setup/customize/doctype/doctypes/custom_script/:doctypeId", title: "Custom Script", parent: "setup.customize.doctype", controller: "DoctypesCustomScriptController"});
	this.route("setup.customize.doctype.doctypes.deduction_type", {path: "/setup/customize/doctype/doctypes/deduction_type/:doctypeId", title: "Deduction Type", parent: "setup.customize.doctype", controller: "DoctypesDeductionTypeController"});
	this.route("setup.customize.doctype.doctypes.default_value", {path: "/setup/customize/doctype/doctypes/default_value/:doctypeId", title: "Default Value", parent: "setup.customize.doctype", controller: "DoctypesDefaultValueController"});
	this.route("setup.customize.doctype.doctypes.delivery_note", {path: "/setup/customize/doctype/doctypes/delivery_note/:doctypeId", title: "Delivery Note", parent: "setup.customize.doctype", controller: "DoctypesDeliveryNoteController"});
	this.route("setup.customize.doctype.doctypes.delivery_note_item", {path: "/setup/customize/doctype/doctypes/delivery_note_item/:doctypeId", title: "Delivery Note Item", parent: "setup.customize.doctype", controller: "DoctypesDeliveryNoteItemController"});
	this.route("setup.customize.doctype.doctypes.department", {path: "/setup/customize/doctype/doctypes/department/:doctypeId", title: "Department", parent: "setup.customize.doctype", controller: "DoctypesDepartmentController"});
	this.route("setup.customize.doctype.doctypes.dependent_task", {path: "/setup/customize/doctype/doctypes/dependent_task/:doctypeId", title: "Dependent Task", parent: "setup.customize.doctype", controller: "DoctypesDependentTaskController"});
	this.route("setup.customize.doctype.doctypes.designation", {path: "/setup/customize/doctype/doctypes/designation/:doctypeId", title: "Designation", parent: "setup.customize.doctype", controller: "DoctypesDesignationController"});
	this.route("setup.customize.doctype.doctypes.doc_field", {path: "/setup/customize/doctype/doctypes/doc_field/:doctypeId", title: "DocField", parent: "setup.customize.doctype", controller: "DoctypesDocFieldController"});
	this.route("setup.customize.doctype.doctypes.doc_perm", {path: "/setup/customize/doctype/doctypes/doc_perm/:doctypeId", title: "DocPerm", parent: "setup.customize.doctype", controller: "DoctypesDocPermController"});
	this.route("setup.customize.doctype.doctypes.doc_share", {path: "/setup/customize/doctype/doctypes/doc_share/:doctypeId", title: "DocShare", parent: "setup.customize.doctype", controller: "DoctypesDocShareController"});
	this.route("setup.customize.doctype.doctypes.doc_type", {path: "/setup/customize/doctype/doctypes/doc_type/:doctypeId", title: "DocType", parent: "setup.customize.doctype", controller: "DoctypesDocTypeController"});
	this.route("setup.customize.doctype.doctypes.dropbox_backup", {path: "/setup/customize/doctype/doctypes/dropbox_backup/:doctypeId", title: "Dropbox Backup", parent: "setup.customize.doctype", controller: "DoctypesDropboxBackupController"});
	this.route("setup.customize.doctype.doctypes.earning_type", {path: "/setup/customize/doctype/doctypes/earning_type/:doctypeId", title: "Earning Type", parent: "setup.customize.doctype", controller: "DoctypesEarningTypeController"});
	this.route("setup.customize.doctype.doctypes.email_account", {path: "/setup/customize/doctype/doctypes/email_account/:doctypeId", title: "Email Account", parent: "setup.customize.doctype", controller: "DoctypesEmailAccountController"});
	this.route("setup.customize.doctype.doctypes.email_alert", {path: "/setup/customize/doctype/doctypes/email_alert/:doctypeId", title: "Email Alert", parent: "setup.customize.doctype", controller: "DoctypesEmailAlertController"});
	this.route("setup.customize.doctype.doctypes.email_alert_recipient", {path: "/setup/customize/doctype/doctypes/email_alert_recipient/:doctypeId", title: "Email Alert Recipient", parent: "setup.customize.doctype", controller: "DoctypesEmailAlertRecipientController"});
	this.route("setup.customize.doctype.doctypes.email_digest", {path: "/setup/customize/doctype/doctypes/email_digest/:doctypeId", title: "Email Digest", parent: "setup.customize.doctype", controller: "DoctypesEmailDigestController"});
	this.route("setup.customize.doctype.doctypes.email_unsubscribe", {path: "/setup/customize/doctype/doctypes/email_unsubscribe/:doctypeId", title: "Email Unsubscribe", parent: "setup.customize.doctype", controller: "DoctypesEmailUnsubscribeController"});
	this.route("setup.customize.doctype.doctypes.employee", {path: "/setup/customize/doctype/doctypes/employee/:doctypeId", title: "Employee", parent: "setup.customize.doctype", controller: "DoctypesEmployeeController"});
	this.route("setup.customize.doctype.doctypes.employee_education", {path: "/setup/customize/doctype/doctypes/employee_education/:doctypeId", title: "Employee Education", parent: "setup.customize.doctype", controller: "DoctypesEmployeeEducationController"});
	this.route("setup.customize.doctype.doctypes.employee_external_work_history", {path: "/setup/customize/doctype/doctypes/employee_external_work_history/:doctypeId", title: "Employee External Work History", parent: "setup.customize.doctype", controller: "DoctypesEmployeeExternalWorkHistoryController"});
	this.route("setup.customize.doctype.doctypes.employee_internal_work_history", {path: "/setup/customize/doctype/doctypes/employee_internal_work_history/:doctypeId", title: "Employee Internal Work History", parent: "setup.customize.doctype", controller: "DoctypesEmployeeInternalWorkHistoryController"});
	this.route("setup.customize.doctype.doctypes.employee_leave_approver", {path: "/setup/customize/doctype/doctypes/employee_leave_approver/:doctypeId", title: "Employee Leave Approver", parent: "setup.customize.doctype", controller: "DoctypesEmployeeLeaveApproverController"});
	this.route("setup.customize.doctype.doctypes.employment_type", {path: "/setup/customize/doctype/doctypes/employment_type/:doctypeId", title: "Employment Type", parent: "setup.customize.doctype", controller: "DoctypesEmploymentTypeController"});
	this.route("setup.customize.doctype.doctypes.event", {path: "/setup/customize/doctype/doctypes/event/:doctypeId", title: "Event", parent: "setup.customize.doctype", controller: "DoctypesEventController"});
	this.route("setup.customize.doctype.doctypes.event_role", {path: "/setup/customize/doctype/doctypes/event_role/:doctypeId", title: "Event Role", parent: "setup.customize.doctype", controller: "DoctypesEventRoleController"});
	this.route("setup.customize.doctype.doctypes.expense_claim", {path: "/setup/customize/doctype/doctypes/expense_claim/:doctypeId", title: "Expense Claim", parent: "setup.customize.doctype", controller: "DoctypesExpenseClaimController"});
	this.route("setup.customize.doctype.doctypes.expense_claim_detail", {path: "/setup/customize/doctype/doctypes/expense_claim_detail/:doctypeId", title: "Expense Claim Detail", parent: "setup.customize.doctype", controller: "DoctypesExpenseClaimDetailController"});
	this.route("setup.customize.doctype.doctypes.expense_claim_type", {path: "/setup/customize/doctype/doctypes/expense_claim_type/:doctypeId", title: "Expense Claim Type", parent: "setup.customize.doctype", controller: "DoctypesExpenseClaimTypeController"});
	this.route("setup.customize.doctype.doctypes.features_setup", {path: "/setup/customize/doctype/doctypes/features_setup/:doctypeId", title: "Features Setup", parent: "setup.customize.doctype", controller: "DoctypesFeaturesSetupController"});
	this.route("setup.customize.doctype.doctypes.feed", {path: "/setup/customize/doctype/doctypes/feed/:doctypeId", title: "Feed", parent: "setup.customize.doctype", controller: "DoctypesFeedController"});
	this.route("setup.customize.doctype.doctypes.file", {path: "/setup/customize/doctype/doctypes/file/:doctypeId", title: "File", parent: "setup.customize.doctype", controller: "DoctypesFileController"});
	this.route("setup.customize.doctype.doctypes.fiscal_year", {path: "/setup/customize/doctype/doctypes/fiscal_year/:doctypeId", title: "Fiscal Year", parent: "setup.customize.doctype", controller: "DoctypesFiscalYearController"});
	this.route("setup.customize.doctype.doctypes.fiscal_year_company", {path: "/setup/customize/doctype/doctypes/fiscal_year_company/:doctypeId", title: "Fiscal Year Company", parent: "setup.customize.doctype", controller: "DoctypesFiscalYearCompanyController"});
	this.route("setup.customize.doctype.doctypes.gl_entry", {path: "/setup/customize/doctype/doctypes/gl_entry/:doctypeId", title: "GL Entry", parent: "setup.customize.doctype", controller: "DoctypesGlEntryController"});
	this.route("setup.customize.doctype.doctypes.global_defaults", {path: "/setup/customize/doctype/doctypes/global_defaults/:doctypeId", title: "Global Defaults", parent: "setup.customize.doctype", controller: "DoctypesGlobalDefaultsController"});
	this.route("setup.customize.doctype.doctypes.holiday", {path: "/setup/customize/doctype/doctypes/holiday/:doctypeId", title: "Holiday", parent: "setup.customize.doctype", controller: "DoctypesHolidayController"});
	this.route("setup.customize.doctype.doctypes.holiday_list", {path: "/setup/customize/doctype/doctypes/holiday_list/:doctypeId", title: "Holiday List", parent: "setup.customize.doctype", controller: "DoctypesHolidayListController"});
	this.route("setup.customize.doctype.doctypes.hr_settings", {path: "/setup/customize/doctype/doctypes/hr_settings/:doctypeId", title: "HR Settings", parent: "setup.customize.doctype", controller: "DoctypesHrSettingsController"});
	this.route("setup.customize.doctype.doctypes.hub_settings", {path: "/setup/customize/doctype/doctypes/hub_settings/:doctypeId", title: "Hub Settings", parent: "setup.customize.doctype", controller: "DoctypesHubSettingsController"});
	this.route("setup.customize.doctype.doctypes.industry_type", {path: "/setup/customize/doctype/doctypes/industry_type/:doctypeId", title: "Industry Type", parent: "setup.customize.doctype", controller: "DoctypesIndustryTypeController"});
	this.route("setup.customize.doctype.doctypes.installation_note", {path: "/setup/customize/doctype/doctypes/installation_note/:doctypeId", title: "Installation Note", parent: "setup.customize.doctype", controller: "DoctypesController"});
	this.route("setup.customize.doctype.doctypes.installation_note_item", {path: "/setup/customize/doctype/doctypes/installation_note_item/:doctypeId", title: "Installation Note Item", parent: "setup.customize.doctype", controller: "DoctypesInstallationNoteItemController"});
	this.route("setup.customize.doctype.doctypes.issue", {path: "/setup/customize/doctype/doctypes/issue/:doctypeId", title: "Issue", parent: "setup.customize.doctype", controller: "DoctypesIssueController"});
	this.route("setup.customize.doctype.doctypes.item", {path: "/setup/customize/doctype/doctypes/item/:doctypeId", title: "Item", parent: "setup.customize.doctype", controller: "DoctypesItemController"});
	this.route("setup.customize.doctype.doctypes.item_attribute", {path: "/setup/customize/doctype/doctypes/item_attribute/:doctypeId", title: "Item Attribute", parent: "setup.customize.doctype", controller: "DoctypesItemAttributeController"});
	this.route("setup.customize.doctype.doctypes.item_attribute_value", {path: "/setup/customize/doctype/doctypes/item_attribute_value/:doctypeId", title: "Item Attribute Value", parent: "setup.customize.doctype", controller: "DoctypesItemAttributeValueController"});
	this.route("setup.customize.doctype.doctypes.item_customer_detail", {path: "/setup/customize/doctype/doctypes/item_customer_detail/:doctypeId", title: "Item Customer Detail", parent: "setup.customize.doctype", controller: "DoctypesItemCustomerDetailController"});
	this.route("setup.customize.doctype.doctypes.item_group", {path: "/setup/customize/doctype/doctypes/item_group/:doctypeId", title: "Item Group", parent: "setup.customize.doctype", controller: "DoctypesItemGroupController"});
	this.route("setup.customize.doctype.doctypes.item_price", {path: "/setup/customize/doctype/doctypes/item_price/:doctypeId", title: "Item Price", parent: "setup.customize.doctype", controller: "DoctypesItemPriceController"});
	this.route("setup.customize.doctype.doctypes.item_quality_inspection_parameter", {path: "/setup/customize/doctype/doctypes/item_quality_inspection_parameter/:doctypeId", title: "Item Quality Inspection Parameter", parent: "setup.customize.doctype", controller: "DoctypesItemQualityInspectionParameterController"});
	this.route("setup.customize.doctype.doctypes.item_reorder", {path: "/setup/customize/doctype/doctypes/item_reorder/:doctypeId", title: "Item Reorder", parent: "setup.customize.doctype", controller: "DoctypesItemReorderController"});
	this.route("setup.customize.doctype.doctypes.item_supplier", {path: "/setup/customize/doctype/doctypes/item_supplier/:doctypeId", title: "Item Supplier", parent: "setup.customize.doctype", controller: "DoctypesItemSupplierController"});
	this.route("setup.customize.doctype.doctypes.item_tax", {path: "/setup/customize/doctype/doctypes/item_tax/:doctypeId", title: "Item Tax", parent: "setup.customize.doctype", controller: "DoctypesItemTaxController"});
	this.route("setup.customize.doctype.doctypes.item_variant", {path: "/setup/customize/doctype/doctypes/item_variant/:doctypeId", title: "Item Variant", parent: "setup.customize.doctype", controller: "DoctypesItemVariantController"});
	this.route("setup.customize.doctype.doctypes.item_variant_attribute", {path: "/setup/customize/doctype/doctypes/item_variant_attribute/:doctypeId", title: "Item Variant Attribute", parent: "setup.customize.doctype", controller: "DoctypesItemVariantAttributeController"});
	this.route("setup.customize.doctype.doctypes.item_website_specification", {path: "/setup/customize/doctype/doctypes/item_website_specification/:doctypeId", title: "Item Website Specification", parent: "setup.customize.doctype", controller: "DoctypesItemWebsiteSpecificationController"});
	this.route("setup.customize.doctype.doctypes.job_applicant", {path: "/setup/customize/doctype/doctypes/job_applicant/:doctypeId", title: "Job Applicant", parent: "setup.customize.doctype", controller: "DoctypesJobApplicantController"});
	this.route("setup.customize.doctype.doctypes.job_opening", {path: "/setup/customize/doctype/doctypes/job_opening/:doctypeId", title: "Job Opening", parent: "setup.customize.doctype", controller: "DoctypesJobOpeningController"});
	this.route("setup.customize.doctype.doctypes.journal_entry", {path: "/setup/customize/doctype/doctypes/journal_entry/:doctypeId", title: "Journal Entry", parent: "setup.customize.doctype", controller: "DoctypesJournalEntryController"});
	this.route("setup.customize.doctype.doctypes.journal_entry_account", {path: "/setup/customize/doctype/doctypes/journal_entry_account/:doctypeId", title: "Journal Entry Account", parent: "setup.customize.doctype", controller: "DoctypesJournalEntryAccountController"});
	this.route("setup.customize.doctype.doctypes.landed_cost_item", {path: "/setup/customize/doctype/doctypes/landed_cost_item/:doctypeId", title: "Landed Cost Item", parent: "setup.customize.doctype", controller: "DoctypesLandedCostItemController"});
	this.route("setup.customize.doctype.doctypes.landed_cost_purchase_receipt", {path: "/setup/customize/doctype/doctypes/landed_cost_purchase_receipt/:doctypeId", title: "Landed Cost Purchase Receipt", parent: "setup.customize.doctype", controller: "DoctypesLandedCostPurchaseReceiptController"});
	this.route("setup.customize.doctype.doctypes.landed_cost_taxes_and_charges", {path: "/setup/customize/doctype/doctypes/landed_cost_taxes_and_charges/:doctypeId", title: "Landed Cost Taxes and Charges", parent: "setup.customize.doctype", controller: "DoctypesLandedCostTaxesAndChargesController"});
	this.route("setup.customize.doctype.doctypes.landed_cost_voucher", {path: "/setup/customize/doctype/doctypes/landed_cost_voucher/:doctypeId", title: "Landed Cost Voucher", parent: "setup.customize.doctype", controller: "DoctypesLandedCostVoucherController"});
	this.route("setup.customize.doctype.doctypes.lead", {path: "/setup/customize/doctype/doctypes/lead/:doctypeId", title: "Lead", parent: "setup.customize.doctype", controller: "DoctypesLeadController"});
	this.route("setup.customize.doctype.doctypes.leave_allocation", {path: "/setup/customize/doctype/doctypes/leave_allocation/:doctypeId", title: "Leave Allocation", parent: "setup.customize.doctype", controller: "DoctypesLeaveAllocationController"});
	this.route("setup.customize.doctype.doctypes.leave_application", {path: "/setup/customize/doctype/doctypes/leave_application/:doctypeId", title: "Leave Application", parent: "setup.customize.doctype", controller: "DoctypesLeaveApplicationController"});
	this.route("setup.customize.doctype.doctypes.leave_block_list", {path: "/setup/customize/doctype/doctypes/leave_block_list/:doctypeId", title: "Leave Block List", parent: "setup.customize.doctype", controller: "DoctypesLeaveBlockListController"});
	this.route("setup.customize.doctype.doctypes.leave_block_list_allow", {path: "/setup/customize/doctype/doctypes/leave_block_list_allow/:doctypeId", title: "Leave Block List Allow", parent: "setup.customize.doctype", controller: "DoctypesLeaveBlockListAllowController"});
	this.route("setup.customize.doctype.doctypes.leave_block_list_date", {path: "/setup/customize/doctype/doctypes/leave_block_list_date/:doctypeId", title: "Leave Block List Date", parent: "setup.customize.doctype", controller: "DoctypesLeaveBlockListDateController"});
	this.route("setup.customize.doctype.doctypes.leave_control_panel", {path: "/setup/customize/doctype/doctypes/leave_control_panel/:doctypeId", title: "Leave Control Panel", parent: "setup.customize.doctype", controller: "DoctypesLeaveControlPanelController"});
	this.route("setup.customize.doctype.doctypes.leave_type", {path: "/setup/customize/doctype/doctypes/leave_type/:doctypeId", title: "Leave Type", parent: "setup.customize.doctype", controller: "DoctypesLeaveTypeController"});
	this.route("setup.customize.doctype.doctypes.letter_head", {path: "/setup/customize/doctype/doctypes/letter_head/:doctypeId", title: "Letter Head", parent: "setup.customize.doctype", controller: "DoctypesLetterHeadController"});
	this.route("setup.customize.doctype.doctypes.maintenance_schedule", {path: "/setup/customize/doctype/doctypes/maintenance_schedule/:doctypeId", title: "Maintenance Schedule", parent: "setup.customize.doctype", controller: "DoctypesMaintenanceScheduleController"});
	this.route("setup.customize.doctype.doctypes.maintenance_schedule_detail", {path: "/setup/customize/doctype/doctypes/maintenance_schedule_detail/:doctypeId", title: "Maintenance Schedule Detail", parent: "setup.customize.doctype", controller: "DoctypesMaintenanceScheduleDetailController"});
	this.route("setup.customize.doctype.doctypes.maintenance_schedule_item", {path: "/setup/customize/doctype/doctypes/maintenance_schedule_item/:doctypeId", title: "Maintenance Schedule Item", parent: "setup.customize.doctype", controller: "DoctypesMaintenanceScheduleItemController"});
	this.route("setup.customize.doctype.doctypes.maintenance_visit", {path: "/setup/customize/doctype/doctypes/maintenance_visit/:doctypeId", title: "Maintenance Visit", parent: "setup.customize.doctype", controller: "DoctypesMaintenanceVisitController"});
	this.route("setup.customize.doctype.doctypes.maintenance_visit_purpose", {path: "/setup/customize/doctype/doctypes/maintenance_visit_purpose/:doctypeId", title: "Maintenance Visit Purpose", parent: "setup.customize.doctype", controller: "DoctypesMaintenanceVisitPurposeController"});
	this.route("setup.customize.doctype.doctypes.manufacturing_settings", {path: "/setup/customize/doctype/doctypes/manufacturing_settings/:doctypeId", title: "Manufacturing Settings", parent: "setup.customize.doctype", controller: "DoctypesManufacturingSettingsController"});
	this.route("setup.customize.doctype.doctypes.material_request", {path: "/setup/customize/doctype/doctypes/material_request/:doctypeId", title: "Material Request", parent: "setup.customize.doctype", controller: "DoctypesMaterialRequestController"});
	this.route("setup.customize.doctype.doctypes.material_request_item", {path: "/setup/customize/doctype/doctypes/material_request_item/:doctypeId", title: "Material Request Item", parent: "setup.customize.doctype", controller: "DoctypesMaterialRequestItemController"});
	this.route("setup.customize.doctype.doctypes.mode_of_payment", {path: "/setup/customize/doctype/doctypes/mode_of_payment/:doctypeId", title: "Mode of Payment", parent: "setup.customize.doctype", controller: "DoctypesModeOfPaymentController"});
	this.route("setup.customize.doctype.doctypes.mode_of_payment_account", {path: "/setup/customize/doctype/doctypes/mode_of_payment_account/:doctypeId", title: "Mode of Payment Account", parent: "setup.customize.doctype", controller: "DoctypesModeOfPaymentAccountController"});
	this.route("setup.customize.doctype.doctypes.module_def", {path: "/setup/customize/doctype/doctypes/module_def/:doctypeId", title: "Module Def", parent: "setup.customize.doctype", controller: "DoctypesModuleDefController"});
	this.route("setup.customize.doctype.doctypes.monthly_distribution", {path: "/setup/customize/doctype/doctypes/monthly_distribution/:doctypeId", title: "Monthly Distribution", parent: "setup.customize.doctype", controller: "DoctypesMonthlyDistributionController"});
	this.route("setup.customize.doctype.doctypes.monthly_distribution_percentage", {path: "/setup/customize/doctype/doctypes/monthly_distribution_percentage/:doctypeId", title: "Monthly Distribution Percentage", parent: "setup.customize.doctype", controller: "DoctypesMonthlyDistributionPercentageController"});
	this.route("setup.customize.doctype.doctypes.naming_series", {path: "/setup/customize/doctype/doctypes/naming_series/:doctypeId", title: "Naming Series", parent: "setup.customize.doctype", controller: "DoctypesNamingSeriesController"});
	this.route("setup.customize.doctype.doctypes.newsletter", {path: "/setup/customize/doctype/doctypes/newsletter/:doctypeId", title: "Newsletter", parent: "setup.customize.doctype", controller: "DoctypesNewsletterController"});
	this.route("setup.customize.doctype.doctypes.newsletter_list", {path: "/setup/customize/doctype/doctypes/newsletter_list/:doctypeId", title: "Newsletter List", parent: "setup.customize.doctype", controller: "DoctypesNewsletterListController"});
	this.route("setup.customize.doctype.doctypes.newsletter_list_subscriber", {path: "/setup/customize/doctype/doctypes/newsletter_list_subscriber/:doctypeId", title: "Newsletter List Subscriber", parent: "setup.customize.doctype", controller: "DoctypesNewsletterListSubscriberController"});
	this.route("setup.customize.doctype.doctypes.note", {path: "/setup/customize/doctype/doctypes/note/:doctypeId", title: "Note", parent: "setup.customize.doctype", controller: "DoctypesNoteController"});
	this.route("setup.customize.doctype.doctypes.notification_control", {path: "/setup/customize/doctype/doctypes/notification_control/:doctypeId", title: "Notification Control", parent: "setup.customize.doctype", controller: "DoctypesNotificationControlController"});
	this.route("setup.customize.doctype.doctypes.offer_letter", {path: "/setup/customize/doctype/doctypes/offer_letter/:doctypeId", title: "Offer Letter", parent: "setup.customize.doctype", controller: "DoctypesOfferLetterController"});
	this.route("setup.customize.doctype.doctypes.offer_letter_term", {path: "/setup/customize/doctype/doctypes/offer_letter_term/:doctypeId", title: "Offer Letter Term", parent: "setup.customize.doctype", controller: "DoctypesOfferLetterTermController"});
	this.route("setup.customize.doctype.doctypes.offer_term", {path: "/setup/customize/doctype/doctypes/offer_term/:doctypeId", title: "Offer Term", parent: "setup.customize.doctype", controller: "DoctypesOfferTermController"});
	this.route("setup.customize.doctype.doctypes.operation", {path: "/setup/customize/doctype/doctypes/operation/:doctypeId", title: "Operation", parent: "setup.customize.doctype", controller: "DoctypesOperationController"});
	this.route("setup.customize.doctype.doctypes.opportunity", {path: "/setup/customize/doctype/doctypes/opportunity/:doctypeId", title: "Opportunity", parent: "setup.customize.doctype", controller: "DoctypesOpportunityController"});
	this.route("setup.customize.doctype.doctypes.opportunity_item", {path: "/setup/customize/doctype/doctypes/opportunity_item/:doctypeId", title: "Opportunity Item", parent: "setup.customize.doctype", controller: "DoctypesOpportunityItemController"});
	this.route("setup.customize.doctype.doctypes.packed_item", {path: "/setup/customize/doctype/doctypes/packed_item/:doctypeId", title: "Packed Item", parent: "setup.customize.doctype", controller: "DoctypesPackedItemController"});
	this.route("setup.customize.doctype.doctypes.packing_slip", {path: "/setup/customize/doctype/doctypes/packing_slip/:doctypeId", title: "Packing Slip", parent: "setup.customize.doctype", controller: "DoctypesPackingSlipController"});
	this.route("setup.customize.doctype.doctypes.packing_slip_item", {path: "/setup/customize/doctype/doctypes/packing_slip_item/:doctypeId", title: "Packing Slip Item", parent: "setup.customize.doctype", controller: "DoctypesPackingSlipItemController"});
	this.route("setup.customize.doctype.doctypes.page", {path: "/setup/customize/doctype/doctypes/page/:doctypeId", title: "Page", parent: "setup.customize.doctype", controller: "DoctypesPageController"});
	this.route("setup.customize.doctype.doctypes.page_role", {path: "/setup/customize/doctype/doctypes/page_role/:doctypeId", title: "Page Role", parent: "setup.customize.doctype", controller: "DoctypesPageRoleController"});
	this.route("setup.customize.doctype.doctypes.party_account", {path: "/setup/customize/doctype/doctypes/party_account/:doctypeId", title: "Party Account", parent: "setup.customize.doctype", controller: "DoctypesPartyAccountController"});
	this.route("setup.customize.doctype.doctypes.patch_log", {path: "/setup/customize/doctype/doctypes/patch_log/:doctypeId", title: "Patch Log", parent: "setup.customize.doctype", controller: "DoctypesPatchLogController"});
	this.route("setup.customize.doctype.doctypes.payment_reconciliation", {path: "/setup/customize/doctype/doctypes/payment_reconciliation/:doctypeId", title: "Payment Reconciliation", parent: "setup.customize.doctype", controller: "DoctypesPaymentReconciliationController"});
	this.route("setup.customize.doctype.doctypes.payment_reconciliation_invoice", {path: "/setup/customize/doctype/doctypes/payment_reconciliation_invoice/:doctypeId", title: "Payment Reconciliation Invoice", parent: "setup.customize.doctype", controller: "DoctypesPaymentReconciliationInvoiceController"});
	this.route("setup.customize.doctype.doctypes.payment_reconciliation_payment", {path: "/setup/customize/doctype/doctypes/payment_reconciliation_payment/:doctypeId", title: "Payment Reconciliation Payment", parent: "setup.customize.doctype", controller: "DoctypesPaymentReconciliationPaymentController"});
	this.route("setup.customize.doctype.doctypes.payment_tool", {path: "/setup/customize/doctype/doctypes/payment_tool/:doctypeId", title: "Payment Tool", parent: "setup.customize.doctype", controller: "DoctypesPaymentToolController"});
	this.route("setup.customize.doctype.doctypes.payment_tool_detail", {path: "/setup/customize/doctype/doctypes/payment_tool_detail/:doctypeId", title: "Payment Tool Detail", parent: "setup.customize.doctype", controller: "DoctypesPaymentToolDetailController"});
	this.route("setup.customize.doctype.doctypes.period_closing_voucher", {path: "/setup/customize/doctype/doctypes/period_closing_voucher/:doctypeId", title: "Period Closing Voucher", parent: "setup.customize.doctype", controller: "DoctypesPeriodClosingVoucherController"});
	this.route("setup.customize.doctype.doctypes.pos_profile", {path: "/setup/customize/doctype/doctypes/pos_profile/:doctypeId", title: "POS Profile", parent: "setup.customize.doctype", controller: "DoctypesPosProfileController"});
	this.route("setup.customize.doctype.doctypes.price_list", {path: "/setup/customize/doctype/doctypes/price_list/:doctypeId", title: "Price List", parent: "setup.customize.doctype", controller: "DoctypesPriceListController"});
	this.route("setup.customize.doctype.doctypes.price_list_country", {path: "/setup/customize/doctype/doctypes/price_list_country/:doctypeId", title: "Price List Country", parent: "setup.customize.doctype", controller: "DoctypesPriceListCountryController"});
	this.route("setup.customize.doctype.doctypes.pricing_rule", {path: "/setup/customize/doctype/doctypes/pricing_rule/:doctypeId", title: "Pricing Rule", parent: "setup.customize.doctype", controller: "DoctypesPricingRuleController"});
	this.route("setup.customize.doctype.doctypes.print_format", {path: "/setup/customize/doctype/doctypes/print_format/:doctypeId", title: "Print Format", parent: "setup.customize.doctype", controller: "DoctypesPrintFormatController"});
	this.route("setup.customize.doctype.doctypes.print_heading", {path: "/setup/customize/doctype/doctypes/print_heading/:doctypeId", title: "Print Heading", parent: "setup.customize.doctype", controller: "DoctypesPrintHeadingController"});
	this.route("setup.customize.doctype.doctypes.print_settings", {path: "/setup/customize/doctype/doctypes/print_settings/:doctypeId", title: "Print Settings", parent: "setup.customize.doctype", controller: "DoctypesPrintSettingsController"});
	this.route("setup.customize.doctype.doctypes.process_payroll", {path: "/setup/customize/doctype/doctypes/process_payroll/:doctypeId", title: "Process Payroll", parent: "setup.customize.doctype", controller: "DoctypesProcessPayrollController"});
	this.route("setup.customize.doctype.doctypes.product_bundle", {path: "/setup/customize/doctype/doctypes/product_bundle/:doctypeId", title: "Product Bundle", parent: "setup.customize.doctype", controller: "DoctypesProductBundleController"});
	this.route("setup.customize.doctype.doctypes.product_bundle_item", {path: "/setup/customize/doctype/doctypes/product_bundle_item/:doctypeId", title: "Product Bundle Item", parent: "setup.customize.doctype", controller: "DoctypesProductBundleItemController"});
	this.route("setup.customize.doctype.doctypes.production_order", {path: "/setup/customize/doctype/doctypes/production_order/:doctypeId", title: "Production Order", parent: "setup.customize.doctype", controller: "DoctypesProductionOrderController"});
	this.route("setup.customize.doctype.doctypes.production_order_operation", {path: "/setup/customize/doctype/doctypes/production_order_operation/:doctypeId", title: "Production Order Operation", parent: "setup.customize.doctype", controller: "DoctypesProductionOrderOperationController"});
	this.route("setup.customize.doctype.doctypes.production_plan_item", {path: "/setup/customize/doctype/doctypes/production_plan_item/:doctypeId", title: "Production Plan Item", parent: "setup.customize.doctype", controller: "DoctypesProductionPlanItemController"});
	this.route("setup.customize.doctype.doctypes.production_planning_tool", {path: "/setup/customize/doctype/doctypes/production_planning_tool/:doctypeId", title: "Production Planning Tool", parent: "setup.customize.doctype", controller: "DoctypesProductionPlanningToolController"});
	this.route("setup.customize.doctype.doctypes.production_plan_sales_order", {path: "/setup/customize/doctype/doctypes/production_plan_sales_order/:doctypeId", title: "Production Plan Sales Order", parent: "setup.customize.doctype", controller: "DoctypesProductionPlanSalesOrderController"});
	this.route("setup.customize.doctype.doctypes.project", {path: "/setup/customize/doctype/doctypes/project/:doctypeId", title: "Project", parent: "setup.customize.doctype", controller: "DoctypesProjectController"});
	this.route("setup.customize.doctype.doctypes.project_task", {path: "/setup/customize/doctype/doctypes/project_task/:doctypeId", title: "Project Task", parent: "setup.customize.doctype", controller: "DoctypesProjectTaskController"});
	this.route("setup.customize.doctype.doctypes.property_setter", {path: "/setup/customize/doctype/doctypes/property_setter/:doctypeId", title: "Property Setter", parent: "setup.customize.doctype", controller: "DoctypesPropertySetterController"});
	this.route("setup.customize.doctype.doctypes.purchase_common", {path: "/setup/customize/doctype/doctypes/purchase_common/:doctypeId", title: "Purchase Common", parent: "setup.customize.doctype", controller: "DoctypesPurchaseCommonController"});
	this.route("setup.customize.doctype.doctypes.purchase_invoice", {path: "/setup/customize/doctype/doctypes/purchase_invoice/:doctypeId", title: "Purchase Invoice", parent: "setup.customize.doctype", controller: "DoctypesPurchaseInvoiceController"});
	this.route("setup.customize.doctype.doctypes.purchase_invoice_advance", {path: "/setup/customize/doctype/doctypes/purchase_invoice_advance/:doctypeId", title: "Purchase Invoice Advance", parent: "setup.customize.doctype", controller: "DoctypesPurchaseInvoiceAdvanceController"});
	this.route("setup.customize.doctype.doctypes.purchase_invoice_item", {path: "/setup/customize/doctype/doctypes/purchase_invoice_item/:doctypeId", title: "Purchase Invoice Item", parent: "setup.customize.doctype", controller: "DoctypesPurchaseInvoiceItemController"});
	this.route("setup.customize.doctype.doctypes.purchase_order", {path: "/setup/customize/doctype/doctypes/purchase_order/:doctypeId", title: "Purchase Order", parent: "setup.customize.doctype", controller: "DoctypesPurchaseOrderController"});
	this.route("setup.customize.doctype.doctypes.purchase_order_item", {path: "/setup/customize/doctype/doctypes/purchase_order_item/:doctypeId", title: "Purchase Order Item", parent: "setup.customize.doctype", controller: "DoctypesPurchaseOrderItemController"});
	this.route("setup.customize.doctype.doctypes.purchase_order_item_supplied", {path: "/setup/customize/doctype/doctypes/purchase_order_item_supplied/:doctypeId", title: "Purchase Order Item Supplied", parent: "setup.customize.doctype", controller: "DoctypesPurchaseOrderItemSuppliedController"});
	this.route("setup.customize.doctype.doctypes.purchase_receipt", {path: "/setup/customize/doctype/doctypes/purchase_receipt/:doctypeId", title: "Purchase Receipt", parent: "setup.customize.doctype", controller: "DoctypesPurchaseReceiptController"});
	this.route("setup.customize.doctype.doctypes.purchase_receipt_item", {path: "/setup/customize/doctype/doctypes/purchase_receipt_item/:doctypeId", title: "Purchase Receipt Item", parent: "setup.customize.doctype", controller: "DoctypesPurchaseReceiptItemController"});
	this.route("setup.customize.doctype.doctypes.purchase_receipt_item_supplied", {path: "/setup/customize/doctype/doctypes/purchase_receipt_item_supplied/:doctypeId", title: "Purchase Receipt Item Supplied", parent: "setup.customize.doctype", controller: "DoctypesPurchaseReceiptItemSuppliedController"});
	this.route("setup.customize.doctype.doctypes.purchase_taxes_and_charges", {path: "/setup/customize/doctype/doctypes/purchase_taxes_and_charges/:doctypeId", title: "Purchase Taxes and Charges", parent: "setup.customize.doctype", controller: "DoctypesPurchaseTaxesAndChargesController"});
	this.route("setup.customize.doctype.doctypes.purchase_taxes_and_charges_template", {path: "/setup/customize/doctype/doctypes/purchase_taxes_and_charges_template/:doctypeId", title: "Purchase Taxes and Charges Template", parent: "setup.customize.doctype", controller: "DoctypesPurchaseTaxesAndChargesTemplate Controller"});
	this.route("setup.customize.doctype.doctypes.purchasing_settings", {path: "/setup/customize/doctype/doctypes/purchasing_settings/:doctypeId", title: "Purchasing Settings", parent: "setup.customize.doctype", controller: "DoctypesPurchasingSettingsController"});
	this.route("setup.customize.doctype.doctypes.quality_inspection", {path: "/setup/customize/doctype/doctypes/quality_inspection/:doctypeId", title: "Quality Inspection", parent: "setup.customize.doctype", controller: "DoctypesQualityInspectionController"});
	this.route("setup.customize.doctype.doctypes.quality_inspection_reading", {path: "/setup/customize/doctype/doctypes/quality_inspection_reading/:doctypeId", title: "Quality Inspection Reading", parent: "setup.customize.doctype", controller: "DoctypesQualityInspectionReadingController"});
	this.route("setup.customize.doctype.doctypes.quotation", {path: "/setup/customize/doctype/doctypes/quotation/:doctypeId", title: "Quotation", parent: "setup.customize.doctype", controller: "DoctypesQuotationController"});
	this.route("setup.customize.doctype.doctypes.quotation_item", {path: "/setup/customize/doctype/doctypes/quotation_item/:doctypeId", title: "Quotation Item", parent: "setup.customize.doctype", controller: "DoctypesQuotationItemController"});
	this.route("setup.customize.doctype.doctypes.quotation_lost_reason", {path: "/setup/customize/doctype/doctypes/quotation_lost_reason/:doctypeId", title: "Quotation Lost Reason", parent: "setup.customize.doctype", controller: "DoctypesQuotationLostReasonController"});
	this.route("setup.customize.doctype.doctypes.rename_tool", {path: "/setup/customize/doctype/doctypes/rename_tool/:doctypeId", title: "Rename Tool", parent: "setup.customize.doctype", controller: "DoctypesRenameToolController"});
	this.route("setup.customize.doctype.doctypes.report", {path: "/setup/customize/doctype/doctypes/report/:doctypeId", title: "Report", parent: "setup.customize.doctype", controller: "DoctypesReportController"});
	this.route("setup.customize.doctype.doctypes.role", {path: "/setup/customize/doctype/doctypes/role/:doctypeId", title: "Role", parent: "setup.customize.doctype", controller: "DoctypesRoleController"});
	this.route("setup.customize.doctype.doctypes.salary_slip", {path: "/setup/customize/doctype/doctypes/salary_slip/:doctypeId", title: "Salary Slip", parent: "setup.customize.doctype", controller: "DoctypesSalarySlipController"});
	this.route("setup.customize.doctype.doctypes.salary_slip_deduction", {path: "/setup/customize/doctype/doctypes/salary_slip_deduction/:doctypeId", title: "Salary Slip Deduction", parent: "setup.customize.doctype", controller: "DoctypesSalarySlipDeductionController"});
	this.route("setup.customize.doctype.doctypes.salary_slip_earning", {path: "/setup/customize/doctype/doctypes/salary_slip_earning/:doctypeId", title: "Salary Slip Earning", parent: "setup.customize.doctype", controller: "DoctypesSalarySlipEarningController"});
	this.route("setup.customize.doctype.doctypes.salary_structure", {path: "/setup/customize/doctype/doctypes/salary_structure/:doctypeId", title: "Salary Structure", parent: "setup.customize.doctype", controller: "DoctypesSalaryStructureController"});
	this.route("setup.customize.doctype.doctypes.salary_structure_deduction", {path: "/setup/customize/doctype/doctypes/salary_structure_deduction/:doctypeId", title: "Salary Structure Deduction", parent: "setup.customize.doctype", controller: "DoctypesSalaryStructureDeductionController"});
	this.route("setup.customize.doctype.doctypes.salary_structure_earning", {path: "/setup/customize/doctype/doctypes/salary_structure_earning/:doctypeId", title: "Salary Structure Earning", parent: "setup.customize.doctype", controller: "DoctypesSalaryStructureEarningController"});
	this.route("setup.customize.doctype.doctypes.sales_invoice", {path: "/setup/customize/doctype/doctypes/sales_invoice/:doctypeId", title: "Sales Invoice", parent: "setup.customize.doctype", controller: "DoctypesSalesInvoiceController"});
	this.route("setup.customize.doctype.doctypes.sales_invoice_advance", {path: "/setup/customize/doctype/doctypes/sales_invoice_advance/:doctypeId", title: "Sales Invoice Advance", parent: "setup.customize.doctype", controller: "DoctypesSalesInvoiceAdvanceController"});
	this.route("setup.customize.doctype.doctypes.sales_invoice_item", {path: "/setup/customize/doctype/doctypes/sales_invoice_item/:doctypeId", title: "Sales Invoice Item", parent: "setup.customize.doctype", controller: "DoctypesSalesInvoiceItemController"});
	this.route("setup.customize.doctype.doctypes.sales_order", {path: "/setup/customize/doctype/doctypes/sales_order/:doctypeId", title: "Sales Order", parent: "setup.customize.doctype", controller: "DoctypesSalesOrderController"});
	this.route("setup.customize.doctype.doctypes.sales_order_item", {path: "/setup/customize/doctype/doctypes/sales_order_item/:doctypeId", title: "Sales Order Item", parent: "setup.customize.doctype", controller: "DoctypesSalesOrderItemController"});
	this.route("setup.customize.doctype.doctypes.sales_partner", {path: "/setup/customize/doctype/doctypes/sales_partner/:doctypeId", title: "Sales Partner", parent: "setup.customize.doctype", controller: "DoctypesSalesPartnerController"});
	this.route("setup.customize.doctype.doctypes.sales_person", {path: "/setup/customize/doctype/doctypes/sales_person/:doctypeId", title: "Sales Person", parent: "setup.customize.doctype", controller: "DoctypesSalesPersonController"});
	this.route("setup.customize.doctype.doctypes.sales_taxes_and_charges", {path: "/setup/customize/doctype/doctypes/sales_taxes_and_charges/:doctypeId", title: "Sales Taxes and Charges", parent: "setup.customize.doctype", controller: "DoctypesSalesTaxesAndChargesController"});
	this.route("setup.customize.doctype.doctypes.sales_taxes_and_charges_template", {path: "/setup/customize/doctype/doctypes/sales_taxes_and_charges_template/:doctypeId", title: "Sales Taxes and Charges Template", parent: "setup.customize.doctype", controller: "DoctypesSalesTaxesAndChargesTemplateController"});
	this.route("setup.customize.doctype.doctypes.sales_team", {path: "/setup/customize/doctype/doctypes/sales_team/:doctypeId", title: "Sales Team", parent: "setup.customize.doctype", controller: "DoctypesSalesTeamController"});
	this.route("setup.customize.doctype.doctypes.scheduler_log", {path: "/setup/customize/doctype/doctypes/scheduler_log/:doctypeId", title: "Scheduler Log", parent: "setup.customize.doctype", controller: "DoctypesSchedulerLogController"});
	this.route("setup.customize.doctype.doctypes.selling_settings", {path: "/setup/customize/doctype/doctypes/selling_settings/:doctypeId", title: "Selling Settings", parent: "setup.customize.doctype", controller: "DoctypesSellingSettingsController"});
	this.route("setup.customize.doctype.doctypes.serial_no", {path: "/setup/customize/doctype/doctypes/serial_no/:doctypeId", title: "Serial No", parent: "setup.customize.doctype", controller: "DoctypesSerialNoController"});
	this.route("setup.customize.doctype.doctypes.shipping_rule", {path: "/setup/customize/doctype/doctypes/shipping_rule/:doctypeId", title: "Shipping Rule", parent: "setup.customize.doctype", controller: "DoctypesShippingRuleController"});
	this.route("setup.customize.doctype.doctypes.shipping_rule_condition", {path: "/setup/customize/doctype/doctypes/shipping_rule_condition/:doctypeId", title: "Shipping Rule Condition", parent: "setup.customize.doctype", controller: "DoctypesShippingRuleConditionController"});
	this.route("setup.customize.doctype.doctypes.shipping_rule_country", {path: "/setup/customize/doctype/doctypes/shipping_rule_country/:doctypeId", title: "Shipping Rule Country", parent: "setup.customize.doctype", controller: "DoctypesShippingRuleCountryController"});
	this.route("setup.customize.doctype.doctypes.shopping_cart_settings", {path: "/setup/customize/doctype/doctypes/shopping_cart_settings/:doctypeId", title: "Shopping Cart Settings", parent: "setup.customize.doctype", controller: "DoctypesShoppingCartSettingsController"});
	this.route("setup.customize.doctype.doctypes.sms_center", {path: "/setup/customize/doctype/doctypes/sms_center/:doctypeId", title: "SMS Center", parent: "setup.customize.doctype", controller: "DoctypesSmsCenterController"});
	this.route("setup.customize.doctype.doctypes.sms_log", {path: "/setup/customize/doctype/doctypes/sms_log/:doctypeId", title: "SMS Log", parent: "setup.customize.doctype", controller: "DoctypesSmsLogController"});
	this.route("setup.customize.doctype.doctypes.sms_parameter", {path: "/setup/customize/doctype/doctypes/sms_parameter/:doctypeId", title: "SMS Parameter", parent: "setup.customize.doctype", controller: "DoctypesSmsParameterController"});
	this.route("setup.customize.doctype.doctypes.sms_settings", {path: "/setup/customize/doctype/doctypes/sms_settings/:doctypeId", title: "SMS Settings", parent: "setup.customize.doctype", controller: "DoctypesSmsSettingsController"});
	this.route("setup.customize.doctype.doctypes.social_login_keys", {path: "/setup/customize/doctype/doctypes/social_login_keys/:doctypeId", title: "Social Login Keys", parent: "setup.customize.doctype", controller: "DoctypesSocialLoginKeysController"});
	this.route("setup.customize.doctype.doctypes.standard_reply", {path: "/setup/customize/doctype/doctypes/standard_reply/:doctypeId", title: "Standard Reply", parent: "setup.customize.doctype", controller: "DoctypesStandardReplyController"});
	this.route("setup.customize.doctype.doctypes.stock_entry", {path: "/setup/customize/doctype/doctypes/stock_entry/:doctypeId", title: "Stock Entry", parent: "setup.customize.doctype", controller: "DoctypesStockEntryController"});
	this.route("setup.customize.doctype.doctypes.stock_entry_detail", {path: "/setup/customize/doctype/doctypes/stock_entry_detail/:doctypeId", title: "Stock Entry Detail", parent: "setup.customize.doctype", controller: "DoctypesStockEntryDetailController"});
	this.route("setup.customize.doctype.doctypes.stock_ledger_entry", {path: "/setup/customize/doctype/doctypes/stock_ledger_entry/:doctypeId", title: "Stock Ledger Entry", parent: "setup.customize.doctype", controller: "DoctypesStockLedgerEntryController"});
	this.route("setup.customize.doctype.doctypes.stock_reconciliation", {path: "/setup/customize/doctype/doctypes/stock_reconciliation/:doctypeId", title: "Stock Reconciliation", parent: "setup.customize.doctype", controller: "DoctypesStockReconciliationController"});
	this.route("setup.customize.doctype.doctypes.stock_reconcilitation_item", {path: "/setup/customize/doctype/doctypes/stock_reconcilitation_item/:doctypeId", title: "Stock Reconciliation Item", parent: "setup.customize.doctype", controller: "DoctypesStockReconciliationItemController"});
	this.route("setup.customize.doctype.doctypes.stock_settings", {path: "/setup/customize/doctype/doctypes/stock_settings/:doctypeId", title: "Stock Settings", parent: "setup.customize.doctype", controller: "DoctypesStockSettingsController"});
	this.route("setup.customize.doctype.doctypes.stock_uom_replace_utility", {path: "/setup/customize/doctype/doctypes/stock_uom_replace_utility/:doctypeId", title: "Stock UOM Replace Utility", parent: "setup.customize.doctype", controller: "DoctypesStockUomReplaceUtilityController"});
	this.route("setup.customize.doctype.doctypes.supplier", {path: "/setup/customize/doctype/doctypes/supplier/:doctypeId", title: "Supplier", parent: "setup.customize.doctype", controller: "DoctypesSupplierController"});
	this.route("setup.customize.doctype.doctypes.supplier_quotation", {path: "/setup/customize/doctype/doctypes/supplier_quotation/:doctypeId", title: "Supplier Quotation", parent: "setup.customize.doctype", controller: "DoctypesSupplierQuotationController"});
	this.route("setup.customize.doctype.doctypes.supplier_quotation_item", {path: "/setup/customize/doctype/doctypes/supplier_quotation_item/:doctypeId", title: "Supplier Quotation Item", parent: "setup.customize.doctype", controller: "DoctypesSupplierQuotationItemController"});
	this.route("setup.customize.doctype.doctypes.supplier_type", {path: "/setup/customize/doctype/doctypes/supplier_type/:doctypeId", title: "Supplier Type", parent: "setup.customize.doctype", controller: "DoctypesSupplierTypeController"});
	this.route("setup.customize.doctype.doctypes.system_settings", {path: "/setup/customize/doctype/doctypes/system_settings/:doctypeId", title: "System Settings", parent: "setup.customize.doctype", controller: "DoctypesSystemSettingsController"});
	this.route("setup.customize.doctype.doctypes.target_detail", {path: "/setup/customize/doctype/doctypes/target_detail/:doctypeId", title: "Target Detail", parent: "setup.customize.doctype", controller: "DoctypesTargetDetailController"});
	this.route("setup.customize.doctype.doctypes.task", {path: "/setup/customize/doctype/doctypes/task/:doctypeId", title: "Task", parent: "setup.customize.doctype", controller: "DoctypesTaskController"});
	this.route("setup.customize.doctype.doctypes.task_depends_on", {path: "/setup/customize/doctype/doctypes/task_depends_on/:doctypeId", title: "Task Depends On", parent: "setup.customize.doctype", controller: "DoctypesTaskDependsOnController"});
	this.route("setup.customize.doctype.doctypes.tax_rule", {path: "/setup/customize/doctype/doctypes/tax_rule/:doctypeId", title: "Tax Rule", parent: "setup.customize.doctype", controller: "DoctypesTaxRuleController"});
	this.route("setup.customize.doctype.doctypes.terms_and_conditions", {path: "/setup/customize/doctype/doctypes/terms_and_conditions/:doctypeId", title: "Terms and Conditions", parent: "setup.customize.doctype", controller: "DoctypesTermsAndConditionsController"});
	this.route("setup.customize.doctype.doctypes.territory", {path: "/setup/customize/doctype/doctypes/territory/:doctypeId", title: "Territory", parent: "setup.customize.doctype", controller: "DoctypesTerritoryController"});
	this.route("setup.customize.doctype.doctypes.time_log", {path: "/setup/customize/doctype/doctypes/time_log/:doctypeId", title: "Time Log", parent: "setup.customize.doctype", controller: "DoctypesTimeLogController"});
	this.route("setup.customize.doctype.doctypes.time_log_batch", {path: "/setup/customize/doctype/doctypes/time_log_batch/:doctypeId", title: "Time Log Batch", parent: "setup.customize.doctype", controller: "DoctypesTimeLogBatchController"});
	this.route("setup.customize.doctype.doctypes.time_log_batch_detail", {path: "/setup/customize/doctype/doctypes/time_log_batch_detail/:doctypeId", title: "Time Log Batch Detail", parent: "setup.customize.doctype", controller: "DoctypesTimeLogBatchDetailController"});
	this.route("setup.customize.doctype.doctypes.todo", {path: "/setup/customize/doctype/doctypes/todo/:doctypeId", title: "Todo", parent: "setup.customize.doctype", controller: "DoctypesTodoController"});
	this.route("setup.customize.doctype.doctypes.top_bar_item", {path: "/setup/customize/doctype/doctypes/top_bar_item/:doctypeId", title: "Top Bar Item", parent: "setup.customize.doctype", controller: "DoctypesTopBarItemController"});
	this.route("setup.customize.doctype.doctypes.uom", {path: "/setup/customize/doctype/doctypes/uom/:doctypeId", title: "UOM", parent: "setup.customize.doctype", controller: "DoctypesUomController"});
	this.route("setup.customize.doctype.doctypes.uom_conversion_detail", {path: "/setup/customize/doctype/doctypes/uom_conversion_detail/:doctypeId", title: "UOM Conversion Detail", parent: "setup.customize.doctype", controller: "DoctypesUomConversionDetailController"});
	this.route("setup.customize.doctype.doctypes.upload_attendance", {path: "/setup/customize/doctype/doctypes/upload_attendance/:doctypeId", title: "Upload Attendance", parent: "setup.customize.doctype", controller: "DoctypesUploadAttendanceController"});
	this.route("setup.customize.doctype.doctypes.user", {path: "/setup/customize/doctype/doctypes/user/:doctypeId", title: "User", parent: "setup.customize.doctype", controller: "DoctypesUserController"});
	this.route("setup.customize.doctype.doctypes.user_role", {path: "/setup/customize/doctype/doctypes/user_role/:doctypeId", title: "User Role", parent: "setup.customize.doctype", controller: "DoctypesUserRoleController"});
	this.route("setup.customize.doctype.doctypes.version", {path: "/setup/customize/doctype/doctypes/version/:doctypeId", title: "Version", parent: "setup.customize.doctype", controller: "DoctypesVersionController"});
	this.route("setup.customize.doctype.doctypes.warehouse", {path: "/setup/customize/doctype/doctypes/warehouse/:doctypeId", title: "Warehouse", parent: "setup.customize.doctype", controller: "DoctypesWarehouseController"});
	this.route("setup.customize.doctype.doctypes.warranty_claim", {path: "/setup/customize/doctype/doctypes/warranty_claim/:doctypeId", title: "Warranty Claim", parent: "setup.customize.doctype", controller: "DoctypesWarrantyClaimController"});
	this.route("setup.customize.doctype.doctypes.web_form", {path: "/setup/customize/doctype/doctypes/web_form/:doctypeId", title: "Web Form", parent: "setup.customize.doctype", controller: "DoctypesWebFormController"});
	this.route("setup.customize.doctype.doctypes.web_form_field", {path: "/setup/customize/doctype/doctypes/web_form_field/:doctypeId", title: "Web Form Field", parent: "setup.customize.doctype", controller: "DoctypesWebFormFieldController"});
	this.route("setup.customize.doctype.doctypes.web_page", {path: "/setup/customize/doctype/doctypes/web_page/:doctypeId", title: "Web Page", parent: "setup.customize.doctype", controller: "DoctypesWebPageController"});
	this.route("setup.customize.doctype.doctypes.website_item_group", {path: "/setup/customize/doctype/doctypes/website_item_group/:doctypeId", title: "Website Item Group", parent: "setup.customize.doctype", controller: "DoctypesWebsiteItemGroupController"});
	this.route("setup.customize.doctype.doctypes.website_script", {path: "/setup/customize/doctype/doctypes/website_script/:doctypeId", title: "Website Script", parent: "setup.customize.doctype", controller: "DoctypesWebsiteScriptController"});
	this.route("setup.customize.doctype.doctypes.website_settings", {path: "/setup/customize/doctype/doctypes/website_settings/:doctypeId", title: "Website Settings", parent: "setup.customize.doctype", controller: "DoctypesWebsiteSettingsController"});
	this.route("setup.customize.doctype.doctypes.website_slideshow", {path: "/setup/customize/doctype/doctypes/website_slideshow/:doctypeId", title: "Website Slideshow", parent: "setup.customize.doctype", controller: "DoctypesWebsiteSlideshowController"});
	this.route("setup.customize.doctype.doctypes.website_slideshow_item", {path: "/setup/customize/doctype/doctypes/website_slideshow_item/:doctypeId", title: "Website Slideshow Item", parent: "setup.customize.doctype", controller: "DoctypesWebsiteSlideshowItemController"});
	this.route("setup.customize.doctype.doctypes.website_theme", {path: "/setup/customize/doctype/doctypes/website_theme/:doctypeId", title: "Website Theme", parent: "setup.customize.doctype", controller: "DoctypesWebsiteThemeController"});
	this.route("setup.customize.doctype.doctypes.workflow", {path: "/setup/customize/doctype/doctypes/workflow/:doctypeId", title: "Workflow", parent: "setup.customize.doctype", controller: "DoctypesWorkflowController"});
	this.route("setup.customize.doctype.doctypes.workflow_action", {path: "/setup/customize/doctype/doctypes/workflow_action/:doctypeId", title: "Workflow Action", parent: "setup.customize.doctype", controller: "DoctypesWorkflowActionController"});
	this.route("setup.customize.doctype.doctypes.workflow_document_state", {path: "/setup/customize/doctype/doctypes/workflow_document_state/:doctypeId", title: "Workflow Document State", parent: "setup.customize.doctype", controller: "DoctypesWorkflowDocumentStateController"});
	this.route("setup.customize.doctype.doctypes.workflow_state", {path: "/setup/customize/doctype/doctypes/workflow_state/:doctypeId", title: "Workflow State", parent: "setup.customize.doctype", controller: "DoctypesWorkflowStateController"});
	this.route("setup.customize.doctype.doctypes.workflow_transition", {path: "/setup/customize/doctype/doctypes/workflow_transition/:doctypeId", title: "Workflow Transition", parent: "setup.customize.doctype", controller: "DoctypesWorkflowTransitionController"});
	this.route("setup.customize.doctype.doctypes.workstation", {path: "/setup/customize/doctype/doctypes/workstation/:doctypeId", title: "Workstation", parent: "setup.customize.doctype", controller: "DoctypesWorkstationController"});
	this.route("setup.customize.doctype.doctypes.workstation_working_hour", {path: "/setup/customize/doctype/doctypes/workstation_working_hour/:doctypeId", title: "Workstation Working Hour", parent: "setup.customize.doctype", controller: "DoctypesWorkstationWorkingHourController"});
	this.route("setup.customize.email_notifications", {path: "/setup/customize/email_notifications", title: "Notification Control", parent: "setup.customize", controller: "SetupCustomizeEmailNotificationsController"});
	this.route("setup.customize.features_setup", {path: "/setup/customize/features_setup", title: "Features Setup", parent: "setup.customize", controller: "SetupCustomizeFeaturesSetupController"});
	this.route("setup.data", {path: "/setup/data", title: "Data", parent: "dashboard", controller: "SetupDataController"});
	this.route("setup.data.import_export_data", {path: "/setup/data/import_export_data", title: "Data Import Tool", parent: "setup.data", controller: "SetupDataImportExportDataController"});
	this.route("setup.data.rename_tool", {path: "/setup/data/rename_tool", title: "Rename Tool", parent: "setup.data", controller: "SetupDataRenameToolController"});
	this.route("setup.email", {path: "/setup/email", title: "Email", parent: "dashboard", controller: "SetupEmailController"});
	this.route("setup.email.email_account", {path: "/setup/email/email_account", title: "Email Account", parent: "setup.email", controller: "SetupEmailEmailAccountController"});
	this.route("setup.email.email_account.details", {path: "/setup/email/email_account/details/:emailAccountId", title: "Details", parent: "setup.email.email_account", controller: "EmailAccountDetailsController"});
	this.route("setup.email.email_account.edit", {path: "/setup/email/email_account/edit/:emailAccountId", title: "Edit", parent: "setup.email.email_account", controller: "EmailAccountEditController"});
	this.route("setup.email.email_account.insert", {path: "/setup/email/email_account/insert", title: "New", parent: "setup.email.email_account", controller: "EmailAccountInsertController"});
	this.route("setup.email.email_alert", {path: "/setup/email/email_alert", title: "Email Alert", parent: "setup.email", controller: "SetupEmailEmailAlertController"});
	this.route("setup.email.email_alert.details", {path: "/setup/email/email_alert/details/:emailAlertId", title: "Details", parent: "setup.email.email_alert", controller: "EmailAlertDetailsController"});
	this.route("setup.email.email_alert.edit", {path: "/setup/email/email_alert/edit/:emailAlertId", title: "Edit", parent: "setup.email.email_alert", controller: "EmailAlertEditController"});
	this.route("setup.email.email_alert.insert", {path: "/setup/email/email_alert/insert", title: "New", parent: "setup.email.email_alert", controller: "EmailAlertInsertController"});
	this.route("setup.email.email_digest", {path: "/setup/email/email_digest", title: "Email Digest", parent: "setup.email", controller: "SetupEmailEmailDigestController"});
	this.route("setup.email.email_digest.details", {path: "/setup/email/email_digest/details/:emailDigestId", title: "Details", parent: "setup.email.email_digest", controller: "EmailDigestDetailsController"});
	this.route("setup.email.email_digest.edit", {path: "/setup/email/email_digest/edit/:emailDigestId", title: "Edit", parent: "setup.email.email_digest", controller: "EmailDigestEditController"});
	this.route("setup.email.email_digest.insert", {path: "/setup/email/email_digest/insert", title: "New", parent: "setup.email.email_digest", controller: "EmailDigestInsertController"});
	this.route("setup.email.sms_settings", {path: "/setup/email/sms_settings", title: "SMS Settings", parent: "setup.email", controller: "SetupEmailSmsSettingsController"});
	this.route("setup.email.standard_reply", {path: "/setup/email/standard_reply", title: "Standard Reply", parent: "setup.email", controller: "SetupEmailStandardReplyController"});
	this.route("setup.email.standard_reply.details", {path: "/setup/email/standard_reply/details/:standardReplyId", title: "Details", parent: "setup.email.standard_reply", controller: "StandardReplyDetailsController"});
	this.route("setup.email.standard_reply.edit", {path: "/setup/email/standard_reply/edit/:standardReplyId", title: "Edit", parent: "setup.email.standard_reply", controller: "StandardReplyEditController"});
	this.route("setup.email.standard_reply.insert", {path: "/setup/email/standard_reply/insert", title: "New", parent: "setup.email.standard_reply", controller: "StandardReplyInsertController"});
	this.route("setup.help", {path: "/setup/help", title: "Help", parent: "dashboard", controller: "SetupHelpController"});
	this.route("setup.help.data_import_and_export", {path: "/setup/help/data_import_and_export", title: "Data Import and Export", parent: "setup.help", controller: "SetupHelpDataImportAndExportController"});
	this.route("setup.help.printing_and_branding", {path: "/setup/help/printing_and_branding", title: "Printing and Branding", parent: "setup.help", controller: "SetupHelpPrintingAndBrandingController"});
	this.route("setup.help.setting_up_email", {path: "/setup/help/setting_up_email", title: "Setting Up Email", parent: "setup.help", controller: "SetupHelpSettingUpEmailController"});
	this.route("setup.help.users_and_permissions", {path: "/setup/help/users_and_permissions", title: "Users and Permissions", parent: "setup.help", controller: "SetupHelpUsersAndPermissionsController"});
	this.route("setup.help.workflow", {path: "/setup/help/workflow", title: "Workflow", parent: "setup.help", controller: "SetupHelpWorkflowController"});
	this.route("setup.human_resources", {path: "/setup/human_resources", title: "Human Resources", parent: "dashboard", controller: "SetupHumanResourcesController"});
	this.route("setup.human_resources.appraisal_template", {path: "/setup/human_resources/appraisal_template", title: "Appraisal Template", parent: "setup.human_resources", controller: "SetupHumanResourcesAppraisalTemplateController"});
	this.route("setup.human_resources.appraisal_template.details", {path: "/setup/human_resources/appraisal_template/details/:appraisalTemplateId", title: "Details", parent: "setup.human_resources.appraisal_template", controller: "AppraisalTemplateDetailsController"});
	this.route("setup.human_resources.appraisal_template.edit", {path: "/setup/human_resources/appraisal_template/edit/:appraisalTemplateId", title: "Edit", parent: "setup.human_resources.appraisal_template", controller: "AppraisalTemplateEditController"});
	this.route("setup.human_resources.appraisal_template.insert", {path: "/setup/human_resources/appraisal_template/insert", title: "New", parent: "setup.human_resources.appraisal_template", controller: "AppraisalTemplateInsertController"});
	this.route("setup.human_resources.branch", {path: "/setup/human_resources/branch", title: "Branch", parent: "setup.human_resources", controller: "SetupHumanResourcesBranchController"});
	this.route("setup.human_resources.branch.details", {path: "/setup/human_resources/branch/details/:branchId", title: "Details", parent: "setup.human_resources.branch", controller: "BranchDetailsController"});
	this.route("setup.human_resources.branch.edit", {path: "/setup/human_resources/branch/edit/:branchId", title: "Edit", parent: "setup.human_resources.branch", controller: "BranchEditController"});
	this.route("setup.human_resources.branch.insert", {path: "/setup/human_resources/branch/insert", title: "New", parent: "setup.human_resources.branch", controller: "BranchInsertController"});
	this.route("setup.human_resources.deduction_type", {path: "/setup/human_resources/deduction_type", title: "Deduction Type", parent: "setup.human_resources", controller: "SetupHumanResourcesDeductionTypeController"});
	this.route("setup.human_resources.deduction_type.details", {path: "/setup/human_resources/deduction_type/details/:deductionTypeId", title: "Details", parent: "setup.human_resources.deduction_type", controller: "DeductionTypeDetailsController"});
	this.route("setup.human_resources.deduction_type.edit", {path: "/setup/human_resources/deduction_type/edit/:deductionTypeId", title: "Edit", parent: "setup.human_resources.deduction_type", controller: "DeductionTypeEditController"});
	this.route("setup.human_resources.deduction_type.insert", {path: "/setup/human_resources/deduction_type/insert", title: "New", parent: "setup.human_resources.deduction_type", controller: "DeductionTypeInsertController"});
	this.route("setup.human_resources.department", {path: "/setup/human_resources/department", title: "Department", parent: "setup.human_resources", controller: "SetupHumanResourcesDepartmentController"});
	this.route("setup.human_resources.department.details", {path: "/setup/human_resources/department/details/:departmentId", title: "Details", parent: "setup.human_resources.department", controller: "DepartmentDetailsController"});
	this.route("setup.human_resources.department.edit", {path: "/setup/human_resources/department/edit/:departmentId", title: "Edit", parent: "setup.human_resources.department", controller: "DepartmentEditController"});
	this.route("setup.human_resources.department.insert", {path: "/setup/human_resources/department/insert", title: "New", parent: "setup.human_resources.department", controller: "DepartmentInsertController"});
	this.route("setup.human_resources.designation", {path: "/setup/human_resources/designation", title: "Designation", parent: "setup.human_resources", controller: "SetupHumanResourcesDesignationController"});
	this.route("setup.human_resources.designation.details", {path: "/setup/human_resources/designation/details/:designationId", title: "Details", parent: "setup.human_resources.designation", controller: "DesignationDetailsController"});
	this.route("setup.human_resources.designation.edit", {path: "/setup/human_resources/designation/edit/:designationId", title: "Edit", parent: "setup.human_resources.designation", controller: "DesignationEditController"});
	this.route("setup.human_resources.designation.insert", {path: "/setup/human_resources/designation/insert", title: "New", parent: "setup.human_resources.designation", controller: "DesignationInsertController"});
	this.route("setup.human_resources.earning_type", {path: "/setup/human_resources/earning_type", title: "Earning Type", parent: "setup.human_resources", controller: "SetupHumanResourcesEarningTypeController"});
	this.route("setup.human_resources.earning_type.details", {path: "/setup/human_resources/earning_type/details/:earningTypeId", title: "Details", parent: "setup.human_resources.earning_type", controller: "EarningTypeDetailsController"});
	this.route("setup.human_resources.earning_type.edit", {path: "/setup/human_resources/earning_type/edit/:earningTypeId", title: "Edit", parent: "setup.human_resources.earning_type", controller: "EarningTypeEditController"});
	this.route("setup.human_resources.earning_type.insert", {path: "/setup/human_resources/earning_type/insert", title: "New", parent: "setup.human_resources.earning_type", controller: "EarningTypeInsertController"});
	this.route("setup.human_resources.employment_type", {path: "/setup/human_resources/employment_type", title: "Employment Type", parent: "setup.human_resources", controller: "SetupHumanResourcesEmploymentTypeController"});
	this.route("setup.human_resources.employment_type.details", {path: "/setup/human_resources/employment_type/details/:employmentTypeId", title: "Details", parent: "setup.human_resources.employment_type", controller: "EmploymentTypeDetailsController"});
	this.route("setup.human_resources.employment_type.edit", {path: "/setup/human_resources/employment_type/edit/:employmentTypeId", title: "Edit", parent: "setup.human_resources.employment_type", controller: "EmploymentTypeEditController"});
	this.route("setup.human_resources.employment_type.insert", {path: "/setup/human_resources/employment_type/insert", title: "New", parent: "setup.human_resources.employment_type", controller: "EmploymentTypeInsertController"});
	this.route("setup.human_resources.expense_claim_type", {path: "/setup/human_resources/expense_claim_type", title: "Expense Claim Type", parent: "setup.human_resources", controller: "SetupHumanResourcesExpenseClaimTypeController"});
	this.route("setup.human_resources.expense_claim_type.details", {path: "/setup/human_resources/expense_claim_type/details/:expenseClaimTypeId", title: "Details", parent: "setup.human_resources.expense_claim_type", controller: "ExpenseClaimTypeDetailsController"});
	this.route("setup.human_resources.expense_claim_type.edit", {path: "/setup/human_resources/expense_claim_type/edit/:expenseClaimTypeId", title: "Edit", parent: "setup.human_resources.expense_claim_type", controller: "ExpenseClaimTypeEditController"});
	this.route("setup.human_resources.expense_claim_type.insert", {path: "/setup/human_resources/expense_claim_type/insert", title: "New", parent: "setup.human_resources.expense_claim_type", controller: "ExpenseClaimTypeInsertController"});
	this.route("setup.human_resources.holiday_list", {path: "/setup/human_resources/holiday_list", title: "Holiday List", parent: "setup.human_resources", controller: "SetupHumanResourcesHolidayListController"});
	this.route("setup.human_resources.holiday_list.details", {path: "/setup/human_resources/holiday_list/details/:holidayListId", title: "Details", parent: "setup.human_resources.holiday_list", controller: "HolidayListDetailsController"});
	this.route("setup.human_resources.holiday_list.edit", {path: "/setup/human_resources/holiday_list/edit/:holidayListId", title: "Edit", parent: "setup.human_resources.holiday_list", controller: "HolidayListEditController"});
	this.route("setup.human_resources.holiday_list.insert", {path: "/setup/human_resources/holiday_list/insert", title: "New", parent: "setup.human_resources.holiday_list", controller: "HolidayListInsertController"});
	this.route("setup.human_resources.hr_settings", {path: "/setup/human_resources/hr_settings", title: "HR Settings", parent: "setup.human_resources", controller: "SetupHumanResourcesHrSettingsController"});
	this.route("setup.human_resources.leave_allocation", {path: "/setup/human_resources/leave_allocation", title: "Leave Allocation", parent: "setup.human_resources", controller: "SetupHumanResourcesLeaveAllocationController"});
	this.route("setup.human_resources.leave_allocation.details", {path: "/setup/human_resources/leave_allocation/details/:leaveAllocationId", title: "Details", parent: "setup.human_resources.leave_allocation", controller: "LeaveAllocationDetailsController"});
	this.route("setup.human_resources.leave_allocation.edit", {path: "/setup/human_resources/leave_allocation/edit/:leaveAllocationId", title: "Edit", parent: "setup.human_resources.leave_allocation", controller: "LeaveAllocationEditController"});
	this.route("setup.human_resources.leave_allocation.insert", {path: "/setup/human_resources/leave_allocation/insert", title: "New", parent: "setup.human_resources.leave_allocation", controller: "LeaveAllocationInsertController"});
	this.route("setup.human_resources.leave_block_list", {path: "/setup/human_resources/leave_block_list", title: "Leave Block List", parent: "setup.human_resources", controller: "SetupHumanResourcesLeaveBlockListController"});
	this.route("setup.human_resources.leave_block_list.details", {path: "/setup/human_resources/leave_block_list/details/:leaveBlockListId", title: "Details", parent: "setup.human_resources.leave_block_list", controller: "LeaveBlockListDetailsController"});
	this.route("setup.human_resources.leave_block_list.edit", {path: "/setup/human_resources/leave_block_list/edit/:leaveBlockListId", title: "Edit", parent: "setup.human_resources.leave_block_list", controller: "LeaveBlockListEditController"});
	this.route("setup.human_resources.leave_block_list.insert", {path: "/setup/human_resources/leave_block_list/insert", title: "New", parent: "setup.human_resources.leave_block_list", controller: "LeaveBlockListInsertController"});
	this.route("setup.human_resources.leave_type", {path: "/setup/human_resources/leave_type", title: "Leave Type", parent: "setup.human_resources", controller: "SetupHumanResourcesLeaveTypeController"});
	this.route("setup.human_resources.leave_type.details", {path: "/setup/human_resources/leave_type/details/:leaveTypeId", title: "Details", parent: "setup.human_resources.leave_type", controller: "LeaveTypeDetailsController"});
	this.route("setup.human_resources.leave_type.edit", {path: "/setup/human_resources/leave_type/edit/:leaveTypeId", title: "Edit", parent: "setup.human_resources.leave_type", controller: "LeaveTypeEditController"});
	this.route("setup.human_resources.leave_type.insert", {path: "/setup/human_resources/leave_type/insert", title: "New", parent: "setup.human_resources.leave_type", controller: "LeaveTypeInsertController"});
	this.route("setup.human_resources.salary_structure", {path: "/setup/human_resources/salary_structure", title: "Salary Structure", parent: "setup.human_resources", controller: "SetupHumanResourcesSalaryStructureController"});
	this.route("setup.human_resources.salary_structure.details", {path: "/setup/human_resources/salary_structure/details/:salaryStructureId", title: "Details", parent: "setup.human_resources.salary_structure", controller: "SalaryStructureDetailsController"});
	this.route("setup.human_resources.salary_structure.edit", {path: "/setup/human_resources/salary_structure/edit/:salaryStructureId", title: "Edit", parent: "setup.human_resources.salary_structure", controller: "SalaryStructureEditController"});
	this.route("setup.human_resources.salary_structure.insert", {path: "/setup/human_resources/salary_structure/insert", title: "New", parent: "setup.human_resources.salary_structure", controller: "SalaryStructureInsertController"});
	this.route("setup.integrations", {path: "/setup/integrations", title: "Integrations", parent: "dashboard", controller: "SetupIntegrationsController"});
	this.route("setup.integrations.dropbox_backup", {path: "/setup/integrations/dropbox_backup", title: "Dropbox Backup", parent: "setup.integrations", controller: "SetupIntegrationsDropboxBackupController"});
	this.route("setup.integrations.social_login_keys", {path: "/setup/integrations/social_login_keys", title: "Social Login Keys", parent: "setup.integrations", controller: "SetupIntegrationsSocialLoginKeysController"});
	this.route("setup.permissions", {path: "/setup/permissions", title: "Permissions", parent: "dashboard", controller: "SetupPermissionsController"});
	this.route("setup.permissions.document_share_report", {path: "/setup/permissions/document_share_report", title: "Document Share Report", parent: "setup.permissions", controller: "SetupPermissionsDocumentShareReportController"});
	this.route("setup.permissions.permitted_documents_for_user", {path: "/setup/permissions/permitted_documents_for_user", title: "Permitted Documents for User", parent: "setup.permissions", controller: "SetupPermissionsPermittedDocumentsForUserController"});
	this.route("setup.permissions.role_permissions_manager", {path: "/setup/permissions/role_permissions_manager", title: "Role Permissions Manager", parent: "setup.permissions", controller: "SetupPermissionsRolePermissionsManagerController"});
	this.route("setup.permissions.user_permissions_manager", {path: "/setup/permissions/user_permissions_manager", title: "User Permissions Manager", parent: "setup.permissions", controller: "SetupPermissionsUserPermissionsManagerController"});
	this.route("setup.printing", {path: "/setup/printing", title: "Printing", parent: "dashboard", controller: "SetupPrintingController"});
	this.route("setup.printing.address_template", {path: "/setup/printing/address_template", title: "Address Template", parent: "setup.printing", controller: "SetupPrintingAddressTemplateController"});
	this.route("setup.printing.address_template.details", {path: "/setup/printing/address_template/details/:addressTemplateId", title: "Details", parent: "setup.printing.address_template", controller: "AddressTemplateDetailsController"});
	this.route("setup.printing.address_template.edit", {path: "/setup/printing/address_template/edit/:addressTemplateId", title: "Edit", parent: "setup.printing.address_template", controller: "AddressTemplateEditController"});
	this.route("setup.printing.address_template.insert", {path: "/setup/printing/address_template/insert", title: "New", parent: "setup.printing.address_template", controller: "AddressTemplateInsertController"});
	this.route("setup.printing.letter_head", {path: "/setup/printing/letter_head", title: "Letter Head", parent: "setup.printing", controller: "SetupPrintingLetterHeadController"});
	this.route("setup.printing.letter_head.details", {path: "/setup/printing/letter_head/details/:letterHeadId", title: "Details", parent: "setup.printing.letter_head", controller: "LetterHeadDetailsController"});
	this.route("setup.printing.letter_head.edit", {path: "/setup/printing/letter_head/edit/:letterHeadId", title: "Edit", parent: "setup.printing.letter_head", controller: "LetterHeadEditController"});
	this.route("setup.printing.letter_head.insert", {path: "/setup/printing/letter_head/insert", title: "New", parent: "setup.printing.letter_head", controller: "LetterHeadInsertController"});
	this.route("setup.printing.print_format", {path: "/setup/printing/print_format", title: "Print Format", parent: "setup.printing", controller: "SetupPrintingPrintFormatController"});
	this.route("setup.printing.print_format.details", {path: "/setup/printing/print_format/details/:printFormatId", title: "Details", parent: "setup.printing.print_format", controller: "PrintFormatDetailsController"});
	this.route("setup.printing.print_format.edit", {path: "/setup/printing/print_format/edit/:printFormatId", title: "Edit", parent: "setup.printing.print_format", controller: "PrintFormatEditController"});
	this.route("setup.printing.print_format.insert", {path: "/setup/printing/print_format/insert", title: "New", parent: "setup.printing.print_format", controller: "PrintFormatInsertController"});
	this.route("setup.printing.print_format_builder", {path: "/setup/printing/print_format_builder", title: "Print Format Builder", parent: "setup.printing", controller: "SetupPrintingPrintFormatBuilderController"});
	this.route("setup.printing.print_heading", {path: "/setup/printing/print_heading", title: "Print Heading", parent: "setup.printing", controller: "SetupPrintingPrintHeadingController"});
	this.route("setup.printing.print_heading.details", {path: "/setup/printing/print_heading/details/:printHeadingId", title: "Details", parent: "setup.printing.print_heading", controller: "PrintHeadingDetailsController"});
	this.route("setup.printing.print_heading.edit", {path: "/setup/printing/print_heading/edit/:printHeadingId", title: "Edit", parent: "setup.printing.print_heading", controller: "PrintHeadingEditController"});
	this.route("setup.printing.print_heading.insert", {path: "/setup/printing/print_heading/insert", title: "New", parent: "setup.printing.print_heading", controller: "PrintHeadingInsertController"});
	this.route("setup.printing.print_settings", {path: "/setup/printing/print_settings", title: "Print Settings", parent: "setup.printing", controller: "SetupPrintingPrintSettingsController"});
	this.route("setup.printing.terms_and_conditions", {path: "/setup/printing/terms_and_conditions", title: "Terms and Conditions", parent: "setup.printing", controller: "SetupPrintingTermsAndConditionsController"});
	this.route("setup.printing.terms_and_conditions.details", {path: "/setup/printing/terms_and_conditions/details/:termsAndConditionsId", title: "Details", parent: "setup.printing.terms_and_conditions", controller: "TermsAndConditionsDetailsController"});
	this.route("setup.printing.terms_and_conditions.edit", {path: "/setup/printing/terms_and_conditions/edit/:termsAndConditionsId", title: "Edit", parent: "setup.printing.terms_and_conditions", controller: "TermsAndConditionsEditController"});
	this.route("setup.printing.terms_and_conditions.insert", {path: "/setup/printing/terms_and_conditions/insert", title: "New", parent: "setup.printing.terms_and_conditions", controller: "TermsAndConditionsInsertController"});
	this.route("setup.purchasing", {path: "/setup/purchasing", title: "Purchasing", parent: "dashboard", controller: "SetupPurchasingController"});
	this.route("setup.purchasing.purchasing_settings", {path: "/setup/purchasing/purchasing_settings", title: "Purchasing Settings", parent: "setup.purchasing", controller: "SetupPurchasingPurchasingSettingsController"});
	this.route("setup.purchasing.item_group_tree", {path: "/setup/purchasing/item_group_tree", title: "Item Group Tree", parent: "setup.purchasing", controller: "SetupPurchasingItemGroupTreeController"});
	this.route("setup.purchasing.item_price", {path: "/setup/purchasing/item_price", title: "Report: Item Price", parent: "setup.purchasing", controller: "SetupPurchasingItemPriceController"});
	this.route("setup.purchasing.price_list", {path: "/setup/purchasing/price_list", title: "Price List", parent: "setup.purchasing", controller: "SetupPurchasingPriceListController"});
	this.route("setup.purchasing.price_list.details", {path: "/setup/purchasing/price_list/details/:priceListId", title: "Details", parent: "setup.purchasing.price_list", controller: "PriceListDetailsController"});
	this.route("setup.purchasing.price_list.edit", {path: "/setup/purchasing/price_list/edit/:priceListId", title: "Edit", parent: "setup.purchasing.price_list", controller: "PriceListEditController"});
	this.route("setup.purchasing.price_list.insert", {path: "/setup/purchasing/price_list/insert", title: "New", parent: "setup.purchasing.price_list", controller: "PriceListInsertController"});
	this.route("setup.purchasing.supplier_type", {path: "/setup/purchasing/supplier_type", title: "Supplier Type", parent: "setup.purchasing", controller: "SetupPurchasingSupplierTypeController"});
	this.route("setup.purchasing.supplier_type.details", {path: "/setup/purchasing/supplier_type/details/:supplierTypeId", title: "Details", parent: "setup.purchasing.supplier_type", controller: "SupplierTypeDetailsController"});
	this.route("setup.purchasing.supplier_type.edit", {path: "/setup/purchasing/supplier_type/edit/:supplierTypeId", title: "Edit", parent: "setup.purchasing.supplier_type", controller: "SupplierTypeEditController"});
	this.route("setup.purchasing.supplier_type.insert", {path: "/setup/purchasing/supplier_type/insert", title: "New", parent: "setup.purchasing.supplier_type", controller: "SupplierTypeInsertController"});
	this.route("setup.reports", {path: "/setup/reports", title: "Reports", parent: "dashboard", controller: "SetupReportsController"});
	this.route("setup.reports.insert", {path: "/setup/reports/insert", title: "New", parent: "setup.reports", controller: "ReportInsertController"});
	this.route("setup.reports.reports", {path: "/setup/reports/reports", title: "Reports", parent: "setup.reports", controller: "SetupReportsReportsController"});
	this.route("setup.reports.reports.accounts_payable", {path: "/setup/reports/reports/accounts_payable/:reportId", title: "Accounts Payable", parent: "setup.reports.reports", controller: "ReportsAccountsPayableController"});
	this.route("setup.reports.reports.accounts_payable_summary", {path: "/setup/reports/reports/accounts_payable_summary/:reportId", title: "Accounts Payable Summary", parent: "setup.reports.reports", controller: "ReportsAccountsPayableSummaryController"});
	this.route("setup.reports.reports.accounts_receivable", {path: "/setup/reports/reports/accounts_receivable/:reportId", title: "Accounts Receivable", parent: "setup.reports.reports", controller: "ReportsAccountsReceivableController"});
	this.route("setup.reports.reports.accounts_receivable_summary", {path: "/setup/reports/reports/accounts_receivable_summary/:reportId", title: "Accounts Receivable Summary", parent: "setup.reports.reports", controller: "ReportsAccountsReceivableSummaryController"});
	this.route("setup.reports.reports.available_stock_for_packing_items", {path: "/setup/reports/reports/available_stock_for_packing_items/:reportId", title: "Available Stock for Packing Items", parent: "setup.reports.reports", controller: "ReportsAvailableStockForPackingItemsController"});
	this.route("setup.reports.reports.balance_sheet", {path: "/setup/reports/reports/balance_sheet/:reportId", title: "Balance Sheet", parent: "setup.reports.reports", controller: "ReportsBalanceSheetController"});
	this.route("setup.reports.reports.bank_clearance_summary", {path: "/setup/reports/reports/bank_clearance_summary/:reportId", title: "Bank Clearance Summary", parent: "setup.reports.reports", controller: "ReportsBankClearanceSummaryController"});
	this.route("setup.reports.reports.bank_reconciliation_statement", {path: "/setup/reports/reports/bank_reconciliation_statement/:reportId", title: "Bank Reconciliation Statement", parent: "setup.reports.reports", controller: "ReportsBankReconciliationStatementController"});
	this.route("setup.reports.reports.batch_wise_balance_history", {path: "/setup/reports/reports/batch_wise_balance_history/:reportId", title: "Batch-wise Balance History", parent: "setup.reports.reports", controller: "ReportsBatchWiseBalanceHistoryController"});
	this.route("setup.reports.reports.bom_search", {path: "/setup/reports/reports/bom_search/:reportId", title: "BOM Search", parent: "setup.reports.reports", controller: "ReportsBomSearchController"});
	this.route("setup.reports.reports.budget_variance_report", {path: "/setup/reports/reports/budget_variance_report/:reportId", title: "Budget Variance Report", parent: "setup.reports.reports", controller: "ReportsBudgetVarianceReportController"});
	this.route("setup.reports.reports.completed_production_orders", {path: "/setup/reports/reports/completed_production_orders/:reportId", title: "Completed Production Orders", parent: "setup.reports.reports", controller: "ReportsCompletedProductionOrdersController"});
	this.route("setup.reports.reports.customer_acquisition_and_loyalty", {path: "/setup/reports/reports/customer_acquisition_and_loyalty/:reportId", title: "Customer Acquisition and Loyalty", parent: "setup.reports.reports", controller: "ReportsCustomerAcquisitionAndLoyaltyController"});
	this.route("setup.reports.reports.customer_addresses_and_contacts", {path: "/setup/reports/reports/customer_addresses_and_contacts/:reportId", title: "Customer Addresses and Contacts", parent: "setup.reports.reports", controller: "ReportsCustomerAddressesAndContactsController"});
	this.route("setup.reports.reports.customer_credit_balance", {path: "/setup/reports/reports/customer_credit_balance/:reportId", title: "Customer Credit Balance", parent: "setup.reports.reports", controller: "ReportsCustomerCreditBalanceController"});
	this.route("setup.reports.reports.customers_not_purchasing_for_long_time", {path: "/setup/reports/reports/customers_not_purchasing_for_long_time/:reportId", title: "Customers Not Purchasing", parent: "setup.reports.reports", controller: "ReportsCustomersNotPurchasingForLongTimeController"});
	this.route("setup.reports.reports.daily_time_log_summary", {path: "/setup/reports/reports/daily_time_log_summary/:reportId", title: "Daily Time Log Summary", parent: "setup.reports.reports", controller: "ReportsDailyTimeLogSummaryController"});
	this.route("setup.reports.reports.delivered_items_to_be_billed", {path: "/setup/reports/reports/delivered_items_to_be_billed/:reportId", title: "Delivered Items to be Billed", parent: "setup.reports.reports", controller: "ReportsDeliveredItemsToBeBilledController"});
	this.route("setup.reports.reports.delivery_note_trends", {path: "/setup/reports/reports/delivery_note_trends/:reportId", title: "Delivery Note Trends", parent: "setup.reports.reports", controller: "ReportsDeliveryNoteTrendsController"});
	this.route("setup.reports.reports.document_share_report", {path: "/setup/reports/reports/document_share_report/:reportId", title: "Document Share Report", parent: "setup.reports.reports", controller: "ReportsDocumentShareReportController"});
	this.route("setup.reports.reports.employee_birthday", {path: "/setup/reports/reports/employee_birthday/:reportId", title: "Employee Birthday", parent: "setup.reports.reports", controller: "ReportsEmployeeBirthdayController"});
	this.route("setup.reports.reports.employee_information", {path: "/setup/reports/reports/employee_information/:reportId", title: "Employee Information", parent: "setup.reports.reports", controller: "ReportsEmployeeInformationController"});
	this.route("setup.reports.reports.reports.employee_leave_balance", {path: "/setup/reports/reports/employee_leave_balance/:reportId", title: "Employee Leave Balance", parent: "setup.reports.reports", controller: "ReportsEmployeeLeaveBalanceController"});
	this.route("setup.reports.reports.general_ledger", {path: "/setup/reports/reports/general_ledger/:reportId", title: "General Ledger", parent: "setup.reports.reports", controller: "ReportsGeneralLedgerController"});
	this.route("setup.reports.reports.gross_profit", {path: "/setup/reports/reports/gross_profit/:reportId", title: "Gross Profit", parent: "setup.reports.reports", controller: "ReportsGrossProfitController"});
	this.route("setup.reports.reports.issued_items_against_production_order", {path: "/setup/reports/reports/issued_items_against_production_order/:reportId", title: "Issued Items Against Production Order", parent: "setup.reports.reports", controller: "ReportsIssuedItemsAgainstProductionOrderController"});
	this.route("setup.reports.reports.item_prices", {path: "/setup/reports/reports/item_prices/:reportId", title: "Item Prices", parent: "setup.reports.reports", controller: "ReportsItemPricesController"});
	this.route("setup.reports.reports.item_shortage_report", {path: "/setup/reports/reports/item_shortage_report/:reportId", title: "Item Shortage Report", parent: "setup.reports.reports", controller: "ReportsItemShortageReportController"});
	this.route("setup.reports.reports.items_to_be_requested", {path: "/setup/reports/reports/items_to_be_requested/:reportId", title: "Items to be Requested", parent: "setup.reports.reports", controller: "ReportsItemsToBeRequestedController"});
	this.route("setup.reports.reports.item_wise_price_list_rate", {path: "/setup/reports/reports/item_wise_price_list_rate/:reportId", title: "Item-wise Price List Rate", parent: "setup.reports.reports", controller: "ReportsItemWisePriceListRateController"});
	this.route("setup.reports.reports.item_wise_purchase_history", {path: "/setup/reports/reports/item_wise_purchase_history/:reportId", title: "Item-wise Purchase History", parent: "setup.reports.reports", controller: "ReportsItemWisePurchaseHistoryController"});
	this.route("setup.reports.reports.item_wise_purchase_register", {path: "/setup/reports/reports/item_wise_purchase_register/:reportId", title: "Item-wise Purchase Register", parent: "setup.reports.reports", controller: "ReportsItemWisePurchaseRegisterController"});
	this.route("setup.reports.reports.item_wise_recommended_reorder_level", {path: "/setup/reports/reports/item_wise_recommended_reorder_level/:reportId", title: "Item-wise Recommended Reorder Level", parent: "setup.reports.reports", controller: "ReportsItemWiseRecommendedReorderLevelController"});
	this.route("setup.reports.reports.item_wise_sales_history", {path: "/setup/reports/reports/item_wise_sales_history/:reportId", title: "Item-wise Sales History", parent: "setup.reports.reports", controller: "ReportsItemWiseSalesHistoryController"});
	this.route("setup.reports.reports.item_wise_sales_register", {path: "/setup/reports/reports/item_wise_sales_register/:reportId", title: "Item-wise Sales Register", parent: "setup.reports.reports", controller: "ReportsItemWiseSalesRegisterController"});
	this.route("setup.reports.reports.lead_details", {path: "/setup/reports/reports/lead_details/:reportId", title: "Lead Details", parent: "setup.reports.reports", controller: "ReportsLeadDetailsController"});
	this.route("setup.reports.reports.maintenance_schedules", {path: "/setup/reports/reports/maintenance_schedules/:reportId", title: "Maintenance Schedules", parent: "setup.reports.reports", controller: "ReportsMaintenanceSchedulesController"});
	this.route("setup.reports.reports.material_requests_for_which_supplier_quotations_are_not_created", {path: "/setup/reports/reports/material_requests_for_which_supplier_quotations_are_not_created/:reportId", title: "Material Requests for which Supplier Quotations are not Created", parent: "setup.reports.reports", controller: "ReportsMaterialRequestsForWhichSupplierQuotationsAreNotCreatedController"});
	this.route("setup.reports.reports.monthly_attendance_sheet", {path: "/setup/reports/reports/monthly_attendance_sheet/:reportId", title: "Monthly Attendance Sheet", parent: "setup.reports.reports", controller: "ReportsMonthlyAttendanceSheetController"});
	this.route("setup.reports.reports.monthly_salary_register", {path: "/setup/reports/reports/monthly_salary_register/:reportId", title: "Monthly Salary Register", parent: "setup.reports.reports", controller: "ReportsMonthlySalaryRegisterController"});
	this.route("setup.reports.reports.open_production_orders", {path: "/setup/reports/reports/open_production_orders/:reportId", title: "Open Production Orders", parent: "setup.reports.reports", controller: "ReportsOpenProductionOrdersController"});
	this.route("setup.reports.reports.ordered_items_to_be_billed", {path: "/setup/reports/reports/ordered_items_to_be_billed/:reportId", title: "Ordered Items to be Billed", parent: "setup.reports.reports", controller: "ReportsOrderedItemsToBeBilledController"});
	this.route("setup.reports.reports.ordered_items_to_be_delivered", {path: "/setup/reports/reports/ordered_items_to_be_delivered/:reportId", title: "Ordered Items to be Delivered", parent: "setup.reports.reports", controller: "ReportsOrderedItemsToBeDeliveredController"});
	this.route("setup.reports.reports.payment_period_based_on_invoice_date", {path: "/setup/reports/reports/payment_period_based_on_invoice_date/:reportId", title: "Payment Period Based on Invoice Date", parent: "setup.reports.reports", controller: "ReportsPaymentPeriodBasedOnInvoiceDateController"});
	this.route("setup.reports.reports.pending_so_items_for_purchase_request", {path: "/setup/reports/reports/pending_so_items_for_purchase_request/:reportId", title: "Pending SO Items for Purchase Request", parent: "setup.reports.reports", controller: "ReportsPendingSoItemsForPurchaseRequestController"});
	this.route("setup.reports.reports.permitted_documents_for_user", {path: "/setup/reports/reports/permitted_documents_for_user/:reportId", title: "Permitted Documents for User", parent: "setup.reports.reports", controller: "ReportsPermittedDocumentsForUserController"});
	this.route("setup.reports.reports.production_orders_in_progress", {path: "/setup/reports/reports/production_orders_in_progress/:reportId", title: "Production Orders in Progress", parent: "setup.reports.reports", controller: "ReportsProductionOrdersInProgressController"});
	this.route("setup.reports.reports.profit_and_loss_statement", {path: "/setup/reports/reports/profit_and_loss_statement/:reportId", title: "Profit and Loss Statement", parent: "setup.reports.reports", controller: "ReportsProfitAndLossStatementController"});
	this.route("setup.reports.reports.project_wise_stock_tracking", {path: "/setup/reports/reports/project_wise_stock_tracking/:reportId", title: "Project-wise Stock Tracking", parent: "setup.reports.reports", controller: "ReportsProjectWiseStockTrackingController"});
	this.route("setup.reports.reports.purchase_invoice_trends", {path: "/setup/reports/reports/purchase_invoice_trends/:reportId", title: "Purchase Invoice Trends", parent: "setup.reports.reports", controller: "ReportsPurchaseInvoiceTrendsController"});
	this.route("setup.reports.reports.purchase_order_items_to_be_billed", {path: "/setup/reports/reports/purchase_order_items_to_be_billed/:reportId", title: "Purchase Order Items to be Billed", parent: "setup.reports.reports", controller: "ReportsPurchaseOrderItemsToBeBilledController"});
	this.route("setup.reports.reports.purchase_order_items_to_be_received", {path: "/setup/reports/reports/purchase_order_items_to_be_received/:reportId", title: "Purchase Order Items to be Received", parent: "setup.reports.reports", controller: "ReportsPurchaseOrderItemsToBeReceivedController"});
	this.route("setup.reports.reports.purchase_order_trends", {path: "/setup/reports/reports/purchase_order_trends/:reportId", title: "Purchase Order Trends", parent: "setup.reports.reports", controller: "ReportsPurchaseOrderTrendsController"});
	this.route("setup.reports.reports.purchase_receipt_trends", {path: "/setup/reports/reports/purchase_receipt_trends/:reportId", title: "Purchase Receipt Trends", parent: "setup.reports.reports", controller: "ReportsPurchaseReceiptTrendsController"});
	this.route("setup.reports.reports.purchase_register", {path: "/setup/reports/reports/purchase_register/:reportId", title: "Purchase Register", parent: "setup.reports.reports", controller: "ReportsPurchaseRegisterController"});
	this.route("setup.reports.reports.quotation_trends", {path: "/setup/reports/reports/quotation_trends/:reportId", title: "Quotation Trends", parent: "setup.reports.reports", controller: "ReportsquotationTrendsController"});
	this.route("setup.reports.reports.received_items_to_be_billed", {path: "/setup/reports/reports/received_items_to_be_billed/:reportId", title: "Received Items to be Billed", parent: "setup.reports.reports", controller: "ReportsReceivedItemsToBeBilledController"});
	this.route("setup.reports.reports.requested_items_to_be_ordered", {path: "/setup/reports/reports/requested_items_to_be_ordered/:reportId", title: "Requested Items to be Ordered", parent: "setup.reports.reports", controller: "ReportsRequestedItemsToBeOrderedController"});
	this.route("setup.reports.reports.requested_items_to_be_transferred", {path: "/setup/reports/reports/requested_items_to_be_transferred/:reportId", title: "Requested Items to be Transferred", parent: "setup.reports.reports", controller: "pReportsRequestedItemsToBeTransferredController"});
	this.route("setup.reports.reports.sales_invoice_trends", {path: "/setup/reports/reports/sales_invoice_trends/:reportId", title: "Sales Invoice Trends", parent: "setup.reports.reports", controller: "ReportsSalesInvoiceTrendsController"});
	this.route("setup.reports.reports.sales_order_trends", {path: "/setup/reports/reports/sales_order_trends/:reportId", title: "Sales Order Trends", parent: "setup.reports.reports", controller: "ReportsSalesOrderTrendsController"});
	this.route("setup.reports.reports.sales_partners_commission", {path: "/setup/reports/reports/sales_partners_commission/:reportId", title: "Sales Partners Commission", parent: "setup.reports.reports", controller: "ReportsSalesPartnersCommissionController"});
	this.route("setup.reports.reports.sales_person_target_variance_item_group_wise", {path: "/setup/reports/reports/sales_person_target_variance_item_group_wise/:reportId", title: "Sales Person Target Variance Item Group-wise", parent: "setup.reports.reports", controller: "ReportsSalesPersonTargetVarianceItemGroupWiseController"});
	this.route("setup.reports.reports.sales_person_wise_transaction_summary", {path: "/setup/reports/reports/sales_person_wise_transaction_summary/:reportId", title: "Sales Person-wise Transaction Summary", parent: "setup.reports.reports", controller: "ReportsSalesPersonWiseTransactionSummaryController"});
	this.route("setup.reports.reports.sales_register", {path: "/setup/reports/reports/sales_register/:reportId", title: "Sales Register", parent: "setup.reports.reports", controller: "ReportsSalesRegisterController"});
	this.route("setup.reports.reports.serial_no_service_contract_expiry", {path: "/setup/reports/reports/serial_no_service_contract_expiry/:reportId", title: "Serial No Service Contract Expiry", parent: "setup.reports.reports", controller: "ReportsSerialNoServiceContractExpiryController"});
	this.route("setup.reports.reports.serial_no_status", {path: "/setup/reports/reports/serial_no_status/:reportId", title: "Serial No Status", parent: "setup.reports.reports", controller: "ReportsSerialNoStatusController"});
	this.route("setup.reports.reports.serial_no_warranty_expiry", {path: "/setup/reports/reports/serial_no_warranty_expiry/:reportId", title: "Serial No Warranty Expiry", parent: "setup.reports.reports", controller: "ReportsSerialNoWarrantyExpiryController"});
	this.route("setup.reports.reports.stock_ageing", {path: "/setup/reports/reports/stock_ageing/:reportId", title: "Stock Ageing", parent: "setup.reports.reports", controller: "ReportsStockAgeingController"});
	this.route("setup.reports.reports.stock_balance", {path: "/setup/reports/reports/stock_balance/:reportId", title: "Stock Balance", parent: "setup.reports.reports", controller: "ReportsStockBalanceController"});
	this.route("setup.reports.reports.stock_ledger", {path: "/setup/reports/reports/stock_ledger/:reportId", title: "Stock Ledger", parent: "setup.reports.reports", controller: "ReportsStockLedgerController"});
	this.route("setup.reports.reports.stock_projected_qty", {path: "/setup/reports/reports/stock_projected_qty/:reportId", title: "Stock Projected Qty", parent: "setup.reports.reports", controller: "ReportsStockProjectedQtyController"});
	this.route("setup.reports.reports.supplier_addresses_and_contacts", {path: "/setup/reports/reports/supplier_addresses_and_contacts/:reportId", title: "Supplier Addresses and Contacts", parent: "setup.reports.reports", controller: "ReportsSupplierAddressesAndContactsController"});
	this.route("setup.reports.reports.supplier_wise_sales_analytics", {path: "/setup/reports/reports/supplier_wise_sales_analytics/:reportId", title: "Supplier-wise Sales Analytics", parent: "setup.reports.reports", controller: "ReportsSupplierWiseSalesAnalyticsController"});
	this.route("setup.reports.reports.territory_target_variance_item_group_wise", {path: "/setup/reports/reports/territory_target_variance_item_group_wise/:reportId", title: "Territory Target Variance Item Group-wise", parent: "setup.reports.reports", controller: "ReportsTerritoryTargetVarianceItemGroupWiseController"});
	this.route("setup.reports.reports.todo", {path: "/setup/reports/reports/todo/:reportId", title: "ToDo", parent: "setup.reports.reports", controller: "ReportsToDoController"});
	this.route("setup.reports.reports.trial_balance", {path: "/setup/reports/reports/trial_balance/:reportId", title: "Trial Balance", parent: "setup.reports.reports", controller: "ReportsTrialBalanceController"});
	this.route("setup.reports.reports.trial_balance_for_party", {path: "/setup/reports/reports/trial_balance_for_party/:reportId", title: "Trial Balance for Party", parent: "setup.reports.reports", controller: "ReportsTrialBalanceForPartyController"});
	this.route("setup.selling", {path: "/setup/selling", title: "Selling", parent: "dashboard", controller: "SetupSellingController"});
	this.route("setup.selling.industry_type", {path: "/setup/selling/industry_type", title: "Industry Type", parent: "setup.selling", controller: "SetupSellingIndustryTypeController"});
	this.route("setup.selling.industry_type.details", {path: "/setup/selling/industry_type/details/:industryTypeId", title: "Details", parent: "setup.selling.industry_type", controller: "IndustryTypeDetailsController"});
	this.route("setup.selling.industry_type.edit", {path: "/setup/selling/industry_type/edit/:industryTypeId", title: "Edit", parent: "setup.selling.industry_type", controller: "IndustryTypeEditController"});
	this.route("setup.selling.industry_type.insert", {path: "/setup/selling/industry_type/insert", title: "New", parent: "setup.selling.industry_type", controller: "IndustryTypeInsertController"});
	this.route("setup.selling.product_bundle", {path: "/setup/selling/product_bundle", title: "Product Bundle", parent: "setup.selling", controller: "SetupSellingProductBundleController"});
	this.route("setup.selling.product_bundle.details", {path: "/setup/selling/product_bundle/details/:productBundleId", title: "Details", parent: "setup.selling.product_bundle", controller: "ProductBundleDetailsController"});
	this.route("setup.selling.product_bundle.edit", {path: "/setup/selling/product_bundle/edit/:productBundleId", title: "Edit", parent: "setup.selling.product_bundle", controller: "ProductBundleEditController"});
	this.route("setup.selling.product_bundle.insert", {path: "/setup/selling/product_bundle/insert", title: "New", parent: "setup.selling.product_bundle", controller: "ProductBundleInsertController"});
	this.route("setup.selling.sales_partner", {path: "/setup/selling/sales_partner", title: "Sales Partner", parent: "setup.selling", controller: "SetupSellingSalesPartnerController"});
	this.route("setup.selling.sales_partner.details", {path: "/setup/selling/sales_partner/details/:salesPartnerId", title: "Details", parent: "setup.selling.sales_partner", controller: "SalesPartnerDetailsController"});
	this.route("setup.selling.sales_partner.edit", {path: "/setup/selling/sales_partner/edit/:salesPartnerId", title: "Edit", parent: "setup.selling.sales_partner", controller: "SalesPartnerEditController"});
	this.route("setup.selling.sales_partner.insert", {path: "/setup/selling/sales_partner/insert", title: "New", parent: "setup.selling.sales_partner", controller: "SalesPartnerInsertController"});
	this.route("setup.selling.sales_person", {path: "/setup/selling/sales_person", title: "Sales Person Tree", parent: "setup.selling", controller: "SetupSellingSalesPersonController"});
	this.route("setup.selling.selling_settings", {path: "/setup/selling/selling_settings", title: "Selling Settings", parent: "setup.selling", controller: "SetupSellingSellingSettingsController"});
	this.route("setup.selling.territory", {path: "/setup/selling/territory", title: "Territory Tree", parent: "setup.selling", controller: "SetupSellingTerritoryController"});
	this.route("setup.settings", {path: "/setup/settings", title: "Settings", parent: "dashboard", controller: "SetupSettingsController"});
	this.route("setup.settings.global_settings", {path: "/setup/settings/global_settings", title: "Global Defaults", parent: "setup.settings", controller: "SetupSettingsGlobalSettingsController"});
	this.route("setup.settings.naming_series", {path: "/setup/settings/naming_series", title: "Naming Series", parent: "setup.settings", controller: "SetupSettingsNamingSeriesController"});
	this.route("setup.settings.show_hide_modules", {path: "/setup/settings/show_hide_modules", title: "Show Hide Modules", parent: "setup.settings", controller: "SetupSettingsShowHideModulesController"});
	this.route("setup.settings.system_settings", {path: "/setup/settings/system_settings", title: "System Settings", parent: "setup.settings", controller: "SetupSettingsSystemSettingsController"});
	this.route("setup.stock", {path: "/setup/stock", title: "Stock", parent: "dashboard", controller: "SetupStockController"});
	this.route("setup.stock.brand", {path: "/setup/stock/brand", title: "Brand", parent: "setup.stock", controller: "SetupStockBrandController"});
	this.route("setup.stock.brand.details", {path: "/setup/stock/brand/details/:brandId", title: "Details", parent: "setup.stock.brand", controller: "BrandDetailsController"});
	this.route("setup.stock.brand.edit", {path: "/setup/stock/brand/edit/:brandId", title: "Edit", parent: "setup.stock.brand", controller: "BrandEditController"});
	this.route("setup.stock.brand.insert", {path: "/setup/stock/brand/insert", title: "New", parent: "setup.stock.brand", controller: "BrandInsertController"});
	this.route("setup.stock.item_attribute", {path: "/setup/stock/item_attribute", title: "Item Attribute", parent: "setup.stock", controller: "SetupStockItemAttributeController"});
	this.route("setup.stock.item_attribute.details", {path: "/setup/stock/item_attribute/details/:itemAttributeId", title: "Details", parent: "setup.stock.item_attribute", controller: "ItemAttributeDetailsController"});
	this.route("setup.stock.item_attribute.edit", {path: "/setup/stock/item_attribute/edit/:itemAttributeId", title: "Edit", parent: "setup.stock.item_attribute", controller: "ItemAttributeEditController"});
	this.route("setup.stock.item_attribute.insert", {path: "/setup/stock/item_attribute/insert", title: "New", parent: "setup.stock.item_attribute", controller: "ItemAttributeInsertController"});
	this.route("setup.stock.stock_settings", {path: "/setup/stock/stock_settings", title: "Stock Settings", parent: "setup.stock", controller: "SetupStockStockSettingsController"});
	this.route("setup.stock.unit_of_measure_uom", {path: "/setup/stock/unit_of_measure_uom", title: "UOM", parent: "setup.stock", controller: "SetupStockUnitOfMeasureUomController"});
	this.route("setup.stock.unit_of_measure_uom.details", {path: "/setup/stock/unit_of_measure_uom/details/:uomId", title: "Details", parent: "setup.stock.unit_of_measure_uom", controller: "UomDetailsController"});
	this.route("setup.stock.unit_of_measure_uom.edit", {path: "/setup/stock/unit_of_measure_uom/edit/:uomId", title: "Edit", parent: "setup.stock.unit_of_measure_uom", controller: "UomEditController"});
	this.route("setup.stock.unit_of_measure_uom.insert", {path: "/setup/stock/unit_of_measure_uom/insert", title: "New", parent: "setup.stock.unit_of_measure_uom", controller: "UomInsertController"});
	this.route("setup.stock.warehouse", {path: "/setup/stock/warehouse", title: "Warehouse", parent: "setup.stock", controller: "SetupStockWarehouseController"});
	this.route("setup.stock.warehouse.details", {path: "/setup/stock/warehouse/details/:warehouseId", title: "Details", parent: "setup.stock.warehouse", controller: "WarehouseDetailsController"});
	this.route("setup.stock.warehouse.edit", {path: "/setup/stock/warehouse/edit/:warehouseId", title: "Edit", parent: "setup.stock.warehouse", controller: "WarehouseEditController"});
	this.route("setup.stock.warehouse.insert", {path: "/setup/stock/warehouse/insert", title: "New", parent: "setup.stock.warehouse", controller: "WarehouseInsertController"});
	this.route("setup.support", {path: "/setup/support", title: "Support", parent: "dashboard", controller: "SetupSupportController"});
	this.route("setup.system", {path: "/setup/system", title: "System", parent: "dashboard", controller: "SetupSystemController"});
	this.route("setup.system.application_installer", {path: "/setup/system/application_installer", title: "Application Installer", parent: "setup.system", controller: "SetupSystemApplicationInstallerController"});
	this.route("setup.system.scheduler_log", {path: "/setup/system/scheduler_log", title: "Scheduler Log", parent: "setup.system", controller: "SetupSystemSchedulerLogController"});
	this.route("setup.system.scheduler_log.details", {path: "/setup/system/scheduler_log/details/:schedulerLogId", title: "Details", parent: "setup.system.scheduler_log", controller: "SchedulerLogDetailsController"});
	this.route("setup.system.scheduler_log.edit", {path: "/setup/system/scheduler_log/edit/:schedulerLogId", title: "Edit", parent: "setup.system.scheduler_log", controller: "SchedulerLogEditController"});
	this.route("setup.system.scheduler_log.insert", {path: "/setup/system/scheduler_log/insert", title: "New", parent: "setup.system.scheduler_log", controller: "SchedulerLogInsertController"});
	this.route("setup.system.download_backups", {path: "/setup/system/download_backups", title: "Download Backups", parent: "setup.system", controller: "SetupSystemDownloadBackupsController"});
	this.route("setup.users", {path: "/setup/users", title: "Users", parent: "dashboard", controller: "SetupUsersController"});
	this.route("setup.users.role", {path: "/setup/users/role", title: "Role", parent: "setup.users", controller: "SetupUsersRoleController"});
	this.route("setup.users.role.details", {path: "/setup/users/role/details/:roleId", title: "Details", parent: "setup.users.role", controller: "RoleDetailsController"});
	this.route("setup.users.role.edit", {path: "/setup/users/role/edit/:roleId", title: "Edit", parent: "setup.users.role", controller: "RoleEditController"});
	this.route("setup.users.role.insert", {path: "/setup/users/role/insert", title: "New", parent: "setup.users.role", controller: "RoleInsertController"});
	this.route("setup.users.user", {path: "/setup/users/user", title: "User", parent: "setup.users", controller: "SetupUsersUserController"});
	this.route("setup.users.user.details", {path: "/setup/users/user/details/:userId", title: "Details", parent: "setup.users.user", controller: "UserDetailsController"});
	this.route("setup.users.user.edit", {path: "/setup/users/user/edit/:userId", title: "Edit", parent: "setup.users.user", controller: "UserEditController"});
	this.route("setup.users.user.insert", {path: "/setup/users/user/insert", title: "New", parent: "setup.users.user", controller: "UserInsertController"});
	this.route("setup.website", {path: "/setup/website", title: "Website", parent: "dashboard", controller: "SetupWebsiteController"});
	this.route("setup.website.about_us_settings", {path: "/setup/website/about_us_settings", title: "About Us Settings", parent: "setup.website", controller: "SetupWebsiteAboutUsSettingsController"});
	this.route("setup.website.blog_category", {path: "/setup/website/blog_category", title: "Blog Category", parent: "setup.website", controller: "SetupWebsiteBlogCategoryController"});
	this.route("setup.website.blog_category.details", {path: "/setup/website/blog_category/details/:blogCategoryId", title: "Details", parent: "setup.website.blog_category", controller: "BlogCategoryDetailsController"});
	this.route("setup.website.blog_category.edit", {path: "/setup/website/blog_category/edit/:blogCategoryId", title: "Edit", parent: "setup.website.blog_category", controller: "BlogCategoryEditController"});
	this.route("setup.website.blog_category.insert", {path: "/setup/website/blog_category/insert", title: "New", parent: "setup.website.blog_category", controller: "BlogCategoryInsertController"});
	this.route("setup.website.blog_settings", {path: "/setup/website/blog_settings", title: "Blog Settings", parent: "setup.website", controller: "SetupWebsiteBlogSettingsController"});
	this.route("setup.website.contact_us_settings", {path: "/setup/website/contact_us_settings", title: "Contact Us Settings", parent: "setup.website", controller: "SetupWebsiteContactUsSettingsController"});
	this.route("setup.website.website_script", {path: "/setup/website/website_script", title: "Website Script", parent: "setup.website", controller: "SetupWebsiteWebsiteScriptController"});
	this.route("setup.website.website_settings", {path: "/setup/website/website_settings", title: "Website Settings", parent: "setup.website", controller: "SetupWebsiteWebsiteSettingsController"});
	this.route("setup.website.website_theme", {path: "/setup/website/website_theme", title: "Website Theme", parent: "setup.website", controller: "SetupWebsiteWebsiteThemeController"});
	this.route("setup.website.website_theme.details", {path: "/setup/website/website_theme/details/:websiteThemeId", title: "Details", parent: "setup.website.website_theme", controller: "WebsiteThemeDetailsController"});
	this.route("setup.website.website_theme.edit", {path: "/setup/website/website_theme/edit/:websiteThemeId", title: "Edit", parent: "setup.website.website_theme", controller: "WebsiteThemeEditController"});
	this.route("setup.website.website_theme.insert", {path: "/setup/website/website_theme/insert", title: "New", parent: "setup.website.website_theme", controller: "WebsiteThemeInsertController"});
	this.route("setup.workflow", {path: "/setup/workflow", title: "Workflow", parent: "dashboard", controller: "SetupWorkflowController"});
	this.route("setup.workflow.workflow", {path: "/setup/workflow/workflow", title: "Workflow", parent: "setup.workflow", controller: "SetupWorkflowWorkflowController"});
	this.route("setup.workflow.workflow.details", {path: "/setup/workflow/workflow/details/:workflowId", title: "Details", parent: "setup.workflow.workflow", controller: "WorkflowDetailsController"});
	this.route("setup.workflow.workflow.edit", {path: "/setup/workflow/workflow/edit/:workflowId", title: "Edit", parent: "setup.workflow.workflow", controller: "WorkflowEditController"});
	this.route("setup.workflow.workflow.insert", {path: "/setup/workflow/workflow/insert", title: "New", parent: "setup.workflow.workflow", controller: "WorkflowInsertController"});
	this.route("setup.workflow.workflow_action", {path: "/setup/workflow/workflow_action", title: "Workflow Action", parent: "setup.workflow", controller: "SetupWorkflowWorkflowActionController"});
	this.route("setup.workflow.workflow_action.details", {path: "/setup/workflow/workflow_action/details/:workflowActionId", title: "Details", parent: "setup.workflow.workflow_action", controller: "WorkflowActionDetailsController"});
	this.route("setup.workflow.workflow_action.edit", {path: "/setup/workflow/workflow_action/edit/:workflowActionId", title: "Edit", parent: "setup.workflow.workflow_action", controller: "WorkflowActionEditController"});
	this.route("setup.workflow.workflow_action.insert", {path: "/setup/workflow/workflow_action/insert", title: "New", parent: "setup.workflow.workflow_action", controller: "WorkflowActionInsertController"});
	this.route("setup.workflow.workflow_state", {path: "/setup/workflow/workflow_state", title: "Workflow State", parent: "setup.workflow", controller: "SetupWorkflowWorkflowStateController"});
	this.route("setup.workflow.workflow_state.details", {path: "/setup/workflow/workflow_state/details/:workflowStateId", title: "Details", parent: "setup.workflow.workflow_state", controller: "WorkflowStateDetailsController"});
	this.route("setup.workflow.workflow_state.edit", {path: "/setup/workflow/workflow_state/edit/:workflowStateId", title: "Edit", parent: "setup.workflow.workflow_state", controller: "WorkflowStateEditController"});
	this.route("setup.workflow.workflow_state.insert", {path: "/setup/workflow/workflow_state/insert", title: "New", parent: "setup.workflow.workflow_state", controller: "WorkflowStateInsertController"});
	this.route("stock", {path: "/stock", controller: "StockController"});
	this.route("stock.documents", {path: "/stock/documents", title: "Documents", parent: "dashboard", controller: "StockDocumentsController"});
	this.route("stock.documents.batch", {path: "/stock/documents/batch", title: "Batch", parent: "stock.documents", controller: "StockDocumentsBatchController"});
	this.route("stock.documents.batch.details", {path: "/stock/documents/batch/details/:batchId", title: "Details", parent: "stock.documents.batch", controller: "BatchDetailsController"});
	this.route("stock.documents.batch.edit", {path: "/stock/documents/batch/edit/:batchId", title: "Edit", parent: "stock.documents.batch", controller: "BatchEditController"});
	this.route("stock.documents.batch.insert", {path: "/stock/documents/batch/insert", title: "New", parent: "stock.documents.batch", controller: "BatchInsertController"});
	this.route("stock.documents.delivery_note", {path: "/stock/documents/delivery_note", title: "Delivery Note", parent: "stock.documents", controller: "StockDocumentsDeliveryNoteController"});
	this.route("stock.documents.delivery_note.details", {path: "/stock/documents/delivery_note/details/:deliveryNoteId", title: "Details", parent: "stock.documents.delivery_note", controller: "DeliveryNoteDetailsController"});
	this.route("stock.documents.delivery_note.edit", {path: "/stock/documents/delivery_note/edit/:deliveryNoteId", title: "Edit", parent: "stock.documents.delivery_note", controller: "DeliveryNoteEditController"});
	this.route("stock.documents.delivery_note.insert", {path: "/stock/documents/delivery_note/insert", title: "New", parent: "stock.documents.delivery_note", controller: "DeliveryNoteInsertController"});
	this.route("stock.documents.installation_note", {path: "/stock/documents/installation_note", title: "Installation Notes", parent: "stock.documents", controller: "StockDocumentsInstallationNoteController"});
	this.route("stock.documents.installation_note.details", {path: "/stock/documents/installation_note/details/:installationNoteId", title: "Details", parent: "stock.documents.installation_note", controller: "InstallationNoteDetailsController"});
	this.route("stock.documents.installation_note.edit", {path: "/stock/documents/installation_note/edit/:installationNoteId", title: "Edit", parent: "stock.documents.installation_note", controller: "InstallationNoteEditController"});
	this.route("stock.documents.installation_note.insert", {path: "/stock/documents/installation_note/insert", title: "New", parent: "stock.documents.installation_note", controller: "InstallationNoteInsertController"});
	this.route("stock.documents.item", {path: "/stock/documents/item", title: "Item", parent: "stock.documents", controller: "StockDocumentsItemController"});
	this.route("stock.documents.item.details", {path: "/stock/documents/item/details/:itemId", title: "Details", parent: "stock.documents.item", controller: "ItemDetailsController"});
	this.route("stock.documents.item.edit", {path: "/stock/documents/item/edit/:itemId", title: "Edit", parent: "stock.documents.item", controller: "ItemEditController"});
	this.route("stock.documents.item.insert", {path: "/stock/documents/item/insert", title: "New", parent: "stock.documents.item", controller: "ItemInsertController"});
	this.route("stock.documents.purchase_receipt", {path: "/stock/documents/purchase_receipt", title: "Purchase Receipt", parent: "stock.documents", controller: "StockDocumentsPurchaseReceiptController"});
	this.route("stock.documents.purchase_receipt.details", {path: "/stock/documents/purchase_receipt/details/:purchaseReceiptId", title: "Details", parent: "stock.documents.purchase_receipt", controller: "PurchaseReceiptDetailsController"});
	this.route("stock.documents.purchase_receipt.edit", {path: "/stock/documents/purchase_receipt/edit/:purchaseReceiptId", title: "Edit", parent: "stock.documents.purchase_receipt", controller: "PurchaseReceiptEditController"});
	this.route("stock.documents.purchase_receipt.insert", {path: "/stock/documents/purchase_receipt/insert", title: "New", parent: "stock.documents.purchase_receipt", controller: "PurchaseReceiptInsertController"});
	this.route("stock.documents.serial_no", {path: "/stock/documents/serial_no", title: "Serial Number", parent: "stock.documents", controller: "StockDocumentsSerialNoController"});
	this.route("stock.documents.serial_no.details", {path: "/stock/documents/serial_no/details/:serialNoId", title: "Details", parent: "stock.documents.serial_no", controller: "SerialNoDetailsController"});
	this.route("stock.documents.serial_no.edit", {path: "/stock/documents/serial_no/edit/:serialNoId", title: "Edit", parent: "stock.documents.serial_no", controller: "SerialNoEditController"});
	this.route("stock.documents.serial_no.insert", {path: "/stock/documents/serial_no/insert", title: "New", parent: "stock.documents.serial_no", controller: "SerialNoInsertController"});
	this.route("stock.documents.stock_entry", {path: "/stock/documents/stock_entry", title: "Stock Entry", parent: "stock.documents", controller: "StockDocumentsStockEntryController"});
	this.route("stock.documents.stock_entry.details", {path: "/stock/documents/stock_entry/details/:stockEntryId", title: "Details", parent: "stock.documents.stock_entry", controller: "StockEntryDetailsController"});
	this.route("stock.documents.stock_entry.edit", {path: "/stock/documents/stock_entry/edit/:stockEntryId", title: "Edit", parent: "stock.documents.stock_entry", controller: "StockEntryEditController"});
	this.route("stock.documents.stock_entry.insert", {path: "/stock/documents/stock_entry/insert", title: "New", parent: "stock.documents.stock_entry", controller: "StockEntryInsertController"});
	this.route("stock.help", {path: "/stock/help", title: "Help", parent: "dashboard", controller: "StockHelpController"});
	this.route("stock.help.item_variants", {path: "/stock/help/item_variants", title: "Item Variants", parent: "stock.help", controller: "StockHelpItemVariantsController"});
	this.route("stock.help.items_and_pricing", {path: "/stock/help/items_and_pricing", title: "Items and Pricing", parent: "stock.help", controller: "StockHelpItemsAndPricingController"});
	this.route("stock.help.opening_stock_balance", {path: "/stock/help/opening_stock_balance", title: "Opening Stock Balance", parent: "stock.help", controller: "StockHelpOpeningStockBalanceController"});
	this.route("stock.main_reports", {path: "/stock/main_reports", title: "Main Reports", parent: "dashboard", controller: "StockMainReportsController"});
	this.route("stock.main_reports.item_wise_price_list_rate", {path: "/stock/main_reports/item_wise_price_list_rate", title: "Item-wise Price List Rate", parent: "stock.main_reports", controller: "StockMainReportsItemWisePriceListRateController"});
	this.route("stock.main_reports.stock_ageing", {path: "/stock/main_reports/stock_ageing", title: "Stock Ageing", parent: "stock.main_reports", controller: "StockMainReportsStockAgeingController"});
	this.route("stock.main_reports.stock_analytics", {path: "/stock/main_reports/stock_analytics", title: "Stock Analytics", parent: "stock.main_reports", controller: "StockMainReportsStockAnalyticsController"});
	this.route("stock.main_reports.stock_balance", {path: "/stock/main_reports/stock_balance", title: "Stock Balance", parent: "stock.main_reports", controller: "StockMainReportsStockBalanceController"});
	this.route("stock.main_reports.stock_ledger", {path: "/stock/main_reports/stock_ledger", title: "Stock Ledger", parent: "stock.main_reports", controller: "StockMainReportsStockLedgerController"});
	this.route("stock.main_reports.stock_projected_qty", {path: "/stock/main_reports/stock_projected_qty", title: "Stock Projected Qty", parent: "stock.main_reports", controller: "StockMainReportsStockProjectedQtyController"});
	this.route("stock.setup", {path: "/stock/setup", title: "Setup", parent: "dashboard", controller: "StockSetupController"});
	this.route("stock.standard_reports", {path: "/stock/standard_reports", title: "Standard Reports", parent: "dashboard", controller: "StockStandardReportsController"});
	this.route("stock.standard_reports.batch_wise_balance_history", {path: "/stock/standard_reports/batch_wise_balance_history", title: "Batch-wise Balance History", parent: "stock.standard_reports", controller: "StockStandardReportsBatchWiseBalanceHistoryController"});
	this.route("stock.standard_reports.delivery_note_trends", {path: "/stock/standard_reports/delivery_note_trends", title: "Delivery Note Trends", parent: "stock.standard_reports", controller: "StockStandardReportsDeliveryNoteTrendsController"});
	this.route("stock.standard_reports.item_prices", {path: "/stock/standard_reports/item_prices", title: "Item Prices", parent: "stock.standard_reports", controller: "StockStandardReportsItemPricesController"});
	this.route("stock.standard_reports.item_shortage_report", {path: "/stock/standard_reports/item_shortage_report", title: "Item Shortage Report", parent: "stock.standard_reports", controller: "StockStandardReportsItemShortageReportController"});
	this.route("stock.standard_reports.item_wise_recommended_reorder_level", {path: "/stock/standard_reports/item_wise_recommended_reorder_level", title: "Item-wise Recommended Reorder Level", parent: "stock.standard_reports", controller: "StockStandardReportsItemWiseRecommendedReorderLevelController"});
	this.route("stock.standard_reports.ordered_items_to_be_delivered", {path: "/stock/standard_reports/ordered_items_to_be_delivered", title: "Ordered Items to be Delivered", parent: "stock.standard_reports", controller: "StockStandardReportsOrderedItemsToBeDeliveredController"});
	this.route("stock.standard_reports.purchase_order_items_to_be_received", {path: "/stock/standard_reports/purchase_order_items_to_be_received", title: "Purchase Order Items to be Received", parent: "stock.standard_reports", controller: "StockStandardReportsPurchaseOrderItemsToBeReceivedController"});
	this.route("stock.standard_reports.purchase_receipt_trends", {path: "/stock/standard_reports/purchase_receipt_trends", title: "Purchase Receipt Trends", parent: "stock.standard_reports", controller: "StockStandardReportsPurchaseReceiptTrendsController"});
	this.route("stock.standard_reports.requested_items_to_be_transferred", {path: "/stock/standard_reports/requested_items_to_be_transferred", title: "Requested Items to be Transferred", parent: "stock.standard_reports", controller: "StockStandardReportsRequestedItemsToBeTransferredController"});
	this.route("stock.standard_reports.serial_no_service_contract_expiry", {path: "/stock/standard_reports/serial_no_service_contract_expiry", title: "Serial No. Service Contract Expiry", parent: "stock.standard_reports", controller: "StockStandardReportsSerialNoServiceContractExpiryController"});
	this.route("stock.standard_reports.serial_no_status", {path: "/stock/standard_reports/serial_no_status", title: "Serial No. Status", parent: "stock.standard_reports", controller: "StockStandardReportsSerialNoStatusController"});
	this.route("stock.standard_reports.serial_no_warranty_expiry", {path: "/stock/standard_reports/serial_no_warranty_expiry", title: "Serial No. Warranty Expiry", parent: "stock.standard_reports", controller: "StockStandardReportsSerialNoWarrantyExpiryController"});
	this.route("stock.tools", {path: "/stock/tools", title: "Tools", parent: "dashboard", controller: "StockToolsController"});
	this.route("stock.tools.landed_cost_voucher", {path: "/stock/tools/landed_cost_voucher", title: "Landed Cost Voucher", parent: "stock.tools", controller: "StockToolsLandedCostVoucherController"});
	this.route("stock.tools.landed_cost_voucher.details", {path: "/stock/tools/landed_cost_voucher/details/:landedCostVoucherId", title: "Details", parent: "stock.tools.landed_cost_voucher", controller: "LandedCostVoucherDetailsController"});
	this.route("stock.tools.landed_cost_voucher.edit", {path: "/stock/tools/landed_cost_voucher/edit/:landedCostVoucherId", title: "Edit", parent: "stock.tools.landed_cost_voucher", controller: "LandedCostVoucherEditController"});
	this.route("stock.tools.landed_cost_voucher.insert", {path: "/stock/tools/landed_cost_voucher/insert", title: "New", parent: "stock.tools.landed_cost_voucher", controller: "LandedCostVoucherInsertController"});
	this.route("stock.tools.packing_slip", {path: "/stock/tools/packing_slip", title: "Packing Slip", parent: "stock.tools", controller: "StockToolsPackingSlipController"});
	this.route("stock.tools.packing_slip.details", {path: "/stock/tools/packing_slip/details/:packingSlipId", title: "Details", parent: "stock.tools.packing_slip", controller: "PackingSlipDetailsController"});
	this.route("stock.tools.packing_slip.edit", {path: "/stock/tools/packing_slip/edit/:packingSlipId", title: "Edit", parent: "stock.tools.packing_slip", controller: "PackingSlipEditController"});
	this.route("stock.tools.packing_slip.insert", {path: "/stock/tools/packing_slip/insert", title: "New", parent: "stock.tools.packing_slip", controller: "PackingSlipInsertController"});
	this.route("stock.tools.quality_inspection", {path: "/stock/tools/quality_inspection", title: "Quality Inspection", parent: "stock.tools", controller: "StockToolsQualityInspectionController"});
	this.route("stock.tools.quality_inspection.details", {path: "/stock/tools/quality_inspection/details/:qualityInspectionId", title: "Details", parent: "stock.tools.quality_inspection", controller: "QualityInspectionDetailsController"});
	this.route("stock.tools.quality_inspection.edit", {path: "/stock/tools/quality_inspection/edit/:qualityInspectionId", title: "Edit", parent: "stock.tools.quality_inspection", controller: "QualityInspectionEditController"});
	this.route("stock.tools.quality_inspection.insert", {path: "/stock/tools/quality_inspection/insert", title: "New", parent: "stock.tools.quality_inspection", controller: "QualityInspectionInsertController"});
	this.route("stock.tools.stock_reconciliation", {path: "/stock/tools/stock_reconciliation", title: "Stock Reconciliation", parent: "stock.tools", controller: "StockToolsStockReconciliationController"});
	this.route("stock.tools.stock_reconciliation.details", {path: "/stock/tools/stock_reconciliation/details/:stockReconciliationId", title: "Details", parent: "stock.tools.stock_reconciliation", controller: "StockReconciliationDetailsController"});
	this.route("stock.tools.stock_reconciliation.edit", {path: "/stock/tools/stock_reconciliation/edit/:stockReconciliationId", title: "Edit", parent: "stock.tools.stock_reconciliation", controller: "StockReconciliationEditController"});
	this.route("stock.tools.stock_reconciliation.insert", {path: "/stock/tools/stock_reconciliation/insert", title: "New", parent: "stock.tools.stock_reconciliation", controller: "StockReconciliationInsertController"});
	this.route("support", {path: "/support", controller: "SupportController"});
	this.route("support.documents", {path: "/support/documents", title: "Documents", parent: "dashboard", controller: "SupportDocumentsController"});
	this.route("support.documents.issue", {path: "/support/documents/issue", title: "Issue", parent: "support.documents", controller: "SupportDocumentsIssueController"});
	this.route("support.documents.issue.details", {path: "/support/documents/issue/details/:issueId", title: "Details", parent: "support.documents.issue", controller: "IssueDetailsController"});
	this.route("support.documents.issue.edit", {path: "/support/documents/issue/edit/:issueId", title: "Edit", parent: "support.documents.issue", controller: "IssueEditController"});
	this.route("support.documents.issue.insert", {path: "/support/documents/issue/insert", title: "New", parent: "support.documents.issue", controller: "IssueInsertController"});
	this.route("support.documents.maintenance_schedule", {path: "/support/documents/maintenance_schedule", title: "Maintenance Schedule", parent: "support.documents", controller: "SupportDocumentsMaintenanceScheduleController"});
	this.route("support.documents.maintenance_schedule.details", {path: "/support/documents/maintenance_schedule/details/:maintenanceScheduleId", title: "Details", parent: "support.documents.maintenance_schedule", controller: "MaintenanceScheduleDetailsController"});
	this.route("support.documents.maintenance_schedule.edit", {path: "/support/documents/maintenance_schedule/edit/:maintenanceScheduleId", title: "Edit", parent: "support.documents.maintenance_schedule", controller: "MaintenanceScheduleEditController"});
	this.route("support.documents.maintenance_schedule.insert", {path: "/support/documents/maintenance_schedule/insert", title: "New", parent: "support.documents.maintenance_schedule", controller: "MaintenanceScheduleInsertController"});
	this.route("support.documents.maintenance_visit", {path: "/support/documents/maintenance_visit", title: "Maintenance Visit", parent: "support.documents", controller: "SupportDocumentsMaintenanceVisitController"});
	this.route("support.documents.maintenance_visit.details", {path: "/support/documents/maintenance_visit/details/:maintenanceVisitId", title: "Details", parent: "support.documents.maintenance_visit", controller: "MaintenanceVisitDetailsController"});
	this.route("support.documents.maintenance_visit.edit", {path: "/support/documents/maintenance_visit/edit/:maintenanceVisitId", title: "Edit", parent: "support.documents.maintenance_visit", controller: "MaintenanceVisitEditController"});
	this.route("support.documents.maintenance_visit.insert", {path: "/support/documents/maintenance_visit/insert", title: "New", parent: "support.documents.maintenance_visit", controller: "MaintenanceVisitInsertController"});
	this.route("support.documents.warranty_claim", {path: "/support/documents/warranty_claim", title: "Warranty Claim", parent: "support.documents", controller: "SupportDocumentsWarrantyClaimController"});
	this.route("support.documents.warranty_claim.details", {path: "/support/documents/warranty_claim/details/:warrantyClaimId", title: "Details", parent: "support.documents.warranty_claim", controller: "WarrantyClaimDetailsController"});
	this.route("support.documents.warranty_claim.edit", {path: "/support/documents/warranty_claim/edit/:warrantyClaimId", title: "Edit", parent: "support.documents.warranty_claim", controller: "WarrantyClaimEditController"});
	this.route("support.documents.warranty_claim.insert", {path: "/support/documents/warranty_claim/insert", title: "New", parent: "support.documents.warranty_claim", controller: "WarrantyClaimInsertController"});
	this.route("support.setup", {path: "/support/setup", title: "Setup", parent: "dashboard", controller: "SupportSetupController"});
	this.route("support.standard_reports", {path: "/support/standard_reports", title: "Standard Reports", parent: "dashboard", controller: "SupportStandardReportsController"});
	this.route("support.standard_reports.maintenance_schedules", {path: "/support/standard_reports/maintenance_schedules", title: "Maintenance Schedules", parent: "support.standard_reports", controller: "SupportStandardReportsMaintenanceSchedulesController"});
	this.route("support.standard_reports.support_analytics", {path: "/support/standard_reports/support_analytics", title: "Support Analytics", parent: "support.standard_reports", controller: "SupportStandardReportsSupportAnalyticsController"});
	this.route("tools", {path: "/tools", controller: "ToolsController"});
	this.route("tools.tools", {path: "/tools/tools", title: "Tools", parent: "dashboard", controller: "ToolsToolsController"});
	this.route("tools.tools.activity", {path: "/tools/tools/activity", title: "Activity", parent: "tools.tools", controller: "ToolsToolsActivityController"});
	this.route("tools.tools.calendar", {path: "/tools/tools/calendar", title: "Calendar", parent: "tools.tools", controller: "ToolsToolsCalendarController"});
	this.route("tools.tools.messages", {path: "/tools/tools/messages", title: "Messages", parent: "tools.tools", controller: "ToolsToolsMessagesController"});
	this.route("tools.tools.note", {path: "/tools/tools/note", title: "Notes", parent: "tools.tools", controller: "ToolsToolsNoteController"});
	this.route("tools.tools.note.details", {path: "/tools/tools/note/details/:noteId", title: "Details", parent: "tools.tools.note", controller: "NoteDetailsController"});
	this.route("tools.tools.note.edit", {path: "/tools/tools/note/edit/:noteId", title: "Edit", parent: "tools.tools.note", controller: "NoteEditController"});
	this.route("tools.tools.note.insert", {path: "/tools/tools/note/insert", title: "New", parent: "tools.tools.note", controller: "NoteInsertController"});
	this.route("tools.tools.todo", {path: "/tools/tools/todo", title: "ToDo", parent: "tools.tools", controller: "ToolsToolsToDoController"});
	this.route("tools.tools.todo.details", {path: "/tools/tools/todo/details/:todoId", title: "Details", parent: "tools.tools.todo", controller: "TodoDetailsController"});
	this.route("tools.tools.todo.edit", {path: "/tools/tools/todo/edit/:todoId", title: "Edit", parent: "tools.tools.todo", controller: "TodoEditController"});
	this.route("tools.tools.todo.insert", {path: "/tools/tools/todo/insert", title: "New", parent: "tools.tools.todo", controller: "TodoInsertController"});
	this.route("tutorials", {path: "/tutorials", controller: "TutorialsController"});
	this.route("tutorials.accounts", {path: "/tutorials/accounts", title: "Accounting", parent: "dashboard", controller: "TutorialsAccountsController"});
	this.route("tutorials.accounts.chart_of_accounts", {path: "/tutorials/accounts/chart_of_accounts", title: "Chart of Accounts", parent: "tutorials.accounts", controller: "TutorialsAccountsChartOfAccountsController"});
	this.route("tutorials.accounts.opening_accounting_balance", {path: "/tutorials/accounts/opening_accounting_balance", title: "Opening Accounting Balance", parent: "tutorials.accounts", controller: "TutorialsAccountsOpeningAccountingBalanceController"});
	this.route("tutorials.accounts.setting_up_taxes", {path: "/tutorials/accounts/setting_up_taxes", title: "Setting Up Taxes", parent: "tutorials.accounts", controller: "TutorialsAccountsSettingUpTaxesController"});
	this.route("tutorials.purchasing", {path: "/tutorials/purchasing", title: "Purchasing", parent: "dashboard", controller: "TutorialsPurchasingController"});
	this.route("tutorials.purchasing.customer_and_supplier", {path: "/tutorials/purchasing/customer_and_supplier", title: "Customer and Supplier", parent: "tutorials.purchasing", controller: "TutorialsPurchasingCustomerAndSupplierController"});
	this.route("tutorials.purchasing.managing_subcontracting", {path: "/tutorials/purchasing/managing_subcontracting", title: "Managing Sub-Contracting", parent: "tutorials.purchasing", controller: "TutorialsPurchasingManagingSubcontractingController"});
	this.route("tutorials.purchasing.material_request_to_purchase_order", {path: "/tutorials/purchasing/material_request_to_purchase_order", title: "Material Request to Purchase Order", parent: "tutorials.purchasing", controller: "TutorialsPurchasingMaterialRequestToPurchaseOrderController"});
	this.route("tutorials.purchasing.purchase_order_to_payment", {path: "/tutorials/purchasing/purchase_order_to_payment", title: "Purchase Order to Payment", parent: "tutorials.purchasing", controller: "TutorialsPurchasingPurchaseOrderToPaymentController"});
	this.route("tutorials.crm", {path: "/tutorials/crm", title: "CRM", parent: "dashboard", controller: "TutorialsCrmController"});
	this.route("tutorials.crm.lead_to_quotation", {path: "/tutorials/crm/lead_to_quotation", title: "Lead to Quotation", parent: "tutorials.crm", controller: "TutorialsCrmLeadToQuotationController"});
	this.route("tutorials.crm.newsletters", {path: "/tutorials/crm/newsletters", title: "Newsletters", parent: "tutorials.crm", controller: "TutorialsCrmNewslettersController"});
	this.route("tutorials.general", {path: "/tutorials/general", title: "General", parent: "dashboard", controller: "TutorialsGeneralController"});
	this.route("tutorials.general.customizing_forms", {path: "/tutorials/general/customizing_forms", title: "Customizing Forms", parent: "tutorials.general", controller: "TutorialsGeneralCustomizingFormsController"});
	this.route("tutorials.general.navigating", {path: "/tutorials/general/navigating", title: "Navigating", parent: "tutorials.general", controller: "TutorialsGeneralNavigatingController"});
	this.route("tutorials.general.setup_wizard", {path: "/tutorials/general/setup_wizard", title: "Setup Wizard", parent: "tutorials.general", controller: "TutorialsGeneralSetupWizardController"});
	this.route("tutorials.human_resources", {path: "/tutorials/human_resources", title: "Human Resources", parent: "dashboard", controller: "TutorialsHumanResourcesController"});
	this.route("tutorials.human_resources.expense_claims", {path: "/tutorials/human_resources/expense_claims", title: "Expense Claims", parent: "tutorials.human_resources", controller: "TutorialsHumanResourcesExpenseClaimsController"});
	this.route("tutorials.human_resources.leave_management", {path: "/tutorials/human_resources/leave_management", title: "Leave Management", parent: "tutorials.human_resources", controller: "TutorialsHumanResourcesLeaveManagementController"});
	this.route("tutorials.human_resources.processing_payroll", {path: "/tutorials/human_resources/processing_payroll", title: "Processing Payroll", parent: "tutorials.human_resources", controller: "TutorialsHumanResourcesProcessingPayrollController"});
	this.route("tutorials.human_resources.setting_up_employees", {path: "/tutorials/human_resources/setting_up_employees", title: "Setting Up Employees", parent: "tutorials.human_resources", controller: "TutorialsHumanResourcesSettingUpEmployeesController"});
	this.route("tutorials.manufacturing", {path: "/tutorials/manufacturing", title: "Manufacturing", parent: "dashboard", controller: "TutorialsManufacturingController"});
	this.route("tutorials.manufacturing.bill_of_materials", {path: "/tutorials/manufacturing/bill_of_materials", title: "Bill of Materials", parent: "tutorials.manufacturing", controller: "TutorialsManufacturingBillOfMaterialsController"});
	this.route("tutorials.manufacturing.production_order", {path: "/tutorials/manufacturing/production_order", title: "Production Order", parent: "tutorials.manufacturing", controller: "TutorialsManufacturingProductionOrderController"});
	this.route("tutorials.manufacturing.production_planning_tool", {path: "/tutorials/manufacturing/production_planning_tool", title: "Production Planning Tool", parent: "tutorials.manufacturing", controller: "TutorialsManufacturingProductionPlanningToolController"});
	this.route("tutorials.projects", {path: "/tutorials/projects", title: "Projects", parent: "dashboard", controller: "TutorialsProjectsController"});
	this.route("tutorials.projects.managing_projects", {path: "/tutorials/projects/managing_projects", title: "Managing Projects", parent: "tutorials.projects", controller: "TutorialsProjectsManagingProjectsController"});
	this.route("tutorials.selling", {path: "/tutorials/selling", title: "Selling", parent: "dashboard", controller: "TutorialsSellingController"});
	this.route("tutorials.selling.customer_and_supplier", {path: "/tutorials/selling/customer_and_supplier", title: "Customer and Supplier", parent: "tutorials.selling", controller: "TutorialsSellingCustomerAndSupplierController"});
	this.route("tutorials.selling.point_of_sale", {path: "/tutorials/selling/point_of_sale", title: "Point of Sale", parent: "tutorials.selling", controller: "TutorialsSellingPointOfSaleController"});
	this.route("tutorials.selling.sales_order_to_payment", {path: "/tutorials/selling/sales_order_to_payment", title: "Sales Order to Payment", parent: "tutorials.selling", controller: "TutorialsSellingSalesOrderToPaymentController"});
	this.route("tutorials.setup", {path: "/tutorials/setup", title: "Setup", parent: "dashboard", controller: "TutorialsSetupController"});
	this.route("tutorials.setup.data_import_and_export", {path: "/tutorials/setup/data_import_and_export", title: "Data Import and Export", parent: "tutorials.setup", controller: "TutorialsSetupDataImportAndExportController"});
	this.route("tutorials.setup.opening_stock_balance", {path: "/tutorials/setup/opening_stock_balance", title: "Opening Stock Balance", parent: "tutorials.setup", controller: "TutorialsSetupOpeningStockBalanceController"});
	this.route("tutorials.setup.printing_and_branding", {path: "/tutorials/setup/printing_and_branding", title: "Printing and Branding", parent: "tutorials.setup", controller: "TutorialsSetupPrintingAndBrandingController"});
	this.route("tutorials.setup.setting_up_email", {path: "/tutorials/setup/setting_up_email", title: "Setting Up Email", parent: "tutorials.setup", controller: "TutorialsSetupSettingUpEmailController"});
	this.route("tutorials.setup.users_and_permissions", {path: "/tutorials/setup/users_and_permissions", title: "Users and Permissions", parent: "tutorials.setup", controller: "TutorialsSetupUsersAndPermissionsController"});
	this.route("tutorials.setup.workflow", {path: "/tutorials/setup/workflow", title: "Workflow", parent: "tutorials.setup", controller: "TutorialsSetupWorkflowController"});
	this.route("tutorials.stock", {path: "/tutorials/stock", title: "Stock", parent: "dashboard", controller: "TutorialsStockController"});
	this.route("tutorials.stock.batch_inventory", {path: "/tutorials/stock/batch_inventory", title: "Batch Inventory", parent: "tutorials.stock", controller: "TutorialsStockBatchInventoryController"});
	this.route("tutorials.stock.items_and_pricing", {path: "/tutorials/stock/items_and_pricing", title: "Items and Pricing", parent: "tutorials.stock", controller: "TutorialsStockItemsAndPricingController"});
	this.route("tutorials.stock.making_stock_entries", {path: "/tutorials/stock/making_stock_entries", title: "Making Stock Entries", parent: "tutorials.stock", controller: "TutorialsStockMakingStockEntriesController"});
	this.route("tutorials.stock.managing_subcontracting", {path: "/tutorials/stock/managing_subcontracting", title: "Managing Sub-contracting", parent: "tutorials.stock", controller: "TutorialsStockManagingSubcontractingController"});
	this.route("tutorials.stock.opening_stock_balance", {path: "/tutorials/stock/opening_stock_balance", title: "Opening Stock Balance", parent: "tutorials.stock", controller: "TutorialsStockOpeningStockBalanceController"});
	this.route("tutorials.stock.serialized_inventory", {path: "/tutorials/stock/serialized_inventory", title: "Serialized Inventory", parent: "tutorials.stock", controller: "TutorialsStockSerializedInventoryController"});
	this.route("website", {path: "/website", controller: "WebsiteController"});
	this.route("website.documents", {path: "/website/documents", title: "Documents", parent: "dashboard", controller: "WebsiteDocumentsController"});
	this.route("website.documents.blog_post", {path: "/website/documents/blog_post", title: "Blog Post", parent: "website.documents", controller: "WebsiteDocumentsBlogPostController"});
	this.route("website.documents.blog_post.details", {path: "/website/documents/blog_post/details/:blogPostId", title: "Details", parent: "website.documents.blog_post", controller: "BlogPostDetailsController"});
	this.route("website.documents.blog_post.edit", {path: "/website/documents/blog_post/edit/:blogPostId", title: "Edit", parent: "website.documents.blog_post", controller: "BlogPostEditController"});
	this.route("website.documents.blog_post.insert", {path: "/website/documents/blog_post/insert", title: "New", parent: "website.documents.blog_post", controller: "BlogPostInsertController"});
	this.route("website.documents.blogger", {path: "/website/documents/blogger", title: "Blogger", parent: "website.documents", controller: "WebsiteDocumentsBloggerController"});
	this.route("website.documents.blogger.details", {path: "/website/documents/blogger/details/:bloggerId", title: "Details", parent: "website.documents.blogger", controller: "BloggerDetailsController"});
	this.route("website.documents.blogger.edit", {path: "/website/documents/blogger/edit/:bloggerId", title: "Edit", parent: "website.documents.blogger", controller: "BloggerEditController"});
	this.route("website.documents.blogger.insert", {path: "/website/documents/blogger/insert", title: "New", parent: "website.documents.blogger", controller: "BloggerInsertController"});
	this.route("website.documents.web_form", {path: "/website/documents/web_form", title: "Web Form", parent: "website.documents", controller: "WebsiteDocumentsWebFormController"});
	this.route("website.documents.web_form.details", {path: "/website/documents/web_form/details/:webFormId", title: "Details", parent: "website.documents.web_form", controller: "WebFormDetailsController"});
	this.route("website.documents.web_form.edit", {path: "/website/documents/web_form/edit/:webFormId", title: "Edit", parent: "website.documents.web_form", controller: "WebFormEditController"});
	this.route("website.documents.web_form.insert", {path: "/website/documents/web_form/insert", title: "New", parent: "website.documents.web_form", controller: "WebFormInsertController"});
	this.route("website.documents.web_page", {path: "/website/documents/web_page", title: "Web Page", parent: "website.documents", controller: "WebsiteDocumentsWebPageController"});
	this.route("website.documents.web_page.details", {path: "/website/documents/web_page/details/:webPageId", title: "Details", parent: "website.documents.web_page", controller: "WebPageDetailsController"});
	this.route("website.documents.web_page.edit", {path: "/website/documents/web_page/edit/:webPageId", title: "Edit", parent: "website.documents.web_page", controller: "WebPageEditController"});
	this.route("website.documents.web_page.insert", {path: "/website/documents/web_page/insert", title: "New", parent: "website.documents.web_page", controller: "WebPageInsertController"});
	this.route("website.documents.website_slideshow", {path: "/website/documents/website_slideshow", title: "Website Slideshow", parent: "website.documents", controller: "WebsiteDocumentsWebsiteSlideshowController"});
	this.route("website.documents.website_slideshow.details", {path: "/website/documents/website_slideshow/details/:websiteSlideshowId", title: "Details", parent: "website.documents.website_slideshow", controller: "WebsiteSlideshowDetailsController"});
	this.route("website.documents.website_slideshow.edit", {path: "/website/documents/website_slideshow/edit/:websiteSlideshowId", title: "Edit", parent: "website.documents.website_slideshow", controller: "WebsiteSlideshowEditController"});
	this.route("website.documents.website_slideshow.insert", {path: "/website/documents/website_slideshow/insert", title: "New", parent: "website.documents.website_slideshow", controller: "WebsiteSlideshowInsertController"});
	this.route("website.setup", {path: "/website/setup", title: "Setup", parent: "dashboard", controller: "WebsiteSetupController"});
	this.route("website.shopping_cart", {path: "/website/shopping_cart", title: "Shopping Cart", parent: "dashboard", controller: "WebsiteShoppingCartController"});
	this.route("website.shopping_cart.shopping_cart_settings", {path: "/website/shopping_cart/shopping_cart_settings", title: "Shopping Cart Settings", parent: "website.shopping_cart", controller: "WebsiteShoppingCartShoppingCartSettingsController"});
});

