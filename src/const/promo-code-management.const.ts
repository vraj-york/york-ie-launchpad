export const PROMO_CODE_MANAGEMENT_PAGE_CONTENT = {
	breadcrumbsTitle: "Promo Code Management",
	title: "Promo Code Management",
	subtitle: "Create, track, and manage promo codes across overall system.",
	addButton: "Add New Promo Code",
	searchPlaceholder: "Search here…",
	noData: "No promo codes found.",
} as const;

export const PROMO_CODE_TABLE_LABELS = {
	code: "Promo Code",
	status: "Status",
	discount: "Discount",
	plan: "Plan",
	usageLimit: "Usage Limit",
	expiryDate: "Expiry Date",
} as const;

export const PROMO_STATUS_LABELS = {
	active: "Active",
	disabled: "Disabled",
	expired: "Expired",
} as const;

export const PROMO_STATUS_FILTER_OPTIONS = [
	{ value: "all", label: "All Status" },
	{ value: "active", label: PROMO_STATUS_LABELS.active },
	{ value: "disabled", label: PROMO_STATUS_LABELS.disabled },
	{ value: "expired", label: PROMO_STATUS_LABELS.expired },
] as const;

export const PROMO_PLAN_FILTER_OPTIONS = [
	{ value: "all", label: "All Plans" },
	{
		value: "blueprint_monthly",
		label: "BSPBlueprint (Monthly)",
	},
	{
		value: "assessment_individual",
		label: "BSP Assessment (Individual)",
	},
	{
		value: "assessment_annual",
		label: "BSP Assessment (Annual)",
	},
] as const;

/** Same windows as invoice “More Filters” time periods; values match `createdGteFromTimePeriodId` in content. */
export const PROMO_TIME_FILTER_OPTIONS = [
	{ value: "all", label: "All Time" },
	{ value: "1h", label: "Last hour" },
	{ value: "7d", label: "Last 7 days" },
	{ value: "30d", label: "Last 30 days" },
	{ value: "3m", label: "Last 3 months" },
	{ value: "6m", label: "Last 6 months" },
	{ value: "1y", label: "Last year" },
] as const;

export const PROMO_BULK_ACTIONS = {
	itemsSelected: (count: number) =>
		count === 1 ? "1 item selected" : `${count} items selected`,
	delete: "Delete",
	exportCsv: "Export CSV",
} as const;

export const PROMO_MANAGEMENT_UI = {
	searchAriaLabel: "Search promo codes",
	statusFilterAriaLabel: "Filter by status",
	planFilterAriaLabel: "Filter by plan",
	timeFilterAriaLabel: "Filter by time period",
	emptyCell: "—",
} as const;
