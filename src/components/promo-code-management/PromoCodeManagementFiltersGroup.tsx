import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	PROMO_MANAGEMENT_UI,
	PROMO_PLAN_FILTER_OPTIONS,
	PROMO_STATUS_FILTER_OPTIONS,
	PROMO_TIME_FILTER_OPTIONS,
} from "@/const";
import { cn } from "@/lib/utils";
import type { PromoCodeManagementFiltersGroupProps } from "@/types";

/** Status, plan, and time period controls (design: invoice filter row pattern, 10px gap). */
export function PromoCodeManagementFiltersGroup({
	statusFilter,
	onStatusChange,
	planFilter,
	onPlanChange,
	timeFilter,
	onTimeChange,
	className,
}: PromoCodeManagementFiltersGroupProps) {
	return (
		<div
			className={cn(
				"flex h-9 w-full max-w-[620px] shrink-0 flex-wrap items-center gap-[10px] sm:flex-nowrap",
				className,
			)}
		>
			<Select value={statusFilter} onValueChange={onStatusChange}>
				<SelectTrigger
					className="h-9 min-w-0 w-full flex-1 rounded-lg"
					aria-label={PROMO_MANAGEMENT_UI.statusFilterAriaLabel}
				>
					<SelectValue placeholder={PROMO_STATUS_FILTER_OPTIONS[0].label} />
				</SelectTrigger>
				<SelectContent>
					{PROMO_STATUS_FILTER_OPTIONS.map((o) => (
						<SelectItem key={o.value} value={o.value}>
							{o.label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
			<Select value={planFilter} onValueChange={onPlanChange}>
				<SelectTrigger
					className="h-9 min-w-0 w-full flex-1 rounded-lg"
					aria-label={PROMO_MANAGEMENT_UI.planFilterAriaLabel}
				>
					<SelectValue placeholder={PROMO_PLAN_FILTER_OPTIONS[0].label} />
				</SelectTrigger>
				<SelectContent>
					{PROMO_PLAN_FILTER_OPTIONS.map((o) => (
						<SelectItem key={o.value} value={o.value}>
							{o.label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
			<Select value={timeFilter} onValueChange={onTimeChange}>
				<SelectTrigger
					className="h-9 min-w-0 w-full flex-1 rounded-lg"
					aria-label={PROMO_MANAGEMENT_UI.timeFilterAriaLabel}
				>
					<SelectValue placeholder={PROMO_TIME_FILTER_OPTIONS[0].label} />
				</SelectTrigger>
				<SelectContent>
					{PROMO_TIME_FILTER_OPTIONS.map((o) => (
						<SelectItem key={o.value} value={o.value}>
							{o.label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
}
