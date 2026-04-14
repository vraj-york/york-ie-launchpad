export type PromoCodeStatus = "active" | "disabled" | "expired";

export type PromoPlanFilterKey =
	| "blueprint_monthly"
	| "assessment_individual"
	| "assessment_annual";

export type PromoCodeManagementRow = {
	id: string;
	code: string;
	status: PromoCodeStatus;
	/** Active row shown with error-toned badge in design when set. */
	activeBadgeTone?: "default" | "destructive";
	discountPercent: number;
	planLabel: string;
	planKey: PromoPlanFilterKey;
	usageUsed: number;
	usageLimit: number;
	/** ISO date (YYYY-MM-DD) for display and filters */
	expiryDate: string;
	/** ISO datetime for “All Time” filter */
	createdAt: string;
};

export type PromoCodeColumnSelection = {
	pageRowIds: string[];
	selectedIds: Set<string>;
	onToggleRow: (id: string, checked: boolean) => void;
	onToggleAll: (checked: boolean) => void;
};

export type PromoCodeManagementFiltersGroupProps = {
	statusFilter: string;
	onStatusChange: (value: string) => void;
	planFilter: string;
	onPlanChange: (value: string) => void;
	timeFilter: string;
	onTimeChange: (value: string) => void;
	className?: string;
};
